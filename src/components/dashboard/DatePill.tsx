"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@/components/Icon";

const emptySubscribe = () => () => {};
const getToday = () => new Intl.DateTimeFormat("es-PE", { day: "numeric", month: "long", year: "numeric" }).format(new Date());
const getTodayServer = () => "";

export function DatePill() {
  const today = useSyncExternalStore(emptySubscribe, getToday, getTodayServer);
  return <div className="date-pill"><Icon name="calendar" size={17} /><span>{today}</span></div>;
}
