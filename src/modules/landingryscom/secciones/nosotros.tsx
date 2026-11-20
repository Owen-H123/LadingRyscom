import { ArrowRight } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { CONTENEDOR } from '../componentes/estilos';
import { NOSOTROS } from '../datos/contenido';
import { useAnimacion } from '../hooks/use-animacion';

/**
 * «Nosotros»: franja naranja de borde a borde con el título a la izquierda y dos columnas de texto,
 * y debajo una foto a todo el ancho que se desplaza un poco al bajar.
 */
export function Nosotros() {
  const ref = useAnimacion<HTMLElement>((raiz) => {
    gsap.from(raiz.querySelectorAll('[data-columna]'), {
      y: 30,
      opacity: 0,
      duration: 0.45,
      ease: 'power3.out',
      stagger: 0.07,
      scrollTrigger: { trigger: raiz, start: 'top 85%', once: true },
    });
  });

  return (
    <section ref={ref} id="nosotros" data-claro aria-label="Nosotros" className="relative">
      <div className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className={`${CONTENEDOR} grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-12`}>
          <h2 data-split className="text-[2.6rem] leading-[1.02] md:text-[3.4rem]">
            {NOSOTROS.titulo}
          </h2>
          {NOSOTROS.parrafos.map((p, i) => (
            <div key={i} data-columna className="lg:pt-2">
              <p className="text-lg leading-relaxed">{p}</p>
              {i === NOSOTROS.parrafos.length - 1 && (
                <a
                  href="#servicios"
                  className="group mt-5 inline-flex items-center gap-2 border-b-2 border-current pb-0.5 font-bold"
                >
                  Ver servicios
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="relative h-[55vh] min-h-80 overflow-hidden bg-[#050f1c] md:h-[80vh]">
        <img
          data-parallax="8"
          src={NOSOTROS.foto.src}
          alt={NOSOTROS.foto.alt}
          loading="lazy"
          className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover object-[72%_center] md:object-center"
        />
      </div>
    </section>
  );
}
