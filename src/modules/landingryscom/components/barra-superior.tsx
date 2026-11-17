import { LogIn, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { URL_LOGIN } from '@/config';
import { cn } from '@/lib/utils';
import { ENLACES_MENU } from '../datos';

/**
 * Barra de cristal sin borde, estilo iOS.
 * - Arriba: ocupa todo el ancho y casi no se nota (solo un leve desenfoque).
 * - Al bajar: se contrae hacia el centro, se separa del borde y redondea las esquinas.
 * - Pasada la portada: cristal claro con texto oscuro.
 */
export function BarraSuperior() {
  const [abierto, setAbierto] = useState(false);
  const [movido, setMovido] = useState(false);
  const [bajo, setBajo] = useState(false);

  useEffect(() => {
    const revisar = () => {
      setMovido(window.scrollY > 24);
      setBajo(window.scrollY > window.innerHeight * 0.6);
    };
    revisar();
    window.addEventListener('scroll', revisar, { passive: true });
    return () => window.removeEventListener('scroll', revisar);
  }, []);

  const claro = bajo || abierto;
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
            className="rounded-[0.9rem] bg-white/85 px-2 py-1 shadow-[inset_0_1px_0_oklch(1_0_0/0.9)]"
          >
            <img
              src="/ryscom-logo.png"
              alt="RYSCOM · Mantenimiento y Construcción"
              className="h-8 w-auto"
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
            <Button asChild size="sm" className="group h-10 rounded-full px-4">
              <a href={URL_LOGIN}>
                <LogIn className="icono-entrar" /> Ingresar
              </a>
            </Button>
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
