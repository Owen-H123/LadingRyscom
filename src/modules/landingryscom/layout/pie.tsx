import { ArrowUp, ArrowUpRight, LogIn, Phone } from 'lucide-react';
import { IconoWhatsapp } from '@/components/shared/icono-whatsapp';
import { URL_LOGIN } from '@/config';
import { CONTACTO, ENLACES_MENU, LEMA, OPCIONES_COTIZACION } from '../datos/contenido';
import { enlaceWhatsapp } from '../utils/whatsapp';

const NAVEGACION = [
  { href: '#inicio', texto: 'Inicio' },
  { href: '#nosotros', texto: 'Nosotros' },
  ...ENLACES_MENU,
];

const titulo = 'text-xs font-semibold tracking-[0.2em] text-white/45 uppercase';
const enlace =
  'group inline-flex items-center gap-1.5 text-white/70 transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-none';

/** Flecha que aparece al pasar el mouse por un enlace del pie. */
function Flecha() {
  return (
    <ArrowUpRight className="size-3.5 -translate-x-1 text-primary opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" />
  );
}

/**
 * Pie de página en cuatro columnas: marca, navegación, servicios y contacto. Abajo, la firma
 * «RYSCOM» en grande y muy tenue, y la barra con el copyright y «Volver arriba».
 */
export function Pie() {
  const anio = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#050f1c] text-white/70">
      {/* Línea naranja que se desvanece hacia los lados: separa el pie del contacto. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,var(--primary)_50%,transparent)] opacity-70"
      />
      {/* Resplandor naranja muy suave detrás de la marca. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 size-[32rem] rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-10 md:px-6 md:pt-24">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-[1.5fr_1fr_1.3fr_1.2fr] lg:gap-10">
          {/* Marca */}
          <div className="col-span-2 lg:col-span-1">
            <a
              href="#inicio"
              aria-label="RYSCOM, ir al inicio"
              className="inline-flex rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_10px_30px_-12px_rgba(255,163,26,.45)] transition hover:-translate-y-0.5"
            >
              <img
                src="/ryscom-logo.webp"
                alt="RYSCOM · Mantenimiento y Construcción"
                width={161}
                height={108}
                loading="lazy"
                className="block h-11 w-auto"
              />
            </a>
            <p className="mt-6 max-w-xs text-2xl leading-tight font-bold tracking-[-0.02em] text-white">
              {LEMA}
            </p>
            <p className="mt-3 max-w-xs leading-relaxed text-white/60">
              Mantenimiento y construcción para torres y estaciones de telecomunicaciones en el
              Perú.
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label="Pie de página">
            <p className={titulo}>Navegación</p>
            <ul className="mt-5 space-y-3">
              {NAVEGACION.map((e) => (
                <li key={e.href}>
                  <a href={e.href} className={enlace}>
                    {e.texto}
                    <Flecha />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Servicios */}
          <div>
            <p className={titulo}>Servicios</p>
            <ul className="mt-5 space-y-3">
              {OPCIONES_COTIZACION.map((s) => (
                <li key={s}>
                  <a href="#servicios" className={enlace}>
                    {s}
                    <Flecha />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="col-span-2 lg:col-span-1">
            <p className={titulo}>Contacto</p>
            <ul className="mt-5 space-y-3">
              {CONTACTO.whatsapp && (
                <li>
                  <a
                    href={enlaceWhatsapp('Hola, quisiera cotizar un mantenimiento.')}
                    target="_blank"
                    rel="noreferrer"
                    className={enlace}
                  >
                    <IconoWhatsapp className="size-4 text-[#25D366]" />
                    Escríbenos por WhatsApp
                  </a>
                </li>
              )}
              {CONTACTO.telefono && (
                <li>
                  <a href={`tel:+51${CONTACTO.telefono.replace(/\s/g, '')}`} className={enlace}>
                    <Phone className="size-4 text-primary" />
                    {CONTACTO.telefono}
                  </a>
                </li>
              )}
              {CONTACTO.correo && (
                <li>
                  <a href={`mailto:${CONTACTO.correo}`} className={enlace}>
                    {CONTACTO.correo}
                  </a>
                </li>
              )}
            </ul>
            <a
              href={URL_LOGIN}
              className="group mt-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-primary/60 hover:bg-primary hover:text-primary-foreground"
            >
              <LogIn className="size-4" />
              Ingresar al sistema
            </a>
          </div>
        </div>
      </div>

      {/* Firma de la marca, enorme y casi transparente, cortada por el borde inferior. */}
      <p
        aria-hidden
        className="pointer-events-none relative -mb-[0.18em] text-center text-[22vw] leading-none font-extrabold tracking-[-0.06em] text-transparent select-none [-webkit-text-stroke:1px_rgba(255,255,255,0.09)] lg:text-[17rem]"
      >
        RYSCOM
      </p>

      <div className="relative border-t border-white/10 bg-[#050f1c]">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between md:px-6">
          <p>© {anio} RYSCOM. Todos los derechos reservados.</p>
          <a
            href="#inicio"
            className="group inline-flex items-center gap-2 font-medium text-white/70 transition-colors hover:text-white"
          >
            Volver arriba
            <span className="flex size-8 items-center justify-center rounded-full border border-white/15 transition group-hover:-translate-y-0.5 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUp className="size-4" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
