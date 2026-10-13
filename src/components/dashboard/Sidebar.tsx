"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";
import { nav, settingsItem } from "@/lib/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const itemClass = (href: string) => `nav-item no-underline ${pathname === href ? "active" : ""}`;

  return <aside className="sidebar">
    <div className="brand"><div className="brand-mark"><Icon name="recycle" size={21} /></div><div><div className="brand-name">TrackTrash</div><div className="brand-sub">Gestión municipal</div></div></div>
    <div className="tenant">
      <div className="tenant-logo">MA</div><div className="tenant-copy"><span>Municipalidad</span><strong>Provincial de Arequipa</strong></div><Icon name="chevron" size={16} />
    </div>
    <nav className="nav">
      <div className="nav-label">MONITOREO</div>
      {nav.slice(0, 6).map(item => <Link key={item.label} href={item.href} className={itemClass(item.href)}><Icon name={item.icon} size={19} /><span>{item.label}</span>{item.label === "Alertas" && <b>12</b>}</Link>)}
      <div className="nav-label nav-label-spaced">GESTIÓN</div>
      {nav.slice(6).map(item => <Link key={item.label} href={item.href} className={itemClass(item.href)}><Icon name={item.icon} size={19} /><span>{item.label}</span></Link>)}
    </nav>
    <div className="sidebar-bottom">
      <Link href={settingsItem.href} className={itemClass(settingsItem.href)}><Icon name="settings" size={19} /><span>Configuración</span></Link>
      <div className="system-health"><i /><div><strong>Sistema operativo</strong><span>Todos los sensores conectados</span></div></div>
    </div>
  </aside>;
}
