/**
 * Todo lo que leen Google y las redes sociales y que no se ve en la página: título de la pestaña,
 * descripción del resultado de búsqueda, datos estructurados (JSON-LD) y sitemap.
 *
 * Reglas para editarlo:
 * - El título va entre 50 y 60 caracteres; la descripción, entre 140 y 160.
 * - No poner datos que no sean reales (años, clientes, certificaciones): Google los contrasta.
 */
import { CONTACTO, FOTOS_FRANJA, NOSOTROS, TRABAJOS } from '../src/modules/landingryscom/datos/contenido.ts';

export const TITULO = 'Mantenimiento de Torres de Telecomunicaciones | RYSCOM Perú';

export const DESCRIPCION =
  'Mantenimiento preventivo y correctivo de torres y estaciones de telecomunicaciones en Perú. Obras nuevas, trabajo seguro en altura e informes con fotos.';

/** Imagen de 1200×630 para WhatsApp, LinkedIn, Facebook y X (scripts/generar-imagenes-seo.mjs). */
export const IMAGEN_SOCIAL = {
  ruta: '/og-ryscom.jpg',
  ancho: 1200,
  alto: 630,
  alt: 'Técnico de RYSCOM al pie de una torre de telecomunicaciones con antenas',
};

const TELEFONO = `+${CONTACTO.whatsapp}`;

/** Servicios tal como se ofrecen en el formulario de cotización, con su descripción. */
const SERVICIOS = [
  {
    nombre: 'Mantenimiento de torres y estaciones de telecomunicaciones',
    descripcion:
      'Mantenimiento preventivo y correctivo de torres y estaciones de telecomunicaciones, con trabajo en altura, arnés y equipo de protección completo.',
  },
  {
    nombre: 'Suministro e instalación de equipos en torres',
    descripcion:
      'Revisión, ajuste e instalación de equipos y accesorios de la torre, con material como cable de vida y grilletes cuando la orden lo pide.',
  },
  {
    nombre: 'Construcción de sitios de telecomunicaciones',
    descripcion: 'Obras nuevas y ampliaciones de sitios de telecomunicaciones, de principio a fin.',
  },
  {
    nombre: 'Logística y desplazamiento a sitios',
    descripcion: 'Traslado de personal y materiales hasta cada sitio.',
  },
];

/** Datos estructurados (schema.org): quién es la empresa, qué hace, dónde y cómo contactarla. */
export function datosEstructurados(url: string) {
  const empresa = `${url}/#empresa`;
  const sitio = `${url}/#sitio`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': empresa,
        name: 'RYSCOM',
        alternateName: 'RYSCOM Mantenimiento y Construcción',
        description: NOSOTROS.parrafos[0],
        url: `${url}/`,
        logo: `${url}/ryscom-logo.webp`,
        image: `${url}${IMAGEN_SOCIAL.ruta}`,
        telephone: TELEFONO,
        areaServed: { '@type': 'Country', name: 'Perú' },
        knowsAbout: [
          'Mantenimiento de torres de telecomunicaciones',
          'Mantenimiento de estaciones base',
          'Trabajo en altura',
          'Construcción de sitios de telecomunicaciones',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: TELEFONO,
          contactType: 'sales',
          areaServed: 'PE',
          availableLanguage: 'Spanish',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicios para torres y estaciones de telecomunicaciones',
          itemListElement: SERVICIOS.map((s) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: s.nombre,
              description: s.descripcion,
              areaServed: { '@type': 'Country', name: 'Perú' },
              provider: { '@id': empresa },
            },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': sitio,
        name: 'RYSCOM',
        url: `${url}/`,
        inLanguage: 'es-PE',
        publisher: { '@id': empresa },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}/#pagina`,
        url: `${url}/`,
        name: TITULO,
        description: DESCRIPCION,
        inLanguage: 'es-PE',
        isPartOf: { '@id': sitio },
        about: { '@id': empresa },
        primaryImageOfPage: { '@type': 'ImageObject', url: `${url}/fotos/hero.webp` },
      },
    ],
  };
}

/** Fotos que se listan en el sitemap, para que aparezcan en Google Imágenes. */
export const FOTOS_SITEMAP = [
  ...new Set([
    '/fotos/hero.webp',
    ...TRABAJOS.map((t) => t.foto),
    ...FOTOS_FRANJA.map((f) => f.src),
    NOSOTROS.foto.src,
  ]),
];
