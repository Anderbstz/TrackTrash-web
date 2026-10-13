import type { IconName } from "@/components/Icon";

export type NavItem = {
  label: string;
  icon: IconName;
  href: string;
};

export const nav: NavItem[] = [
  { label: "Panel", icon: "panel", href: "/panel" },
  { label: "Mapa", icon: "map", href: "/mapa" },
  { label: "Alertas", icon: "alert", href: "/alertas" },
  { label: "Incidencias", icon: "clipboard", href: "/incidencias" },
  { label: "Contenedores", icon: "bin", href: "/contenedores" },
  { label: "Rutas", icon: "route", href: "/rutas" },
  { label: "Recicladores", icon: "recycle", href: "/recicladores" },
  { label: "Reportes", icon: "activity", href: "/reportes" },
];

export const settingsItem: NavItem = {
  label: "Configuración",
  icon: "settings",
  href: "/configuracion",
};
