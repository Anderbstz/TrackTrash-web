"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Pagination } from "@/components/ui/Pagination";
import { Select } from "@/components/ui/Select";
import { Skeleton } from "@/components/ui/Skeleton";
import { StatusChip, type StatusTone } from "@/components/ui/StatusChip";
import { Table, type TableColumn } from "@/components/ui/Table";
import { Tabs } from "@/components/ui/Tabs";

const brandSteps = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];
const neutralSteps = ["50", "100", "200", "400", "600", "800", "950"];
const semanticTokens = ["success", "warning", "danger", "info"];
const radiiTokens = [
  ["--radius-sm", "sm"],
  ["--radius-md", "md"],
  ["--radius-lg", "lg"],
  ["--radius-full", "full"],
] as const;
const tones: StatusTone[] = ["ok", "warning", "critical", "info"];
const toneLabels: Record<StatusTone, string> = {
  ok: "Operativo",
  warning: "Atención",
  critical: "Crítico",
  info: "Informativo",
};

type ContainerRow = {
  id: string;
  district: string;
  level: number;
  state: "ok" | "warning" | "critical";
  updated: string;
};

const stateMeta: Record<ContainerRow["state"], { tone: StatusTone; label: string }> = {
  ok: { tone: "ok", label: "Operativo" },
  warning: { tone: "warning", label: "Atención" },
  critical: { tone: "critical", label: "Crítico" },
};

const sampleRows: ContainerRow[] = [
  { id: "TT-1284", district: "Lima Cercado", level: 92, state: "critical", updated: "hace 2 min" },
  { id: "TT-2207", district: "Miraflores", level: 68, state: "warning", updated: "hace 8 min" },
  { id: "TT-3391", district: "Santiago de Surco", level: 24, state: "ok", updated: "hace 15 min" },
  { id: "TT-4102", district: "San Isidro", level: 41, state: "warning", updated: "hace 21 min" },
];

const columns: TableColumn<ContainerRow>[] = [
  {
    key: "id",
    header: "Contenedor",
    sortable: true,
    render: (row) => <span className="font-semibold text-fg">{row.id}</span>,
  },
  { key: "district", header: "Distrito", sortable: true },
  {
    key: "level",
    header: "Nivel",
    align: "right",
    sortable: true,
    sortValue: (row) => row.level,
    render: (row) => `${row.level}%`,
  },
  {
    key: "state",
    header: "Estado",
    sortable: true,
    render: (row) => <StatusChip tone={stateMeta[row.state].tone}>{stateMeta[row.state].label}</StatusChip>,
  },
  { key: "updated", header: "Último contacto", align: "right" },
];

function Swatch({ name, variable }: { name: string; variable: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="h-14 rounded-md border border-border"
        style={{ background: `var(${variable})` }}
      />
      <span className="text-[10px] font-medium text-fg-muted">{name}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xs font-bold uppercase tracking-wider text-fg-faint">{title}</h2>
      {children}
    </section>
  );
}

function ComponentPreview() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        {tones.map((tone) => (
          <StatusChip key={tone} tone={tone}>
            {toneLabels[tone]}
          </StatusChip>
        ))}
      </div>

      <Card
        title="Alertas recientes"
        subtitle="Contenedores que requieren atención prioritaria"
        actions={<StatusChip tone="critical">12 activas</StatusChip>}
      >
        <div className="flex flex-col gap-3 p-5">
          <Skeleton height={12} width="60%" />
          <Skeleton height={12} width="90%" />
          <Skeleton height={12} width="75%" />
        </div>
      </Card>

      <div className="flex flex-col gap-3">
        <Skeleton height={16} width="40%" />
        <Skeleton height={40} />
        <Skeleton height={40} width="80%" />
      </div>
    </div>
  );
}

