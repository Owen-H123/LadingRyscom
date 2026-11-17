import { useEffect, useRef, useState } from 'react';

const reducirMovimiento = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Video de fondo, sin sonido y en bucle.
 * - Solo se descarga en pantallas grandes (en celular no se usa y gastaría datos).
 * - Con «reducir movimiento» activado en el sistema, se queda en el primer cuadro.
 * - `posicion` decide qué parte se ve cuando el video se recorta para llenar el espacio.
 */
export function FondoVideo({
  fuentes,
  posicion = '50% 50%',
  className,
}: {
  /** Dos versiones del mismo video: la ligera para pantallas pequeñas o conexión limitada. */
  fuentes: { ligera: string; alta: string };
  posicion?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [grande, setGrande] = useState(false);
  const [src, setSrc] = useState(fuentes.ligera);

  useEffect(() => {
    const consulta = window.matchMedia('(min-width: 1024px)');
    const actualizar = () => {
      setGrande(consulta.matches);
      // El video llena la mitad de la ventana: se pide la versión alta solo si
      // esa mitad, en píxeles reales de la pantalla, supera lo que da la ligera.
      const conexion = (
        navigator as Navigator & { connection?: { saveData?: boolean } }
      ).connection;
      const pixeles = (window.innerWidth / 2) * window.devicePixelRatio;
      setSrc(
        pixeles > 800 && !conexion?.saveData ? fuentes.alta : fuentes.ligera,
      );
    };
    actualizar();
    consulta.addEventListener('change', actualizar);
    return () => consulta.removeEventListener('change', actualizar);
  }, [fuentes.alta, fuentes.ligera]);

  if (!grande) return null;
  return (
    <video
      ref={ref}
      src={src}
      className={className}
      style={{ objectPosition: posicion }}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
      disablePictureInPicture
      onLoadedData={() => reducirMovimiento() && ref.current?.pause()}
    />
  );
}
