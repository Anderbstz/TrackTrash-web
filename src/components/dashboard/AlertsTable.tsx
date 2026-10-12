"use client";

import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/Button";
import type { Alert } from "@/lib/mock-data";

export function AlertsTable({ alerts, onViewAll }: { alerts: Alert[]; onViewAll: () => void }) {
  return <section className="card alerts-card">
    <div className="card-head alerts-head"><div><div className="card-title title-inline">Alertas recientes <span className="count-chip">12 activas</span></div><div className="card-subtitle">Contenedores que requieren atención prioritaria</div></div><Button variant="secondary" onClick={onViewAll}>Ver todas las alertas</Button></div>
    <div className="table">
      <div className="table-row table-header"><span>CONTENEDOR</span><span>DISTRITO</span><span>NIVEL</span><span>ÚLTIMO CONTACTO</span><span>ESTADO</span><span /></div>
      {alerts.map(item => <div className="table-row" key={item.id}>
        <div className="container-cell"><div className={`mini-bin ${item.state}`}><Icon name="bin" size={17} /></div><div><strong>{item.id}</strong><span>{item.place}</span></div></div>
        <span className="district-name">{item.district}</span>
        <div className="level-cell"><strong>{item.level}%</strong><div className="progress"><i className={item.state} style={{ width: `${item.level}%` }} /></div></div>
        <span className="contact-time">{item.time}</span>
        <div><span className={`status-chip ${item.state}`}>{item.state === "critical" ? "Crítico" : "Atención"}</span></div>
        <Button variant="icon" icon="more" ariaLabel={`Acciones para ${item.id}`} />
      </div>)}
    </div>
  </section>;
}
