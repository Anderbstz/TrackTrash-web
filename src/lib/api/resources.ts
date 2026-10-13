"use cache";

import * as mock from "./mock/data";
import type {
  Alerta,
  AsociacionReciclador,
  Contenedor,
  Distrito,
  Incidencia,
  IndicadorDistrito,
  KpiResumen,
  Notificacion,
  Ruta,
  SerieTendencia,
} from "./types";

/**
 * Async resource functions — the app talks to the backend ONLY through this module.
 *
 * Today each function returns mock data after a tiny delay. When the .NET API is
 * live, replace the body with the `apiFetch` call shown in its comment; the
 * signature (and therefore every consumer) stays the same.
 *
 * The file-level `"use cache"` directive is required by `cacheComponents: true`
 * (see `next.config.ts`): it lets the panel's awaiting server component prerender
 * a static shell instead of being treated as blocking runtime data.
 */

const SIMULATED_LATENCY_MS = 120;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function listDistritos(): Promise<Distrito[]> {
  await delay(SIMULATED_LATENCY_MS); // futuro: return apiFetch<Distrito[]>("/distritos");
  return [...mock.distritos];
}

export async function getKpis(): Promise<KpiResumen> {
  await delay(SIMULATED_LATENCY_MS); // futuro: return apiFetch<KpiResumen>("/panel/kpis");
  return mock.kpis;
}

export async function getTendencia(): Promise<SerieTendencia> {
  await delay(SIMULATED_LATENCY_MS); // futuro: return apiFetch<SerieTendencia>("/panel/tendencia");
  return mock.tendencia;
}

export async function getAlertas(): Promise<Alerta[]> {
  await delay(SIMULATED_LATENCY_MS); // futuro: return apiFetch<Alerta[]>("/alertas?estado=activa");
  return [...mock.alertas];
}

export async function listContenedores(): Promise<Contenedor[]> {
  await delay(SIMULATED_LATENCY_MS); // futuro: return apiFetch<Contenedor[]>("/contenedores");
  return [...mock.contenedores];
}

export async function listIncidencias(): Promise<Incidencia[]> {
  await delay(SIMULATED_LATENCY_MS); // futuro: return apiFetch<Incidencia[]>("/incidencias");
  return [...mock.incidencias];
}

export async function listRutas(): Promise<Ruta[]> {
  await delay(SIMULATED_LATENCY_MS); // futuro: return apiFetch<Ruta[]>("/rutas");
  return [...mock.rutas];
}

export async function listRecicladores(): Promise<AsociacionReciclador[]> {
  await delay(SIMULATED_LATENCY_MS); // futuro: return apiFetch<AsociacionReciclador[]>("/recicladores/asociaciones");
  return [...mock.asociacionesReciclador];
}

export async function getIndicadoresPorDistrito(): Promise<IndicadorDistrito[]> {
  await delay(SIMULATED_LATENCY_MS); // futuro: return apiFetch<IndicadorDistrito[]>("/indicadores/distritos");
  return [...mock.indicadoresPorDistrito];
}

export async function listNotificaciones(): Promise<Notificacion[]> {
  await delay(SIMULATED_LATENCY_MS); // futuro: return apiFetch<Notificacion[]>("/notificaciones");
  return [...mock.notificaciones];
}
