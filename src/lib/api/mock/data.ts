/**
 * In-memory mock dataset for the TrackTrash panel and upcoming screens.
 *
 * Migrated from `src/lib/mock-data.ts` and expanded to cover the districts of
 * Arequipa, containers, alerts, incidents, routes, trucks, recycler associations,
 * per-district indicators and notifications. Everything is in Spanish and stays
 * consistent with the real schema in `../types`.
 */

import type {
  Alerta,
  AsociacionReciclador,
  Camion,
  Contenedor,
  Distrito,
  Incidencia,
  IndicadorDistrito,
  KpiResumen,
  Notificacion,
  Ruta,
  SerieTendencia,
} from "../types";

/** Fill level (in %) at which a container starts generating an alert. */
const UMBRAL_ALERTA = 75;

export const distritos: Distrito[] = [
  { id: "cayma", nombre: "Cayma", provincia: "Arequipa" },
  { id: "cercado", nombre: "Cercado", provincia: "Arequipa" },
  { id: "yanahuara", nombre: "Yanahuara", provincia: "Arequipa" },
  { id: "jlbyr", nombre: "J. L. Bustamante y Rivero", provincia: "Arequipa" },
  { id: "miraflores", nombre: "Miraflores", provincia: "Arequipa" },
  { id: "cerro-colorado", nombre: "Cerro Colorado", provincia: "Arequipa" },
  { id: "alto-selva-alegre", nombre: "Alto Selva Alegre", provincia: "Arequipa" },
  { id: "paucarpata", nombre: "Paucarpata", provincia: "Arequipa" },
  { id: "mariano-melgar", nombre: "Mariano Melgar", provincia: "Arequipa" },
  { id: "jacobo-hunter", nombre: "Jacobo Hunter", provincia: "Arequipa" },
  { id: "sachaca", nombre: "Sachaca", provincia: "Arequipa" },
  { id: "socabaya", nombre: "Socabaya", provincia: "Arequipa" },
];

export const contenedores: Contenedor[] = [
  { id: "ct-0212", codigo: "CT-0212", direccion: "Av. Independencia 205", distritoId: "cercado", distrito: "Cercado", tipo: "organico", nivel: 33, tieneSensor: true, bateria: 91, ultimoContacto: "Hace 3 min", ubicacion: { lat: -16.3988, lng: -71.5353 } },
  { id: "ct-0631", codigo: "CT-0631", direccion: "Av. Dolores 141", distritoId: "jlbyr", distrito: "J. L. Bustamante y Rivero", tipo: "mixto", nivel: 79, tieneSensor: true, bateria: 72, ultimoContacto: "Hace 41 min", ubicacion: { lat: -16.4105, lng: -71.53 } },
  { id: "ct-0773", codigo: "CT-0773", direccion: "Av. Cayma 480", distritoId: "cayma", distrito: "Cayma", tipo: "mixto", nivel: 22, tieneSensor: true, bateria: 95, ultimoContacto: "Hace 5 min", ubicacion: { lat: -16.379, lng: -71.547 } },
  { id: "ct-0842", codigo: "CT-0842", direccion: "Av. Ejército 710", distritoId: "cayma", distrito: "Cayma", tipo: "organico", nivel: 94, tieneSensor: true, bateria: 87, ultimoContacto: "Hace 8 min", ubicacion: { lat: -16.3855, lng: -71.552 } },
  { id: "ct-0104", codigo: "CT-0104", direccion: "Calle San Francisco 108", distritoId: "cercado", distrito: "Cercado", tipo: "organico", nivel: 15, tieneSensor: true, bateria: 88, ultimoContacto: "Hace 2 min", ubicacion: { lat: -16.398, lng: -71.535 } },
  { id: "ct-0458", codigo: "CT-0458", direccion: "Calle Zela 210", distritoId: "yanahuara", distrito: "Yanahuara", tipo: "reciclable", nivel: 61, tieneSensor: true, bateria: 58, ultimoContacto: "Hace 12 min", ubicacion: { lat: -16.394, lng: -71.544 } },
  { id: "ct-0197", codigo: "CT-0197", direccion: "Mercado San Camilo", distritoId: "cercado", distrito: "Cercado", tipo: "reciclable", nivel: 88, tieneSensor: true, bateria: 64, ultimoContacto: "Hace 24 min", ubicacion: { lat: -16.3989, lng: -71.5369 } },
  { id: "ct-0246", codigo: "CT-0246", direccion: "Av. Grau 420", distritoId: "sachaca", distrito: "Sachaca", tipo: "plastico", nivel: 29, tieneSensor: true, bateria: 82, ultimoContacto: "Hace 6 min", ubicacion: { lat: -16.424, lng: -71.562 } },
  { id: "ct-0905", codigo: "CT-0905", direccion: "Av. Venezuela 1200", distritoId: "cerro-colorado", distrito: "Cerro Colorado", tipo: "organico", nivel: 46, tieneSensor: true, bateria: 48, ultimoContacto: "Hace 18 min", ubicacion: { lat: -16.366, lng: -71.558 } },
  { id: "ct-0338", codigo: "CT-0338", direccion: "Av. Lambramani 315", distritoId: "paucarpata", distrito: "Paucarpata", tipo: "vidrio", nivel: 71, tieneSensor: true, bateria: 69, ultimoContacto: "Hace 27 min", ubicacion: { lat: -16.423, lng: -71.505 } },
  { id: "ct-0689", codigo: "CT-0689", direccion: "Av. Pumacahua 1500", distritoId: "jacobo-hunter", distrito: "Jacobo Hunter", tipo: "reciclable", nivel: 68, tieneSensor: true, bateria: 39, ultimoContacto: "Hace 33 min", ubicacion: { lat: -16.437, lng: -71.555 } },
  { id: "ct-0521", codigo: "CT-0521", direccion: "Av. Arequipa 300", distritoId: "mariano-melgar", distrito: "Mariano Melgar", tipo: "mixto", nivel: 57, tieneSensor: true, bateria: 77, ultimoContacto: "Hace 15 min", ubicacion: { lat: -16.406, lng: -71.512 } },
];

