"use client";

import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/Icon";

export function Button({ children, variant = "secondary", icon, onClick, ariaLabel }: { children?: ReactNode; variant?: "primary" | "secondary" | "ghost" | "icon"; icon?: IconName; onClick?: () => void; ariaLabel?: string }) {
  return <button className={`button button-${variant}`} onClick={onClick} aria-label={ariaLabel}>{icon && <Icon name={icon} size={18} />}{children}</button>;
}
