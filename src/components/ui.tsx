import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

type LogoProps = {
  tone?: "ink" | "ivory" | "cobalt";
  size?: "sm" | "md" | "lg" | "xl";
  subtitle?: boolean;
  className?: string;
};

const wordSizes: Record<NonNullable<LogoProps["size"]>, string> = {
  sm: "text-[26px] leading-[0.9]",
  md: "text-[34px] leading-[0.9]",
  lg: "text-[52px] leading-[0.88]",
  xl: "text-[74px] leading-[0.86] sm:text-[96px]",
};

const subSizes: Record<NonNullable<LogoProps["size"]>, string> = {
  sm: "text-[6.5px] tracking-[0.3em]",
  md: "text-[7.5px] tracking-[0.3em]",
  lg: "text-[9px] tracking-[0.28em]",
  xl: "text-[10px] tracking-[0.34em] sm:text-[12px]",
};

export function Logo({
  tone = "ink",
  size = "md",
  subtitle = true,
  className,
}: LogoProps) {
  const toneClass =
    tone === "ivory" ? "text-ivory" : tone === "cobalt" ? "text-cobalt" : "text-ink";
  return (
    <span className={cn("inline-flex flex-col items-start", toneClass, className)}>
      <span className={cn("wordmark whitespace-nowrap", wordSizes[size])}>
        Veloura
        <span className="relative -top-[0.52em] ml-[0.08em] inline-block h-[0.16em] w-[0.16em] rotate-45 bg-current opacity-90" />
      </span>
      {subtitle && (
        <span
          className={cn(
            "mt-[0.6em] font-mono font-light uppercase",
            subSizes[size]
          )}
        >
          Handcrafted premium chocolates
        </span>
      )}
    </span>
  );
}

export function Checker({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn(light ? "checker-light" : "checker", "w-full", className)}
    />
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost" | "ivory" | "dark";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "group/btn inline-flex items-center justify-center gap-2.5 rounded-full font-mono uppercase transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-45",
        size === "sm" && "px-4 py-2 text-[9.5px] tracking-[0.16em]",
        size === "md" && "px-5 py-3 text-[10.5px] tracking-[0.17em]",
        size === "lg" && "px-7 py-4 text-[11px] tracking-[0.18em]",
        variant === "primary" &&
          "bg-cobalt text-ivory shadow-[0_10px_30px_-14px_rgba(20,80,155,0.8)] hover:bg-cobalt-deep",
        variant === "outline" &&
          "border border-ink/20 bg-transparent text-ink hover:border-cobalt hover:text-cobalt",
        variant === "ghost" && "text-ink hover:text-cobalt",
        variant === "ivory" &&
          "bg-ivory text-cobalt-deep hover:bg-sky",
        variant === "dark" &&
          "bg-cobalt-deep text-ivory hover:bg-cobalt-ink",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Eyebrow({
  children,
  tone = "cobalt",
  className,
}: {
  children: ReactNode;
  tone?: "cobalt" | "ivory" | "ink-soft";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[9.5px] uppercase tracking-[0.28em] sm:text-[10px]",
        tone === "cobalt" && "text-cobalt",
        tone === "ivory" && "text-ivory/75",
        tone === "ink-soft" && "text-ink-soft",
        className
      )}
    >
      <span aria-hidden className="inline-block h-px w-6 bg-current opacity-60" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  italic,
  description,
  align = "left",
  tone = "ink",
  className,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  description?: string;
  align?: "left" | "center";
  tone?: "ink" | "ivory";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto flex flex-col items-center text-center",
        className
      )}
    >
      <Eyebrow tone={tone === "ivory" ? "ivory" : "cobalt"}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "mt-5 font-display text-[34px] leading-[1.02] tracking-[-0.025em] text-balance sm:text-[46px] lg:text-[54px]",
          tone === "ivory" ? "text-ivory" : "text-ink"
        )}
      >
        {title}{" "}
        {italic && (
          <em className={cn("font-normal italic", tone === "ivory" ? "text-sky-deep" : "text-cobalt")}>
            {italic}
          </em>
        )}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-xl text-[14.5px] font-light leading-relaxed sm:text-[15.5px]",
            tone === "ivory" ? "text-ivory/70" : "text-ink-soft"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function Rule({ className }: { className?: string }) {
  return <div aria-hidden className={cn("hairline", className)} />;
}
