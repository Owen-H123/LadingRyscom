import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { CONTENEDOR, VIDRIO } from '../componentes/estilos';
import { FondoFundido } from '../componentes/fondos';
import { Naranja } from '../componentes/texto';
import { QUE_HACEMOS } from '../datos/contenido';
import { useAnimacion } from '../hooks/use-animacion';

/** «Todo lo que hacemos.»: los servicios en texto corto, numerados. */
export function Servicios() {
  const ref = useAnimacion<HTMLElement>((raiz) => {
    const disparo = { trigger: raiz.querySelector('[data-items]'), start: 'top 82%', once: true };
    gsap.from(raiz.querySelectorAll('[data-item]'), {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: disparo,
    });
    gsap.from(raiz.querySelector('[data-pildora]'), {
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: 0.6,
      ease: 'power3.out',
      scrollTrigger: disparo,
    });
  });

  return (
    <section
      ref={ref}
      id="servicios"
      className="relative isolate scroll-mt-20 overflow-hidden py-24 md:py-36"
    >
      <FondoFundido src="/trabajos/ajuste-equipos.jpg" brillo={0.4} />
      <div className={CONTENEDOR}>
        <div className="max-w-2xl">
          <h2 data-split className="text-5xl md:text-7xl">
            Todo lo que <Naranja>hacemos.</Naranja>
          </h2>
          <p className="mt-5 text-lg text-white/75 md:text-xl">
            Mantenimiento y construcción para torres y estaciones de telecomunicaciones.
          </p>
        </div>
        <ol data-items className="mt-14 grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {QUE_HACEMOS.map((q, i) => (
            <li key={q.titulo} data-item className="border-t border-white/15 py-6">
              <p className="text-primary text-sm font-bold tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 text-2xl md:text-3xl">{q.titulo}</h3>
              <p className="mt-2 text-white/70">{q.texto}</p>
            </li>
          ))}
        </ol>
        <p
          data-pildora
          className={cn(VIDRIO, 'mt-12 inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold')}
        >
          <span className="text-[#c9f23a]">●</span> 6 servicios activos
        </p>
      </div>
    </section>
  );
}
