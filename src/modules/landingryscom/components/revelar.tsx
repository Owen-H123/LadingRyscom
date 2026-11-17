import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Hace que su contenido suba y aparezca al entrar en pantalla. Lo que ya está a la vista al
 * cargar no se anima, y con «reducir movimiento» (o sin JavaScript) todo se ve de inmediato.
 */
export function Revelar({
  children,
  className,
  retraso = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** Milisegundos de espera, para que varias tarjetas entren en cascada. */
  retraso?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [oculto, setOculto] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setOculto(true);
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setOculto(false);
          observador.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: oculto ? '0ms' : `${retraso}ms` }}
      className={cn(
        'transition-[opacity,translate] duration-700 ease-out',
        oculto && 'translate-y-6 opacity-0',
        className,
      )}
    >
      {children}
    </div>
  );
}
