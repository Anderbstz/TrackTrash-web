import { Icon, type IconName } from "@/components/Icon";

export function KpiCard({ label, value, change, icon, tone }: { label: string; value: string; change: string; icon: IconName; tone: string }) {
  return <div className="card kpi-card">
    <div className={`kpi-icon ${tone}`}><Icon name={icon} size={20} /></div>
    <div className="kpi-label">{label}</div>
    <div className="kpi-row"><div className="kpi-value">{value}</div><div className={`delta ${tone === "red" ? "delta-alert" : ""}`}>{change}</div></div>
    <div className="kpi-foot">vs. mes anterior</div>
  </div>;
}
