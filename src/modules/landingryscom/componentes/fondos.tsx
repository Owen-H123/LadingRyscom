import { cn } from '@/lib/utils';

/**
 * Degradado que diluye el fondo de una sección en el azul noche, arriba y abajo, para que las
 * secciones se unan sin corte. Es sólido unos píxeles antes del borde y sobresale 1 px: así no
 * asoma una línea de la foto cuando la página queda en una posición con fracciones de píxel.
 */
export function Fundido() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 -inset-y-px -z-10 bg-[linear-gradient(to_bottom,#050f1c,#050f1c_3%,rgba(5,15,28,0)_20%,rgba(5,15,28,0)_80%,#050f1c_97%,#050f1c)]"
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
