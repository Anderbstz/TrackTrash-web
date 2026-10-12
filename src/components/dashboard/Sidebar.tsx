"use client";

import { Icon } from "@/components/Icon";
import { nav } from "@/lib/navigation";

export function Sidebar({ active, onSelect }: { active: string; onSelect: (label: string) => void }) {
  return <aside className="sidebar">
    <div className="brand"><div className="brand-mark"><Icon name="recycle" size={21} /></div><div><div className="brand-name">TrackTrash</div><div className="brand-sub">Gestión municipal</div></div></div>
    <div className="tenant">
      <div className="tenant-logo">MA</div><div className="tenant-copy"><span>Municipalidad</span><strong>Provincial de Arequipa</strong></div><Icon name="chevron" size={16} />
    </div>
    <nav className="nav">
      <div className="nav-label">MONITOREO</div>
      {nav.slice(0, 6).map(([label, icon]) => <button key={label} className={`nav-item ${active === label ? "active" : ""}`} onClick={() => onSelect(label)}><Icon name={icon} size={19} /><span>{label}</span>{label === "Alertas" && <b>12</b>}</button>)}
      <div className="nav-label nav-label-spaced">GESTIÓN</div>
      {nav.slice(6).map(([label, icon]) => <button key={label} className={`nav-item ${active === label ? "active" : ""}`} onClick={() => onSelect(label)}><Icon name={icon} size={19} /><span>{label}</span></button>)}
    </nav>
    <div className="sidebar-bottom">
      <button className={`nav-item ${active === "Configuración" ? "active" : ""}`} onClick={() => onSelect("Configuración")}><Icon name="settings" size={19} /><span>Configuración</span></button>
      <div className="system-health"><i /><div><strong>Sistema operativo</strong><span>Todos los sensores conectados</span></div></div>
    </div>
  </aside>;
}
