import { ArrowUpRight, Sparkles } from "lucide-react";
import { Checker, Eyebrow, Rule } from "./ui";

const process = [
  {
    number: "01",
    title: "Temper",
    body: "Real couverture, slowly melted and hand-tempered for that clean Veloura snap.",
  },
  {
    number: "02",
    title: "Top",
    body: "Whole nuts, dried petals and cookie shards, arranged by hand — never scattered by machine.",
  },
  {
    number: "03",
    title: "Wrap",
    body: "Set, cut, wrapped in parchment and tied with blue. Your note goes in last.",
  },
];

export function Story({ onStudio }: { onStudio: () => void }) {
  return (
    <section id="story" className="scroll-mt-28 bg-cream/60">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="relative lg:col-span-6">
            <div className="grid grid-cols-5 gap-3">
              <div className="col-span-3 overflow-hidden rounded-sm border border-line">
                <img
                  src="/images/signature-bar.jpg"
                  alt="Veloura signature bar topped with rose petals and pistachios"
                  loading="lazy"
                  className="h-[280px] w-full object-cover sm:h-[400px] lg:h-[460px]"
                />
              </div>
              <div className="col-span-2 flex flex-col gap-3">
                <div className="overflow-hidden rounded-sm border border-line">
                  <img
                    src="/images/classics.jpg"
                    alt="Plain dark, milk and white chocolate hearts"
                    loading="lazy"
                    className="h-[150px] w-full object-cover sm:h-[220px]"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between rounded-sm bg-cobalt p-4 text-ivory">
                  <Sparkles className="h-4 w-4 text-sky" strokeWidth={1.4} />
                  <p className="font-display text-[19px] leading-[1.1] sm:text-[23px]">
                    “Handcrafted with love.
                    <br />
                    <em className="italic text-sky">Made to indulge.”</em>
                  </p>
                  <p className="mt-2 font-mono text-[7px] uppercase tracking-[0.18em] text-ivory/60">
                    The Veloura kitchen
                  </p>
                </div>
              </div>
            </div>
            <Checker className="mt-3 h-3" />
          </div>

          <div className="lg:col-span-6 lg:pt-2">
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-5 font-display text-[34px] leading-[1.02] tracking-[-0.03em] text-balance sm:text-[44px] lg:text-[50px]">
              We started with one bar
              <br />
              and a borrowed{" "}
              <em className="font-normal italic text-cobalt">kitchen.</em>
            </h2>
            <div className="mt-5 space-y-4 text-[14px] font-light leading-relaxed text-ink-soft sm:text-[15px]">
              <p>
                Veloura began as a thank-you: a single bar, poured a little too
                thick, wrapped in parchment and given away. It kept being asked
                for. So we kept making it — same kitchen, same small batches,
                same insistence on real chocolate.
              </p>
              <p>
                Today we make hearts and bars, nut gardens and secret messages.
                Everything is still poured, topped and wrapped by hand. Nothing
                sits in a warehouse waiting to be loved.
              </p>
            </div>

            <div className="mt-7 grid gap-4 border-t border-line pt-5 sm:grid-cols-3">
              {process.map((step) => (
                <div key={step.number}>
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-cobalt">
                    {step.number}
                  </p>
                  <p className="mt-1.5 font-display text-[21px] leading-none">
                    {step.title}
                  </p>
                  <p className="mt-1.5 text-[11.5px] font-light leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={onStudio}
                className="group inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-cobalt"
              >
                <span className="border-b border-cobalt/40 pb-0.5">
                  See the menu as a JPG
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
              <span className="hidden h-3 w-px bg-line sm:block" />
              <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink-soft">
                Made in India · Vegetarian · Real couverture
              </p>
            </div>
          </div>
        </div>

        <Rule className="mt-14" />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Nature's finest", "Ingredients we can name and taste."],
            ["Small batch", "Poured weekly, never mass-made."],
            ["Made to order", "Your chocolate starts when you do."],
            ["Wrapped by hand", "Blue box, cream ribbon, real note."],
          ].map(([title, body], index) => (
            <div key={title} className="flex gap-3">
              <span className="font-mono text-[8px] text-cobalt">
                0{index + 1}
              </span>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink">
                  {title}
                </p>
                <p className="mt-1 text-[12px] font-light leading-relaxed text-ink-soft">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
