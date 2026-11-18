import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import { IconoWhatsapp } from '@/components/shared/icono-whatsapp';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CONTACTO, OPCIONES_COTIZACION, hayContacto } from '../datos/contenido';
import { enlaceWhatsapp } from '../utils/whatsapp';
import { Fundido } from '../componentes/fondos';
import { Revelar } from '../componentes/revelar';

const OTRO = 'Otro servicio';
const OPCIONES = [...OPCIONES_COTIZACION, OTRO];

const campo =
  'w-full rounded-2xl border border-input bg-background px-4 py-3 text-base outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/15';

/**
 * Contacto y cierre de la página: a la izquierda «Tu torre, en buenas manos» con el WhatsApp y las
 * demás formas de comunicarse (1); a la derecha un formulario corto (1.618).
 * El formulario no usa servidor: arma el mensaje y abre WhatsApp con él ya escrito.
 * Solo aparece si hay datos de contacto en `datos.ts`.
 */
export function Contacto() {
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [servicio, setServicio] = useState(OPCIONES[0]);
  const [detalle, setDetalle] = useState('');
  const [intento, setIntento] = useState(false);

  if (!hayContacto) return null;

  const faltaNombre = nombre.trim().length < 2;

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    setIntento(true);
    if (faltaNombre) return;
    const lineas = [
      `Hola, soy ${nombre.trim()}${empresa.trim() ? ` de ${empresa.trim()}` : ''}.`,
      servicio === OTRO
        ? 'Quisiera consultar por un servicio.'
        : `Quisiera cotizar: ${servicio}.`,
      detalle.trim(),
    ].filter(Boolean);
    window.open(enlaceWhatsapp(lineas.join('\n')), '_blank', 'noreferrer');
  };

  const filas = [
    CONTACTO.telefono && {
      icono: Phone,
      etiqueta: 'Llámanos',
      texto: CONTACTO.telefono,
      href: `tel:${CONTACTO.telefono.replace(/\s/g, '')}`,
    },
    CONTACTO.correo && {
      icono: Mail,
      etiqueta: 'Correo',
      texto: CONTACTO.correo,
      href: `mailto:${CONTACTO.correo}`,
    },
    CONTACTO.direccion && {
      icono: MapPin,
      etiqueta: 'Dirección',
      texto: CONTACTO.direccion,
    },
  ].filter(Boolean) as {
    icono: typeof Phone;
    etiqueta: string;
    texto: string;
    href?: string;
    externo?: boolean;
  }[];

  return (
    <section
      id="contacto"
      className="relative isolate scroll-mt-16 overflow-hidden bg-[radial-gradient(circle_at_70%_40%,#0f4a86_0%,#071a2f_70%)] py-20 text-white md:py-28"
    >
      {/* Resplandor de marca detrás del formulario; el fundido va encima para que no deje bordes. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 -right-40 -z-10 size-[34rem] rounded-full bg-primary/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-1/4 -left-32 -z-10 size-[28rem] rounded-full bg-[oklch(0.5_0.14_250)]/30 blur-[120px]"
      />
      <Fundido />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-[1fr_1.618fr] lg:gap-16">
        <div>
          <h2 data-split className="text-5xl md:text-6xl">
            Tu torre, <br />
            <em className="text-primary not-italic">en buenas manos.</em>
          </h2>
          <Revelar retraso={200}>
            <p className="mt-5 text-lg text-white/75">
              Cuéntanos qué necesitas y te respondemos por el medio que prefieras.
            </p>
          </Revelar>
          {CONTACTO.whatsapp && (
            <Revelar retraso={300}>
              <a
                href={enlaceWhatsapp('Hola, quisiera cotizar un mantenimiento.')}
                target="_blank"
                rel="noreferrer"
                aria-label={`Escribir por WhatsApp al ${CONTACTO.telefono || CONTACTO.whatsapp}`}
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#25d366] px-7 py-4 text-2xl font-bold text-[#052e16] shadow-[0_20px_70px_rgba(37,211,102,.45),inset_0_2px_0_rgba(255,255,255,.5)] transition-[filter] hover:brightness-110 md:text-3xl"
              >
                <IconoWhatsapp className="size-8 md:size-9" />
                {CONTACTO.telefono || `+${CONTACTO.whatsapp}`}
              </a>
            </Revelar>
          )}
          <ul className="mt-8 space-y-3">
            {filas.map((f, i) => {
              const contenido = (
                <>
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-colors duration-300 group-hover:bg-primary group-hover:ring-primary">
                    <f.icono className="size-5.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs tracking-[0.14em] text-white/55 uppercase">
                      {f.etiqueta}
                    </span>
                    <span className="block text-lg font-medium break-words">
                      {f.texto}
                    </span>
                  </span>
                </>
              );
              const clase =
                'group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-md transition duration-300';
              return (
                <li key={f.etiqueta}>
                  <Revelar retraso={i * 90}>
                    {f.href ? (
                      <a
                        href={f.href}
                        {...(f.externo && {
                          target: '_blank',
                          rel: 'noreferrer',
                        })}
                        className={cn(
                          clase,
                          'hover:-translate-y-0.5 hover:bg-white/[0.12]',
                        )}
                      >
                        {contenido}
                      </a>
                    ) : (
                      <div className={clase}>{contenido}</div>
                    )}
                  </Revelar>
                </li>
              );
            })}
          </ul>
          <p className="text-primary mt-8 text-xs font-bold tracking-[0.18em] whitespace-nowrap sm:text-sm md:tracking-[0.3em]">
            MANTENIMIENTO Y CONSTRUCCIÓN
          </p>
        </div>

        <Revelar retraso={150}>
          <form
            onSubmit={enviar}
            noValidate
            className="rounded-[2rem] bg-card p-6 text-card-foreground shadow-2xl shadow-black/30 md:p-8"
          >
            <h3 className="text-xl font-semibold tracking-tight">
              Pide tu cotización
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Se abrirá WhatsApp con tu mensaje listo para enviar.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-medium">
                Tu nombre
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  autoComplete="name"
                  placeholder="Nombre y apellido"
                  aria-invalid={intento && faltaNombre}
                  className={cn(
                    campo,
                    intento &&
                      faltaNombre &&
                      'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/15',
                  )}
                />
                {intento && faltaNombre && (
                  <span role="alert" className="text-xs font-normal text-destructive">
                    Escribe tu nombre para continuar.
                  </span>
                )}
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                Empresa
                <input
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  autoComplete="organization"
                  placeholder="Opcional"
                  className={campo}
                />
              </label>
            </div>

            <fieldset className="mt-5">
              <legend className="text-sm font-medium">¿Qué necesitas?</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {OPCIONES.map((o) => (
                  <button
                    key={o}
                    type="button"
                    role="radio"
                    aria-checked={servicio === o}
                    onClick={() => setServicio(o)}
                    className={cn(
                      'rounded-full border px-4 py-2 text-sm transition duration-200 outline-none focus-visible:ring-4 focus-visible:ring-primary/25',
                      servicio === o
                        ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25'
                        : 'border-input bg-background hover:border-primary/50 hover:bg-primary/5',
                    )}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="mt-5 grid gap-1.5 text-sm font-medium">
              Cuéntanos más
              <textarea
                value={detalle}
                onChange={(e) => setDetalle(e.target.value)}
                rows={4}
                maxLength={500}
                placeholder="Opcional: ubicación del sitio, tipo de trabajo, fecha que necesitas…"
                className={cn(campo, 'resize-none')}
              />
            </label>

            <Button
              type="submit"
              size="lg"
              className="group mt-6 h-12 w-full rounded-full text-base"
            >
              <IconoWhatsapp className="size-5" /> Enviar por WhatsApp
              <Send className="ml-auto size-4 opacity-60 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </form>
        </Revelar>
      </div>
    </section>
  );
}