function alertaDesdeContenedor(contenedor: Contenedor): Alerta {
  return {
    codigo: contenedor.codigo,
    direccion: contenedor.direccion,
    distrito: contenedor.distrito,
    nivel: contenedor.nivel,
    ultimoContacto: contenedor.ultimoContacto,
    estado: contenedor.nivel > 85 ? "critical" : "warning",
  };
}

export const alertas: Alerta[] = contenedores
  .filter((contenedor) => contenedor.nivel >= UMBRAL_ALERTA)
  .sort((a, b) => b.nivel - a.nivel)
  .map(alertaDesdeContenedor);

export const incidencias: Incidencia[] = [
  { id: "INC-1042", tipo: "desborde", estado: "en_atencion", descripcion: "Contenedor desbordado en la vía pública.", distrito: "Cercado", direccion: "Mercado San Camilo", contenedorCodigo: "CT-0197", reportadoPor: "Vecino anónimo", reportadoEn: "2026-06-28T08:15:00-05:00" },
  { id: "INC-1039", tipo: "sensor_sin_conexion", estado: "abierta", descripcion: "El dispositivo dejó de reportar lecturas.", distrito: "Cayma", direccion: "Av. Ejército 710", contenedorCodigo: "CT-0842", reportadoPor: "Valeria Rojas", reportadoEn: "2026-06-28T07:42:00-05:00" },
  { id: "INC-1035", tipo: "basura_fuera_contenedor", estado: "abierta", descripcion: "Residuos acumulados fuera del contenedor.", distrito: "Yanahuara", direccion: "Calle Zela 210", contenedorCodigo: "CT-0458", reportadoPor: "Junta vecinal", reportadoEn: "2026-06-27T18:05:00-05:00" },
  { id: "INC-1028", tipo: "contenedor_danado", estado: "resuelta", descripcion: "Tapa y pedal del contenedor en mal estado.", distrito: "Paucarpata", direccion: "Av. Lambramani 315", contenedorCodigo: "CT-0338", reportadoPor: "Personal municipal", reportadoEn: "2026-06-26T11:20:00-05:00" },
  { id: "INC-1017", tipo: "desborde", estado: "resuelta", descripcion: "Recolección extraordinaria programada.", distrito: "Cerro Colorado", direccion: "Av. Venezuela 1200", contenedorCodigo: "CT-0905", reportadoPor: "Vecino anónimo", reportadoEn: "2026-06-25T09:10:00-05:00" },
  { id: "INC-0998", tipo: "otro", estado: "en_atencion", descripcion: "Se requiere evaluación de capacidad del punto.", distrito: "Sachaca", direccion: "Av. Grau 420", contenedorCodigo: "CT-0246", reportadoPor: "Personal municipal", reportadoEn: "2026-06-24T15:30:00-05:00" },
];

