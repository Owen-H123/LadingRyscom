import {
  Camera,
  ClipboardCheck,
  FileArchive,
  HardHat,
  type LucideIcon,
  RadioTower,
  ShieldCheck,
  Truck,
  Users,
  Wrench,
} from 'lucide-react';

/**
 * Todo el texto de la página de inicio vive aquí: para cambiar un título, un servicio o los datos
 * de contacto no hay que tocar los componentes.
 */

export const LEMA = 'Mantenemos lo que nos conecta.';

/**
 * Datos de contacto que se muestran en la página. Los vacíos no se muestran:
 * llénalos cuando los tengas y aparecen solos (también el enlace «Contacto» del menú).
 */
export const CONTACTO = {
  telefono: '',
  whatsapp: '', // solo dígitos con código de país, por ejemplo 51999999999
  correo: '',
  direccion: '',
};

export const hayContacto = Object.values(CONTACTO).some(Boolean);

export const ENLACES_MENU = [
  { href: '#servicios', texto: 'Servicios' },
  { href: '#proceso', texto: 'Cómo trabajamos' },
  { href: '#evidencia', texto: 'Evidencia' },
  { href: '#compromisos', texto: 'Compromisos' },
  ...(hayContacto ? [{ href: '#contacto', texto: 'Contacto' }] : []),
];

export const DIAPOSITIVAS = [
  {
    titulo: 'Mantenemos lo que nos conecta.',
    texto:
      'Mantenimiento y construcción para torres y estaciones de telecomunicaciones.',
    enlace: '#servicios',
  },
  {
    titulo: 'Cada trabajo, con su evidencia.',
    texto:
      'Fotos de antes, durante y finalizado, ordenadas por actividad y listas para el cliente.',
    enlace: '#evidencia',
  },
  {
    titulo: 'Seguridad primero, en cada intervención.',
    texto:
      'Ningún informe se cierra sin las fotos del personal con su equipo de protección.',
    enlace: '#compromisos',
  },
  {
    titulo: 'De la orden de compra al informe final.',
    texto: 'Un solo flujo, del pedido del cliente a la entrega, sin papeles.',
    enlace: '#proceso',
  },
];

export const SERVICIOS: { icono: LucideIcon; titulo: string; texto: string }[] =
  [
    {
      icono: RadioTower,
      titulo: 'Mantenimiento de torres y estaciones',
      texto:
        'Intervenciones preventivas y correctivas en torres y estaciones de telecomunicaciones, con cada actividad documentada.',
    },
    {
      icono: Wrench,
      titulo: 'Suministro e instalación',
      texto:
        'Cambio de cable de vida, grilletes y otros accesorios, con el material incluido cuando la orden lo pide.',
    },
    {
      icono: HardHat,
      titulo: 'Construcción y obras',
      texto:
        'Obras de infraestructura para sitios nuevos y ampliaciones, con seguimiento de principio a fin.',
    },
    {
      icono: Truck,
      titulo: 'Logística y desplazamiento',
      texto:
        'Traslado del personal y de los materiales hasta cada sitio de trabajo.',
    },
  ];

export const PASOS: { icono: LucideIcon; titulo: string; texto: string }[] = [
  {
    icono: ClipboardCheck,
    titulo: 'Recibimos la orden de compra',
    texto:
      'Cada línea de la orden se convierte en una actividad que se ejecuta en su sitio.',
  },
  {
    icono: Users,
    titulo: 'Asignamos al equipo',
    texto:
      'Abrimos un informe por orden y sitio, y asignamos a los técnicos que lo ejecutan.',
  },
  {
    icono: Camera,
    titulo: 'Ejecutamos con evidencia',
    texto:
      'Fotos del personal, de la torre y de cada actividad: antes, durante y finalizado.',
  },
  {
    icono: FileArchive,
    titulo: 'Revisamos y entregamos',
    texto:
      'El informe se revisa y se descarga completo, con las fotos en carpetas por actividad.',
  },
];

export const COMPROMISOS: {
  icono: LucideIcon;
  titulo: string;
  texto: string;
}[] = [
  {
    icono: ShieldCheck,
    titulo: 'Seguridad primero',
    texto:
      'Las fotos del personal con su equipo de protección son obligatorias para cerrar cualquier informe.',
  },
  {
    icono: Camera,
    titulo: 'Trazabilidad total',
    texto:
      'Cada foto queda con quién la subió y cuándo. Nada se borra: lo que se descarta solo se oculta.',
  },
  {
    icono: ClipboardCheck,
    titulo: 'Informes completos',
    texto:
      'El sistema no deja finalizar un trabajo al que le falten fotos, así el cliente recibe todo de una vez.',
  },
];
