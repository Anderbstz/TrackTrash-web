"use client";

import { useId, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CheckboxProps = ComponentProps<"input"> & {
  label: ReactNode;
};

export function Checkbox({ label, id, className, ref, ...props }: CheckboxProps) {
  const autoId = useId();
  const checkboxId = id ?? autoId;

  return (
    <label htmlFor={checkboxId} className="inline-flex cursor-pointer items-center gap-2">
      <input
        ref={ref}
        id={checkboxId}
        type="checkbox"
        className={cn(
          "h-4 w-4 shrink-0 cursor-pointer rounded-sm border-border accent-brand-500",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
        {...props}
      />
      <span className="text-xs text-fg-mid">{label}</span>
    </label>
  );
}
