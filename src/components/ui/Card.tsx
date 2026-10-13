import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({
  title,
  subtitle,
  actions,
  className,
  children,
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  const hasHeader = title != null || subtitle != null || actions != null;

  return (
    <section className={cn("rounded-card border border-border bg-surface shadow-sm", className)}>
      {hasHeader && (
        <div className="flex items-start justify-between gap-3 px-5 py-4">
          <div className="min-w-0">
            {title != null && <div className="text-sm font-bold leading-5 text-fg">{title}</div>}
            {subtitle != null && (
              <div className="mt-0.5 text-[10px] leading-4 text-fg-muted">{subtitle}</div>
            )}
          </div>
          {actions != null && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
