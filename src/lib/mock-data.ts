import type { IconName } from "@/components/Icon";

export type AlertState = "critical" | "warning";

export type Alert = {
  id: string;
  place: string;
  district: string;
  level: number;
  time: string;
  state: AlertState;
};

export const alerts: Alert[] = [
  { id: "CT-0842", place: "Av. Ejército 710", district: "Cayma", level: 94, time: "Hace 8 min", state: "critical" },
  { id: "CT-0197", place: "Mercado San Camilo", district: "Cercado", level: 88, time: "Hace 24 min", state: "critical" },
  { id: "CT-0631", place: "Av. Dolores 141", district: "J. L. Bustamante", level: 79, time: "Hace 41 min", state: "warning" },
];

export type Kpi = {
  label: string;
  value: string;
  change: string;
  icon: IconName;
  tone: string;
};

export const kpis: Kpi[] = [
  { label: "Toneladas recuperadas", value: "128,4 t", change: "+12,5%", icon: "recycle", tone: "green" },
  { label: "Saturación promedio", value: "63,2%", change: "+3,1%", icon: "activity", tone: "amber" },
  { label: "Contenedores críticos", value: "12", change: "+4 hoy", icon: "alert", tone: "red" },
  { label: "Recicladores activos", value: "86", change: "+8,2%", icon: "users", tone: "blue" },
];
