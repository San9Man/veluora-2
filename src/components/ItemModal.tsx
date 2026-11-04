import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Minus, Plus, X } from "lucide-react";
import {
  defaultSelections,
  formatINR,
  type MenuItem,
  type OrderLine,
} from "../data/menu";
import { Button } from "./ui";
import { cn } from "../utils/cn";

export type PendingLine = Omit<OrderLine, "lineId">;

type ItemModalProps = {
  item: MenuItem;
  onClose: () => void;
  onAdd: (line: PendingLine) => void;
};

export function ItemModal({ item, onClose, onAdd }: ItemModalProps) {
  const [selections, setSelections] = useState(() => defaultSelections(item));
  const [qty, setQty] = useState(1);

  useEffect(() => {
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
  }, [onClose]);

  const unitPrice = useMemo(() => {
    return selections.reduce((sum, selection) => {
      const group = item.groups?.find((entry) => entry.id === selection.groupId);
      const choice = group?.choices.find((entry) => entry.name === selection.choice);
      return sum + (choice?.delta ?? 0);
    }, item.price);
  }, [item, selections]);

  const toggleChoice = (
    groupId: string,
    choiceName: string,
    kind: "single" | "multi",
    max?: number
  ) => {
    setSelections((current) => {
      const inGroup = current.filter((entry) => entry.groupId === groupId);
      const exists = inGroup.some((entry) => entry.choice === choiceName);

      if (kind === "single") {
        return [
          ...current.filter((entry) => entry.groupId !== groupId),
          { groupId, choice: choiceName },
        ];
      }

      if (exists) {
        return current.filter(
          (entry) => !(entry.groupId === groupId && entry.choice === choiceName)
        );
      }

      if (max && inGroup.length >= max) return current;

      return [...current, { groupId, choice: choiceName }];
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-cobalt-ink/55 p-0 backdrop-blur-[3px] sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name} — customise your chocolate`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="item-modal-enter relative flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl bg-ivory shadow-2xl sm:max-h-[90vh] sm:rounded-sm md:grid md:grid-cols-2">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 text-ink shadow-sm backdrop-blur transition hover:bg-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative h-56 shrink-0 overflow-hidden bg-cream sm:h-72 md:h-full">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cobalt-ink/45 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-ivory/10" />
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className="rounded-full bg-ivory/95 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-cobalt">
              {item.collection}
            </span>
          </div>
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto p-5 sm:p-7">
          <p className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-cobalt">
            Made to order
          </p>
          <h2 className="mt-2 font-display text-[30px] leading-[1.02] tracking-[-0.02em] sm:text-[34px]">
            {item.name}
          </h2>
          <p className="mt-3 text-[13.5px] font-light leading-relaxed text-ink-soft">
            {item.description}
          </p>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-[24px] text-cobalt">
              {formatINR(unitPrice)}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-soft">
              / {item.unit}
            </span>
          </div>

          <div className="mt-6 space-y-6">
            {item.groups?.map((group) => {
              const active = selections.filter(
                (entry) => entry.groupId === group.id
              );
              return (
                <fieldset key={group.id}>
                  <div className="flex items-start justify-between gap-3">
                    <legend className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink">
                      {group.label}
                    </legend>
                    {group.kind === "multi" && (
                      <span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.12em] text-ink-soft">
                        {active.length}/{group.max ?? group.choices.length} chosen
                      </span>
                    )}
                  </div>
                  {group.helper && (
                    <p className="mt-1.5 text-[11.5px] font-light text-ink-soft">
                      {group.helper}
                    </p>
                  )}
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {group.choices.map((choice) => {
                      const isActive = active.some(
                        (entry) => entry.choice === choice.name
                      );
                      return (
                        <button
                          key={choice.name}
                          type="button"
                          aria-pressed={isActive}
                          onClick={() =>
                            toggleChoice(group.id, choice.name, group.kind, group.max)
                          }
                          className={cn(
                            "flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 py-2 text-left font-mono text-[9px] uppercase tracking-[0.1em] transition",
                            isActive
                              ? "border-cobalt bg-cobalt text-ivory"
                              : "border-line bg-white/60 text-ink hover:border-cobalt/60 hover:text-cobalt"
                          )}
                        >
                          {isActive && <Check className="h-3 w-3" strokeWidth={2.5} />}
                          {choice.name}
                          {choice.delta ? ` +${formatINR(choice.delta)}` : ""}
                        </button>
                      );
                    })}
                  </div>
                  {group.choices.some((choice) => choice.note) && (
                    <p className="mt-2 font-mono text-[8px] uppercase leading-relaxed tracking-[0.08em] text-ink-soft">
                      {group.choices
                        .filter((choice) => choice.note)
                        .map((choice) => `${choice.name}: ${choice.note}`)
                        .join(" · ")}
                    </p>
                  )}
                </fieldset>
              );
            })}
          </div>

          <div className="mt-7 border-t border-line pt-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center rounded-full border border-line">
                <button
                  onClick={() => setQty((value) => Math.max(1, value - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-9 w-9 items-center justify-center text-ink-soft transition hover:text-cobalt"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-7 text-center font-mono text-[12px]">{qty}</span>
                <button
                  onClick={() => setQty((value) => Math.min(30, value + 1))}
                  aria-label="Increase quantity"
                  className="flex h-9 w-9 items-center justify-center text-ink-soft transition hover:text-cobalt"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="text-right">
                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink-soft">
                  Subtotal
                </p>
                <p className="font-display text-[22px] leading-tight text-cobalt">
                  {formatINR(unitPrice * qty)}
                </p>
              </div>
            </div>

            <Button
              className="mt-4 w-full"
              size="lg"
              onClick={() => onAdd({ itemId: item.id, selections, qty })}
            >
              Add to your box
              <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="mt-3 text-center font-mono text-[8px] uppercase tracking-[0.14em] text-ink-soft">
              Custom messages & gift notes can be added in your box
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
