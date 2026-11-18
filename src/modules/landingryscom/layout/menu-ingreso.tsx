import { CircleUserRound, HardHat, ShieldCheck } from 'lucide-react';
import { DropdownMenu } from 'radix-ui';
import { IconoWhatsapp } from '@/components/shared/icono-whatsapp';
import { URL_LOGIN } from '@/config';
import { cn } from '@/lib/utils';
import { CONTACTO, hayContacto } from '../datos/contenido';

const OPCIONES = [
  {
    icono: ShieldCheck,
    titulo: 'Administrador',
    texto: 'Órdenes, informes y usuarios',
  },
  {
    icono: HardHat,
    titulo: 'Trabajador',
    texto: 'Tus informes y las fotos de campo',
  },
];

/**
 * Botón de ingreso: un ícono de persona que abre dos opciones, Administrador y Trabajador.
 * Las dos llevan a la misma pantalla de login del sistema; el rol lo da el usuario con el que
 * se ingresa, no la opción que se elija aquí.
 *
 * El menú es de cristal, igual que la barra: oscuro mientras la barra está sobre la foto de la
 * portada y claro cuando la barra pasa a cristal claro (`claro`).
 */
export function MenuIngreso({ claro }: { claro: boolean }) {
  const itemBase =
    'flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 outline-none transition-colors';
  const itemColor = claro
    ? 'data-[highlighted]:bg-foreground/[0.07]'
    : 'data-[highlighted]:bg-white/15';
  const burbuja = claro
    ? 'bg-primary/10 text-primary'
    : 'bg-white/15 text-white';
  const secundario = claro ? 'text-muted-foreground' : 'text-white/65';

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label="Ingresar al sistema"
          title="Ingresar"
          className="group flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/25 transition duration-200 outline-none hover:bg-primary/90 focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-95 data-[state=open]:bg-primary/90"
        >
          <CircleUserRound className="size-5.5 transition-transform duration-200 group-hover:scale-110" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={14}
          collisionPadding={12}
          className={cn(
            'z-50 w-72 rounded-[1.6rem] p-1.5 outline-hidden data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            claro
              ? 'border border-white/70 bg-[oklch(0.99_0.002_75/0.78)] text-foreground shadow-[0_24px_60px_-24px_oklch(0.2_0.02_250/0.35),inset_0_1px_0_oklch(1_0_0/0.9)] backdrop-blur-xl backdrop-saturate-150'
              : 'border border-white/20 bg-[oklch(0.2_0.03_255/0.42)] text-white shadow-[0_24px_60px_-20px_oklch(0.1_0.03_255/0.6),inset_0_1px_0_oklch(1_0_0/0.2)] backdrop-blur-xl backdrop-saturate-150',
          )}
        >
          <DropdownMenu.Label
            className={cn(
              'px-3 pt-2 pb-1.5 text-xs font-medium tracking-[0.14em] uppercase',
              secundario,
            )}
          >
            Ingresar como
          </DropdownMenu.Label>
          {OPCIONES.map((o) => (
            <DropdownMenu.Item key={o.titulo} asChild>
              <a href={URL_LOGIN} className={cn(itemBase, itemColor)}>
                <span
                  className={cn(
                    'flex size-10 shrink-0 items-center justify-center rounded-full',
                    burbuja,
                  )}
                >
                  <o.icono className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{o.titulo}</span>
                  <span className={cn('block text-xs', secundario)}>
                    {o.texto}
                  </span>
                </span>
              </a>
            </DropdownMenu.Item>
          ))}

          {/* Un cliente no entra al sistema: se le lleva a escribir. Sin datos de contacto
              no hay a dónde llevarlo, así que la opción no se muestra. */}
          {hayContacto && (
            <>
              <DropdownMenu.Separator
                className={cn(
                  'mx-3 my-1.5 h-px',
                  claro ? 'bg-foreground/10' : 'bg-white/15',
                )}
              />
              <DropdownMenu.Item asChild>
                <a
                  href={
                    CONTACTO.whatsapp
                      ? `https://wa.me/${CONTACTO.whatsapp}`
                      : '#contacto'
                  }
                  {...(CONTACTO.whatsapp && {
                    target: '_blank',
                    rel: 'noreferrer',
                  })}
                  className={cn(itemBase, itemColor)}
                >
                  <span
                    className={cn(
                      'flex size-10 shrink-0 items-center justify-center rounded-full',
                      burbuja,
                    )}
                  >
                    <IconoWhatsapp className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">
                      ¿Eres cliente?
                    </span>
                    <span className={cn('block text-xs', secundario)}>
                      Solicita un servicio o escríbenos
                    </span>
                  </span>
                </a>
              </DropdownMenu.Item>
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
