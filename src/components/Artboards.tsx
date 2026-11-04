import {
  collections,
  formatINR,
  giftBoxes,
  menuItems,
  type MenuItem,
} from "../data/menu";

export type ArtboardId = "feed" | "story" | "nut";

export const artboardMeta: {
  id: ArtboardId;
  title: string;
  format: string;
  width: number;
  height: number;
  description: string;
}[] = [
  {
    id: "feed",
    title: "The menu",
    format: "Instagram post · 4:5",
    width: 1080,
    height: 1350,
    description: "The full collection index with house prices. Post as your menu cover.",
  },
  {
    id: "story",
    title: "The full menu",
    format: "Instagram story · 9:16",
    width: 1080,
    height: 1920,
    description: "Every item, every price. Perfect for the menu highlight or a swipe-up.",
  },
  {
    id: "nut",
    title: "Nut collection",
    format: "Instagram post · 4:5",
    width: 1080,
    height: 1350,
    description: "A product feature for the four nut hearts — your most-gifted collection.",
  },
];

const fromPrice = (collectionId: string) => {
  const prices = menuItems
    .filter((item) => item.collectionId === collectionId)
    .map((item) => item.price);
  return prices.length ? Math.min(...prices) : 0;
};

function Wordmark({
  tone = "ink",
  size = 58,
  subtitle = true,
}: {
  tone?: "ink" | "ivory";
  size?: number;
  subtitle?: boolean;
}) {
  return (
    <div className={tone === "ivory" ? "text-ivory" : "text-ink"}>
      <p
        className="wordmark leading-none"
        style={{ fontSize: size, letterSpacing: "-0.04em" }}
      >
        Veloura
        <span
          className="relative ml-[0.08em] inline-block rotate-45 bg-current opacity-90"
          style={{
            width: size * 0.13,
            height: size * 0.13,
            top: -size * 0.45,
          }}
        />
      </p>
      {subtitle && (
        <p
          className="font-mono uppercase"
          style={{ fontSize: size * 0.145, letterSpacing: "0.32em", marginTop: size * 0.2 }}
        >
          Handcrafted premium chocolates
        </p>
      )}
    </div>
  );
}

function CheckerBar({ light = false }: { light?: boolean }) {
  return <div className={light ? "checker-light h-[24px]" : "checker h-[24px]"} />;
}

function CollectionIndex() {
  return (
    <div className="grid grid-cols-2 gap-x-[46px]">
      {collections.map((collection) => (
        <div
          key={collection.id}
          className="flex items-start justify-between gap-3 border-b border-line py-[13px]"
        >
          <div className="flex min-w-0 gap-[10px]">
            <span className="font-mono text-[15px] leading-[1.5] text-cobalt/60">
              {collection.index}
            </span>
            <div>
              <p className="font-display text-[26px] leading-[1.05] tracking-[-0.02em]">
                {collection.shortName}
              </p>
              <p className="mt-[3px] font-mono text-[12px] uppercase tracking-[0.1em] text-ink-soft">
                {collection.id === "gifting"
                  ? giftBoxes.length + " keepsake boxes"
                  : menuItems.filter((item) => item.collectionId === collection.id).length +
                    " creations"}
              </p>
            </div>
          </div>
          <p className="shrink-0 font-mono text-[15px] leading-[1.6] text-cobalt">
            {collection.id === "gifting"
              ? `from ${formatINR(Math.min(...giftBoxes.map((box) => box.price)))}`
              : `from ${formatINR(fromPrice(collection.id))}`}
          </p>
        </div>
      ))}
    </div>
  );
}