function FormDemos() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Input
        label="Buscar contenedor"
        placeholder="ID o dirección"
        icon="search"
        hint="Acepta ID, distrito o dirección."
      />
      <Input label="ID de dispositivo" defaultValue="TT-0000-ERR" error="El formato del ID no es válido." />
      <Select label="Distrito" defaultValue="lima">
        <option value="lima">Lima Cercado</option>
        <option value="miraflores">Miraflores</option>
        <option value="surco">Santiago de Surco</option>
      </Select>
      <div className="flex flex-col justify-end gap-3">
        <Checkbox label="Solo contenedores críticos" defaultChecked />
        <Checkbox label="Incluir dispositivos inactivos" />
      </div>
    </div>
  );
}

function TableDemos() {
  const [page, setPage] = useState(2);

  return (
    <div className="flex flex-col gap-5">
      <Table columns={columns} rows={sampleRows} rowKey={(row) => row.id} />
      <Pagination page={page} pageCount={8} onPageChange={setPage} />
      <Table
        columns={columns}
        rows={[]}
        rowKey={(row) => row.id}
        emptyState={
          <EmptyState
            icon="bin"
            title="Sin contenedores"
            description="No hay dispositivos que coincidan con los filtros aplicados."
            action={<Button variant="secondary" icon="search">Limpiar filtros</Button>}
          />
        }
      />
    </div>
  );
}

function NavDemos() {
  const [tab, setTab] = useState("resumen");
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <Tabs
        tabs={[
          { id: "resumen", label: "Resumen" },
          { id: "alertas", label: "Alertas" },
          { id: "rutas", label: "Rutas" },
        ]}
        value={tab}
        onChange={setTab}
      />

      <div className="flex flex-wrap items-center gap-3">
        <EmptyState
          icon="calendar"
          title="Sin datos para el periodo"
          description="Ajustá el rango de fechas para ver resultados."
          className="rounded-card border border-dashed border-border"
        />
        <Button variant="primary" onClick={() => setOpen(true)}>
          Abrir modal
        </Button>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Atender incidencia"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Confirmar
            </Button>
          </>
        }
      >
        <p>¿Confirmás que la incidencia del contenedor TT-1284 fue atendida?</p>
      </Modal>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-bg px-8 py-10 text-fg">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <header className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Design system</h1>
          <p className="text-sm text-fg-muted">
            Tokens y componentes base de TrackTrash. Página de desarrollo, no enlazada en la navegación.
          </p>
        </header>

        <Section title="Marca">
          <div className="grid grid-cols-11 gap-3">
            {brandSteps.map((step) => (
              <Swatch key={step} name={`brand-${step}`} variable={`--brand-${step}`} />
            ))}
          </div>
        </Section>

        <Section title="Semánticos">
          <div className="grid grid-cols-4 gap-3">
            {semanticTokens.map((token) => (
              <Swatch key={token} name={token} variable={`--${token}`} />
            ))}
          </div>
        </Section>

        <Section title="Neutrales">
          <div className="grid grid-cols-7 gap-3">
            {neutralSteps.map((step) => (
              <Swatch key={step} name={`neutral-${step}`} variable={`--neutral-${step}`} />
            ))}
          </div>
        </Section>

        <Section title="Radios">
          <div className="flex flex-wrap items-end gap-5">
            {radiiTokens.map(([variable, label]) => (
              <div key={variable} className="flex flex-col items-center gap-2">
                <div
                  className="h-16 w-16 border border-border bg-surface-muted"
                  style={{ borderRadius: `var(${variable})` }}
                />
                <span className="text-[10px] font-medium text-fg-muted">radius-{label}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Componentes">
          <ComponentPreview />
        </Section>

        <Section title="Formularios">
          <FormDemos />
        </Section>

        <Section title="Tabla y paginación">
          <TableDemos />
        </Section>

        <Section title="Pestañas, estados vacíos y modal">
          <NavDemos />
        </Section>

        <Section title="Modo oscuro (tokens .dark)">
          <div className="dark rounded-card border border-border bg-bg p-6 text-fg">
            <ComponentPreview />
          </div>
        </Section>
      </div>
    </main>
  );
}
