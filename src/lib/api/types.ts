/**
 * Domain types for the TrackTrash data layer.
 *
 * These mirror the real .NET/SQL schema (actores, tiempo real, contenedores/IoT,
 * reciclaje, gamificación y notificaciones). Field names stay close to the domain
 * vocabulary in Spanish, while identifiers remain English-friendly and consistent.
 */

export type Rol =
  | "vecino"
  | "reciclador"
  | "personal_municipal"
  | "institucion"
  | "admin";

export type Ubicacion = {
  lat: number;
  lng: number;
};

export type Distrito = {
  id: string;
  nombre: string;
  provincia: string;
};

/** "Tacho Vivo" state derived from the fill level. */
export type EstadoNivel = "feliz" | "preocupado" | "enojado";

export type TipoContenedor =
  | "organico"
  | "reciclable"
  | "mixto"
  | "vidrio"
  | "plastico";

/** `contenedor` + `dispositivo_iot` + latest `lectura_nivel`. */
export type Contenedor = {
  id: string;
  codigo: string;
  direccion: string;
  distritoId: string;
  distrito: string;
  tipo: TipoContenedor;
  nivel: number;
  tieneSensor: boolean;
  bateria: number;
  ultimoContacto: string;
  ubicacion: Ubicacion;
};

/** Alert severity row used by the panel. */
export type EstadoAlerta = "critical" | "warning";

export type Alerta = {
  codigo: string;
  direccion: string;
  distrito: string;
  nivel: number;
  ultimoContacto: string;
  estado: EstadoAlerta;
};

export type TipoIncidencia =
  | "desborde"
  | "contenedor_danado"
  | "sensor_sin_conexion"
  | "basura_fuera_contenedor"
  | "otro";

export type EstadoIncidencia = "abierta" | "en_atencion" | "resuelta";

export type Incidencia = {
  id: string;
  tipo: TipoIncidencia;
  estado: EstadoIncidencia;
  descripcion: string;
  distrito: string;
  direccion: string;
  contenedorCodigo?: string;
  reportadoPor: string;
  reportadoEn: string;
};

export type EstadoRuta = "planificada" | "en_curso" | "completada" | "cancelada";

export type Ruta = {
  id: string;
  codigo: string;
  nombre: string;
  distrito: string;
  camionId: string;
  estado: EstadoRuta;
  progreso: number;
  paradasTotal: number;
  paradasCompletadas: number;
  horaInicio: string;
  horaFin?: string;
};

export type EstadoCamion = "disponible" | "en_ruta" | "mantenimiento";

export type Camion = {
  id: string;
  placa: string;
  modelo: string;
  capacidadKg: number;
  estado: EstadoCamion;
  rutaActualId?: string;
};

export type EstadoAsociacion = "activa" | "inactiva";

export type AsociacionReciclador = {
  id: string;
  nombre: string;
  distrito: string;
  recicladores: number;
  toneladasMes: number;
  estado: EstadoAsociacion;
};

export type IndicadorDistrito = {
  distritoId: string;
  distrito: string;
  contenedores: number;
  contenedoresCriticos: number;
  saturacionPromedio: number;
  toneladasRecuperadas: number;
  recicladoresActivos: number;
  incidenciasAbiertas: number;
};

export type TipoNotificacion =
  | "camion_cerca"
  | "basura_sacada"
  | "basura_no_sacada"
  | "reciclador_cerca"
  | "reciclaje_logrado";

export type CanalNotificacion = "push" | "sms" | "email" | "whatsapp";

export type EstadoNotificacion = "enviada" | "leida" | "fallida";

export type Notificacion = {
  id: string;
  tipo: TipoNotificacion;
  canal: CanalNotificacion;
  estado: EstadoNotificacion;
  titulo: string;
  mensaje: string;
  fecha: string;
  leida: boolean;
};

export type Tendencia = "up" | "down" | "flat";

/** Identifiers for the four panel KPIs. */
export type KpiId = "toneladas" | "saturacion" | "criticos" | "recicladores";

export type KpiItem = {
  id: KpiId;
  label: string;
  valor: string;
  cambio: string;
  tendencia: Tendencia;
};

export type KpiResumen = {
  actualizadoEn: string;
  items: KpiItem[];
};

/** Recovered-waste trend series shown in the panel chart. */
export type SerieTendencia = {
  titulo: string;
  subtitulo: string;
  periodo: string;
  unidad: string;
  valorMaximo: number;
  total: string;
  cambio: string;
  comparativa: string;
  ejeX: string[];
  ejeY: string[];
  valores: number[];
};

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
};

/** Maps a fill level to its "Tacho Vivo" state. `<40%` feliz, `40–80%` preocupado, `>80%` enojado. */
export function estadoDesdeNivel(porcentaje: number): EstadoNivel {
  if (porcentaje < 40) return "feliz";
  if (porcentaje <= 80) return "preocupado";
  return "enojado";
}
