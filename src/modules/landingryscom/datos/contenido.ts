/**
 * Todo el texto y los datos de la página de inicio. Para cambiar un título, una foto o los datos
 * de contacto no hay que tocar los componentes.
 */

export const LEMA = 'Mantenemos lo que nos conecta.';

/**
 * Datos de contacto. Los vacíos no se muestran: llénalos cuando los tengas y aparecen solos
 * (también el enlace «Contacto» del menú).
 */
export const CONTACTO = {
  telefono: '902 159 807',
  whatsapp: '51902159807', // solo dígitos con código de país
  correo: '',
  direccion: '',
};

export const hayContacto = Object.values(CONTACTO).some(Boolean);

/** Enlaces del menú y del pie: las secciones de la página. */
export const ENLACES_MENU = [
  { href: '#servicios', texto: 'Servicios' },
  { href: '#trabajos', texto: 'Trabajos' },
  ...(hayContacto ? [{ href: '#contacto', texto: 'Contacto' }] : []),
];

/* ---------- Portada ---------- */

export const TITULO_PORTADA = ['Mantenemos', 'lo', 'que', 'nos', 'conecta.'];

/** Fotos reales de trabajos en campo, para la franja que desfila bajo la portada. */
export const FOTOS_FRANJA = [
  { src: '/fotos/campo-2.webp', alt: 'Técnico ajustando una estructura en altura, en la sierra' },
  { src: '/fotos/campo-5.webp', alt: 'Técnico midiendo junto a torres de telecomunicaciones' },
  { src: '/fotos/campo-1.webp', alt: 'Vista desde lo alto de una torre durante un trabajo' },
  { src: '/fotos/campo-4.webp', alt: 'Técnico con traje y equipo de protección completo' },
  { src: '/fotos/campo-3.webp', alt: 'Técnico con fumigadora y equipo de protección' },
  { src: '/fotos/campo-6.webp', alt: 'Técnico subiendo a una estación con antenas' },
];

/* ---------- Declaración ---------- */

/** La frase que se enciende palabra por palabra; `true` marca las palabras en naranja. */
export const FRASE: [string, boolean?][] = [
  ['Trabajo'], ['en'], ['altura,', true], ['con'], ['arnés'], ['y'], ['equipo'], ['de'],
  ['protección', true], ['completo.'], ['Cada'], ['actividad,'], ['documentada.', true],
];

/* ---------- Servicios ---------- */

export const QUE_HACEMOS = [
  { titulo: 'Torres', texto: 'Mantenimiento preventivo y correctivo, en altura.' },
  { titulo: 'Equipos', texto: 'Revisión y ajuste de equipos y accesorios.' },
  { titulo: 'Sitios', texto: 'Obras nuevas y ampliaciones, de principio a fin.' },
  { titulo: 'Logística', texto: 'Personal y materiales hasta cada sitio.' },
  { titulo: 'Seguridad', texto: 'Arnés y equipo de protección en cada intervención.' },
  { titulo: 'Informes', texto: 'Fotos de antes, durante y finalizado, listas para el cliente.' },
];

/* ---------- Trabajos (carrusel) ---------- */

export const TRABAJOS = [
  { foto: '/trabajos/ajuste-equipos.webp', titulo: 'Revisión y ajuste', texto: 'Equipos y accesorios de la torre' },
  { foto: '/trabajos/torre-estructura.webp', titulo: 'Mantenimiento de torres', texto: 'Preventivo y correctivo, en altura' },
  { foto: '/trabajos/camino-al-sitio.webp', titulo: 'Sitios nuevos', texto: 'Obras y ampliaciones, de principio a fin' },
  { foto: '/fotos/campo-5.webp', titulo: 'Logística', texto: 'Traslado de personal y materiales' },
  { foto: '/fotos/campo-2.webp', titulo: 'Cable de vida y grilletes', texto: 'Material incluido si la orden lo pide' },
];

/* ---------- Contacto ---------- */

/** Servicios que se pueden elegir en el formulario de cotización. */
export const OPCIONES_COTIZACION = [
  'Mantenimiento de torres y estaciones',
  'Suministro e instalación',
  'Construcción y obras',
  'Logística y desplazamiento',
];