export const camiones: Camion[] = [
  { id: "cam-01", placa: "V1A-214", modelo: "Volvo VM 270", capacidadKg: 8000, estado: "en_ruta", rutaActualId: "ruta-01" },
  { id: "cam-02", placa: "V2B-508", modelo: "Mercedes-Benz Atego", capacidadKg: 7500, estado: "en_ruta", rutaActualId: "ruta-02" },
  { id: "cam-03", placa: "V3C-119", modelo: "Hino 300", capacidadKg: 5000, estado: "disponible" },
  { id: "cam-04", placa: "V4D-773", modelo: "Isuzu NPR", capacidadKg: 6000, estado: "mantenimiento" },
];

export const rutas: Ruta[] = [
  { id: "ruta-01", codigo: "R-01", nombre: "Centro Histórico", distrito: "Cercado", camionId: "cam-01", estado: "en_curso", progreso: 68, paradasTotal: 24, paradasCompletadas: 16, horaInicio: "06:00" },
  { id: "ruta-02", codigo: "R-02", nombre: "Circuito Cayma", distrito: "Cayma", camionId: "cam-02", estado: "en_curso", progreso: 41, paradasTotal: 20, paradasCompletadas: 8, horaInicio: "06:30" },
  { id: "ruta-03", codigo: "R-03", nombre: "Eje Yanahuara", distrito: "Yanahuara", camionId: "cam-03", estado: "planificada", progreso: 0, paradasTotal: 18, paradasCompletadas: 0, horaInicio: "13:00" },
  { id: "ruta-04", codigo: "R-04", nombre: "Zona Sur", distrito: "Jacobo Hunter", camionId: "cam-04", estado: "cancelada", progreso: 0, paradasTotal: 22, paradasCompletadas: 0, horaInicio: "07:00" },
  { id: "ruta-05", codigo: "R-05", nombre: "Anillo Paucarpata", distrito: "Paucarpata", camionId: "cam-03", estado: "completada", progreso: 100, paradasTotal: 26, paradasCompletadas: 26, horaInicio: "05:30", horaFin: "10:45" },
];

export const asociacionesReciclador: AsociacionReciclador[] = [
  { id: "asoc-01", nombre: "Asociación de Recicladores Arequipa Norte", distrito: "Cayma", recicladores: 24, toneladasMes: 18.6, estado: "activa" },
  { id: "asoc-02", nombre: "Recicladora Cercado Histórico", distrito: "Cercado", recicladores: 31, toneladasMes: 22.4, estado: "activa" },
  { id: "asoc-03", nombre: "Red de Recicladores Yanahuara", distrito: "Yanahuara", recicladores: 12, toneladasMes: 7.9, estado: "activa" },
  { id: "asoc-04", nombre: "Asociación Sur Recicla", distrito: "Jacobo Hunter", recicladores: 19, toneladasMes: 11.2, estado: "inactiva" },
];

