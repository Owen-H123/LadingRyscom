import { gsap } from '@/lib/gsap';
import { FondoFundido } from '../componentes/fondos';
import { Naranja } from '../componentes/texto';
import { useAnimacion } from '../hooks/use-animacion';

/** «Señal. Datos. Voz. Todo pasa por una torre.» Las palabras entran de golpe al llegar. */
export function Apertura() {
  const ref = useAnimacion<HTMLElement>((raiz) => {
    const golpes = raiz.querySelectorAll('[data-golpe]');
    // will-change: el navegador escala las palabras como imagen en vez de volver a dibujar letras
    // gigantes en cada fotograma (eso trababa la página). Se quita al terminar para que el texto
    // quede nítido.
    gsap.set(golpes, { willChange: 'transform, opacity' });
    gsap.from(golpes, {
      scale: 2.4,
      opacity: 0,
      duration: 0.35,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: raiz, start: 'top 85%', once: true },
      onComplete: () => gsap.set(golpes, { clearProps: 'willChange' }),
    });
  });

  return (
    <section
      ref={ref}
      aria-label="Todo pasa por una torre"
      className="relative isolate overflow-hidden bg-black py-24 text-center md:py-32"
    >
      <FondoFundido src="/fotos/hero.webp" brillo={0.3} />
      <p className="text-[3.6rem] leading-none font-extrabold tracking-[-0.05em] sm:text-7xl md:text-[7.5rem]">
        <span data-golpe className="inline-block">
          Señal.
        </span>{' '}
        <span data-golpe className="text-primary inline-block">
          Datos.
        </span>{' '}
        <span data-golpe className="inline-block">
          Voz.
        </span>
      </p>
      <p data-golpe className="mt-6 text-3xl font-extrabold tracking-[-0.045em] md:text-5xl">
        Todo pasa por <Naranja>una torre.</Naranja>
      </p>
    </section>
  );
}
