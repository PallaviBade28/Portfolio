import fs from 'fs';
import path from 'path';
import { SourceMapConsumer } from 'source-map';

const LOG = path.resolve(process.cwd(), 'tools', 'console-output', 'console-log.json');
const DIST = path.resolve(process.cwd(), 'dist', 'assets');
const OUT = path.resolve(process.cwd(), 'tools', 'console-output', 'mapped-stack.json');

if (!fs.existsSync(LOG)) {
  console.error('console-log.json not found; run the capture first');
  process.exit(1);
}

const logs = JSON.parse(fs.readFileSync(LOG, 'utf8'));

async function mapFrame(url, line, column) {
  // url like http://localhost:4173/assets/index-Ct9S7T36.js
  const parsed = new URL(url);
  const pathname = parsed.pathname; // /assets/index-Ct9S7T36.js
  const filename = path.basename(pathname); // index-Ct9S7T36.js
  const mapName = filename + '.map';
  const mapPath = path.join(DIST, mapName);
  if (!fs.existsSync(mapPath)) {
    return { error: `sourcemap not found for ${filename}` };
  }
  const rawMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
  const consumer = await new SourceMapConsumer(rawMap);
  const pos = consumer.originalPositionFor({ line: Number(line), column: Number(column) });
  consumer.destroy();
  return pos;
}

(async () => {
  const results = [];
  for (const entry of logs) {
    if (entry.type === 'pageerror' && entry.stack) {
      const stack = entry.stack;
      const lines = stack.split('\n');
      const frames = [];
      for (const line of lines) {
        const m = line.match(/\((.*):([0-9]+):([0-9]+)\)$/);
        if (m) {
          const [_, url, l, c] = m;
          const mapped = await mapFrame(url, l, c);
          frames.push({ url, line: l, column: c, mapped });
        } else {
          const m2 = line.match(/at\s+(.*):(\d+):(\d+)/);
          if (m2) {
            const [_, url, l, c] = m2;
            const mapped = await mapFrame(url, l, c);
            frames.push({ url, line: l, column: c, mapped });
          }
        }
      }
      results.push({ original: entry, frames });
    }
  }
  fs.writeFileSync(OUT, JSON.stringify(results, null, 2), 'utf8');
  console.log('Wrote mapped stack to', OUT);
})();
