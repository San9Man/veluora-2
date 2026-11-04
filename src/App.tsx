import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, ShoppingBag, X } from "lucide-react";
import { Header, type Page } from "./components/Header";
import { Hero, Marquee } from "./components/Hero";
import { MenuSection } from "./components/MenuSection";
import { Featured } from "./components/Featured";
import { Gifting } from "./components/Gifting";
import { Story } from "./components/Story";
import { Studio } from "./components/Studio";
import { Footer } from "./components/Footer";
import { OrderDrawer, type OrderSettings } from "./components/OrderDrawer";
import type { PendingLine } from "./components/ItemModal";
import {
  defaultSelections,
  findItem,
  formatINR,
  orderCount,
  orderTotal,
  type GiftBox,
  type OrderLine,
} from "./data/menu";
import { Checker, Eyebrow } from "./components/ui";

const SETTINGS_KEY = "veloura.settings.v1";
const CART_KEY = "veloura.cart.v1";
const NOTE_KEY = "veloura.note.v1";

const defaultSettings: OrderSettings = {
  instagram: "veloura",
  whatsapp: "",
};

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function HowItWorks({ onMenu }: { onMenu: () => void }) {
  const steps = [
    {
      label: "Pick & personalise",
      body: "Choose a collection, then set your chocolate and toppings. Every item can be adjusted.",
    },
    {
      label: "Gather your box",
      body: "Add what you love, set quantities and leave a gift note. Delivery is confirmed personally.",
    },
    {
      label: "Send it to us",
      body: "Copy the finished order or send it on WhatsApp / Instagram. We reply with payment and dispatch.",
    },
  ];

  return (
    <section className="bg-cobalt-ink text-ivory">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:py-16">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow tone="ivory">How ordering works</Eyebrow>
            <h2 className="mt-4 font-display text-[30px] leading-[1.04] sm:text-[36px]">
              Three small steps.
              <em className="ml-2 italic text-sky">One good box.</em>
            </h2>
          </div>
          <button
            onClick={onMenu}
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-ivory/30 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ivory transition hover:bg-ivory hover:text-cobalt-deep"
          >
            Start with the menu
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </button>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.label} className="border-t border-ivory/15 pt-4">
              <p className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-sky/70">
                0{index + 1}
              </p>
              <p className="mt-2 font-display text-[22px] leading-tight">{step.label}</p>
              <p className="mt-1.5 text-[12.5px] font-light leading-relaxed text-ivory/55">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("menu");
  const [lines, setLines] = useState<OrderLine[]>(() =>
    readStorage<OrderLine[]>(CART_KEY, [])
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [giftNote, setGiftNote] = useState(() => readStorage<string>(NOTE_KEY, ""));
  const [settings, setSettings] = useState<OrderSettings>(() =>
    readStorage<OrderSettings>(SETTINGS_KEY, defaultSettings)
  );
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(lines));
    } catch {
      /* cart remains in memory */
    }
  }, [lines]);

  useEffect(() => {
    try {
      localStorage.setItem(NOTE_KEY, JSON.stringify(giftNote));
    } catch {
      /* ignore */
    }
  }, [giftNote]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
  }, [settings]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3600);
  }, []);

  const navigate = useCallback(
    (next: Page, hash?: string) => {
      setDrawerOpen(false);
      if (next !== page) {
        setPage(next);
        window.scrollTo({ top: 0, behavior: "auto" });
        if (hash) {
          window.setTimeout(() => {
            document
              .getElementById(hash)
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 120);
        }
      } else if (hash) {
        document
          .getElementById(hash)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [page]
  );

  const addLine = useCallback(
    (pending: PendingLine) => {
      const item = findItem(pending.itemId);
      if (!item) return;
      const selections =
        pending.selections.length > 0
          ? pending.selections
          : defaultSelections(item);
      const signature = (entries: { groupId: string; choice: string }[]) =>
        entries
          .map((entry) => `${entry.groupId}:${entry.choice}`)
          .sort()
          .join("|");

      setLines((current) => {
        const match = current.find(
          (line) =>
            line.itemId === pending.itemId &&
            signature(line.selections) === signature(selections)
        );
        if (match) {
          return current.map((line) =>
            line.lineId === match.lineId
              ? { ...line, qty: Math.min(40, line.qty + pending.qty) }
              : line
          );
        }
        return [
          ...current,
          {
            lineId: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            itemId: pending.itemId,
            selections,
            qty: pending.qty,
          },
        ];
      });

      showToast(`${item.name} added to your box`);
    },
    [showToast]
  );

  const quickAdd = useCallback(
    (itemId: string) => {
      addLine({ itemId, selections: [], qty: 1 });
    },
    [addLine]
  );

  const addGiftBox = useCallback(
    (box: GiftBox, qty: number) => {
      addLine({ itemId: box.id, selections: [], qty });
    },
    [addLine]
  );

  const cartCount = useMemo(() => orderCount(lines), [lines]);
  const cartTotal = useMemo(() => orderTotal(lines), [lines]);
  const instagramHandle = settings.instagram.replace(/^@/, "") || "veloura";

  return (
    <div className="min-h-screen bg-ivory">
      <Header
        page={page}
        onNavigate={navigate}
        cartCount={cartCount}
        onOpenCart={() => setDrawerOpen(true)}
      />

      {page === "menu" ? (
        <main>
          <Hero
            onExplore={() => navigate("menu", "menu")}
            onStudio={() => navigate("studio")}
          />
          <Marquee />
          <MenuSection
            onAdd={addLine}
            onGoGifting={() => navigate("menu", "gifting")}
            onGoStudio={() => navigate("studio")}
          />
          <Featured
            onExplore={() => navigate("menu", "menu")}
            onQuickAdd={quickAdd}
          />
          <Gifting
            onAddBox={addGiftBox}
            giftNote={giftNote}
            setGiftNote={setGiftNote}
          />
          <HowItWorks onMenu={() => navigate("menu", "menu")} />
          <Story onStudio={() => navigate("studio")} />
          <section className="paper border-t border-line bg-ivory">
            <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:py-20">
              <div className="relative overflow-hidden rounded-sm border border-line bg-cream/60 p-6 sm:p-10">
                <Checker className="absolute inset-x-0 top-0 h-3" />
                <div className="relative mt-3 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-xl">
                    <Eyebrow>For the grid</Eyebrow>
                    <h2 className="mt-4 font-display text-[32px] leading-[1.02] tracking-[-0.03em] sm:text-[42px]">
                      The menu, as a{" "}
                      <em className="font-normal italic text-cobalt">JPG.</em>
                    </h2>
                    <p className="mt-3 text-[13.5px] font-light leading-relaxed text-ink-soft">
                      Download a ready-to-post 4:5 menu, a 9:16 full menu for your
                      story, and a nut-collection feature — with your handle and
                      prices already set. Plus a caption, written for you.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("studio")}
                    className="group inline-flex shrink-0 items-center gap-2.5 self-start rounded-full bg-cobalt px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ivory transition hover:bg-cobalt-deep lg:self-center"
                  >
                    Open the Instagram kit
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main>
          <Studio
            settings={settings}
            onSaveSettings={setSettings}
            onBack={() => navigate("menu", "menu")}
          />
        </main>
      )}

      <Footer
        onNavigate={navigate}
        instagram={instagramHandle}
        whatsapp={settings.whatsapp}
      />

      <OrderDrawer
        open={drawerOpen}
        lines={lines}
        onClose={() => setDrawerOpen(false)}
        onQty={(lineId, qty) =>
          setLines((current) =>
            current.map((line) =>
              line.lineId === lineId ? { ...line, qty } : line
            )
          )
        }
        onRemove={(lineId) =>
          setLines((current) => current.filter((line) => line.lineId !== lineId))
        }
        onBrowse={() => {
          setDrawerOpen(false);
          navigate("menu", "menu");
        }}
        giftNote={giftNote}
        setGiftNote={setGiftNote}
        settings={settings}
        onSaveSettings={(next) => {
          setSettings(next);
          showToast("Handles saved — the menu is updated");
        }}
      />

      {cartCount > 0 && !drawerOpen && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-cobalt-deep/20 bg-cobalt-ink px-4 py-3 text-ivory shadow-[0_-10px_30px_rgba(8,44,88,0.25)] sm:hidden">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-ivory/25">
                <ShoppingBag className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-ivory px-1 font-mono text-[8px] text-cobalt-ink">
                  {cartCount}
                </span>
              </span>
              <div>
                <p className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-ivory/60">
                  Your box · {cartCount} pieces
                </p>
                <p className="font-display text-[18px] leading-tight">
                  {formatINR(cartTotal)}
                </p>
              </div>
            </div>
            <button
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-ivory px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-cobalt-deep"
            >
              View box
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div className="pointer-events-none fixed bottom-5 left-1/2 z-[70] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 sm:bottom-7">
          <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-cobalt-deep/15 bg-ivory px-4 py-3 shadow-[0_18px_40px_-16px_rgba(8,44,88,0.5)]">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cobalt text-ivory">
              <Check className="h-3.5 w-3.5" />
            </span>
            <p className="min-w-0 flex-1 truncate font-mono text-[9px] uppercase tracking-[0.1em] text-ink">
              {toast}
            </p>
            <button
              onClick={() => {
                setToast(null);
                setDrawerOpen(true);
              }}
              className="shrink-0 font-mono text-[8.5px] uppercase tracking-[0.12em] text-cobalt underline underline-offset-2"
            >
              View
            </button>
            <button
              onClick={() => setToast(null)}
              aria-label="Dismiss"
              className="shrink-0 text-ink-soft hover:text-ink"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
