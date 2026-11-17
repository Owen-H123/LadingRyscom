import { URL_LOGIN } from '@/config';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ENLACES_MENU } from '../datos';

/** Barra fija con el logo, el menú de la página y el acceso al sistema. */
export function BarraSuperior() {
  const [abierto, setAbierto] = useState(false);

  // Cristal esmerilado: translúcido y borroso. El margen negativo (-mb-16) hace que la portada
  // empiece debajo de la barra, así el video se ve a través de ella.
  return (
    <header className="sticky top-0 z-40 -mb-16 border-b border-white/25 bg-background/55 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 md:px-6">
        <a href="#inicio" aria-label="RYSCOM, ir al inicio">
          <img
            src="/ryscom-logo.png"
            alt="RYSCOM · Mantenimiento y Construcción"
            className="h-10 w-auto"
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
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-foreground/10 hover:text-foreground"
            >
              {e.texto}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="rounded-xl">
            <a href={URL_LOGIN}>
              Ingresar <ArrowRight />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
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
          className="animate-aparecer border-t bg-background px-4 py-3 lg:hidden"
        >
          <ul className="mx-auto max-w-6xl">
            {ENLACES_MENU.map((e) => (
              <li key={e.href}>
                <a
                  href={e.href}
                  onClick={() => setAbierto(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium hover:bg-accent"
                >
                  {e.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
