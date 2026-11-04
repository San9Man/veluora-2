import { useState } from "react";
import { ArrowRight, Check, Gift, Minus, Plus, Ribbon } from "lucide-react";
import { formatINR, giftBoxes, type GiftBox } from "../data/menu";
import { Button, Checker, Eyebrow, SectionHeading } from "./ui";
import { cn } from "../utils/cn";

export function Gifting({
  onAddBox,
  giftNote,
  setGiftNote,
}: {
  onAddBox: (box: GiftBox, qty: number) => void;
  giftNote: string;
  setGiftNote: (note: string) => void;
}) {
  const [selectedId, setSelectedId] = useState(giftBoxes[1].id);
  const [qty, setQty] = useState(1);
  const selected = giftBoxes.find((box) => box.id === selectedId) ?? giftBoxes[0];

  return (
    <section id="gifting" className="paper scroll-mt-28 border-b border-line bg-ivory">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-24">
        <SectionHeading
          eyebrow="The gift edit — 08"
          title="Give the good"
          italic="stuff."
          description="Every box is packed by hand in our cobalt keepsake box, tied with cream ribbon and finished with a note in our own handwriting. No plastic, no filler — just chocolate."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="relative">
              <Checker className="h-4" />
              <div className="relative overflow-hidden rounded-b-sm border border-t-0 border-line">
                <img
                  src="/images/chocolate-box.jpg"
                  alt="Veloura cobalt keepsake gift box filled with handmade chocolates"
                  loading="lazy"
                  className="h-[340px] w-full object-cover sm:h-[440px] lg:h-[520px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cobalt-ink/55 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4 rounded-sm bg-ivory/95 p-4 backdrop-blur">
                  <div className="flex items-center gap-2 text-cobalt">
                    <Ribbon className="h-3.5 w-3.5" strokeWidth={1.5} />
                    <p className="font-mono text-[8px] uppercase tracking-[0.2em]">
                      Complimentary handwritten note
                    </p>
                  </div>
                  <p className="mt-2 font-display text-[20px] leading-tight">
                    Blue box. Cream ribbon.
                    <br />
                    <em className="italic text-cobalt">Your words inside.</em>
                  </p>
                </div>
              </div>
            </div>

            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {[
                "Handwritten gift note, always complimentary",
                "Cobalt keepsake box, tied with cream ribbon",
                "Allergen card included with every order",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2.5 text-[12.5px] font-light text-ink-soft"
                >
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cobalt" />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-sm border border-line bg-[#fefcf8] p-5 sm:p-7">
              <div className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-cobalt" strokeWidth={1.5} />
                <Eyebrow>Choose your box</Eyebrow>
              </div>

              <div className="mt-5 space-y-2.5" role="radiogroup" aria-label="Choose a gift box">
                {giftBoxes.map((box) => {
                  const active = box.id === selectedId;
                  return (
                    <button
                      key={box.id}
                      role="radio"
                      aria-checked={active}
                      onClick={() => setSelectedId(box.id)}
                      className={cn(
                        "flex w-full items-center gap-3.5 rounded-sm border p-3 text-left transition",
                        active
                          ? "border-cobalt bg-sky/50 shadow-[inset_0_0_0_1px_rgba(20,80,155,0.35)]"
                          : "border-line bg-ivory/50 hover:border-cobalt/40"
                      )}
                    >
                      <img
                        src={box.image}
                        alt=""
                        loading="lazy"
                        className="h-16 w-16 shrink-0 rounded-sm object-cover sm:h-[72px] sm:w-[72px]"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                          <p className="font-display text-[21px] leading-tight">
                            {box.name}
                          </p>
                          <p className="font-display text-[18px] leading-none text-cobalt">
                            {formatINR(box.price)}
                          </p>
                        </div>
                        <p className="mt-0.5 font-mono text-[7.5px] uppercase tracking-[0.16em] text-cobalt">
                          {box.count}
                        </p>
                        <p className="mt-1.5 hidden text-[11.5px] font-light leading-snug text-ink-soft sm:block">
                          {box.description}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                          active ? "border-cobalt bg-cobalt" : "border-line"
                        )}
                      >
                        {active && <Check className="h-3 w-3 text-ivory" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6">
                <label
                  htmlFor="gift-note"
                  className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-ink"
                >
                  Gift note
                  <span className="normal-case tracking-[0.08em] text-ink-soft">
                    {giftNote.length}/140
                  </span>
                </label>
                <textarea
                  id="gift-note"
                  value={giftNote}
                  maxLength={140}
                  onChange={(event) => setGiftNote(event.target.value)}
                  rows={2}
                  placeholder="For the one who always saves me the last bite…"
                  className="mt-2 w-full resize-none rounded-sm border border-line bg-ivory px-3.5 py-3 font-sans text-[13px] font-light text-ink placeholder:text-ink-soft/60 focus:border-cobalt focus:outline-none"
                />
              </div>

              <div className="mt-5 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-full border border-line">
                    <button
                      onClick={() => setQty((value) => Math.max(1, value - 1))}
                      aria-label="Decrease gift box quantity"
                      className="flex h-9 w-9 items-center justify-center text-ink-soft hover:text-cobalt"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-6 text-center font-mono text-[12px]">{qty}</span>
                    <button
                      onClick={() => setQty((value) => Math.min(20, value + 1))}
                      aria-label="Increase gift box quantity"
                      className="flex h-9 w-9 items-center justify-center text-ink-soft hover:text-cobalt"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-ink-soft">
                      {qty} × {selected.name}
                    </p>
                    <p className="font-display text-[20px] leading-tight text-cobalt">
                      {formatINR(selected.price * qty)}
                    </p>
                  </div>
                </div>
                <Button onClick={() => onAddBox(selected, qty)}>
                  Add to your box
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <p className="mt-4 text-center font-mono text-[8px] uppercase leading-relaxed tracking-[0.14em] text-ink-soft sm:text-left">
              Need something bigger? Tell us in the order note — we make custom
              boxes for weddings, desks and very good thank-yous.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
