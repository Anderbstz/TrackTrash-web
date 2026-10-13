"use client";

import { useId, type ComponentProps } from "react";
import { Icon, type IconName } from "@/components/Icon";
import { cn } from "@/lib/cn";

export type InputProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
  hint?: string;
  icon?: IconName;
};

export function Input({ label, error, hint, icon, id, className, ref, ...props }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label != null && (
        <label htmlFor={inputId} className="text-[11px] font-semibold text-fg-mid">
          {label}
        </label>
      )}
      <div className="relative">
        {icon != null && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-faint">
            <Icon name={icon} size={16} />
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "h-9 w-full rounded-sm border bg-surface px-3 text-xs text-fg transition placeholder:text-fg-faint",
            "focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30",
            "disabled:cursor-not-allowed disabled:opacity-60",
            icon != null && "pl-9",
            error ? "border-danger focus:border-danger focus:ring-danger/30" : "border-border",
            className,
          )}
          {...props}
        />
      </div>
      {error ? (
        <span id={`${inputId}-error`} className="text-[10px] font-medium text-danger">
          {error}
        </span>
      ) : hint ? (
        <span id={`${inputId}-hint`} className="text-[10px] text-fg-muted">
          {hint}
        </span>
      ) : null}
    </div>
  );
}
