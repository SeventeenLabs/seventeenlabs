export default function Highlights() {
  const items = [
    {
      title: "Reliable by design",
      body: "Systems that favor clarity, maintainability, and measurable results.",
    },
    {
      title: "Automation that lasts",
      body: "Workflows that remain stable as you scale and requirements evolve.",
    },
    {
      title: "Outcomes over hype",
      body: "We focus on business impact—not buzzwords or fragile demos.",
    },
  ];

  return (
    <section id="services" className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">{it.title}</h3>
              <p className="text-sm text-slate-600">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
