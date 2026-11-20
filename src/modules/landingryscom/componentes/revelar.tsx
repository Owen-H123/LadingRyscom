import { useLayoutEffect, useRef } from 'react';
import { gsap, sinMovimiento } from '@/lib/gsap';

/**
 * Hace que su contenido suba y aparezca al entrar en pantalla (GSAP + ScrollTrigger).
 * Con «reducir movimiento» se ve todo de inmediato.
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

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || sinMovimiento()) return;
    const contexto = gsap.context(() => {
      gsap.from(el, {
        y: 44,
        opacity: 0,
        duration: 0.55,
        delay: retraso / 2000,
        ease: 'power3.out',
        clearProps: 'opacity,transform',
        scrollTrigger: { trigger: el, start: 'top 95%', once: true },
      });
    }, el);
    return () => contexto.revert();
  }, [retraso]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
