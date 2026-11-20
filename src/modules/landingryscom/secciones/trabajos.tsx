import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { gsap, sinMovimiento } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { CONTENEDOR } from '../componentes/estilos';
import { Naranja } from '../componentes/texto';
import { TRABAJOS } from '../datos/contenido';
import { useAnimacion } from '../hooks/use-animacion';

/** Segundos que se muestra cada foto antes de pasar sola a la siguiente. */
const SEGUNDOS_POR_FOTO = 4;

const dosDigitos = (n: number) => String(n).padStart(2, '0');

const flecha =
  'flex size-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#050f1c] focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none';

/**
 * «Hecho en campo.»: galería de trabajos. Tarjetas rectas del mismo tamaño; la activa se ve plena
 * con su número, título y descripción, las demás quedan tenues. Arriba, contador y flechas; abajo,
 * una barra de progreso. Se desliza con el dedo y avanza sola mientras se ve; si se mueve a mano,
 * espera unos segundos y sigue desde ahí.
 */
export function Trabajos() {
  const [activo, setActivo] = useState(0);
  const [visible, setVisible] = useState(false);
  const pista = useRef<HTMLUListElement>(null);
  const ref = useAnimacion<HTMLElement>((raiz) => {
    gsap.from(raiz.querySelectorAll('[data-tarjeta]'), {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: raiz, start: 'top 70%', once: true },
    });
  });

  /** Margen izquierdo de la pista: las tarjetas se alinean con el título de la sección. */
  const inicio = (el: HTMLElement) => parseFloat(getComputedStyle(el).paddingLeft) || 0;

  // La tarjeta activa es la más cercana al borde izquierdo de la pista
  const alDesplazar = () => {
    const el = pista.current;
    if (!el) return;
    const borde = el.scrollLeft + inicio(el);
    let mejor = 0;
    let distancia = Infinity;
    [...el.children].forEach((hijo, i) => {
      const h = hijo as HTMLElement;
      const d = Math.abs(h.offsetLeft - borde);
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
    el.scrollTo({ left: hijo.offsetLeft - inicio(el), behavior: 'smooth' });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observador = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.2,
    });
    observador.observe(el);
    return () => observador.disconnect();
  }, [ref]);

  useEffect(() => {
    if (!visible || sinMovimiento()) return;
    const id = window.setTimeout(() => ir(activo + 1), SEGUNDOS_POR_FOTO * 1000);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activo, visible]);

  return (
    <section ref={ref} id="trabajos" className="relative scroll-mt-20 py-24 md:py-32">
      <div className={cn(CONTENEDOR, 'flex flex-col gap-8 md:flex-row md:items-end md:justify-between')}>
        <div className="max-w-2xl">
          <p className="text-[0.75rem] font-medium tracking-[0.236em] text-primary uppercase">
            Trabajos
          </p>
          <h2 data-split className="mt-4 text-5xl md:text-7xl">
            Hecho <Naranja>en campo.</Naranja>
          </h2>
          <p className="mt-5 text-lg text-white/70 md:text-xl">
            Cada trabajo, documentado con fotos de antes, durante y finalizado.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <p className="text-sm font-semibold text-white/50 tabular-nums" aria-hidden>
            <span className="text-2xl text-white">{dosDigitos(activo + 1)}</span>
            {' / '}
            {dosDigitos(TRABAJOS.length)}
          </p>
          <div className="flex gap-2">
            <button type="button" onClick={() => ir(activo - 1)} aria-label="Trabajo anterior" className={flecha}>
              <ChevronLeft className="size-5" />
            </button>
            <button type="button" onClick={() => ir(activo + 1)} aria-label="Trabajo siguiente" className={flecha}>
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Para lectores de pantalla: qué trabajo se muestra. */}
      <p aria-live="polite" className="sr-only">
        {`Trabajo ${activo + 1} de ${TRABAJOS.length}: ${TRABAJOS[activo].titulo}. ${TRABAJOS[activo].texto}.`}
      </p>

      <ul
        ref={pista}
        onScroll={alDesplazar}
        // --inicio coincide con el margen de CONTENEDOR (max-w-6xl, px-4 / md:px-6). El relleno
        // derecho deja llegar la última tarjeta hasta el inicio.
        className="mt-12 flex snap-x snap-mandatory scroll-pl-[var(--inicio)] gap-4 overflow-x-auto py-2 pr-[calc(100%-var(--inicio)-min(78vw,24rem))] pl-[var(--inicio)] [--inicio:1rem] [scrollbar-width:none] md:gap-6 md:[--inicio:max(1.5rem,calc((100%-72rem)/2+1.5rem))] [&::-webkit-scrollbar]:hidden"
      >
        {TRABAJOS.map((t, i) => (
          <li key={t.titulo} data-tarjeta className="shrink-0 snap-start">
            <button
              type="button"
              onClick={() => ir(i)}
              aria-label={`${t.titulo}: ${t.texto}`}
              aria-current={i === activo}
              className={cn(
                'relative block aspect-[4/5] w-[78vw] max-w-[24rem] overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left transition-opacity duration-500 focus-visible:ring-4 focus-visible:ring-primary/40 focus-visible:outline-none sm:w-[24rem]',
                i === activo ? 'opacity-100' : 'opacity-40 hover:opacity-70',
              )}
            >
              <img src={t.foto} alt={t.alt} loading="lazy" className="size-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(5,15,28,.95),rgba(5,15,28,.6)_55%,transparent)] px-6 pt-24 pb-6">
                <p className="text-xs font-semibold tracking-[0.2em] text-primary tabular-nums">
                  {dosDigitos(i + 1)}
                </p>
                <p className="mt-2 text-xl font-bold tracking-[-0.02em] text-white md:text-2xl">
                  {t.titulo}
                </p>
                <p className="mt-1 text-sm text-white/75 md:text-base">{t.texto}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {/* Barra de progreso: cuánto del recorrido se ha visto. */}
      <div className={cn(CONTENEDOR, 'mt-10')}>
        <div className="relative h-px bg-white/15" aria-hidden>
          <div
            className="absolute inset-y-[-0.5px] left-0 h-[2px] bg-primary transition-[width] duration-700 ease-out"
            style={{ width: `${((activo + 1) / TRABAJOS.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
