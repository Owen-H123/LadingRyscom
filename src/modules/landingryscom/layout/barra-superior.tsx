import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ENLACES_MENU } from '../datos/contenido';
import { MenuIngreso } from './menu-ingreso';

/**
 * Barra de cristal sin borde, estilo iOS.
 * - Arriba: ocupa todo el ancho y casi no se nota (solo un leve desenfoque).
 * - Al bajar: se contrae hacia el centro, se separa del borde y redondea las esquinas.
 * - Sobre una sección clara ([data-claro]) o con el menú abierto: cristal claro con texto oscuro.
 */
export function BarraSuperior() {
  const [abierto, setAbierto] = useState(false);
  const [movido, setMovido] = useState(false);
  const [sobreClaro, setSobreClaro] = useState(false);

  // Barra compacta en cuanto se baja un poco.
  useEffect(() => {
    const revisar = () => setMovido(window.scrollY > 24);
    revisar();
    window.addEventListener('scroll', revisar, { passive: true });
    return () => window.removeEventListener('scroll', revisar);
  }, []);

  // Si la barra pasa sobre una sección clara ([data-claro]), cambia a cristal claro con texto
  // oscuro. Un IntersectionObserver vigila una franja de 1 px a la altura de la barra (y = 40 px):
  // el navegador avisa solo cuando una sección clara entra o sale de esa franja, también con el
  // scroll suave (que mueve el contenido con transform). Antes se medía todo en cada fotograma, y
  // eso trababa la animación de entrada y el scroll.
  useEffect(() => {
    let observador: IntersectionObserver | undefined;
    const encima = new Set<Element>();
    const vigilar = () => {
      observador?.disconnect();
      encima.clear();
      const y = 40;
      observador = new IntersectionObserver(
        (entradas) => {
          entradas.forEach((e) => (e.isIntersecting ? encima.add(e.target) : encima.delete(e.target)));
          setSobreClaro(encima.size > 0);
        },
        { rootMargin: `-${y}px 0px -${Math.max(0, window.innerHeight - y - 1)}px 0px` },
      );
      document.querySelectorAll('[data-claro]').forEach((el) => observador!.observe(el));
    };
    // Las secciones se montan después de la barra (cuando el scroll suave está listo).
    const inicio = requestAnimationFrame(vigilar);
    window.addEventListener('resize', vigilar);
    return () => {
      cancelAnimationFrame(inicio);
      window.removeEventListener('resize', vigilar);
      observador?.disconnect();
    };
  }, []);

  const claro = abierto || sobreClaro;
  const compacta = movido || abierto;

  return (
    <header
      className={cn(
        'barra-entra fixed inset-x-0 top-0 z-40 transition-[padding] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
        compacta ? 'px-3 pt-3 md:px-6 md:pt-4' : 'px-0 pt-0',
      )}
    >
      <div
        className={cn(
          'mx-auto transition-[max-width,border-radius,background,box-shadow,color,backdrop-filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
          compacta
            ? 'max-w-5xl rounded-[1.6rem]'
            : 'max-w-[100vw] rounded-none',
          claro
            ? 'vidrio-claro text-foreground'
            : compacta
              ? 'vidrio text-white'
              : 'vidrio-tenue text-white',
        )}
      >
        <div
          className={cn(
            'mx-auto flex max-w-6xl items-center justify-between gap-6 transition-[height,padding] duration-700',
            compacta
              ? 'h-14 pr-2 pl-3 md:h-15 md:pl-4'
              : 'h-16 px-4 md:h-20 md:px-6',
          )}
        >
          <a
            href="#inicio"
            aria-label="RYSCOM, ir al inicio"
            className="rounded-lg px-1 py-1 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            {/* El logo ya es transparente: va sin caja. Sobre la foto, un contorno blanco fino
                lo separa del fondo (las letras son azul oscuro); sobre el cristal claro no hace falta. */}
            <img
              src="/ryscom-logo.webp"
              alt="RYSCOM · Mantenimiento y Construcción"
              width={161}
              height={108}
              className={cn(
                'h-9 w-auto transition-[filter] duration-500 md:h-10',
                !claro &&
                  '[filter:drop-shadow(0_0_1px_white)_drop-shadow(0_0_2px_white)_drop-shadow(0_0_5px_oklch(1_0_0/0.55))]',
              )}
            />
          </a>

          <nav
            aria-label="Principal"
            className="hidden items-center gap-1 lg:flex"
          >
            {ENLACES_MENU.map((e) => (
              <a
                key={e.href}
                href={e.href}
                className={cn(
                  'enlace-raya px-3.5 py-2 text-sm font-medium transition-colors',
                  claro
                    ? 'text-foreground/70 hover:text-foreground'
                    : 'text-white/80 hover:text-white',
                )}
              >
                {e.texto}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <MenuIngreso claro={claro} />
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'rounded-full lg:hidden',
                claro
                  ? 'hover:bg-foreground/[0.07]'
                  : 'text-white hover:bg-white/15 hover:text-white',
              )}
              aria-label={abierto ? 'Cerrar el menú' : 'Abrir el menú'}
              aria-expanded={abierto}
              aria-controls="menu-movil"
              onClick={() => setAbierto((a) => !a)}
            >
              {abierto ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {abierto && (
          <nav
            id="menu-movil"
            aria-label="Principal"
            className="animate-aparecer border-t border-foreground/10 px-2 pt-1 pb-2 lg:hidden"
          >
            <ul>
              {ENLACES_MENU.map((e) => (
                <li key={e.href}>
                  <a
                    href={e.href}
                    onClick={() => setAbierto(false)}
                    className="block rounded-2xl px-3 py-3 text-base font-medium hover:bg-foreground/[0.06]"
                  >
                    {e.texto}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
