import type { ReactNode } from "react";

export function PageHeader({
  crumb,
  title,
  subtitle,
  actions,
}: {
  crumb?: string;
  title: string;
  subtitle: string;
  actions?: ReactNode;
}) {
  return <>
    <div className="crumbs"><span>TrackTrash</span><b>/</b><strong>{crumb ?? title}</strong></div>
    <div className="page-head">
      <div><div className="page-title">{title}</div><div className="page-subtitle">{subtitle}</div></div>
      {actions != null && <div className="head-actions">{actions}</div>}
    </div>
  </>;
}
