import { ArrowDown, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { URL_LOGIN } from '@/config';
import { cn } from '@/lib/utils';

/** Fotos reales de trabajos en campo. La primera de cada par va grande. */
const FOTOS = [
  { src: '/fotos/campo-6.png', alt: 'Técnico subiendo a una estación con antenas' },
  { src: '/fotos/campo-2.png', alt: 'Técnico ajustando una estructura en altura, en la sierra' },
  { src: '/fotos/campo-5.png', alt: 'Técnico midiendo junto a torres de telecomunicaciones' },
  { src: '/fotos/campo-1.png', alt: 'Vista desde lo alto de una torre durante un trabajo' },
  { src: '/fotos/campo-4.png', alt: 'Técnico con traje y equipo de protección completo' },
  { src: '/fotos/campo-3.png', alt: 'Técnico con fumigadora y equipo de protección' },
];

const TITULO = ['Mantenemos', 'lo', 'que', 'nos', 'conecta.'];

/**
 * Portada editorial: título serif que sube palabra por palabra, una foto grande que se
 * descubre como una cortina y cambia sola, y una franja de fotos que desfila debajo.
 * Con «reducir movimiento» del sistema, todo queda quieto.
 */
export function HeroEditorial() {
  const [actual, setActual] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(
      () => setActual((i) => (i + 1) % FOTOS.length),
      5500,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-[oklch(0.9_0.004_75)] pt-28 text-foreground md:pt-32"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-12">
        <div className="pb-2 lg:pb-14">
          <p
            className="hero-entra text-xs font-medium tracking-[0.2em] text-primary uppercase"
            style={{ animationDelay: '80ms' }}
          >
            Telecomunicaciones · Perú
          </p>

          <h1 className="mt-5 font-serif text-[3.4rem] leading-[0.95] tracking-tight text-balance sm:text-7xl lg:text-[5.6rem]">
            {TITULO.map((palabra, i) => (
              <span key={palabra} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <span
                  className="hero-palabra inline-block"
                  style={{ animationDelay: `${180 + i * 110}ms` }}
                >
                  {palabra}
                </span>
                {i < TITULO.length - 1 && ' '}
              </span>
            ))}
          </h1>

          <p
            className="hero-entra mt-7 max-w-md text-lg leading-relaxed text-foreground/75"
            style={{ animationDelay: '850ms' }}
          >
            Mantenimiento y construcción para torres y estaciones de
            telecomunicaciones, con cada trabajo documentado de principio a fin.
          </p>

          <div
            className="hero-entra mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: '1000ms' }}
          >
            <Button asChild size="lg" className="rounded-full px-6">
              <a href={URL_LOGIN}>
                Ingresar al sistema <ArrowRight />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="rounded-full px-5 hover:bg-foreground/10"
            >
              <a href="#servicios">
                Ver servicios <ArrowDown />
              </a>
            </Button>
          </div>
        </div>

        {/* Foto grande: se descubre de abajo hacia arriba y luego rota con un fundido lento. */}
        <div className="hero-cortina relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-foreground/10 sm:aspect-[5/4] lg:aspect-[4/5]">
          {FOTOS.map((foto, i) => (
            <img
              key={foto.src}
              src={foto.src}
              alt={i === actual ? foto.alt : ''}
              aria-hidden={i !== actual}
              loading={i === 0 ? 'eager' : 'lazy'}
              className={cn(
                'absolute inset-0 size-full object-cover transition-opacity duration-[1400ms] ease-out',
                i === actual ? 'hero-acercar opacity-100' : 'opacity-0',
              )}
            />
          ))}
          <div className="absolute inset-x-4 bottom-4 flex gap-1.5">
            {FOTOS.map((foto, i) => (
              <button
                key={foto.src}
                type="button"
                onClick={() => setActual(i)}
                aria-label={`Ver foto ${i + 1}`}
                className="h-1 flex-1 overflow-hidden rounded-full bg-white/35"
              >
                <span
                  className={cn(
                    'block h-full rounded-full bg-white transition-[width] duration-500',
                    i === actual ? 'w-full' : 'w-0',
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Franja de fotos que desfila sin fin (la lista va duplicada para que el bucle no salte). */}
      <div className="hero-entra mt-14 md:mt-20" style={{ animationDelay: '1200ms' }}>
        <div className="flex w-max gap-3 hero-desfile hover:[animation-play-state:paused]">
          {[...FOTOS, ...FOTOS].map((foto, i) => (
            <img
              key={`${foto.src}-${i}`}
              src={foto.src}
              alt=""
              aria-hidden
              loading="lazy"
              className="h-36 w-56 rounded-2xl object-cover md:h-44 md:w-72"
            />
          ))}
        </div>
      </div>
      <div className="h-12 md:h-16" />
    </section>
  );
}
