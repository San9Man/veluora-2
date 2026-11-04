import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
  AtSign,
  Minus,
  Plus,
  Settings2,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import {
  defaultSelections,
  findItem,
  formatINR,
  lineTotal,
  orderTotal,
  type OrderLine,
} from "../data/menu";
import { Button } from "./ui";
import { cn } from "../utils/cn";

export type OrderSettings = {
  instagram: string;
  whatsapp: string;
};

export function buildOrderText(
  lines: OrderLine[],
  name: string,
  giftNote: string
) {
  const rows = lines.map((line, index) => {
    const item = findItem(line.itemId);
    const selections = line.selections
      .map((selection) => selection.choice)
      .join(" · ");
    return `${index + 1}. ${line.qty} × ${item?.name ?? "Chocolate"}${
      selections ? ` — ${selections}` : ""
    } — ${formatINR(lineTotal(line))}`;
  });

  return [
    "New order — Veloura",
    "Handcrafted premium chocolates",
    "",
    ...rows,
    "",
    `Subtotal: ${formatINR(orderTotal(lines))}`,
    name.trim() ? `Name: ${name.trim()}` : "",
    giftNote.trim() ? `Gift note: "${giftNote.trim()}"` : "",
    "",
    "Sent from the Veloura menu",
  ]
    .filter((row) => row !== "")
    .join("\n");
}