function FeedArtboard({ instagram }: { instagram: string }) {
  return (
    <div
      className="relative flex flex-col overflow-hidden bg-ivory text-ink"
      style={{ width: 1080, height: 1350 }}
    >
      <CheckerBar />
      <div className="flex flex-1 flex-col px-[54px] pb-[30px] pt-[38px]">
        <div className="flex items-start justify-between">
          <Wordmark size={62} />
          <div className="text-right font-mono uppercase" style={{ fontSize: 13, letterSpacing: "0.2em" }}>
            <p className="text-cobalt">Menu · No. 01</p>
            <p className="mt-[7px] text-ink-soft">Season 2026</p>
            <p className="mt-[7px] text-ink-soft">Prices in INR</p>
          </div>
        </div>

        <div className="mt-[26px] h-px w-full bg-line" />

        <div className="mt-[22px]">
          <div className="flex items-end justify-between gap-6">
            <h1 className="whitespace-nowrap font-display text-[80px] leading-[1.02] tracking-[-0.04em]">
              The Menu
            </h1>
            <p className="mb-[8px] max-w-[320px] text-right font-sans text-[18px] font-light leading-[1.45] text-ink-soft">
              Hand-poured, hand-topped and wrapped in our cobalt box.
            </p>
          </div>
          <p className="mt-[8px] font-mono text-[12px] uppercase tracking-[0.16em] text-cobalt">
            Dark · Milk · White — choose your chocolate
          </p>
        </div>

        <div className="mt-[24px] grid grid-cols-2 gap-[14px]">
          <div className="relative overflow-hidden border border-line">
            <img
              src="/images/nut-collection.jpg"
              alt=""
              className="h-[176px] w-full object-cover"
            />
            <span className="absolute bottom-[10px] left-[10px] bg-ivory/95 px-[10px] py-[6px] font-mono text-[11px] uppercase tracking-[0.14em] text-cobalt">
              The Nut Collection
            </span>
          </div>
          <div className="relative overflow-hidden border border-line">
            <img
              src="/images/bar-trio.jpg"
              alt=""
              className="h-[176px] w-full object-cover"
            />
            <span className="absolute bottom-[10px] left-[10px] bg-ivory/95 px-[10px] py-[6px] font-mono text-[11px] uppercase tracking-[0.14em] text-cobalt">
              The Bar Collection
            </span>
          </div>
        </div>

        <div className="mt-[22px] flex items-center justify-between">
          <p className="font-mono text-[13px] uppercase tracking-[0.24em] text-cobalt">
            Eight collections
          </p>
          <p className="font-mono text-[13px] uppercase tracking-[0.12em] text-ink-soft">
            Customisations welcome
          </p>
        </div>

        <div className="mt-[4px]">
          <CollectionIndex />
        </div>

        <div className="mt-[26px] grid grid-cols-3 gap-[14px]">
          {[
            { id: "almond-crunch", label: "The one they ask for" },
            { id: "rose-petal-bar", label: "Our signature" },
            { id: "ring-bar", label: "For the secret" },
          ].map((entry) => {
            const item = menuItems.find((product) => product.id === entry.id);
            if (!item) return null;
            return (
              <div key={entry.id} className="flex items-center gap-[12px] border border-line bg-white/40 p-[9px]">
                <img src={item.image} alt="" className="h-[62px] w-[62px] shrink-0 object-cover" />
                <div className="min-w-0">
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-cobalt">
                    {entry.label}
                  </p>
                  <p className="mt-[2px] truncate font-display text-[19px] leading-tight">
                    {item.name}
                  </p>
                  <p className="font-mono text-[13px] text-ink-soft">
                    {formatINR(item.price)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-auto grid grid-cols-3 gap-[18px] border-t border-line pt-[26px]">
          {[
            ["Made to order", "Poured only once you ask."],
            ["Small batch", "Never mass-made, never stored."],
            ["Wrapped by hand", "Cobalt box, cream ribbon."],
          ].map(([title, body]) => (
            <div key={title}>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cobalt">
                {title}
              </p>
              <p className="mt-[5px] text-[14px] font-light leading-[1.45] text-ink-soft">
                {body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-[24px] flex items-end justify-between border-t border-line pt-[16px]">
          <div>
            <p className="font-mono text-[13px] uppercase tracking-[0.18em] text-ink-soft">
              Order via DM
            </p>
            <p className="mt-[4px] font-sans text-[26px] font-normal tracking-[0.02em] text-cobalt">
              @{instagram || "veloura"}
            </p>
          </div>
          <p className="text-right font-mono text-[11px] uppercase leading-[1.7] tracking-[0.16em] text-ink-soft">
            Made in small batches
            <br />
            Dispatch in 2–3 days
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between bg-cobalt px-[54px] py-[16px]">
        <p className="font-mono text-[13px] uppercase tracking-[0.22em] text-ivory">
          Handcrafted with love · Made to indulge
        </p>
        <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-ivory/65">
          {menuItems.length} creations
        </p>
      </div>
    </div>
  );
}

function groupByCollection(items: MenuItem[]) {
  return collections
    .filter((collection) => collection.id !== "gifting")
    .map((collection) => ({
      collection,
      items: items.filter((item) => item.collectionId === collection.id),
    }));
}

function StoryArtboard({ instagram }: { instagram: string }) {
  const groups = groupByCollection(menuItems);
  const columns = [groups.slice(0, 3), groups.slice(3)];

  return (
    <div
      className="relative flex flex-col overflow-hidden bg-ivory text-ink"
      style={{ width: 1080, height: 1920 }}
    >
      <div className="relative bg-cobalt-deep px-[56px] pb-[54px] pt-[30px] text-ivory">
        <div className="flex items-start justify-between">
          <Wordmark size={56} tone="ivory" />
          <p className="font-mono text-[12px] uppercase leading-[1.8] tracking-[0.2em] text-ivory/60">
            The full menu
            <br />
            {new Date().getFullYear()}
          </p>
        </div>
        <h1 className="mt-[26px] font-display text-[86px] leading-[1.02] tracking-[-0.04em]">
          Everything
          <br />
          <em className="italic text-sky">we make.</em>
        </h1>
        <p className="mt-[18px] max-w-[600px] text-[19px] font-light leading-[1.5] text-ivory/65">
          {menuItems.length} handcrafted creations across seven collections. Every
          item can be made in dark, milk or white unless noted.
        </p>
      </div>
      <CheckerBar />

      <div className="grid grid-cols-2 gap-x-[52px] px-[56px] pt-[26px]">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-[30px]">
            {column.map(({ collection, items }) => (
              <section key={collection.id}>
                <div className="flex items-baseline gap-[10px] border-b border-cobalt/30 pb-[7px]">
                  <span className="font-mono text-[13px] text-cobalt/60">
                    {collection.index}
                  </span>
                  <h2 className="font-display text-[30px] leading-none tracking-[-0.02em]">
                    {collection.shortName}
                  </h2>
                </div>
                <div className="mt-[9px] space-y-[9px]">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-baseline gap-[8px]">
                      <p className="shrink-0 text-[19px] font-light leading-[1.3] text-ink">
                        {item.name}
                      </p>
                      <span className="mb-[4px] flex-1 border-b border-dotted border-line" />
                      <p className="shrink-0 font-mono text-[16px] text-cobalt">
                        {formatINR(item.price)}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-[7px] font-mono text-[11px] uppercase leading-[1.5] tracking-[0.1em] text-ink-soft">
                  {collection.id === "personalised" || collection.id === "surprise"
                    ? "Add your message in the order note"
                    : collection.id === "signature"
                      ? "Dark · Milk · White · Choose two toppings"
                      : "Dark · Milk · White"}
                </p>
              </section>
            ))}
          </div>
        ))}
      </div>

      <div className="mx-[56px] mt-[24px] grid grid-cols-3 gap-[12px]">
        {[
          { id: "almond-crunch", tag: "The house favourite" },
          { id: "rose-petal-bar", tag: "The signature" },
          { id: "ring-bar", tag: "The surprise" },
        ].map((entry) => {
          const item = menuItems.find((product) => product.id === entry.id);
          if (!item) return null;
          return (
            <div key={entry.id} className="relative overflow-hidden border border-line">
              <img src={item.image} alt="" className="h-[150px] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cobalt-ink/85 to-transparent px-[12px] pb-[9px] pt-[24px]">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ivory/70">
                  {entry.tag}
                </p>
                <p className="font-display text-[19px] leading-tight text-ivory">
                  {item.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-[56px] mt-auto">
        <div className="mb-[10px] flex items-baseline justify-between">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-cobalt">
            The gift edit
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
            Hand-tied with a handwritten note
          </p>
        </div>
        <div className="grid grid-cols-3 border-t border-line">
          {giftBoxes.map((box) => (
            <div key={box.id} className="border-b border-line py-[12px] pr-[16px]">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                {box.count}
              </p>
              <p className="mt-[2px] font-display text-[22px] leading-tight">
                {box.name.replace("The ", "")}
              </p>
              <p className="mt-[2px] font-mono text-[15px] text-cobalt">
                {formatINR(box.price)}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between py-[13px]">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
            Gift boxes · Handwritten note included
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-cobalt">
            Prices in INR
          </p>
        </div>
      </div>

      <div className="bg-cobalt px-[56px] py-[22px]">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ivory/60">
              Made to order · DM to order
            </p>
            <p className="mt-[5px] font-sans text-[30px] font-light tracking-[0.02em] text-ivory">
              @{instagram || "veloura"}
            </p>
          </div>
          <div className="text-right font-mono text-[11px] uppercase leading-[1.8] tracking-[0.14em] text-ivory/70">
            Save this menu
            <br />
            or send it to a chocolate person
          </div>
        </div>
      </div>
    </div>
  );
}

const nutItems = ["almond-crunch", "pistachio-crunch", "cashew-crunch", "nut-medley"]
  .map((id) => menuItems.find((item) => item.id === id))
  .filter((item): item is MenuItem => Boolean(item));

function NutArtboard({ instagram }: { instagram: string }) {
  return (
    <div
      className="relative flex flex-col overflow-hidden bg-ivory text-ink"
      style={{ width: 1080, height: 1350 }}
    >
      <CheckerBar />
      <div className="flex flex-1 flex-col px-[58px] pb-[30px] pt-[34px]">
        <div className="flex items-center justify-center">
          <Wordmark size={54} />
        </div>

        <div className="mt-[30px] text-center">
          <p className="font-mono text-[13px] uppercase tracking-[0.3em] text-cobalt">
            Collection No. 02
          </p>
          <h1 className="mt-[12px] font-display text-[72px] leading-[1.02] tracking-[-0.04em]">
            The Nut Collection
          </h1>
          <p className="mt-[12px] font-display text-[28px] italic text-cobalt">
            A little crunch, a little luxury.
          </p>
        </div>

        <div className="relative mt-[24px] overflow-hidden border border-line">
          <img
            src="/images/nut-collection.jpg"
            alt=""
            className="h-[286px] w-full object-cover"
          />
          <span className="absolute left-[14px] top-[14px] bg-ivory/95 px-[11px] py-[7px] font-mono text-[11px] uppercase tracking-[0.16em] text-cobalt">
            Hand-topped · Four hearts
          </span>
        </div>

        <div className="mt-[22px] grid grid-cols-2 gap-x-[42px]">
          {nutItems.map((item, index) => (
            <div key={item.id} className="border-b border-line py-[13px]">
              <div className="flex items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-[8px]">
                  <span className="font-mono text-[13px] text-cobalt/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-[27px] leading-none tracking-[-0.02em]">
                    {item.name}
                  </h2>
                </div>
                <p className="shrink-0 font-mono text-[17px] text-cobalt">
                  {formatINR(item.price)}
                </p>
              </div>
              <p className="mt-[5px] pl-[27px] text-[14px] font-light leading-[1.45] text-ink-soft">
                {item.description}
              </p>
              <p className="mt-[5px] pl-[27px] font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
                Options: Dark · Milk · White
              </p>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <div className="mt-[24px] grid grid-cols-3 gap-[14px]">
            {[
              ["01", "Choose", "Dark, milk or white for each heart."],
              ["02", "Gift it", "Hand-wrapped in our cobalt box."],
              ["03", "Send a note", "We'll write it out by hand."],
            ].map(([number, title, body]) => (
              <div key={number} className="border-t border-cobalt/25 pt-[12px]">
                <p className="font-mono text-[11px] text-cobalt/60">{number}</p>
                <p className="mt-[3px] font-display text-[21px] leading-tight">{title}</p>
                <p className="mt-[4px] text-[14px] font-light leading-[1.4] text-ink-soft">
                  {body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-[24px] flex items-end justify-between border-t border-line pt-[18px]">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-soft">
              Order via DM
            </p>
            <p className="mt-[4px] font-sans text-[26px] font-light tracking-[0.02em] text-cobalt">
              @{instagram || "veloura"}
            </p>
          </div>
          <p className="text-right font-mono text-[11px] uppercase leading-[1.7] tracking-[0.14em] text-ink-soft">
            Box of four {formatINR(240)}
            <br />
            Handcrafted with love
          </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between bg-cobalt px-[58px] py-[15px]">
        <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-ivory">
          Veloura · Handcrafted premium chocolates
        </p>
        <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-ivory/65">
          Made to indulge
        </p>
      </div>
    </div>
  );
}

export function Artboard({
  id,
  instagram,
}: {
  id: ArtboardId;
  instagram: string;
}) {
  if (id === "story") return <StoryArtboard instagram={instagram} />;
  if (id === "nut") return <NutArtboard instagram={instagram} />;
  return <FeedArtboard instagram={instagram} />;
}
