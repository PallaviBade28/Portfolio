export default function Section({ id, title, children }) {
  return (
    <section id={id} className="relative py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">{title}</h2>
        {children}
      </div>
    </section>
  );
}
