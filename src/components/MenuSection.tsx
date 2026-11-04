import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  collections,
  formatINR,
  menuItems,
  type Collection,
  type MenuItem,
} from "../data/menu";
import { Checker, Eyebrow, Rule, SectionHeading } from "./ui";
import { ItemModal, type PendingLine } from "./ItemModal";
import { cn } from "../utils/cn";

const filters = [
  { id: "all", label: "Everything" },
  ...collections
    .filter((collection) => collection.id !== "gifting")
    .map((collection) => ({ id: collection.id, label: collection.shortName })),
];

function CollectionCard({
  collection,
  count,
  onSelect,
}: {
  collection: Collection;
  count: number;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className="group relative w-[220px] shrink-0 overflow-hidden rounded-sm border border-line bg-cream text-left sm:w-auto"
    >
      <div className="relative h-[240px] overflow-hidden sm:h-[260px]">
        <img
          src={collection.image}
          alt={collection.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cobalt-ink/85 via-cobalt-ink/10 to-transparent" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3.5">
          <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-ivory/80">
            {collection.index}
          </span>
          <span className="rounded-full border border-ivory/30 bg-cobalt-ink/25 px-2 py-1 font-mono text-[7.5px] uppercase tracking-[0.12em] text-ivory backdrop-blur-sm">
            {count} {count === 1 ? "piece" : "pieces"}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="font-display text-[22px] leading-[1.02] tracking-[-0.01em] text-ivory">
            {collection.name}
          </p>
          <p className="mt-1.5 font-mono text-[7.5px] uppercase leading-relaxed tracking-[0.12em] text-ivory/70">
            {collection.tagline}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between bg-ivory px-3.5 py-2.5">
        <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink-soft transition group-hover:text-cobalt">
          View collection
        </span>
        <ArrowUpRight className="h-3.5 w-3.5 text-cobalt transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </button>
  );
}

function ChocDots() {
  return (
    <span className="flex items-center gap-1" aria-hidden>
      <span className="h-2 w-2 rounded-full bg-[#3a2318]" />
      <span className="h-2 w-2 rounded-full bg-[#a5714b]" />
      <span className="h-2 w-2 rounded-full border border-line bg-[#f3e7c9]" />
    </span>
  );
}

function ItemCard({
  item,
  number,
  onOpen,
  onQuickAdd,
}: {
  item: MenuItem;
  number: number;
  onOpen: () => void;
  onQuickAdd: () => void;
}) {
  const hasChocolate = item.groups?.some((group) => group.id === "chocolate");
  const multiGroup = item.groups?.find((group) => group.kind === "multi");

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-sm border border-line bg-[#fefcf8] transition-all duration-300 hover:-translate-y-0.5 hover:border-cobalt/25 hover:shadow-[0_24px_50px_-36px_rgba(8,44,88,0.55)]">
      <button
        onClick={onOpen}
        className="absolute inset-0 z-10"
        aria-label={`View and customise ${item.name}`}
      >
        <span className="sr-only">{item.name}</span>
      </button>

      <div className="relative aspect-[5/4] overflow-hidden bg-cream">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 flex h-7 min-w-7 items-center justify-center rounded-full bg-ivory/95 px-2 font-mono text-[8.5px] tracking-[0.1em] text-cobalt backdrop-blur">
          {String(number).padStart(2, "0")}
        </span>
        {item.badge && (
          <span className="absolute right-3 top-3 rounded-full bg-cobalt px-2.5 py-1 font-mono text-[7.5px] uppercase tracking-[0.14em] text-ivory">
            {item.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="font-mono text-[7.5px] uppercase tracking-[0.18em] text-cobalt">
          {item.collection}
        </p>
        <h3 className="mt-1.5 font-display text-[22px] leading-[1.06] tracking-[-0.015em] text-ink">
          {item.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-[12.5px] font-light leading-relaxed text-ink-soft">
          {item.description}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5">
          {hasChocolate && (
            <>
              <ChocDots />
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink-soft">
                Dark · Milk · White
              </span>
            </>
          )}
          {multiGroup && (
            <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink-soft">
              · Choose {multiGroup.max} toppings
            </span>
          )}
          {!hasChocolate && !multiGroup && (
            <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink-soft">
              {item.unit}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line/70 pt-3.5">
          <div>
            <p className="font-display text-[20px] leading-none text-cobalt">
              {formatINR(item.price)}
            </p>
            <p className="mt-1 font-mono text-[7.5px] uppercase tracking-[0.14em] text-ink-soft">
              {item.unit}
            </p>
          </div>
          <button
            onClick={(event) => {
              event.stopPropagation();
              onQuickAdd();
            }}
            aria-label={`Quick add ${item.name}`}
            className="relative z-20 flex h-9 w-9 items-center justify-center rounded-full border border-cobalt/25 text-cobalt transition hover:bg-cobalt hover:text-ivory"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

export function MenuSection({
  onAdd,
  onGoGifting,
  onGoStudio,
}: {
  onAdd: (line: PendingLine) => void;
  onGoGifting: () => void;
  onGoStudio: () => void;
}) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: menuItems.length };
    menuItems.forEach((item) => {
      map[item.collectionId] = (map[item.collectionId] ?? 0) + 1;
    });
    map.gifting = 3;
    return map;
  }, []);

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();
    return menuItems.filter((item) => {
      const matchesFilter =
        activeFilter === "all" || item.collectionId === activeFilter;
      const matchesQuery =
        !search ||
        item.name.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        item.collection.toLowerCase().includes(search);
      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, query]);

  const selectCollection = (collection: Collection) => {
    if (collection.id === "gifting") {
      onGoGifting();
      return;
    }
    setActiveFilter(collection.id);
    setQuery("");
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section id="collections" className="scroll-mt-28 border-t border-line bg-ivory">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:py-20">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="The collections — 08"
              title="Find your"
              italic="flavour."
              description="Eight small worlds, all hand-poured in our kitchen. Pick a collection and customise every bar to the chocolate you love."
            />
            <div className="flex shrink-0 items-center gap-4">
              <div className="hidden text-right lg:block">
                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink-soft">
                  New here?
                </p>
                <p className="font-display text-[19px] italic text-cobalt">
                  Start with the nut hearts.
                </p>
              </div>
              <button
                onClick={() => selectCollection(collections[1])}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cobalt/30 text-cobalt transition hover:bg-cobalt hover:text-ivory"
                aria-label="Jump to the Nut Collection"
              >
                <ArrowDownRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="no-scrollbar -mx-5 mt-9 flex snap-x gap-3.5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 lg:grid-cols-4">
            {collections.map((collection) => (
              <div key={collection.id} className="snap-start">
                <CollectionCard
                  collection={collection}
                  count={counts[collection.id] ?? 0}
                  onSelect={() => selectCollection(collection)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="menu" className="scroll-mt-28 border-t border-line bg-[#f6f1e7]">
        <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-14 sm:px-8 lg:pb-24 lg:pt-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Eyebrow>The interactive menu</Eyebrow>
              <h2 className="mt-5 font-display text-[40px] leading-[0.98] tracking-[-0.03em] sm:text-[56px] lg:text-[64px]">
                Pick your <em className="font-normal italic text-cobalt">pleasure.</em>
              </h2>
            </div>
            <div className="max-w-sm lg:pb-1.5">
              <p className="text-[13.5px] font-light leading-relaxed text-ink-soft">
                Every item is made to order. Choose your chocolate, add toppings,
                set a quantity — then send the finished list straight to our DMs.
              </p>
              <button
                onClick={onGoStudio}
                className="group mt-3 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-cobalt"
              >
                Want the printable menu?
                <span className="border-b border-cobalt/40 pb-0.5">Instagram kit</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          <div className="sticky top-[95px] z-30 -mx-5 mt-8 border-y border-line/80 bg-[#f6f1e7]/95 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8 lg:top-[104px]">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    aria-pressed={activeFilter === filter.id}
                    className={cn(
                      "shrink-0 rounded-full border px-3 py-1.5 font-mono text-[8.5px] uppercase tracking-[0.12em] transition",
                      activeFilter === filter.id
                        ? "border-cobalt bg-cobalt text-ivory"
                        : "border-line text-ink-soft hover:border-cobalt/40 hover:text-cobalt"
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex flex-1 items-center gap-2 rounded-full border border-line bg-ivory px-3 py-1.5 lg:w-56 lg:flex-none">
                  <Search className="h-3.5 w-3.5 shrink-0 text-ink-soft" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search the menu"
                    aria-label="Search the menu"
                    className="w-full bg-transparent font-mono text-[10px] text-ink placeholder:text-ink-soft/70 focus:outline-none"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                      className="text-ink-soft hover:text-cobalt"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <span className="hidden shrink-0 items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-ink-soft sm:flex">
                  <SlidersHorizontal className="h-3 w-3" />
                  {results.length} items
                </span>
              </div>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
            {results.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                number={menuItems.indexOf(item) + 1}
                onOpen={() => setActiveItem(item)}
                onQuickAdd={() => onAdd({ itemId: item.id, selections: [], qty: 1 })}
              />
            ))}
            {activeFilter === "all" && !query && (
              <div className="relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-sm bg-cobalt p-5 text-ivory sm:p-6">
                <Checker light className="absolute inset-x-0 top-0 h-3 opacity-70" />
                <div className="mt-3">
                  <p className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-ivory/70">
                    Can't decide?
                  </p>
                  <p className="mt-3 font-display text-[30px] leading-[1.02]">
                    Let us build
                    <br />
                    <em className="italic text-sky">the box.</em>
                  </p>
                  <p className="mt-3 max-w-[240px] text-[12.5px] font-light leading-relaxed text-ivory/75">
                    Tell us who it's for and the occasion. We'll gather a
                    hand-wrapped edit with a handwritten note.
                  </p>
                </div>
                <button
                  onClick={onGoGifting}
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-ivory px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-cobalt-deep transition hover:bg-sky"
                >
                  Build a gift box
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <span className="pointer-events-none absolute -bottom-8 -right-4 font-display text-[120px] leading-none text-ivory/10">
                  V
                </span>
              </div>
            )}
          </div>

          {results.length === 0 && (
            <div className="mt-10 rounded-sm border border-dashed border-line bg-ivory/60 px-6 py-14 text-center">
              <p className="font-display text-[26px]">Nothing under that name.</p>
              <p className="mx-auto mt-2 max-w-sm text-[13px] font-light text-ink-soft">
                Try "nut", "oreo" or "rose" — or ask us for a custom creation in
                your order note.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setActiveFilter("all");
                }}
                className="mt-5 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-cobalt underline underline-offset-4"
              >
                Reset the menu
              </button>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[8.5px] uppercase leading-relaxed tracking-[0.14em] text-ink-soft">
              All prices in INR · Customisations welcome · Please allow 2–3 days
            </p>
            <button
              onClick={onGoGifting}
              className="group inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-cobalt"
            >
              Make it a gift
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </button>
          </div>

          <Rule className="mt-10" />
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink-soft">
              Veloura · Menu No. 01 · Updated this season
            </p>
            <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em] text-cobalt">
              <span className="h-1.5 w-1.5 rounded-full bg-cobalt" />
              Taking orders
            </span>
          </div>
        </div>
      </section>

      {activeItem && (
        <ItemModal
          key={activeItem.id}
          item={activeItem}
          onClose={() => setActiveItem(null)}
          onAdd={(line) => {
            onAdd(line);
            setActiveItem(null);
          }}
        />
      )}
    </>
  );
}
