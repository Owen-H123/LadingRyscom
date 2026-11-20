import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

export { gsap, ScrollSmoother, ScrollTrigger, SplitText };

/** La persona pidió «reducir movimiento» en su sistema: no se anima nada. */
export const sinMovimiento = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** El scroll suave de la página; undefined si no está activo (o con «reducir movimiento»). */
export let suavizado: ScrollSmoother | undefined;

/**
 * Segundos que tarda el scroll suave en alcanzar la posición de la rueda. Más alto = más «arrastre»
 * (la página arranca tarde y luego corre). 0 = scroll normal del navegador, sin retraso.
 */
const SUAVIDAD: number = 0;

/**
 * Activa el scroll suave sobre #smooth-wrapper y #smooth-content, y hace que los enlaces
 * «#sección» se deslicen hasta su destino. Debe llamarse ANTES de crear cualquier ScrollTrigger.
 * Devuelve la función que lo desmonta.
 */
export function crearSuavizado(): () => void {
  if (sinMovimiento() || SUAVIDAD === 0) {
    // Sin scroll suave, los enlaces internos usan el desplazamiento nativo.
    document.documentElement.classList.add('scroll-smooth');
    return () => document.documentElement.classList.remove('scroll-smooth');
  }

  const smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: SUAVIDAD,
  });
  suavizado = smoother;

  const alHacerClic = (e: MouseEvent) => {
    const enlace = (e.target as Element).closest<HTMLAnchorElement>(
      'a[href^="#"]',
    );
    const destino = enlace?.getAttribute('href');
    if (!enlace || !destino || destino === '#') return;
    const elemento = document.querySelector(destino);
    if (!elemento) return;
    e.preventDefault();
    smoother.scrollTo(elemento, true, 'top 72px');
  };
  document.addEventListener('click', alHacerClic);

  return () => {
    document.removeEventListener('click', alHacerClic);
    smoother.kill();
    suavizado = undefined;
  };
}

