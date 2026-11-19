import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { IconoWhatsapp } from '@/components/shared/icono-whatsapp';
import { cn } from '@/lib/utils';
import { CONTACTO, OPCIONES_COTIZACION, hayContacto } from '../datos/contenido';
import { enlaceWhatsapp } from '../utils/whatsapp';
import { Revelar } from '../componentes/revelar';

const OTRO = 'Otro servicio';
const OPCIONES = [...OPCIONES_COTIZACION, OTRO];

/** Campos de contorno sobre blanco, sin caja alrededor. */
const campo =
  'w-full rounded-full border border-slate-300 bg-white px-5 py-3.5 text-base text-[#071a2f] outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/25';

const etiqueta = 'grid gap-2 text-[0.95rem] font-semibold text-[#071a2f]';

function Opcional() {
  return <span className="font-normal text-slate-500">(opcional)</span>;
}

/**
 * Contacto y cierre de la página, en un solo plano de color de borde a borde: a la izquierda el
 * mensaje y los canales, a la derecha el formulario. El formulario no usa servidor: arma el
 * mensaje y abre WhatsApp con él ya escrito. Solo aparece si hay datos de contacto.
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
      servicio === OTRO ? 'Quisiera consultar por un servicio.' : `Quisiera cotizar: ${servicio}.`,
      detalle.trim(),
    ].filter(Boolean);
    window.open(enlaceWhatsapp(lineas.join('\n')), '_blank', 'noreferrer');
  };

  const canales = [
    CONTACTO.whatsapp && {
      icono: IconoWhatsapp,
      etiqueta: 'WhatsApp',
      texto: 'Contáctanos',
      href: enlaceWhatsapp('Hola, quisiera cotizar un mantenimiento.'),
      externo: true,
    },
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
    CONTACTO.direccion && { icono: MapPin, etiqueta: 'Dirección', texto: CONTACTO.direccion },
  ].filter(Boolean) as {
    icono: React.ComponentType<{ className?: string }>;
    etiqueta: string;
    texto: string;
    href?: string;
    externo?: boolean;
  }[];

  return (
    <section
      id="contacto"
      data-claro
      className="relative scroll-mt-16 bg-white py-20 text-[#071a2f] md:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-14 px-4 md:px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 data-split className="text-5xl md:text-7xl">
            Tu torre, <br />
            <em className="text-primary not-italic">en buenas manos.</em>
          </h2>
          <Revelar retraso={200}>
            <p className="mt-6 max-w-md text-lg text-slate-600 md:text-xl">
              Cuéntanos qué necesitas y te respondemos por el medio que prefieras.
            </p>
          </Revelar>

          <Revelar retraso={300}>
            <ul className="mt-12 max-w-md border-t border-slate-200">
              {canales.map((c) => {
                const contenido = (
                  <>
                    <c.icono className="text-primary size-5 shrink-0" />
                    <span className="w-24 shrink-0 text-sm text-slate-500">{c.etiqueta}</span>
                    <span className="min-w-0 flex-1 text-lg font-bold break-words">{c.texto}</span>
                    {c.href && (
                      <ArrowRight className="size-5 text-slate-400 transition duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                    )}
                  </>
                );
                const clase = 'group flex items-center gap-4 border-b border-slate-200 py-5';
                return (
                  <li key={c.etiqueta}>
                    {c.href ? (
                      <a
                        href={c.href}
                        {...(c.externo && { target: '_blank', rel: 'noreferrer' })}
                        aria-label={`${c.etiqueta}: ${c.texto}`}
                        className={clase}
                      >
                        {contenido}
                      </a>
                    ) : (
                      <div className={clase}>{contenido}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Revelar>
        </div>

        <Revelar retraso={150}>
          <form onSubmit={enviar} noValidate className="grid gap-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className={etiqueta}>
                Nombre y apellido
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  autoComplete="name"
                  aria-invalid={intento && faltaNombre}
                  className={cn(
                    campo,
                    intento && faltaNombre && 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/15',
                  )}
                />
                {intento && faltaNombre && (
                  <span role="alert" className="text-sm font-medium text-red-600">
                    Escribe tu nombre para continuar.
                  </span>
                )}
              </label>
              <label className={etiqueta}>
                <span>
                  Empresa <Opcional />
                </span>
                <input
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  autoComplete="organization"
                  className={campo}
                />
              </label>
            </div>

            <fieldset>
              <legend className={etiqueta}>¿Qué necesitas?</legend>
              <div role="radiogroup" className="mt-3 flex flex-wrap gap-2.5">
                {OPCIONES.map((o) => {
                  const elegido = servicio === o;
                  return (
                    <button
                      key={o}
                      type="button"
                      role="radio"
                      aria-checked={elegido}
                      onClick={() => setServicio(o)}
                      className={cn(
                        'rounded-full border px-4 py-2.5 text-sm font-medium transition outline-none focus-visible:ring-4 focus-visible:ring-primary/25',
                        elegido
                          ? 'border-primary bg-primary font-semibold text-primary-foreground'
                          : 'border-slate-300 text-slate-700 hover:border-[#071a2f] hover:text-[#071a2f]',
                      )}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <label className={etiqueta}>
              <span>
                Mensaje <Opcional />
              </span>
              <textarea
                value={detalle}
                onChange={(e) => setDetalle(e.target.value)}
                rows={4}
                maxLength={500}
                placeholder="Ubicación del sitio, tipo de trabajo, fecha que necesitas…"
                className={cn(campo, 'resize-none rounded-[1.6rem]')}
              />
            </label>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <button
                type="submit"
                className="group inline-flex h-14 items-center gap-2.5 bg-primary text-primary-foreground rounded-full px-8 text-base font-bold shadow-lg shadow-primary/20 transition hover:brightness-105 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:outline-none"
              >
                <IconoWhatsapp className="size-5" />
                Enviar por WhatsApp
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <p className="text-sm text-slate-500">Se abre tu WhatsApp con el mensaje listo.</p>
            </div>
          </form>
        </Revelar>
      </div>
    </section>
  );
}
