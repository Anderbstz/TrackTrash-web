import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/Icon";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { MiniMap } from "@/components/dashboard/MiniMap";
import { AlertsTable } from "@/components/dashboard/AlertsTable";
import { DatePill } from "@/components/dashboard/DatePill";
import { getAlertas, getKpis, getTendencia, listContenedores } from "@/lib/api/resources";
import type { KpiId } from "@/lib/api/types";

const kpiMeta: Record<KpiId, { icon: IconName; tone: string }> = {
  toneladas: { icon: "recycle", tone: "green" },
  saturacion: { icon: "activity", tone: "amber" },
  criticos: { icon: "alert", tone: "red" },
  recicladores: { icon: "users", tone: "blue" },
};

export default async function PanelPage() {
  const [kpis, tendencia, alertas, contenedores] = await Promise.all([
    getKpis(),
    getTendencia(),
    getAlertas(),
    listContenedores(),
  ]);

  return <>
    <PageHeader
      crumb="Panel"
      title="Panel general"
      subtitle="Resumen de la operación municipal en tiempo real."
      actions={<>
        <DatePill />
        <Button variant="primary" icon="download">Exportar reporte</Button>
      </>}
    />

    <div className="kpi-grid">
      {kpis.items.map(item => {
        const meta = kpiMeta[item.id];
        return <KpiCard key={item.id} label={item.label} value={item.valor} change={item.cambio} icon={meta.icon} tone={meta.tone} />;
      })}
    </div>

    <div className="overview-grid">
      <section className="card trend-card">
        <div className="card-head"><div><div className="card-title">{tendencia.titulo}</div><div className="card-subtitle">{tendencia.subtitulo}</div></div><div className="metric-select"><span>{tendencia.periodo}</span><Icon name="chevron" size={15} /></div></div>
        <div className="trend-summary"><strong>{tendencia.total}</strong><span>{tendencia.cambio}</span><small>{tendencia.comparativa}</small></div>
        <TrendChart serie={tendencia} />
      </section>
      <section className="card map-card">
        <div className="card-head"><div><div className="card-title">Estado de contenedores</div><div className="card-subtitle">248 dispositivos monitoreados</div></div><Link href="/mapa" className="button button-ghost no-underline">Ver mapa <Icon name="arrow" size={16} /></Link></div>
        <MiniMap contenedores={contenedores} />
      </section>
    </div>

    <AlertsTable alertas={alertas} viewAllHref="/alertas" />
    <div className="footer-note">Datos actualizados {kpis.actualizadoEn.toLowerCase()} · Monitoreo IoT activo</div>
  </>;
}
