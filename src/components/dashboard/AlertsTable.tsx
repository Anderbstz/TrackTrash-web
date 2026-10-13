import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/Button";
import type { Alerta } from "@/lib/api/types";

export function AlertsTable({ alertas, viewAllHref }: { alertas: Alerta[]; viewAllHref: string }) {
  return <section className="card alerts-card">
    <div className="card-head alerts-head"><div><div className="card-title title-inline">Alertas recientes <span className="count-chip">12 activas</span></div><div className="card-subtitle">Contenedores que requieren atención prioritaria</div></div><Link href={viewAllHref} className="button button-secondary no-underline">Ver todas las alertas</Link></div>
    <div className="table">
      <div className="table-row table-header"><span>CONTENEDOR</span><span>DISTRITO</span><span>NIVEL</span><span>ÚLTIMO CONTACTO</span><span>ESTADO</span><span /></div>
      {alertas.map(item => <div className="table-row" key={item.codigo}>
        <div className="container-cell"><div className={`mini-bin ${item.estado}`}><Icon name="bin" size={17} /></div><div><strong>{item.codigo}</strong><span>{item.direccion}</span></div></div>
        <span className="district-name">{item.distrito}</span>
        <div className="level-cell"><strong>{item.nivel}%</strong><div className="progress"><i className={item.estado} style={{ width: `${item.nivel}%` }} /></div></div>
        <span className="contact-time">{item.ultimoContacto}</span>
        <div><span className={`status-chip ${item.estado}`}>{item.estado === "critical" ? "Crítico" : "Atención"}</span></div>
        <Button variant="icon" icon="more" ariaLabel={`Acciones para ${item.codigo}`} />
      </div>)}
    </div>
  </section>;
}
