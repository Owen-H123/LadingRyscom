import { IconoWhatsapp } from '@/components/shared/icono-whatsapp';
import { CONTACTO } from '../datos/contenido';

const MENSAJE = 'Hola, quisiera información sobre los servicios de RYSCOM.';

/**
 * Botón flotante de WhatsApp, fijo en la esquina inferior derecha. Muestra solo el ícono y,
 * al pasar el mouse o enfocarlo, se abre con el texto «Escríbenos». No se muestra si no hay
 * número de WhatsApp en `datos.ts`.
 */
export function BotonWhatsapp() {
  if (!CONTACTO.whatsapp) return null;
  return (
    <a
      href={`https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(MENSAJE)}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex h-14 items-center overflow-hidden rounded-full bg-[#25D366] text-white shadow-xl shadow-black/25 outline-none transition-all duration-300 hover:shadow-2xl focus-visible:ring-4 focus-visible:ring-[#25D366]/40 active:scale-95 md:right-6 md:bottom-6"
    >
      {/* Aro que late suave para llamar la atención; se omite con «reducir movimiento». */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 motion-safe:animate-ping [animation-duration:2.6s]"
      />
      <span className="relative flex size-14 shrink-0 items-center justify-center">
        <IconoWhatsapp className="size-8" />
      </span>
      <span className="relative max-w-0 overflow-hidden pr-0 text-sm font-medium whitespace-nowrap transition-all duration-300 group-hover:max-w-40 group-hover:pr-5 group-focus-visible:max-w-40 group-focus-visible:pr-5">
        Escríbenos
      </span>
    </a>
  );
}
