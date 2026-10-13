"use client";

import { useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { MiniMap } from "@/components/dashboard/MiniMap";
import { AlertsTable } from "@/components/dashboard/AlertsTable";
import { alerts, kpis } from "@/lib/mock-data";

const emptySubscribe = () => () => {};
const getToday = () => new Intl.DateTimeFormat("es-PE", { day: "numeric", month: "long", year: "numeric" }).format(new Date());
const getTodayServer = () => "";

export default function PanelPage() {
  const router = useRouter();
  const today = useSyncExternalStore(emptySubscribe, getToday, getTodayServer);

  return <>
    <PageHeader
      crumb="Panel"
      title="Panel general"
      subtitle="Resumen de la operación municipal en tiempo real."
      actions={<>
        <div className="date-pill"><Icon name="calendar" size={17} /><span>{today}</span></div>
        <Button variant="primary" icon="download">Exportar reporte</Button>
      </>}
    />

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
        <div className="card-head"><div><div className="card-title">Estado de contenedores</div><div className="card-subtitle">248 dispositivos monitoreados</div></div><Button variant="ghost" onClick={() => router.push("/mapa")}>Ver mapa <Icon name="arrow" size={16} /></Button></div>
        <MiniMap />
      </section>
    </div>

    <AlertsTable alerts={alerts} onViewAll={() => router.push("/alertas")} />
    <div className="footer-note">Datos actualizados hace 2 minutos · Monitoreo IoT activo</div>
  </>;
}
