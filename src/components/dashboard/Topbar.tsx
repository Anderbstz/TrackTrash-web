"use client";

import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/Button";

function Search() {
  return <label className="search"><Icon name="search" size={18} /><input aria-label="Buscar" placeholder="Buscar contenedor, ruta o incidencia..." /></label>;
}

export function Topbar({ dark, onToggleDark, notifications, onToggleNotifications }: { dark: boolean; onToggleDark: () => void; notifications: boolean; onToggleNotifications: () => void }) {
  return <header className="topbar">
    <Search />
    <div className="top-actions">
      <div className="district"><Icon name="map" size={17} /><span>Todos los distritos</span><Icon name="chevron" size={15} /></div>
      <Button variant="icon" icon={dark ? "sun" : "moon"} ariaLabel="Cambiar tema" onClick={onToggleDark} />
      <div className="notification-wrap"><Button variant="icon" icon="bell" ariaLabel="Notificaciones" onClick={onToggleNotifications} /><i className="notification-dot" />
        {notifications && <div className="notification-pop card"><div className="pop-title">Notificaciones</div><div className="pop-item"><i className="red-dot" /><span><strong>2 contenedores críticos</strong><small>Requieren atención inmediata</small></span></div><div className="pop-item"><i className="amber-dot" /><span><strong>Sensor sin conexión</strong><small>CT-0441 · Hace 12 min</small></span></div></div>}
      </div>
      <div className="divider" />
      <div className="user"><div className="avatar">VR</div><div className="user-copy"><strong>Valeria Rojas</strong><span>Supervisora</span></div><Icon name="chevron" size={15} /></div>
    </div>
  </header>;
}
