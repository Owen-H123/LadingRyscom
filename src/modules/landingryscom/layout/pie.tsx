import { URL_LOGIN } from '@/config';
import { CONTACTO, ENLACES_MENU, LEMA } from '../datos/contenido';

/** Pie de página: marca y lema, enlaces de la página, acceso al sistema y datos de contacto. */
export function Pie() {
  return (
    <footer className="bg-[#050f1c] text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.618fr_1fr_1fr] md:px-6">
        <div>
          {/* El logo tiene fondo transparente: va dentro de un cuadro blanco para que se lea. */}
          <div className="inline-block rounded-2xl bg-white p-3">
            <img
              src="/ryscom-logo.png"
              alt="RYSCOM · Mantenimiento y Construcción"
              className="block h-12 w-auto"
            />
          </div>
          <p className="mt-5 max-w-xs text-lg text-white">{LEMA}</p>
        </div>

        <nav aria-label="En esta página">
          <p className="text-xs font-medium tracking-[0.18em] text-white/50 uppercase">
            En esta página
          </p>
          <ul className="mt-4 space-y-2">
            {ENLACES_MENU.map((e) => (
              <li key={e.href}>
                <a href={e.href} className="hover:text-white">
                  {e.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-white/50 uppercase">
            Equipo
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <a href={URL_LOGIN} className="hover:text-white">
                Ingresar al sistema
              </a>
            </li>
            {CONTACTO.correo && (
              <li>
                <a
                  href={`mailto:${CONTACTO.correo}`}
                  className="hover:text-white"
                >
                  {CONTACTO.correo}
                </a>
              </li>
            )}
            {CONTACTO.telefono && (
              <li>
                <a
                  href={`tel:${CONTACTO.telefono.replace(/\s/g, '')}`}
                  className="hover:text-white"
                >
                  {CONTACTO.telefono}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-sm text-white/50 md:px-6">
          © {new Date().getFullYear()} RYSCOM. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
