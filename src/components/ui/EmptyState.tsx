import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/Icon";
import { cn } from "@/lib/cn";

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: IconName;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-6 py-12 text-center",
        className,
      )}
    >
      {icon != null && (
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-fg-faint">
          <Icon name={icon} size={22} />
        </span>
      )}
      <div className="flex flex-col gap-1">
        <div className="text-sm font-semibold text-fg">{title}</div>
        {description != null && <div className="text-[11px] text-fg-muted">{description}</div>}
      </div>
      {action}
    </div>
  );
}
