import { useEffect, useMemo, useRef, useState } from "react";
import { toJpeg } from "html-to-image";
import {
  ArrowLeft,
  ArrowRight,
  AtSign,
  Check,
  Copy,
  Download,
  Image as ImageIcon,
  Loader2,
  Phone,
  Send,
  Sparkles,
  Smartphone,
} from "lucide-react";
import { artboardMeta, Artboard, type ArtboardId } from "./Artboards";
import { Button, Checker, Eyebrow } from "./ui";
import { References } from "./References";
import { menuItems } from "../data/menu";
import type { OrderSettings } from "./OrderDrawer";
import { cn } from "../utils/cn";

const FILENAME: Record<ArtboardId, string> = {
  feed: "veloura-the-menu-4x5.jpg",
  story: "veloura-full-menu-9x16.jpg",
  nut: "veloura-nut-collection-4x5.jpg",
};

function waitForImages(node: HTMLElement) {
  const images = Array.from(node.querySelectorAll("img"));
  return Promise.all(
    images.map(
      (image) =>
        new Promise<void>((resolve) => {
          if (image.complete && image.naturalWidth > 0) {
            resolve();
            return;
          }
          image.onload = () => resolve();
          image.onerror = () => resolve();
        })
    )
  );
}

export function Studio({
  settings,
  onSaveSettings,
  onBack,
}: {
  settings: OrderSettings;
  onSaveSettings: (next: OrderSettings) => void;
  onBack: () => void;
}) {
  const [activeId, setActiveId] = useState<ArtboardId>("feed");
  const [busy, setBusy] = useState<ArtboardId | "all" | null>(null);
  const [downloaded, setDownloaded] = useState<ArtboardId[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [draft, setDraft] = useState(settings);
  const [saved, setSaved] = useState(false);

  const refs = useRef<Record<ArtboardId, HTMLDivElement | null>>({
    feed: null,
    story: null,
    nut: null,
  });
  const previewWrapper = useRef<HTMLDivElement | null>(null);
  const [previewWidth, setPreviewWidth] = useState(420);

  const activeMeta = artboardMeta.find((entry) => entry.id === activeId)!;
  const handle = settings.instagram.replace(/^@/, "").trim() || "veloura";

  useEffect(() => {
    const element = previewWrapper.current;
    if (!element) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 420;
      setPreviewWidth(width);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const scale = Math.min(1, previewWidth / activeMeta.width);

  const caption = useMemo(
    () =>
      [
        "A little sweetness, made by hand.",
        "",
        "The Veloura menu is live — ${count} handcrafted creations across seven small collections. Hearts topped with whole nuts, signature bars with rose petals, bars for your words, and a few secrets we can't list here.",
        "",
        "Everything is made to order in small batches. Dark, milk or white — you choose. Gift boxes arrive hand-wrapped with a note in our own handwriting.",
        "",
        "Explore the interactive menu or send your order to our DMs.",
        "",
        `Order: @${handle}`,
        "Prices in INR · Dispatch in 2–3 days · Customisations welcome",
        "",
        "#Veloura #HandcraftedChocolate #PremiumChocolate #ArtisanChocolate #ChocolateGift #ChocolateLover #SmallBatchChocolate #GiftingIdeas #MadeInIndia #ChocolateMenu",
      ]
        .join("\n")
        .replace("${count}", String(menuItems.length)),
    [handle]
  );

  const download = async (id: ArtboardId) => {
    const node = refs.current[id];
    if (!node) return;
    setError(null);
    setBusy(id);
    const meta = artboardMeta.find((entry) => entry.id === id)!;
    try {
      if (document.fonts?.ready) await document.fonts.ready;
      await waitForImages(node);
      const dataUrl = await toJpeg(node, {
        quality: 0.96,
        pixelRatio: 1,
        width: meta.width,
        height: meta.height,
        backgroundColor: "#fbf8f1",
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = FILENAME[id];
      link.href = dataUrl;
      link.rel = "noopener";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setDownloaded((current) =>
        current.includes(id) ? current : [...current, id]
      );
    } catch (downloadError) {
      console.error(downloadError);
      setError(
        "The JPG didn't render. Try again, or take a screenshot of the preview while we sort it."
      );
    } finally {
      setBusy(null);
    }
  };

  const downloadAll = async () => {
    setBusy("all");
    for (const meta of artboardMeta) {
      // Sequential keeps mobile Safari happy with multiple downloads.
      const node = refs.current[meta.id];
      if (!node) continue;
      try {
        if (document.fonts?.ready) await document.fonts.ready;
        await waitForImages(node);
        const dataUrl = await toJpeg(node, {
          quality: 0.96,
          pixelRatio: 1,
          width: meta.width,
          height: meta.height,
          backgroundColor: "#fbf8f1",
          cacheBust: true,
        });
        const link = document.createElement("a");
        link.download = FILENAME[meta.id];
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setDownloaded((current) =>
          current.includes(meta.id) ? current : [...current, meta.id]
        );
        await new Promise((resolve) => window.setTimeout(resolve, 500));
      } catch (downloadError) {
        console.error(downloadError);
        setError("One of the files didn't render. Try downloading it on its own.");
      }
    }
    setBusy(null);
  };

  const copyCaption = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setError("Copy didn't work in this browser. Select the caption and copy manually.");
    }
  };

  return (
    <>
      <div className="border-b border-line bg-cream/40">
        <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:py-14">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft transition hover:text-cobalt"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
            Back to the menu
          </button>

          <div className="mt-7 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Eyebrow>Brand studio — the Instagram kit</Eyebrow>
              <h1 className="mt-5 font-display text-[42px] leading-[0.96] tracking-[-0.035em] text-balance sm:text-[58px] lg:text-[68px]">
                Your menu,
                <br />
                <em className="font-normal italic text-cobalt">ready to post.</em>
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-2">
              <p className="max-w-sm text-[13.5px] font-light leading-relaxed text-ink-soft">
                Download the Veloura menu as high-resolution JPGs — sized for your
                grid and your stories. Every card is built from the same live menu
                as this site, so prices never drift.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["JPG · 1080px", "Feed + story", "Print friendly"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-cobalt/20 bg-ivory px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-cobalt"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-ivory">
        <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="grid grid-cols-3 gap-2">
                {artboardMeta.map((meta) => (
                  <button
                    key={meta.id}
                    onClick={() => setActiveId(meta.id)}
                    aria-pressed={meta.id === activeId}
                    className={cn(
                      "rounded-sm border p-3 text-left transition",
                      meta.id === activeId
                        ? "border-cobalt bg-sky/40"
                        : "border-line bg-[#fefcf8] hover:border-cobalt/40"
                    )}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-cobalt">
                        {meta.width} × {meta.height}
                      </span>
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          meta.id === activeId ? "bg-cobalt" : "bg-line"
                        )}
                      />
                    </span>
                    <span className="mt-1.5 block font-display text-[17px] leading-tight text-ink sm:text-[19px]">
                      {meta.title}
                    </span>
                    <span className="mt-1 hidden font-mono text-[7px] uppercase tracking-[0.1em] text-ink-soft sm:block">
                      {meta.format}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-5 rounded-sm border border-line bg-cream/70 p-3 sm:p-5">
                <div className="mb-3 flex items-center justify-between px-0.5">
                  <p className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-ink-soft">
                    <ImageIcon className="h-3.5 w-3.5 text-cobalt" />
                    Live preview · {activeMeta.format}
                  </p>
                  <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-cobalt">
                    <span className="h-1.5 w-1.5 rounded-full bg-cobalt" />
                    Full resolution
                  </span>
                </div>

                <div
                  ref={previewWrapper}
                  className="mx-auto overflow-hidden bg-white shadow-[0_24px_60px_-30px_rgba(8,44,88,0.5)]"
                  style={{
                    width: "100%",
                    maxWidth: 620,
                    height: activeMeta.height * scale,
                  }}
                >
                  <div
                    style={{
                      width: activeMeta.width,
                      height: activeMeta.height,
                      transform: `scale(${scale})`,
                      transformOrigin: "top left",
                    }}
                  >
                    <Artboard id={activeId} instagram={handle} />
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="px-0.5 text-[11.5px] font-light leading-relaxed text-ink-soft">
                    {activeMeta.description}
                  </p>
                  <span className="shrink-0 rounded-full border border-line bg-ivory px-3 py-1.5 font-mono text-[7.5px] uppercase tracking-[0.12em] text-ink-soft">
                    {activeMeta.width} × {activeMeta.height} px
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={() => void download(activeId)}
                  disabled={busy !== null}
                >
                  {busy === activeId ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  {busy === activeId
                    ? "Preparing your JPG"
                    : `Download ${activeMeta.title} JPG`}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => void downloadAll()}
                  disabled={busy !== null}
                >
                  {busy === "all" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  {busy === "all" ? "Preparing 3 files" : "Download all three"}
                </Button>
              </div>

              {error && (
                <p className="mt-3 rounded-sm border border-red-200 bg-red-50 px-3 py-2.5 text-[11.5px] text-red-800">
                  {error}
                </p>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 px-0.5">
                <p className="flex items-center gap-1.5 font-mono text-[7.5px] uppercase tracking-[0.1em] text-ink-soft">
                  <Smartphone className="h-3 w-3" />
                  Saved to your downloads
                </p>
                <p className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-ink-soft">
                  JPGs include the @{handle} handle
                </p>
                {downloaded.length > 0 && (
                  <p className="flex items-center gap-1 font-mono text-[7.5px] uppercase tracking-[0.1em] text-cobalt">
                    <Check className="h-3 w-3" />
                    {downloaded.length} of 3 exported
                  </p>
                )}
              </div>
            </div>

            <aside className="space-y-4 lg:col-span-5 xl:col-span-4">
              <div className="rounded-sm border border-line bg-[#fefcf8] p-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-cobalt" />
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink">
                    Ready to post
                  </p>
                </div>
                <ol className="mt-4 space-y-3.5">
                  {[
                    {
                      title: "Drop the 4:5 menu on your grid",
                      body: "It's the whole collection at a glance, with prices and your handle.",
                    },
                    {
                      title: "Share the 9:16 menu to your story",
                      body: "Save it to a “Menu” highlight so new visitors can always find it.",
                    },
                    {
                      title: "Link this interactive menu in your bio",
                      body: "Let people customise, build a box and send the order straight to your DMs.",
                    },
                  ].map((step, index) => (
                    <li key={step.title} className="flex gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-cobalt/25 font-mono text-[8px] text-cobalt">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-[12.5px] font-medium text-ink">{step.title}</p>
                        <p className="mt-0.5 text-[11.5px] font-light leading-relaxed text-ink-soft">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 border-t border-line pt-3 font-mono text-[7.5px] uppercase leading-relaxed tracking-[0.1em] text-ink-soft">
                  Note: new-collection prices are pre-filled suggestions. Confirm
                  them before publishing.
                </p>
              </div>

              <div className="rounded-sm border border-line bg-cobalt-deep p-5 text-ivory">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em]">
                    Your handles
                  </p>
                  <AtSign className="h-4 w-4 text-sky/70" />
                </div>
                <div className="mt-3 space-y-2.5">
                  <label className="block font-mono text-[7.5px] uppercase tracking-[0.14em] text-ivory/60">
                    Instagram
                    <input
                      value={draft.instagram}
                      onChange={(event) =>
                        setDraft({ ...draft, instagram: event.target.value })
                      }
                      placeholder="veloura"
                      className="mt-1 w-full rounded-sm border border-ivory/20 bg-ivory/10 px-3 py-2.5 font-sans text-[12.5px] normal-case tracking-normal text-ivory placeholder:text-ivory/35 focus:border-ivory/60 focus:outline-none"
                    />
                  </label>
                  <label className="block font-mono text-[7.5px] uppercase tracking-[0.14em] text-ivory/60">
                    WhatsApp number
                    <input
                      value={draft.whatsapp}
                      onChange={(event) =>
                        setDraft({ ...draft, whatsapp: event.target.value })
                      }
                      placeholder="919876543210"
                      inputMode="tel"
                      className="mt-1 w-full rounded-sm border border-ivory/20 bg-ivory/10 px-3 py-2.5 font-sans text-[12.5px] normal-case tracking-normal text-ivory placeholder:text-ivory/35 focus:border-ivory/60 focus:outline-none"
                    />
                  </label>
                </div>
                <button
                  onClick={() => {
                    onSaveSettings(draft);
                    setSaved(true);
                    window.setTimeout(() => setSaved(false), 2000);
                  }}
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-ivory px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-cobalt-deep transition hover:bg-sky"
                >
                  {saved ? <Check className="h-3.5 w-3.5" /> : <Phone className="h-3.5 w-3.5" />}
                  {saved ? "Saved" : "Save & update the menu"}
                </button>
                <p className="mt-2.5 font-mono text-[7px] uppercase leading-relaxed tracking-[0.1em] text-ivory/45">
                  These appear on the JPGs, order buttons and footer.
                </p>
              </div>

              <div className="rounded-sm border border-line bg-[#fefcf8] p-5">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink">
                    Caption, written for you
                  </p>
                  <button
                    onClick={() => void copyCaption()}
                    className="inline-flex items-center gap-1.5 rounded-full border border-cobalt px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-cobalt transition hover:bg-cobalt hover:text-ivory"
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <div className="no-scrollbar mt-3 max-h-[220px] overflow-y-auto rounded-sm bg-cream/50 p-3">
                  <p className="whitespace-pre-line text-[11.5px] font-light leading-relaxed text-ink-soft">
                    {caption}
                  </p>
                </div>
              </div>

              <div className="rounded-sm border border-cobalt/20 bg-sky/40 p-4">
                <p className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-cobalt">
                  <Send className="h-3.5 w-3.5" />
                  Need another size?
                </p>
                <p className="mt-2 text-[11.5px] font-light leading-relaxed text-ink-soft">
                  Tell me the placement — grid, story, WhatsApp catalogue or A4
                  print — and I'll add the artboard. The same menu can become a
                  carousel of one collection per slide.
                </p>
                <button
                  onClick={onBack}
                  className="mt-3 inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-cobalt"
                >
                  Back to the menu
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <References />

      <section className="border-t border-line bg-ivory">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8">
          <div className="relative overflow-hidden rounded-sm bg-cobalt p-6 text-ivory sm:p-10">
            <Checker light className="absolute inset-x-0 top-0 h-3 opacity-60" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-ivory/65">
                  The in-store version
                </p>
                <h2 className="mt-3 font-display text-[32px] leading-[1] sm:text-[42px]">
                  Scan. Swipe. <em className="italic text-sky">Savour.</em>
                </h2>
                <p className="mt-3 max-w-md text-[13px] font-light leading-relaxed text-ivory/70">
                  Print this interactive menu behind a QR code for packaging,
                  market stalls and gift-box inserts. Prices and stock stay
                  current without a reprint.
                </p>
              </div>
              <Button variant="ivory" size="lg" onClick={onBack}>
                Preview the live menu
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div
        aria-hidden
        style={{
          position: "fixed",
          left: -20000,
          top: 0,
          width: 1080,
          pointerEvents: "none",
          opacity: 1,
          zIndex: -1,
        }}
      >
        {artboardMeta.map((meta) => (
          <div
            key={meta.id}
            ref={(node) => {
              refs.current[meta.id] = node;
            }}
            style={{ width: meta.width, height: meta.height }}
          >
            <Artboard id={meta.id} instagram={handle} />
          </div>
        ))}
      </div>
    </>
  );
}
