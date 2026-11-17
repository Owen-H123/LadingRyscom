import { URL_LOGIN } from '@/config';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { FondoVideo } from '@/components/shared/fondo-video';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DIAPOSITIVAS } from '../datos';

/** Segundos que se muestra cada diapositiva antes de pasar a la siguiente. */
const SEGUNDOS = 7;

function Titulo({
  as: Etiqueta,
  ...props
}: { as: 'h1' | 'h2' } & React.ComponentProps<'h1'>) {
  return <Etiqueta {...props} />;
}

/**
 * Portada con video de fondo y un carrusel de mensajes. Pasa solo, se detiene al pasar el
 * mouse o al enfocarlo, y no se mueve si la persona pidió «reducir movimiento».
 */
export function Hero() {
  const [actual, setActual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [encima, setEncima] = useState(false);
  const [sinMovimiento, setSinMovimiento] = useState(false);

  useEffect(() => {
    setSinMovimiento(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    );
  }, []);

  const quieto = pausado || encima || sinMovimiento;
  useEffect(() => {
    if (quieto) return;
    const id = window.setTimeout(
      () => setActual((a) => (a + 1) % DIAPOSITIVAS.length),
      SEGUNDOS * 1000,
    );
    return () => window.clearTimeout(id);
  }, [actual, quieto]);

  const ir = (n: number) =>
    setActual((n + DIAPOSITIVAS.length) % DIAPOSITIVAS.length);

  return (
    <section
      id="inicio"
      aria-roledescription="carrusel"
      aria-label="Presentación de RYSCOM"
      className="relative flex min-h-dvh items-end overflow-hidden bg-[oklch(0.22_0.02_55)] text-white"
      onMouseEnter={() => setEncima(true)}
      onMouseLeave={() => setEncima(false)}
      onFocus={() => setEncima(true)}
      onBlur={() => setEncima(false)}
    >
      {/* El mismo video del ingreso; el encuadre sube para dejar fuera la marca de fecha. */}
      <FondoVideo
        fuentes={{
          ligera: '/videofondo-ligero.mp4',
          alta: '/videofondo-hd.mp4',
        }}
        posicion="50% 20%"
        className="absolute inset-0 size-full object-cover"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,oklch(0.14_0.02_55/0.55),oklch(0.14_0.02_55/0.4)_35%,oklch(0.14_0.02_55/0.9))]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pt-24 pb-12 md:px-6 md:pb-16">
        {/* Las diapositivas comparten el mismo espacio: la más alta fija la altura y nada salta. */}
        <div className="grid" aria-live={quieto ? 'polite' : 'off'}>
          {DIAPOSITIVAS.map((d, i) => (
            <div
              key={d.titulo}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${DIAPOSITIVAS.length}`}
              aria-hidden={i !== actual}
              className={cn(
                'col-start-1 row-start-1 max-w-3xl transition-all duration-700 ease-out',
                i === actual
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-4 opacity-0',
              )}
            >
              <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
                RYSCOM · Mantenimiento y Construcción
              </p>
              {/* Solo la primera diapositiva es el título de la página; las demás son subtítulos. */}
              <Titulo
                as={i === 0 ? 'h1' : 'h2'}
                className="mt-4 text-[2.5rem] leading-[1.08] font-semibold tracking-tight text-balance md:text-6xl"
              >
                {d.titulo}
              </Titulo>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
                {d.texto}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="rounded-xl">
                  <a href={d.enlace} tabIndex={i === actual ? 0 : -1}>
                    Ver más <ArrowRight />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-xl border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                >
                  <a href={URL_LOGIN} tabIndex={i === actual ? 0 : -1}>
                    Ingresar al sistema
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Controles: puntos, anterior y siguiente, y pausa. */}
        <div className="mt-10 flex items-center gap-4">
          <div className="flex items-center gap-2">
            {DIAPOSITIVAS.map((d, i) => (
              <button
                key={d.titulo}
                type="button"
                aria-label={`Ir a la diapositiva ${i + 1}`}
                aria-current={i === actual}
                onClick={() => ir(i)}
                className="group py-3"
              >
                <span
                  className={cn(
                    'block h-1 rounded-full transition-all duration-300',
                    i === actual
                      ? 'w-10 bg-primary'
                      : 'w-5 bg-white/40 group-hover:bg-white/70',
                  )}
                />
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-white hover:bg-white/15 hover:text-white"
              aria-label="Diapositiva anterior"
              onClick={() => ir(actual - 1)}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-white hover:bg-white/15 hover:text-white"
              aria-label={
                pausado ? 'Reanudar el carrusel' : 'Pausar el carrusel'
              }
              onClick={() => setPausado((p) => !p)}
            >
              {pausado ? <Play /> : <Pause />}
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-white hover:bg-white/15 hover:text-white"
              aria-label="Diapositiva siguiente"
              onClick={() => ir(actual + 1)}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