export const indicadoresPorDistrito: IndicadorDistrito[] = [
  { distritoId: "cayma", distrito: "Cayma", contenedores: 42, contenedoresCriticos: 1, saturacionPromedio: 58, toneladasRecuperadas: 21.4, recicladoresActivos: 24, incidenciasAbiertas: 1 },
  { distritoId: "cercado", distrito: "Cercado", contenedores: 57, contenedoresCriticos: 1, saturacionPromedio: 67, toneladasRecuperadas: 28.9, recicladoresActivos: 31, incidenciasAbiertas: 1 },
  { distritoId: "yanahuara", distrito: "Yanahuara", contenedores: 33, contenedoresCriticos: 0, saturacionPromedio: 44, toneladasRecuperadas: 9.7, recicladoresActivos: 12, incidenciasAbiertas: 1 },
  { distritoId: "jlbyr", distrito: "J. L. Bustamante y Rivero", contenedores: 38, contenedoresCriticos: 0, saturacionPromedio: 61, toneladasRecuperadas: 16.3, recicladoresActivos: 15, incidenciasAbiertas: 0 },
  { distritoId: "miraflores", distrito: "Miraflores", contenedores: 29, contenedoresCriticos: 0, saturacionPromedio: 39, toneladasRecuperadas: 8.4, recicladoresActivos: 9, incidenciasAbiertas: 0 },
  { distritoId: "cerro-colorado", distrito: "Cerro Colorado", contenedores: 46, contenedoresCriticos: 0, saturacionPromedio: 52, toneladasRecuperadas: 14.1, recicladoresActivos: 17, incidenciasAbiertas: 0 },
  { distritoId: "alto-selva-alegre", distrito: "Alto Selva Alegre", contenedores: 34, contenedoresCriticos: 0, saturacionPromedio: 47, toneladasRecuperadas: 10.8, recicladoresActivos: 11, incidenciasAbiertas: 0 },
  { distritoId: "paucarpata", distrito: "Paucarpata", contenedores: 51, contenedoresCriticos: 0, saturacionPromedio: 55, toneladasRecuperadas: 18.2, recicladoresActivos: 22, incidenciasAbiertas: 0 },
  { distritoId: "mariano-melgar", distrito: "Mariano Melgar", contenedores: 37, contenedoresCriticos: 0, saturacionPromedio: 49, toneladasRecuperadas: 12.5, recicladoresActivos: 14, incidenciasAbiertas: 0 },
  { distritoId: "jacobo-hunter", distrito: "Jacobo Hunter", contenedores: 40, contenedoresCriticos: 0, saturacionPromedio: 53, toneladasRecuperadas: 13.7, recicladoresActivos: 19, incidenciasAbiertas: 0 },
  { distritoId: "sachaca", distrito: "Sachaca", contenedores: 25, contenedoresCriticos: 0, saturacionPromedio: 41, toneladasRecuperadas: 7.1, recicladoresActivos: 8, incidenciasAbiertas: 1 },
  { distritoId: "socabaya", distrito: "Socabaya", contenedores: 22, contenedoresCriticos: 0, saturacionPromedio: 38, toneladasRecuperadas: 6.3, recicladoresActivos: 7, incidenciasAbiertas: 0 },
];

export const notificaciones: Notificacion[] = [
  { id: "not-01", tipo: "camion_cerca", canal: "push", estado: "leida", titulo: "El camión está cerca", mensaje: "La ruta R-01 llegará a tu zona en unos minutos.", fecha: "2026-06-28T07:55:00-05:00", leida: true },
  { id: "not-02", tipo: "basura_sacada", canal: "push", estado: "enviada", titulo: "Recuerda sacar la basura", mensaje: "Hoy pasa la recolección por Cercado entre 06:00 y 09:00.", fecha: "2026-06-28T06:00:00-05:00", leida: false },
  { id: "not-03", tipo: "reciclaje_logrado", canal: "whatsapp", estado: "leida", titulo: "¡Reciclaste 3,2 kg!", mensaje: "Ganaste 40 puntos por tu última entrega.", fecha: "2026-06-27T17:20:00-05:00", leida: true },
  { id: "not-04", tipo: "reciclador_cerca", canal: "push", estado: "enviada", titulo: "Reciclador en tu zona", mensaje: "Un reciclador de la asociación Arequipa Norte está cerca.", fecha: "2026-06-27T10:05:00-05:00", leida: false },
  { id: "not-05", tipo: "basura_no_sacada", canal: "sms", estado: "fallida", titulo: "No registramos tu residuo", mensaje: "El camión pasó pero no encontramos residuos en tu punto.", fecha: "2026-06-26T09:30:00-05:00", leida: false },
];

export const kpis: KpiResumen = {
  actualizadoEn: "Hace 2 minutos",
  items: [
    { id: "toneladas", label: "Toneladas recuperadas", valor: "128,4 t", cambio: "+12,5%", tendencia: "up" },
    { id: "saturacion", label: "Saturación promedio", valor: "63,2%", cambio: "+3,1%", tendencia: "up" },
    { id: "criticos", label: "Contenedores críticos", valor: "12", cambio: "+4 hoy", tendencia: "up" },
    { id: "recicladores", label: "Recicladores activos", valor: "86", cambio: "+8,2%", tendencia: "up" },
  ],
};

export const tendencia: SerieTendencia = {
  titulo: "Residuos recuperados",
  subtitulo: "Toneladas recolectadas durante junio",
  periodo: "Últimos 30 días",
  unidad: "t",
  valorMaximo: 160,
  total: "128,4 t",
  cambio: "+12,5%",
  comparativa: "respecto al periodo anterior",
  ejeX: ["1 Jun", "5 Jun", "10 Jun", "15 Jun", "20 Jun", "25 Jun", "30 Jun"],
  ejeY: ["160 t", "120 t", "80 t", "40 t", "0"],
  valores: [18, 33, 25, 63, 53, 95, 80, 126, 110, 139, 159, 145, 173],
};
