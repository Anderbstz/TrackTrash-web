"use client";

import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";

export function Pagination({
  page,
  pageCount,
  onPageChange,
  className,
}: {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}) {
  const canPrev = page > 1;
  const canNext = page < pageCount;
  const buttonClass =
    "flex h-8 w-8 items-center justify-center rounded-sm border border-border bg-surface text-fg-mid transition hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <span className="text-[11px] text-fg-muted">
        Página {page} de {pageCount}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className={buttonClass}
          onClick={() => onPageChange(page - 1)}
          disabled={!canPrev}
          aria-label="Página anterior"
        >
          <span className="rotate-90">
            <Icon name="chevron" size={16} />
          </span>
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => onPageChange(page + 1)}
          disabled={!canNext}
          aria-label="Página siguiente"
        >
          <span className="-rotate-90">
            <Icon name="chevron" size={16} />
          </span>
        </button>
      </div>
    </div>
  );
}
