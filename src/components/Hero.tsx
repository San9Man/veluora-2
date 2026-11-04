import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { Button, Checker, Eyebrow, Logo } from "./ui";

const marqueeWords = [
  "Hand-tempered couverture",
  "Small batch, always",
  "Free handwritten note",
  "Made to order",
  "Nature's finest, dipped in chocolate",
];

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-cobalt-deep/20 bg-cobalt text-ivory">
      <div className="flex w-max animate-marquee items-center py-3.5">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {marqueeWords.map((word) => (
              <span
                key={`${copy}-${word}`}
                className="flex items-center gap-7 whitespace-nowrap px-7 font-mono text-[9.5px] uppercase tracking-[0.24em] text-ivory/85"
              >
                {word}
                <span className="h-1 w-1 rotate-45 bg-ivory/50" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero({
  onExplore,
  onStudio,
}: {
  onExplore: () => void;
  onStudio: () => void;
}) {
  return (
    <section className="paper relative overflow-hidden bg-ivory">
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-sky/70 blur-3xl" />
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-16">
        <div className="animate-fade-up lg:col-span-5">
          <Eyebrow>A small-batch chocolate atelier</Eyebrow>

          <h1 className="mt-6 font-display text-[46px] leading-[0.95] tracking-[-0.035em] text-balance sm:text-[64px] lg:text-[72px] xl:text-[80px]">
            Chocolate,
            <br />
            made to be
            <br />
            <em className="font-normal italic text-cobalt">savoured.</em>
          </h1>

          <p className="mt-6 max-w-md text-[14.5px] font-light leading-relaxed text-ink-soft sm:text-[16px]">
            Veloura is a handcrafted chocolate house built on slow work, honest
            ingredients and the belief that a small square can hold an entire
            occasion.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" onClick={onExplore}>
              Explore the menu
              <ArrowDown className="h-4 w-4 transition group-hover/btn:translate-y-0.5" />
            </Button>
            <Button size="lg" variant="outline" onClick={onStudio}>
              <Sparkles className="h-4 w-4" />
              The Instagram kit
            </Button>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-5">
            {[
              ["21", "handmade creations"],
              ["08", "curated collections"],
              ["100%", "real couverture"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-[26px] leading-none text-cobalt">
                  {value}
                </dt>
                <dd className="mt-1.5 font-mono text-[8px] uppercase leading-relaxed tracking-[0.14em] text-ink-soft">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-fade-up lg:col-span-7 [animation-delay:160ms]">
          <div className="relative">
            <Checker className="h-4 rounded-t-sm" />

            <div className="relative overflow-hidden rounded-b-sm border border-t-0 border-line bg-cream">
              <div className="absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-cobalt-ink/40 to-transparent" />
              <img
                src="/images/hero-chocolate.jpg"
                alt="Handcrafted Veloura chocolates, bars and bonbons on cobalt blue silk"
                className="h-[380px] w-full object-cover object-center sm:h-[500px] lg:h-[560px]"
              />
              <div className="absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full border border-ivory/40 bg-cobalt-ink/35 px-3 py-1.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-ivory" />
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-ivory">
                  Handmade in small batches
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
                <div className="max-w-[270px]">
                  <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-ivory/70">
                    01 — The house collection
                  </p>
                  <div className="mt-2 rounded-sm bg-ivory px-4 py-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-display text-[22px] leading-[1.05] text-ink">
                        Nut
                        <br />
                        Collection
                      </p>
                      <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-cobalt">
                        from ₹60
                      </span>
                    </div>
                    <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.16em] text-ink-soft">
                      A little crunch, a little luxury
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border border-ivory/40 bg-cobalt-ink/25 text-center backdrop-blur-sm sm:flex">
                    <span className="font-mono text-[7.5px] uppercase leading-tight tracking-[0.14em] text-ivory">
                      Made
                      <br />
                      by
                      <br />
                      hand
                    </span>
                  </div>
                  <button
                    onClick={onExplore}
                    className="flex items-center gap-2 rounded-full bg-ivory px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.18em] text-cobalt-deep transition hover:bg-sky"
                  >
                    Explore
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute -right-3 top-1/3 hidden rounded-full border border-cobalt/20 bg-ivory px-2.5 py-5 [writing-mode:vertical-rl] xl:block">
              <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-cobalt">
                Veloura · Est. handmade
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between px-1">
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink-soft">
              The house edit, No. 01
            </p>
            <p className="hidden font-mono text-[8px] uppercase tracking-[0.2em] text-ink-soft sm:block">
              Shot on film, made in India
            </p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto hidden max-w-[1400px] items-center justify-between px-8 pb-10 lg:flex">
        <div className="hairline w-1/3" />
        <Logo size="sm" tone="cobalt" className="opacity-70" />
        <div className="hairline w-1/3" />
      </div>
    </section>
  );
}
