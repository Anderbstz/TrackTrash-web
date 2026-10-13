import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type StatusTone = "ok" | "warning" | "critical" | "info";

const tones: Record<StatusTone, string> = {
  ok: "bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300",
  warning: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  critical: "bg-red-50 text-red-500 dark:bg-red-500/15 dark:text-red-400",
  info: "bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300",
};

export function StatusChip({
  tone = "ok",
  className,
  children,
}: {
  tone?: StatusTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-[22px] items-center rounded-full px-2 text-[9px] font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
