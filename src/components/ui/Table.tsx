"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";

export type TableAlign = "left" | "center" | "right";
export type TableSortValue = string | number | boolean | null | undefined;

export type TableColumn<T> = {
  key: string;
  header: ReactNode;
  align?: TableAlign;
  sortable?: boolean;
  sortValue?: (row: T) => TableSortValue;
  className?: string;
  render?: (row: T) => ReactNode;
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyState?: ReactNode;
  className?: string;
};

const alignClass: Record<TableAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

function getSortValue<T>(column: TableColumn<T>, row: T): TableSortValue {
  if (column.sortValue) return column.sortValue(row);
  return (row as unknown as Record<string, TableSortValue>)[column.key];
}

export function Table<T>({
  columns,
  rows,
  rowKey,
  onRowClick,
  emptyState,
  className,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const sortedRows = useMemo(() => {
    if (!sortKey) return rows;
    const column = columns.find((entry) => entry.key === sortKey);
    if (!column) return rows;
    const factor = sortDir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const aValue = getSortValue(column, a);
      const bValue = getSortValue(column, b);
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;
      if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * factor;
      }
      return String(aValue).localeCompare(String(bValue)) * factor;
    });
  }, [columns, rows, sortKey, sortDir]);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className={cn("overflow-hidden rounded-card border border-border bg-surface", className)}>
      <table className="w-full border-collapse text-[11px]">
        <thead>
          <tr className="bg-surface-soft">
            {columns.map((column) => {
              const align = column.align ?? "left";
              const active = sortKey === column.key;
              return (
                <th
                  key={column.key}
                  scope="col"
                  aria-sort={active ? (sortDir === "asc" ? "ascending" : "descending") : undefined}
                  className={cn(
                    "h-9 px-4 text-[9px] font-bold uppercase tracking-wide text-fg-faint",
                    alignClass[align],
                  )}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(column.key)}
                      aria-label={`Ordenar por ${column.key}`}
                      className={cn(
                        "inline-flex items-center gap-1 transition hover:text-fg-mid",
                        active && "text-fg-mid",
                        align === "right" && "flex-row-reverse",
                      )}
                    >
                      {column.header}
                      <span
                        className={cn(
                          "transition-transform",
                          active && sortDir === "desc" && "rotate-180",
                        )}
                      >
                        <Icon name="chevron" size={12} />
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedRows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-0">
                {emptyState ?? (
                  <EmptyState
                    icon="search"
                    title="Sin resultados"
                    description="No hay datos para mostrar."
                  />
                )}
              </td>
            </tr>
          ) : (
            sortedRows.map((row) => (
              <tr
                key={rowKey(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(
                  "h-[52px] border-t border-border",
                  onRowClick && "cursor-pointer transition hover:bg-surface-soft",
                )}
              >
                {columns.map((column) => {
                  const align = column.align ?? "left";
                  return (
                    <td
                      key={column.key}
                      className={cn("px-4 text-fg-mid", alignClass[align], column.className)}
                    >
                      {column.render
                        ? column.render(row)
                        : (getSortValue(column, row) as ReactNode)}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
