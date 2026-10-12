"use client";

import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { MiniMap } from "@/components/dashboard/MiniMap";
import { AlertsTable } from "@/components/dashboard/AlertsTable";
import { alerts, kpis } from "@/lib/mock-data";

const emptySubscribe = () => () => {};
const getToday = () => new Intl.DateTimeFormat("es-PE", { day: "numeric", month: "long", year: "numeric" }).format(new Date());
const getTodayServer = () => "";

export function DashboardView() {
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState("Panel");
  const [notifications, setNotifications] = useState(false);
  const today = useSyncExternalStore(emptySubscribe, getToday, getTodayServer);

  return <div className={dark ? "app dark" : "app"}>
    <Sidebar active={active} onSelect={setActive} />

    <main className="main">
      <Topbar dark={dark} onToggleDark={() => setDark(!dark)} notifications={notifications} onToggleNotifications={() => setNotifications(!notifications)} />

      <div className="content">
        <div className="crumbs"><span>TrackTrash</span><b>/</b><strong>{active}</strong></div>
        <div className="page-head">
          <div><div className="page-title">{active === "Panel" ? "Panel general" : active}</div><div className="page-subtitle">{active === "Panel" ? "Resumen de la operación municipal en tiempo real." : "Vista operativa del módulo municipal."}</div></div>
          <div className="head-actions"><div className="date-pill"><Icon name="calendar" size={17} /><span>{today}</span></div><Button variant="primary" icon="download">Exportar reporte</Button></div>
        </div>

        <div className="kpi-grid">
          {kpis.map(kpi => <KpiCard key={kpi.label} label={kpi.label} value={kpi.value} change={kpi.change} icon={kpi.icon} tone={kpi.tone} />)}
        </div>

        <div className="overview-grid">
          <section className="card trend-card">
            <div className="card-head"><div><div className="card-title">Residuos recuperados</div><div className="card-subtitle">Toneladas recolectadas durante junio</div></div><div className="metric-select"><span>Últimos 30 días</span><Icon name="chevron" size={15} /></div></div>
            <div className="trend-summary"><strong>128,4 t</strong><span>+12,5%</span><small>respecto al periodo anterior</small></div>
            <TrendChart />
          </section>
          <section className="card map-card">
            <div className="card-head"><div><div className="card-title">Estado de contenedores</div><div className="card-subtitle">248 dispositivos monitoreados</div></div><Button variant="ghost" onClick={() => setActive("Mapa")}>Ver mapa <Icon name="arrow" size={16} /></Button></div>
            <MiniMap />
          </section>
        </div>

        <AlertsTable alerts={alerts} onViewAll={() => setActive("Alertas")} />
        <div className="footer-note">Datos actualizados hace 2 minutos · Monitoreo IoT activo</div>
      </div>
    </main>
  </div>;
}
