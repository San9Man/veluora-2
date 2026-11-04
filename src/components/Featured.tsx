import { ArrowRight, Plus } from "lucide-react";
import { formatINR, menuItems } from "../data/menu";
import { Checker, Eyebrow } from "./ui";

const featuredIds = ["almond-crunch", "pistachio-crunch", "cashew-crunch", "nut-medley"];

export function Featured({
  onExplore,
  onQuickAdd,
}: {
  onExplore: () => void;
  onQuickAdd: (itemId: string) => void;
}) {
  const featured = featuredIds
    .map((id) => menuItems.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <section className="relative overflow-hidden bg-cobalt-deep text-ivory">
      <Checker light className="absolute inset-x-0 top-0 h-3 opacity-60" />
      <div className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full border border-ivory/10" />
      <div className="pointer-events-none absolute -right-10 top-1/3 h-64 w-64 rounded-full border border-ivory/10" />

      <div className="relative mx-auto grid max-w-[1400px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-24">
        <div className="lg:col-span-5">
          <Eyebrow tone="ivory">Featured collection — No. 02</Eyebrow>
          <h2 className="mt-5 font-display text-[42px] leading-[0.95] tracking-[-0.03em] text-balance sm:text-[56px] lg:text-[62px]">
            A little crunch,
            <br />
            <em className="font-normal italic text-sky">a little luxury.</em>
          </h2>
          <p className="mt-5 max-w-md text-[14px] font-light leading-relaxed text-ivory/70 sm:text-[15px]">
            Heart-shaped, hand-topped and quietly generous. Whole almonds, green
            pistachios, roasted cashews and slow-dried fruit, set into our
            house couverture. Choose dark, milk or white for each one.
          </p>

          <button
            onClick={onExplore}
            className="group mt-7 inline-flex items-center gap-2.5 rounded-full bg-ivory px-5 py-3 font-mono text-[10px] uppercase tracking-[0.17em] text-cobalt-deep transition hover:bg-sky"
          >
            Explore the collection
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </button>

          <div className="mt-9 grid max-w-md grid-cols-3 gap-4 border-t border-ivory/15 pt-5">
            {[
              ["Small batch", "Made fresh, weekly"],
              ["Real toppings", "Never a shortcut"],
              ["Blue box", "Wrapped by hand"],
            ].map(([title, caption]) => (
              <div key={title}>
                <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-ivory">
                  {title}
                </p>
                <p className="mt-1 font-mono text-[7.5px] uppercase leading-relaxed tracking-[0.1em] text-ivory/50">
                  {caption}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <div className="overflow-hidden rounded-sm border border-ivory/15">
            <img
              src="/images/nut-collection.jpg"
              alt="Four heart-shaped nut chocolates: almond, pistachio, cashew and nut medley"
              loading="lazy"
              className="h-[320px] w-full object-cover sm:h-[440px] lg:h-[500px]"
            />
          </div>

          <div className="mt-3 rounded-sm bg-ivory p-4 text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.55)] sm:p-5 lg:absolute lg:-bottom-10 lg:-left-10 lg:mt-0 lg:w-[340px]">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-cobalt">
                The Nut Collection
              </p>
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink-soft">
                from {formatINR(60)}
              </span>
            </div>
            <ul className="mt-3 divide-y divide-line/70">
              {featured.map((item) => (
                <li key={item.id} className="flex items-center gap-3 py-2">
                  <span className="font-mono text-[8px] text-ink-soft">
                    {String(featured.indexOf(item) + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-[16px] leading-tight">
                      {item.name}
                    </p>
                    <p className="font-mono text-[7.5px] uppercase tracking-[0.12em] text-ink-soft">
                      {formatINR(item.price)} · Dark / Milk / White
                    </p>
                  </div>
                  <button
                    onClick={() => onQuickAdd(item.id)}
                    aria-label={`Add ${item.name}`}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cobalt/25 text-cobalt transition hover:bg-cobalt hover:text-ivory"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Checker light className="mt-10 h-3 opacity-60 lg:mt-16" />
    </section>
  );
}
