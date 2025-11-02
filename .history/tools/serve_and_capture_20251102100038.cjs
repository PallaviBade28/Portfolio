const { spawn } = require('child_process');
const path = require('path');

const server = spawn(process.execPath, [path.join(__dirname, 'serve_dist.js')], { stdio: ['ignore', 'pipe', 'pipe'] });

server.stdout.on('data', (d) => process.stdout.write(d));
server.stderr.on('data', (d) => process.stderr.write(d));

function runCapture() {
  return new Promise((resolve, reject) => {
    const env = Object.assign({}, process.env, { TARGET_URL: 'http://localhost:4173' });
    const child = spawn(process.execPath, [path.join(__dirname, 'collect_console.js')], { env, stdio: 'inherit' });
    child.on('exit', (code) => {
      resolve(code);
    });
    child.on('error', (err) => reject(err));
  });
}

(async () => {
  try {
    // Wait a short while for server to start
    await new Promise((r) => setTimeout(r, 800));
    const code = await runCapture();
    console.log('capture exited with', code);
  } catch (err) {
    console.error('capture failed', err);
  } finally {
    server.kill();
  }
})();
