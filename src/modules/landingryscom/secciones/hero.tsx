import { LogIn, RadioTower } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { URL_LOGIN } from '@/config';
import { Costura } from '../componentes/fondos';
import {
  FOTOS_FRANJA as FOTOS,
  TITULO_PORTADA as TITULO,
} from '../datos/contenido';


/**
 * Portada a pantalla completa: una foto real con acercamiento lento, el título serif que sube
 * palabra por palabra y el texto que aparece después. Con «reducir movimiento», todo queda quieto.
 */
export function HeroEditorial() {
  return (
    <>
      <section
        id="inicio"
        className="relative overflow-hidden bg-[oklch(0.2_0.02_250)] text-white"
      >
        {/* La foto sobresale un 12 % por arriba y por abajo: al bajar se desplaza sin dejar huecos. */}
        <div
          data-parallax="9"
          className="absolute inset-x-0 -top-[12%] h-[124%]"
        >
          <img
            src="/fotos/hero.png"
            alt="Técnico de telecomunicaciones trabajando al pie de una torre con antenas"
            fetchPriority="high"
            className="hero-acercar size-full object-cover object-[72%_50%]"
          />
        </div>
        {/* Velo: oscuro abajo y a la izquierda, donde va el texto; deja ver al técnico y la torre. */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,oklch(0.14_0.03_255/0.9),oklch(0.14_0.03_255/0.35)_50%,oklch(0.14_0.03_255/0.15))]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(0.14_0.03_255/0.6),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-[linear-gradient(to_top,#050f1c,#050f1c_8%,rgba(5,15,28,0))]" />
        <Costura lado="abajo" />

        {/*
          Composición áurea (φ ≈ 1.618):
          - Vertical: la fila superior mide 38.2 % y la inferior 61.8 %; el bloque de texto
            arranca justo en esa línea áurea.
          - Horizontal: el texto vive en la columna de 61.8 %; la foto deja al técnico en la de 38.2 %.
          - Tipografía en escala φ (1 · 1.618 · 2.618 · 4.236 · 6.854 rem) e interlineado φ.
          - Espaciados en escala φ (1 · 1.618 · 2.618 · 4.236 rem).
        */}
        <div className="relative mx-auto grid min-h-dvh w-full max-w-6xl grid-rows-[38.2fr_61.8fr] px-4 md:px-6">
          <div aria-hidden />
          <div
            data-hero-contenido
            className="grid grid-cols-1 pb-[2.618rem] md:grid-cols-[61.8fr_38.2fr] md:pb-[4.236rem]"
          >
            <div className="flex flex-col">
              <p
                className="hero-entra text-[0.75rem] font-medium tracking-[0.236em] text-primary uppercase"
                style={{ animationDelay: '150ms' }}
              >
                Telecomunicaciones · Perú
              </p>

              <h1 className="mt-[1rem] text-[3.4rem] leading-[0.95] text-balance sm:text-[4rem] lg:text-[5.2rem]">
                {TITULO.map((palabra, i) => (
                  <span
                    key={palabra}
                    className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] align-bottom last:mr-0"
                  >
                    <span
                      className="hero-palabra inline-block"
                      style={{ animationDelay: `${250 + i * 110}ms` }}
                    >
                      {palabra}
                    </span>
                  </span>
                ))}
              </h1>

              <div className="mt-[1.618rem] flex flex-col gap-[1.618rem] md:mt-[2.618rem]">
                <p
                  className="hero-entra max-w-[61.8%] min-w-[17rem] text-[1.0625rem] leading-[1.618] text-white/80 md:text-[1.125rem]"
                  style={{ animationDelay: '900ms' }}
                >
                  Mantenimiento y construcción para torres y estaciones de
                  telecomunicaciones, con cada trabajo documentado de principio
                  a fin.
                </p>

                <div
                  className="hero-entra flex flex-wrap items-center gap-3"
                  style={{ animationDelay: '1050ms' }}
                >
                  <Button asChild size="lg" className="group rounded-full px-6">
                    <a href={URL_LOGIN}>
                      <LogIn className="icono-entrar" /> Ingresar al sistema
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="group rounded-full border border-white/25 bg-white/10 px-5 text-white backdrop-blur-xl hover:bg-white/20 hover:text-white"
                  >
                    <a href="#servicios">
                      <RadioTower className="icono-onda" /> Ver servicios
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Franja de fotos que desfila sin fin (la lista va duplicada para que el bucle no salte). */}
      <div
        className="relative z-[1] overflow-hidden bg-[#050f1c] py-6 md:py-8"
        aria-label="Fotos de trabajos en campo"
      >
        <div className="hero-desfile flex w-max gap-3 hover:[animation-play-state:paused]">
          {[...FOTOS, ...FOTOS].map((foto, i) => (
            <img
              key={`${foto.src}-${i}`}
              src={foto.src}
              alt={i < FOTOS.length ? foto.alt : ''}
              aria-hidden={i >= FOTOS.length}
              loading="lazy"
              className="h-36 w-56 rounded-2xl object-cover md:h-48 md:w-80"
            />
          ))}
        </div>
      </div>
    </>
  );
}
