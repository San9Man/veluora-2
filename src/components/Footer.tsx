import { useState } from "react";
import { ArrowRight, AtSign, Check, MapPin, Phone } from "lucide-react";
import { Checker, Logo } from "./ui";
import type { Page } from "./Header";

export function Footer({
  onNavigate,
  instagram,
  whatsapp,
}: {
  onNavigate: (page: Page, hash?: string) => void;
  instagram: string;
  whatsapp: string;
}) {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const handle = instagram.replace(/^@/, "").trim();

  return (
    <footer className="relative bg-cobalt-ink text-ivory">
      <Checker className="h-3 opacity-80" />
      <div className="mx-auto max-w-[1400px] px-5 pb-8 pt-12 sm:px-8 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo size="md" tone="ivory" />
            <p className="mt-5 max-w-sm text-[13.5px] font-light leading-relaxed text-ivory/60">
              Handcrafted chocolate, poured slowly and wrapped by hand. Made in
              small batches for the moments that deserve something sweet.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <a
                href={`https://instagram.com/${handle || "veloura"}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ivory/25 px-3.5 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ivory/85 transition hover:border-ivory hover:text-ivory"
              >
                <AtSign className="h-3.5 w-3.5" />
                {handle ? `@${handle}` : "Instagram"}
              </a>
              <a
                href={whatsapp ? `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}` : "https://wa.me/"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ivory/25 px-3.5 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ivory/85 transition hover:border-ivory hover:text-ivory"
              >
                <Phone className="h-3.5 w-3.5" />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-4">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-ivory/45">
                Explore
              </p>
              <ul className="mt-4 space-y-2.5">
                {[
                  ["The Menu", "menu", "menu"],
                  ["Collections", "menu", "collections"],
                  ["Gifting", "menu", "gifting"],
                  ["Our Story", "menu", "story"],
                  ["Instagram Kit", "studio", undefined],
                ].map(([label, page, hash]) => (
                  <li key={label}>
                    <button
                      onClick={() =>
                        onNavigate(page as Page, hash as string | undefined)
                      }
                      className="text-[13px] font-light text-ivory/70 transition hover:text-ivory"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-ivory/45">
                Ordering
              </p>
              <ul className="mt-4 space-y-2.5 text-[13px] font-light text-ivory/70">
                <li>Made to order</li>
                <li>Dispatch in 2–3 days</li>
                <li>Delivery across India</li>
                <li>Custom boxes welcome</li>
                <li>Prices in INR</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-ivory/45">
              The next drop
            </p>
            <p className="mt-3 font-display text-[22px] leading-tight">
              Small-batch news,
              <br />
              <em className="italic text-sky">occasionally.</em>
            </p>
            <form
              className="mt-4"
              onSubmit={(event) => {
                event.preventDefault();
                if (!email.trim()) return;
                setJoined(true);
              }}
            >
              {joined ? (
                <p className="flex items-center gap-2 rounded-sm border border-ivory/20 bg-ivory/10 px-3 py-3 font-mono text-[9px] uppercase tracking-[0.12em] text-ivory">
                  <Check className="h-3.5 w-3.5" />
                  You're on the list
                </p>
              ) : (
                <div className="flex items-center gap-2 border-b border-ivory/25 pb-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email address"
                    aria-label="Email address for the Veloura list"
                    className="min-w-0 flex-1 bg-transparent text-[12.5px] font-light text-ivory placeholder:text-ivory/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Join the list"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ivory/30 text-ivory transition hover:bg-ivory hover:text-cobalt-deep"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </form>
            <p className="mt-4 flex items-start gap-2 font-mono text-[7.5px] uppercase leading-relaxed tracking-[0.12em] text-ivory/40">
              <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
              Handmade in India · Vegetarian-friendly · Contains nuts, dairy & gluten in some items
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-ivory/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[7.5px] uppercase tracking-[0.16em] text-ivory/40">
            © {new Date().getFullYear()} Veloura Chocolate. All rights reserved.
          </p>
          <p className="font-mono text-[7.5px] uppercase tracking-[0.16em] text-ivory/40">
            Handcrafted with love · Made to indulge
          </p>
        </div>
      </div>
    </footer>
  );
}
