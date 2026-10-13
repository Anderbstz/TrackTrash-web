"use client";

import { useId, type ComponentProps } from "react";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";

export type SelectProps = ComponentProps<"select"> & {
  label?: string;
  error?: string;
  hint?: string;
};

export function Select({ label, error, hint, id, className, ref, children, ...props }: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const describedBy = error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label != null && (
        <label htmlFor={selectId} className="text-[11px] font-semibold text-fg-mid">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "h-9 w-full appearance-none rounded-sm border bg-surface px-3 pr-9 text-xs text-fg transition",
            "focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30",
            "disabled:cursor-not-allowed disabled:opacity-60",
            error ? "border-danger focus:border-danger focus:ring-danger/30" : "border-border",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-fg-faint">
          <Icon name="chevron" size={16} />
        </span>
      </div>
      {error ? (
        <span id={`${selectId}-error`} className="text-[10px] font-medium text-danger">
          {error}
        </span>
      ) : hint ? (
        <span id={`${selectId}-hint`} className="text-[10px] text-fg-muted">
          {hint}
        </span>
      ) : null}
    </div>
  );
}
