import type { IconName } from "@/components/Icon";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/dashboard/PageHeader";

export function PlaceholderPage({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: IconName;
}) {
  return <>
    <PageHeader title={title} subtitle={subtitle} />
    <Card>
      <EmptyState
        icon={icon}
        title="En construcción"
        description="Esta sección se implementará próximamente."
      />
    </Card>
  </>;
}
