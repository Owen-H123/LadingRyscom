import { Fragment } from 'react';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { FondoFundido, Marco } from '../componentes/fondos';
import { CONTENEDOR } from '../componentes/estilos';
import { FRASE } from '../datos/contenido';
import { useAnimacion } from '../hooks/use-animacion';

/** «Trabajo en altura…»: la frase se enciende palabra por palabra mientras se baja. */
export function Declaracion() {
  const ref = useAnimacion<HTMLElement>((raiz) => {
    gsap.fromTo(
      raiz.querySelectorAll('[data-palabra]'),
      { opacity: 0.18 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: {
          trigger: raiz.querySelector('[data-frase]'),
          start: 'top 80%',
          end: 'bottom 45%',
          scrub: true,
        },
      },
    );
    raiz.querySelectorAll('[data-foto]').forEach((foto, i) =>
      gsap.from(foto, {
        x: 260 + i * 120,
        rotation: i ? -10 : 10,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: raiz, start: 'top 85%', once: true },
      }),
    );
  });

  return (
    <section ref={ref} className="relative isolate overflow-hidden py-24 md:py-36">
      <FondoFundido src="/trabajos/torre-estructura.webp" brillo={0.4} />
      <div className={cn(CONTENEDOR, 'grid items-center gap-14 lg:grid-cols-[1.618fr_1fr]')}>
        <p
          data-frase
          className="text-[2.5rem] leading-[1.1] font-extrabold tracking-[-0.04em] md:text-6xl lg:text-[4.3rem]"
        >
          {FRASE.map(([palabra, clave], i) => (
            <Fragment key={i}>
              <span data-palabra className={cn('inline-block', clave && 'text-primary')}>
                {palabra}
              </span>{' '}
            </Fragment>
          ))}
        </p>
        <div className="relative mx-auto h-[26rem] w-full max-w-md md:h-[32rem]">
          <Marco
            data-foto
            src="/fotos/campo-4.webp"
            alt="Técnico con traje y equipo de protección completo"
            className="absolute top-0 left-0 h-[72%] w-[64%] -rotate-[5deg]"
          />
          <Marco
            data-foto
            src="/fotos/campo-2.webp"
            alt="Técnico ajustando una estructura en altura"
            className="absolute right-0 bottom-0 h-[62%] w-[58%] rotate-[6deg]"
          />
        </div>
      </div>
    </section>
  );
}
