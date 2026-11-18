import { cn } from '@/lib/utils';

/**
 * Degradado que diluye el fondo de una sección en el azul noche, arriba y abajo, para que las
 * secciones se unan sin corte.
 *
 * Además pone dos «costuras»: franjas opacas de azul noche en el borde superior e inferior, por
 * encima de todo el fondo. El navegador pinta las fotos desenfocadas en capas aparte y, en ciertas
 * posiciones del scroll, la última fila de píxeles de esa capa quedaba fuera del degradado: se veía
 * una línea clara entre secciones. Las costuras caen dentro del relleno de la sección (py-24), así
 * que no tapan contenido.
 */
export function Fundido() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,#050f1c,#050f1c_3%,rgba(5,15,28,0)_20%,rgba(5,15,28,0)_80%,#050f1c_97%,#050f1c)]"
      />
      <Costura lado="arriba" />
      <Costura lado="abajo" />
    </>
  );
}

/** Franja opaca de azul noche en el borde de una sección (ver Fundido). */
export function Costura({ lado }: { lado: 'arriba' | 'abajo' }) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-x-0 z-10 h-2 bg-[#050f1c]',
        lado === 'arriba' ? 'top-0' : 'bottom-0',
      )}
    />
  );
}

/** Foto de fondo desenfocada y oscurecida, como en las escenas del video. */
function Fondo({ src, brillo = 0.45 }: { src: string; brillo?: number }) {
  return (
    <img
      aria-hidden
      src={src}
      alt=""
      loading="lazy"
      style={{ filter: `blur(32px) brightness(${brillo}) saturate(1.3)` }}
      className="absolute -inset-[8%] -z-10 size-[116%] max-w-none object-cover"
    />
  );
}

/** Fondo de foto con su fundido: lo usan las secciones con foto desenfocada. */
export function FondoFundido(props: { src: string; brillo?: number }) {
  return (
    <>
      <Fondo {...props} />
      <Fundido />
    </>
  );
}

/** Foto enmarcada con borde blanco y sombra, ligeramente girada. */
export function Marco({
  src,
  alt,
  className,
  ...resto
}: { src: string; alt: string; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...resto}
      className={cn(
        'overflow-hidden rounded-[2rem] border-[3px] border-white/50 shadow-[0_30px_80px_rgba(0,0,0,.55)]',
        className,
      )}
    >
      <img src={src} alt={alt} loading="lazy" className="size-full object-cover" />
    </div>
  );
}
