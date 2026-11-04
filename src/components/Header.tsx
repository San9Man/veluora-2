import { useState } from "react";
import { ArrowUpRight, Menu, ShoppingBag, X } from "lucide-react";
import { Logo, Button } from "./ui";
import { cn } from "../utils/cn";

export type Page = "menu" | "studio";

type HeaderProps = {
  page: Page;
  onNavigate: (page: Page, hash?: string) => void;
  cartCount: number;
  onOpenCart: () => void;
};

const links: { label: string; page: Page; hash?: string }[] = [
  { label: "The Menu", page: "menu", hash: "menu" },
  { label: "Collections", page: "menu", hash: "collections" },
  { label: "Gifting", page: "menu", hash: "gifting" },
  { label: "Our Story", page: "menu", hash: "story" },
  { label: "Instagram Kit", page: "studio" },
];

export function Header({ page, onNavigate, cartCount, onOpenCart }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const go = (target: Page, hash?: string) => {
    setOpen(false);
    onNavigate(target, hash);
  };

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-cobalt-ink text-ivory">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-2 sm:px-8">
          <p className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-ivory/75 sm:text-[9px]">
            Small batch · Made to order · Hand-wrapped
          </p>
          <button
            onClick={() => go("studio")}
            className="group hidden items-center gap-2 font-mono text-[8.5px] uppercase tracking-[0.24em] text-ivory/75 transition hover:text-ivory sm:flex sm:text-[9px]"
          >
            Menu available as a JPG
            <ArrowUpRight className="h-3 w-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
          <p className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-ivory/75 sm:hidden">
            DM to order
          </p>
        </div>
      </div>

      <div className="border-b border-line/70 bg-ivory/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-3.5 sm:px-8 lg:py-4">
          <button
            onClick={() => go("menu")}
            aria-label="Veloura home"
            className="shrink-0 text-left"
          >
            <Logo size="sm" />
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => go(link.page, link.hash)}
                className={cn(
                  "relative py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors",
                  page === link.page
                    ? "text-ink"
                    : "text-ink-soft hover:text-cobalt"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-cobalt transition-transform duration-300",
                    page === link.page ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenCart}
              aria-label={`Open chocolate box, ${cartCount} items`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition hover:border-cobalt hover:text-cobalt"
            >
              <ShoppingBag className="h-[17px] w-[17px]" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-cobalt px-1 font-mono text-[9px] text-ivory">
                  {cartCount}
                </span>
              )}
            </button>
            <Button
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => go("menu", "menu")}
            >
              Explore the menu
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
            <button
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-line/70 bg-ivory px-5 pb-6 pt-3 lg:hidden">
            <nav className="flex flex-col">
              {links.map((link, index) => (
                <button
                  key={link.label}
                  onClick={() => go(link.page, link.hash)}
                  className="flex items-center justify-between border-b border-line/60 py-3.5 text-left font-display text-[21px] text-ink"
                >
                  {link.label}
                  <span className="font-mono text-[9px] tracking-[0.2em] text-ink-soft">
                    0{index + 1}
                  </span>
                </button>
              ))}
            </nav>
            <Button className="mt-5 w-full" onClick={() => go("menu", "menu")}>
              Build your box
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
