import { cn } from "@/lib/cn";

export function Skeleton({
  className,
  width,
  height,
}: {
  className?: string;
  width?: number | string;
  height?: number | string;
}) {
  return (
    <div
      className={cn("animate-pulse rounded-sm bg-surface-muted", className)}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
