import { CONTACTO } from '../datos/contenido';

/** Enlace de WhatsApp al número de RYSCOM, con el mensaje ya escrito. */
export const enlaceWhatsapp = (mensaje: string) =>
  `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
