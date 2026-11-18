import { gsap } from '@/lib/gsap';
import { FondoFundido } from '../componentes/fondos';
import { Naranja } from '../componentes/texto';
import { useAnimacion } from '../hooks/use-animacion';

/** «Señal. Datos. Voz. Todo pasa por una torre.» Las palabras entran de golpe al llegar. */
export function Apertura() {
  const ref = useAnimacion<HTMLElement>((raiz) => {
    gsap.from(raiz.querySelectorAll('[data-golpe]'), {
      scale: 2.4,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out',
      stagger: 0.28,
      scrollTrigger: { trigger: raiz, start: 'top 70%', once: true },
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
