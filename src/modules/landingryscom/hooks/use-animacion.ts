import { useLayoutEffect, useRef } from 'react';
import { gsap, sinMovimiento } from '@/lib/gsap';

/**
 * Anima con GSAP lo que hay dentro de un elemento (normalmente una sección). Todo lo creado en
 * `animar` se deshace al desmontar. Con «reducir movimiento» no hace nada.
 */
export function useAnimacion<T extends HTMLElement>(animar: (raiz: T) => void) {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const raiz = ref.current;
    if (!raiz || sinMovimiento()) return;
    const contexto = gsap.context(() => animar(raiz), raiz);
    return () => contexto.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}
