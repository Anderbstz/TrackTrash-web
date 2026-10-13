"use client";

import { useState, type ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const [notifications, setNotifications] = useState(false);

  return <div className={dark ? "app dark" : "app"}>
    <Sidebar />

    <main className="main">
      <Topbar dark={dark} onToggleDark={() => setDark(!dark)} notifications={notifications} onToggleNotifications={() => setNotifications(!notifications)} />

      <div className="content">{children}</div>
    </main>
  </div>;
}
