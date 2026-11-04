import { useEffect, useRef, useState } from "react";
import {
  AtSign,
  ExternalLink,
  ImagePlus,
  Link2,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { Checker, Eyebrow } from "./ui";

type Reference = { id: string; src: string; name: string };
type IgReference = { id: string; handle: string; note: string };

const IMAGE_KEY = "veloura.references.v1";
const IG_KEY = "veloura.instagramRefs.v1";

const starterHandles: IgReference[] = [
  {
    id: "ig-aysse",
    handle: "aysse.sw",
    note: "Cobalt packaging, pressed chocolate bar box, editorial gifting mood.",
  },
];

function safeRead<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read image"));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Could not load image"));
      image.onload = () => {
        const max = 1400;
        const ratio = Math.min(1, max / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * ratio);
        canvas.height = Math.round(image.height * ratio);
        const context = canvas.getContext("2d");
        if (!context) {
          resolve(String(reader.result));
          return;
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

const notes = [
  "The cobalt + ivory palette, the high-contrast wordmark and the airy four-by-five menu layout.",
  "The letter-spaced monospace labels and small numbered collection system (01, 02, 03).",
  "The voice: warm, quiet and confident — “a little crunch, a little luxury.”",
];

export function References() {
  const [references, setReferences] = useState<Reference[]>(() =>
    safeRead<Reference[]>(IMAGE_KEY, [])
  );
  const [handles, setHandles] = useState<IgReference[]>(() =>
    safeRead<IgReference[]>(IG_KEY, starterHandles)
  );
  const [dragging, setDragging] = useState(false);
  const [handleInput, setHandleInput] = useState("");
  const [noteInput, setNoteInput] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(IMAGE_KEY, JSON.stringify(references));
    } catch {
      setMessage("Saved for this visit. Your browser storage is full, so clear a reference or two.");
    }
  }, [references]);

  useEffect(() => {
    try {
      localStorage.setItem(IG_KEY, JSON.stringify(handles));
    } catch {
      /* keep in memory only */
    }
  }, [handles]);

  const addFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const incoming = Array.from(files).filter((file) => file.type.startsWith("image/"));
    if (incoming.length === 0) {
      setMessage("Those files aren't images. Try JPG, PNG or WEBP.");
      return;
    }
    const room = Math.max(0, 6 - references.length);
    const accepted = incoming.slice(0, room);
    const processed = await Promise.all(
      accepted.map(async (file, index) => ({
        id: `${Date.now()}-${index}-${file.name}`,
        src: await compressImage(file),
        name: file.name,
      }))
    );
    setReferences((current) => [...current, ...processed].slice(0, 6));
    setMessage(
      room < incoming.length
        ? "Board is limited to six references — remove one to add more."
        : "Added to your board. These stay in your browser; attach them in chat to send them to me."
    );
  };

  const addHandle = () => {
    const clean = handleInput.trim().replace(/^@/, "").replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace(/\/$/, "");
    if (!clean) return;
    if (handles.some((entry) => entry.handle.toLowerCase() === clean.toLowerCase())) {
      setMessage("That account is already on the board.");
      return;
    }
    setHandles((current) => [
      ...current,
      { id: `ig-${Date.now()}`, handle: clean, note: noteInput.trim() },
    ]);
    setHandleInput("");
    setNoteInput("");
    setMessage("Reference account saved.");
  };

  return (
    <section className="border-t border-line bg-cream/50">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Eyebrow>Brand studio — references</Eyebrow>
            <h2 className="mt-5 font-display text-[34px] leading-[1.02] tracking-[-0.03em] sm:text-[44px]">
              Your reference
              <br />
              <em className="font-normal italic text-cobalt">board.</em>
            </h2>
            <p className="mt-4 max-w-md text-[13.5px] font-light leading-relaxed text-ink-soft">
              Collect the images and Instagram accounts that feel like Veloura.
              Keep it here as your moodboard, and attach the same images in our
              chat whenever you want me to work from them.
            </p>

            <div className="mt-6 rounded-sm border border-line bg-ivory p-4">
              <p className="flex items-center gap-2 font-mono text-[8.5px] uppercase tracking-[0.18em] text-cobalt">
                <Upload className="h-3.5 w-3.5" />
                How to send me references
              </p>
              <ol className="mt-3 space-y-3">
                {[
                  "Attach them in this chat with the paperclip, by dragging them into the message box, or paste a link.",
                  "For Instagram, just paste the profile URL or @handle — public accounts are enough.",
                  "Say what you like in each one: packaging, palette, typography, layout or tone.",
                ].map((step, index) => (
                  <li key={step} className="flex gap-2.5 text-[12px] font-light leading-relaxed text-ink-soft">
                    <span className="font-mono text-[9px] text-cobalt">
                      0{index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="mt-3 border-t border-line pt-3 text-[11px] font-light leading-relaxed text-ink-soft">
                This board is a local moodboard for your own planning — files stay
                in this browser. To give me a reference to design from, attach it
                directly in the chat.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "Cobalt + ivory",
                "High-contrast serif",
                "Spaced mono labels",
                "4:5 editorial menu",
              ].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-cobalt/20 bg-ivory px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-cobalt"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => {
                event.preventDefault();
                setDragging(false);
                void addFiles(event.dataTransfer.files);
              }}
              className={`rounded-sm border border-dashed p-5 transition ${
                dragging
                  ? "border-cobalt bg-sky/60"
                  : "border-cobalt/30 bg-ivory/70"
              }`}
            >
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink">
                    Upload reference images
                  </p>
                  <p className="mt-1.5 text-[12px] font-light leading-relaxed text-ink-soft">
                    Drag images here, or choose files. Up to six, kept in your
                    browser.
                  </p>
                </div>
                <button
                  onClick={() => inputRef.current?.click()}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cobalt px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ivory transition hover:bg-cobalt-deep"
                >
                  <ImagePlus className="h-3.5 w-3.5" />
                  Choose images
                </button>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(event) => {
                    void addFiles(event.target.files);
                    event.target.value = "";
                  }}
                />
              </div>

              {references.length > 0 ? (
                <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {references.map((reference) => (
                    <figure
                      key={reference.id}
                      className="group relative overflow-hidden rounded-sm border border-line bg-cream"
                    >
                      <img
                        src={reference.src}
                        alt={reference.name}
                        className="h-28 w-full object-cover sm:h-32"
                      />
                      <button
                        onClick={() =>
                          setReferences((current) =>
                            current.filter((entry) => entry.id !== reference.id)
                          )
                        }
                        aria-label={`Remove ${reference.name}`}
                        className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-ivory/90 text-ink transition hover:bg-white hover:text-red-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <figcaption className="truncate px-2 py-1.5 font-mono text-[7px] uppercase tracking-[0.08em] text-ink-soft">
                        {reference.name}
                      </figcaption>
                    </figure>
                  ))}
                  <button
                    onClick={() => inputRef.current?.click()}
                    className="flex h-[130px] flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-cobalt/25 text-cobalt/70 transition hover:border-cobalt hover:text-cobalt sm:h-[154px]"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="font-mono text-[8px] uppercase tracking-[0.12em]">
                      Add another
                    </span>
                  </button>
                </div>
              ) : (
                <div className="mt-5 flex items-center gap-4 rounded-sm bg-cream/70 p-4">
                  <Checker className="hidden h-14 w-14 shrink-0 rounded-full opacity-60 sm:block" />
                  <p className="font-display text-[18px] italic text-ink-soft">
                    Nothing here yet. Start with packaging you love, a palette, or
                    a feed layout.
                  </p>
                </div>
              )}

              {message && (
                <p className="mt-3 flex items-start gap-2 rounded-sm bg-sky/70 px-3 py-2 font-mono text-[8px] uppercase leading-relaxed tracking-[0.1em] text-cobalt">
                  <Link2 className="mt-0.5 h-3 w-3 shrink-0" />
                  {message}
                </p>
              )}
            </div>

            <div className="mt-5 rounded-sm border border-line bg-ivory p-5">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink">
                  <AtSign className="h-3.5 w-3.5 text-cobalt" />
                  Instagram references
                </p>
                <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-ink-soft">
                  {handles.length} saved
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {handles.map((reference) => (
                  <div
                    key={reference.id}
                    className="flex items-start gap-3 rounded-sm border border-line/80 bg-[#fefcf8] p-3"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky text-cobalt">
                      <AtSign className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <a
                        href={`https://instagram.com/${reference.handle}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-display text-[18px] leading-tight text-ink hover:text-cobalt"
                      >
                        @{reference.handle}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      {reference.note && (
                        <p className="mt-1 text-[11.5px] font-light leading-relaxed text-ink-soft">
                          {reference.note}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() =>
                        setHandles((current) =>
                          current.filter((entry) => entry.id !== reference.id)
                        )
                      }
                      aria-label={`Remove @${reference.handle}`}
                      className="text-ink-soft/60 transition hover:text-red-700"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <input
                  value={handleInput}
                  onChange={(event) => setHandleInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") addHandle();
                  }}
                  placeholder="@handle or profile URL"
                  aria-label="Instagram handle or profile URL"
                  className="w-full rounded-sm border border-line bg-[#fefcf8] px-3 py-2.5 text-[12.5px] font-light text-ink placeholder:text-ink-soft/60 focus:border-cobalt focus:outline-none sm:w-[45%]"
                />
                <input
                  value={noteInput}
                  onChange={(event) => setNoteInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") addHandle();
                  }}
                  placeholder="What do you like about it?"
                  aria-label="What you like about this account"
                  className="w-full rounded-sm border border-line bg-[#fefcf8] px-3 py-2.5 text-[12.5px] font-light text-ink placeholder:text-ink-soft/60 focus:border-cobalt focus:outline-none"
                />
                <button
                  onClick={addHandle}
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-cobalt px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-cobalt transition hover:bg-cobalt hover:text-ivory"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add
                </button>
              </div>
            </div>

            <div className="mt-5 rounded-sm bg-cobalt-deep p-5 text-ivory">
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-ivory/60">
                From the references you've already shared
              </p>
              <ul className="mt-3 space-y-2">
                {notes.map((note) => (
                  <li key={note} className="flex gap-2.5 text-[12px] font-light leading-relaxed text-ivory/75">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rotate-45 bg-sky" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
