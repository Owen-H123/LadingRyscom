import { URL_LOGIN } from '@/config';
import { LogIn, Check, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { COMPROMISOS, CONTACTO, PASOS, SERVICIOS, hayContacto } from '../datos';
import { Revelar } from './revelar';

/** Encabezado común de cada sección: una etiqueta pequeña, el título y, si hay, una frase. */
function Encabezado({
  etiqueta,
  titulo,
  texto,
  centrado,
  oscuro,
}: {
  etiqueta: string;
  titulo: string;
  texto?: string;
  centrado?: boolean;
  oscuro?: boolean;
}) {
  return (
    <Revelar className={cn('max-w-2xl', centrado && 'mx-auto text-center')}>
      <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
        {etiqueta}
      </p>
      <h2 className="mt-3 text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl">
        {titulo}
      </h2>
      {texto && (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed md:text-lg',
            oscuro ? 'text-white/70' : 'text-muted-foreground',
          )}
        >
          {texto}
        </p>
      )}
    </Revelar>
  );
}

const CONTENEDOR = 'mx-auto max-w-6xl px-4 md:px-6';

export function Servicios() {
  return (
    <section id="servicios" className="scroll-mt-16 py-20 md:py-28">
      <div className={CONTENEDOR}>
        <Encabezado
          etiqueta="Qué hacemos"
          titulo="Servicios para que tu red siga en pie"
          texto="Trabajamos en torres y estaciones, y dejamos documentado cada paso."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {SERVICIOS.map((s, i) => (
            <li key={s.titulo}>
              <Revelar retraso={i * 80} className="h-full">
                <article className="group h-full rounded-3xl border bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-8">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <s.icono className="size-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight">
                    {s.titulo}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {s.texto}
                  </p>
                </article>
              </Revelar>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Proceso() {
  return (
    <section
      id="proceso"
      className="scroll-mt-16 bg-secondary/60 py-20 md:py-28"
    >
      <div className={CONTENEDOR}>
        <Encabezado
          etiqueta="Cómo trabajamos"
          titulo="Del pedido del cliente al informe final"
          texto="Cuatro pasos, siempre los mismos, para que nada se pierda en el camino."
        />
        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PASOS.map((p, i) => (
            <li key={p.titulo}>
              <Revelar retraso={i * 100} className="h-full">
                <div className="relative h-full rounded-3xl border bg-card p-6 shadow-xs">
                  <span
                    aria-hidden
                    className="absolute top-5 right-6 text-5xl font-semibold text-primary/15 tabular-nums"
                  >
                    {i + 1}
                  </span>
                  <p.icono className="size-7 text-primary" />
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    <span className="sr-only">Paso {i + 1}: </span>
                    {p.titulo}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.texto}
                  </p>
                </div>
              </Revelar>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Actividades de ejemplo para mostrar cómo se ve un informe; no son datos reales. */
const EJEMPLO = [
  {
    nombre: 'Cambio de cable de vida con suministro',
    etapas: [
      ['Antes', true],
      ['Durante', true],
      ['Finalizado', true],
    ],
  },
  {
    nombre: 'Cambio de grilletes',
    etapas: [
      ['Antes', true],
      ['Durante', true],
      ['Finalizado', false],
    ],
  },
] as const;

export function Evidencia() {
  return (
    <section
      id="evidencia"
      className="relative scroll-mt-16 overflow-hidden bg-[oklch(0.22_0.02_55)] py-20 text-white md:py-28"
    >
      <div
        className={cn(CONTENEDOR, 'grid items-center gap-12 lg:grid-cols-2')}
      >
        <div>
          <Encabezado
            etiqueta="Evidencia"
            titulo="Cada trabajo, con su evidencia."
            texto="El técnico sube las fotos desde el celular, en el sitio, y el informe se arma solo: por actividad y por etapa. Lo que falta se ve al instante, y el informe no se cierra hasta completarlo."
            oscuro
          />
          <Revelar retraso={150}>
            <ul className="mt-8 space-y-3 text-white/85">
              {[
                'Fotos de antes, durante y finalizado por cada actividad',
                'Fotos del personal con su equipo de protección',
                'Descarga del informe completo en carpetas ordenadas',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </Revelar>
        </div>

        {/* Maqueta de un informe, con datos de ejemplo. */}
        <Revelar retraso={200}>
          <figure>
            <div className="rounded-3xl bg-card p-6 text-card-foreground shadow-2xl shadow-black/30 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Informe</p>
                  <p className="font-semibold tabular-nums">
                    PE-03-AN-00595-15
                  </p>
                </div>
                <span className="rounded-full bg-info/10 px-3 py-1 text-xs font-medium text-info">
                  En ejecución
                </span>
              </div>

              <div className="mt-5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Avance del informe</span>
                  <span className="tabular-nums">85 %</span>
                </div>
                <div
                  className="mt-2 h-2 overflow-hidden rounded-full bg-muted"
                  role="img"
                  aria-label="Avance de ejemplo: 85 por ciento"
                >
                  <div className="h-full w-[85%] rounded-full bg-primary" />
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {EJEMPLO.map((a) => (
                  <li key={a.nombre} className="rounded-2xl border p-4">
                    <p className="text-sm font-medium">{a.nombre}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {a.etapas.map(([etapa, hecha]) => (
                        <span
                          key={etapa}
                          className={cn(
                            'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
                            hecha
                              ? 'bg-success/10 text-success'
                              : 'bg-muted text-muted-foreground',
                          )}
                        >
                          {hecha ? (
                            <Check className="size-3.5" />
                          ) : (
                            <span className="size-1.5 rounded-full bg-current" />
                          )}
                          {etapa}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-muted-foreground">
                Falta 1 foto: la de finalizado del cambio de grilletes.
              </p>
            </div>
            <figcaption className="mt-3 text-center text-xs text-white/50">
              Ejemplo ilustrativo de un informe.
            </figcaption>
          </figure>
        </Revelar>
      </div>
    </section>
  );
}

export function Compromisos() {
  return (
    <section id="compromisos" className="scroll-mt-16 py-20 md:py-28">
      <div className={CONTENEDOR}>
        <Encabezado
          etiqueta="Compromisos"
          titulo="Trabajo seguro, claro y verificable"
          centrado
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {COMPROMISOS.map((c, i) => (
            <li key={c.titulo}>
              <Revelar retraso={i * 100} className="h-full">
                <article className="h-full rounded-3xl border bg-card p-6 shadow-xs md:p-8">
                  <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <c.icono className="size-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    {c.titulo}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {c.texto}
                  </p>
                </article>
              </Revelar>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Invitación al sistema, como el bloque de llamada a la acción de la página de referencia. */
export function Llamada() {
  return (
    <section className="px-4 pb-20 md:px-6 md:pb-28">
      <Revelar>
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-[2rem] bg-primary p-8 text-primary-foreground md:flex-row md:items-center md:p-12">
          <div className="max-w-xl">
            <h2 className="text-2xl leading-tight font-semibold tracking-tight text-balance md:text-3xl">
              ¿Eres parte del equipo? Registra tu trabajo en campo.
            </h2>
            <p className="mt-3 text-primary-foreground/85">
              Ingresa con tu usuario para ver tus informes y subir las fotos.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="group rounded-xl text-foreground"
          >
            <a href={URL_LOGIN}>
              <LogIn className="icono-entrar" /> Ingresar al sistema
            </a>
          </Button>
        </div>
      </Revelar>
    </section>
  );
}

/** Solo aparece si hay al menos un dato de contacto en `datos.ts`. */
export function Contacto() {
  if (!hayContacto) return null;
  const filas = [
    CONTACTO.telefono && {
      icono: Phone,
      texto: CONTACTO.telefono,
      href: `tel:${CONTACTO.telefono.replace(/\s/g, '')}`,
    },
    CONTACTO.correo && {
      icono: Mail,
      texto: CONTACTO.correo,
      href: `mailto:${CONTACTO.correo}`,
    },
    CONTACTO.direccion && {
      icono: MapPin,
      texto: CONTACTO.direccion,
      href: undefined,
    },
  ].filter(Boolean) as {
    icono: typeof Phone;
    texto: string;
    href: string | undefined;
  }[];

  return (
    <section
      id="contacto"
      className="scroll-mt-16 bg-secondary/60 py-20 md:py-28"
    >
      <div className={CONTENEDOR}>
        <Encabezado
          etiqueta="Contacto"
          titulo="Hablemos de tu próximo trabajo"
          texto="Escríbenos o llámanos y te respondemos."
        />
        <Revelar className="mt-10" retraso={100}>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filas.map((f) => (
              <li key={f.texto}>
                <div className="flex h-full items-center gap-4 rounded-2xl border bg-card p-5">
                  <f.icono className="size-5 shrink-0 text-primary" />
                  {f.href ? (
                    <a href={f.href} className="font-medium hover:text-primary">
                      {f.texto}
                    </a>
                  ) : (
                    <span className="font-medium">{f.texto}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
          {CONTACTO.whatsapp && (
            <Button asChild size="lg" className="mt-6 rounded-xl">
              <a
                href={`https://wa.me/${CONTACTO.whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle /> Escribir por WhatsApp
              </a>
            </Button>
          )}
        </Revelar>
      </div>
    </section>
  );
}
