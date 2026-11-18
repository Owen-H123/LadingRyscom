import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { gsap, sinMovimiento } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { CONTENEDOR } from '../componentes/estilos';
import { FondoFundido } from '../componentes/fondos';
import { Naranja } from '../componentes/texto';
import { TRABAJOS } from '../datos/contenido';
import { useAnimacion } from '../hooks/use-animacion';

/** Segundos que se muestra cada foto antes de pasar sola a la siguiente. */
const SEGUNDOS_POR_FOTO = 4;

/**
 * «Hecho en campo.»: carrusel de fotos que se desliza con el dedo, con flechas y puntos, y que
 * avanza solo mientras se ve (se detiene con el mouse encima o con el foco dentro).
 */
export function Trabajos() {
  const [activo, setActivo] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [visible, setVisible] = useState(false);
  const pista = useRef<HTMLUListElement>(null);
  const ref = useAnimacion<HTMLElement>((raiz) => {
    gsap.from(raiz.querySelectorAll('[data-tarjeta]'), {
      x: 400,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: raiz, start: 'top 70%', once: true },
    });
  });

  // La tarjeta activa es la más cercana al centro de la pista
  const alDesplazar = () => {
    const el = pista.current;
    if (!el) return;
    const centro = el.scrollLeft + el.clientWidth / 2;
    let mejor = 0;
    let distancia = Infinity;
    [...el.children].forEach((hijo, i) => {
      const h = hijo as HTMLElement;
      const d = Math.abs(h.offsetLeft + h.offsetWidth / 2 - centro);
      if (d < distancia) {
        distancia = d;
        mejor = i;
      }
    });
    setActivo(mejor);
  };

  const ir = (i: number) => {
    const el = pista.current;
    const hijo = el?.children[(i + TRABAJOS.length) % TRABAJOS.length] as HTMLElement | undefined;
    if (!el || !hijo) return;
    el.scrollTo({ left: hijo.offsetLeft - (el.clientWidth - hijo.offsetWidth) / 2, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observador = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.35,
    });
    observador.observe(el);
    return () => observador.disconnect();
  }, [ref]);

  useEffect(() => {
    if (pausado || !visible || sinMovimiento()) return;
    const id = window.setTimeout(() => ir(activo + 1), SEGUNDOS_POR_FOTO * 1000);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activo, pausado, visible]);

  const actual = TRABAJOS[activo];

  return (
    <section
      ref={ref}
      id="trabajos"
      className="relative isolate scroll-mt-20 overflow-hidden py-24 md:py-32"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
    >
      <FondoFundido src="/trabajos/torre-trabajo-en-altura.jpg" brillo={0.32} />

      <div className={CONTENEDOR}>
        <h2 data-split className="text-5xl md:text-7xl">
          Hecho <Naranja>en campo.</Naranja>
        </h2>
      </div>

      {/* La pista deja espacio abajo para la sombra de las fotos: si no, la corta en línea recta. */}
      <ul
        ref={pista}
        onScroll={alDesplazar}
        className="mt-12 -mb-16 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1rem,calc(50%-11rem))] pt-6 pb-24 [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden"
      >
        {TRABAJOS.map((t, i) => (
          <li key={t.titulo} data-tarjeta className="shrink-0 snap-center">
            <button
              type="button"
              onClick={() => ir(i)}
              aria-label={`${t.titulo}: ${t.texto}`}
              className={cn(
                'block aspect-[14/19] w-[70vw] max-w-[22rem] overflow-hidden rounded-[2.2rem] border-2 border-white/25 shadow-[0_30px_60px_rgba(0,0,0,.45)] transition-[scale,opacity,rotate] duration-500 sm:w-[22rem]',
                i === activo
                  ? 'scale-100 rotate-0 opacity-100'
                  : cn('scale-[.86] opacity-55', i < activo ? '-rotate-3' : 'rotate-3'),
              )}
            >
              <img src={t.foto} alt="" loading="lazy" className="size-full object-cover" />
            </button>
          </li>
        ))}
      </ul>

      <div className={cn(CONTENEDOR, 'mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between')}>
        <div aria-live="polite" className="vidrio w-full max-w-xl rounded-[1.6rem] px-7 py-5 md:px-9 md:py-6">
          <p className="text-2xl font-extrabold tracking-[-0.03em] md:text-3xl">{actual.titulo}</p>
          <p className="mt-1 text-white/80 md:text-lg">{actual.texto}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {TRABAJOS.map((t, i) => (
              <button
                key={t.titulo}
                type="button"
                onClick={() => ir(i)}
                aria-label={`Ver ${t.titulo}`}
                aria-current={i === activo}
                className="py-3"
              >
                <span
                  className={cn(
                    'block h-2 rounded-full transition-all duration-300',
                    i === activo ? 'w-8 bg-primary' : 'w-2 bg-white/40',
                  )}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => ir(activo - 1)}
              aria-label="Anterior"
              className="vidrio flex size-11 items-center justify-center rounded-full transition-colors hover:bg-white/20"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => ir(activo + 1)}
              aria-label="Siguiente"
              className="vidrio flex size-11 items-center justify-center rounded-full transition-colors hover:bg-white/20"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