export function OrderDrawer({
  open,
  lines,
  onClose,
  onQty,
  onRemove,
  onBrowse,
  giftNote,
  setGiftNote,
  settings,
  onSaveSettings,
}: {
  open: boolean;
  lines: OrderLine[];
  onClose: () => void;
  onQty: (lineId: string, qty: number) => void;
  onRemove: (lineId: string) => void;
  onBrowse: () => void;
  giftNote: string;
  setGiftNote: (note: string) => void;
  settings: OrderSettings;
  onSaveSettings: (next: OrderSettings) => void;
}) {
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [draft, setDraft] = useState(settings);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    setDraft(settings);
  }, [settings]);

  const total = useMemo(() => orderTotal(lines), [lines]);
  const orderText = useMemo(
    () => buildOrderText(lines, name, giftNote),
    [lines, name, giftNote]
  );

  if (!open) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const whatsappDigits = settings.whatsapp.replace(/[^\d]/g, "");
  const whatsappLink = `https://wa.me/${
    whatsappDigits ? whatsappDigits : ""
  }?text=${encodeURIComponent(orderText)}`;
  const instagramHandle = settings.instagram.replace(/^@/, "").trim();
  const instagramLink = instagramHandle
    ? `https://ig.me/m/${instagramHandle}`
    : "https://instagram.com";

  return (
    <div
      className="fixed inset-0 z-[60] flex justify-end bg-cobalt-ink/50 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Your chocolate box"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside className="drawer-enter flex h-full w-full max-w-[460px] flex-col bg-ivory shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-cobalt">
              Made to order
            </p>
            <h2 className="mt-1 font-display text-[26px] leading-none">
              Your chocolate box
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close your box"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition hover:border-cobalt hover:text-cobalt"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto px-5 py-5">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-line bg-cream">
                <ShoppingBag className="h-6 w-6 text-cobalt" strokeWidth={1.3} />
              </span>
              <p className="mt-5 font-display text-[28px]">An empty blue box.</p>
              <p className="mt-2 max-w-[270px] text-[13px] font-light leading-relaxed text-ink-soft">
                Fill it with hand-poured hearts, bars and little surprises. We'll
                wrap the rest.
              </p>
              <Button className="mt-6" onClick={onBrowse}>
                Browse the menu
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {lines.map((line) => {
                  const item = findItem(line.itemId);
                  if (!item) return null;
                  const selections =
                    line.selections.length > 0
                      ? line.selections
                      : defaultSelections(item);
                  return (
                    <div
                      key={line.lineId}
                      className="flex gap-3 rounded-sm border border-line bg-[#fefcf8] p-2.5"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-[74px] w-[66px] shrink-0 rounded-sm object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-cobalt">
                              {item.collection}
                            </p>
                            <p className="mt-0.5 font-display text-[18px] leading-tight">
                              {item.name}
                            </p>
                          </div>
                          <button
                            onClick={() => onRemove(line.lineId)}
                            aria-label={`Remove ${item.name}`}
                            className="shrink-0 text-ink-soft/60 transition hover:text-red-700"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="mt-1 font-mono text-[7.5px] uppercase leading-relaxed tracking-[0.08em] text-ink-soft">
                          {selections.map((selection) => selection.choice).join(" · ") ||
                            item.unit}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-line">
                            <button
                              onClick={() =>
                                onQty(line.lineId, Math.max(1, line.qty - 1))
                              }
                              aria-label="Decrease quantity"
                              className="flex h-6 w-6 items-center justify-center text-ink-soft hover:text-cobalt"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-5 text-center font-mono text-[10px]">
                              {line.qty}
                            </span>
                            <button
                              onClick={() =>
                                onQty(line.lineId, Math.min(40, line.qty + 1))
                              }
                              aria-label="Increase quantity"
                              className="flex h-6 w-6 items-center justify-center text-ink-soft hover:text-cobalt"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="font-mono text-[11px] text-ink">
                            {formatINR(lineTotal(line))}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 border-t border-line pt-4">
                <label
                  htmlFor="note"
                  className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-ink"
                >
                  Gift note or instructions
                  <span className="normal-case tracking-[0.05em] text-ink-soft">
                    {giftNote.length}/140
                  </span>
                </label>
                <textarea
                  id="note"
                  value={giftNote}
                  maxLength={140}
                  rows={2}
                  onChange={(event) => setGiftNote(event.target.value)}
                  placeholder="For her birthday. Please write: 'To my favourite person'."
                  className="mt-2 w-full resize-none rounded-sm border border-line bg-[#fefcf8] px-3 py-2.5 text-[12.5px] font-light text-ink placeholder:text-ink-soft/60 focus:border-cobalt focus:outline-none"
                />
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  aria-label="Your name"
                  className="mt-2 w-full rounded-sm border border-line bg-[#fefcf8] px-3 py-2.5 text-[12.5px] font-light text-ink placeholder:text-ink-soft/60 focus:border-cobalt focus:outline-none"
                />
              </div>

              <div className="mt-4 rounded-sm bg-sky/60 p-3.5">
                <p className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-cobalt">
                  <Check className="h-3.5 w-3.5" />
                  Complimentary handwritten note included
                </p>
                <p className="mt-1.5 font-mono text-[7.5px] uppercase leading-relaxed tracking-[0.1em] text-ink-soft">
                  We'll confirm availability and delivery on DM. Payment via UPI
                  once confirmed.
                </p>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setShowSettings((value) => !value)}
                  className="flex w-full items-center justify-between font-mono text-[8px] uppercase tracking-[0.16em] text-ink-soft transition hover:text-cobalt"
                >
                  <span className="flex items-center gap-2">
                    <Settings2 className="h-3.5 w-3.5" />
                    Where this order gets sent
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      showSettings && "rotate-180"
                    )}
                  />
                </button>
                {showSettings && (
                  <div className="mt-3 grid gap-2 rounded-sm border border-line bg-[#fefcf8] p-3">
                    <label className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-ink-soft">
                      Instagram handle
                      <input
                        value={draft.instagram}
                        onChange={(event) =>
                          setDraft({ ...draft, instagram: event.target.value })
                        }
                        placeholder="veloura"
                        className="mt-1 w-full rounded-sm border border-line bg-ivory px-2.5 py-2 font-sans text-[12px] normal-case tracking-normal text-ink focus:border-cobalt focus:outline-none"
                      />
                    </label>
                    <label className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-ink-soft">
                      WhatsApp number (with country code)
                      <input
                        value={draft.whatsapp}
                        onChange={(event) =>
                          setDraft({ ...draft, whatsapp: event.target.value })
                        }
                        placeholder="919876543210"
                        inputMode="tel"
                        className="mt-1 w-full rounded-sm border border-line bg-ivory px-2.5 py-2 font-sans text-[12px] normal-case tracking-normal text-ink focus:border-cobalt focus:outline-none"
                      />
                    </label>
                    <button
                      onClick={() => {
                        onSaveSettings(draft);
                        setShowSettings(false);
                      }}
                      className="mt-1 w-fit rounded-full bg-cobalt px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-ivory"
                    >
                      Save handles
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-line bg-[#fefcf8] px-5 py-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink-soft">
                  Subtotal · {lines.reduce((sum, line) => sum + line.qty, 0)} pieces
                </p>
                <p className="mt-0.5 font-display text-[30px] leading-none text-cobalt">
                  {formatINR(total)}
                </p>
              </div>
              <p className="text-right font-mono text-[7.5px] uppercase leading-relaxed tracking-[0.1em] text-ink-soft">
                Delivery confirmed
                <br />
                on DM
              </p>
            </div>

            <div className="mt-3.5 grid gap-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cobalt px-5 py-3 font-mono text-[10px] uppercase tracking-[0.17em] text-ivory transition hover:bg-cobalt-deep"
              >
                Send order on WhatsApp
                <ArrowRight className="h-4 w-4" />
              </a>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-3 py-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink transition hover:border-cobalt hover:text-cobalt"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy order"}
                </button>
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-3 py-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink transition hover:border-cobalt hover:text-cobalt"
                >
                  <AtSign className="h-3.5 w-3.5" />
                  Instagram DM
                </a>
              </div>
            </div>
            <p className="mt-2.5 text-center font-mono text-[7px] uppercase tracking-[0.12em] text-ink-soft">
              {instagramHandle ? `@${instagramHandle}` : "Add your handle above"} ·
              Prices in INR
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
