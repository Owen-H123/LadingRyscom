import { gsap, ScrollTrigger, SplitText, sinMovimiento } from './gsap';

/**
 * Animaciones de toda la página, atadas al scroll. Se leen del HTML por atributos, así cada
 * componente solo marca lo que quiere y no sabe de GSAP:
 *
 * - data-parallax="8"   la imagen se desplaza ±8 % mientras su contenedor cruza la pantalla
 *                       (la imagen debe sobresalir del contenedor, que lleva overflow-hidden).
 * - data-split          el título sube palabra por palabra al entrar.
 * - data-hero-contenido el texto de la portada sube y se desvanece al bajar.
 * - data-barra          una barra que se llena desde cero al entrar.
 * - data-chip           elementos que aparecen uno tras otro (se agrupan por su contenedor).
 *
 * Con «reducir movimiento» no hace nada. Devuelve la función que deshace todo.
 */
export function iniciarAnimaciones(): () => void {
  if (sinMovimiento()) return () => {};

  const contexto = gsap.context(() => {
    // Parallax de imágenes
    gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
      const fuerza = Number(el.dataset.parallax) || 8;
      const caja = el.parentElement!;
      const esPortada = caja.id === 'inicio';
      gsap.fromTo(
        el,
        { yPercent: esPortada ? 0 : -fuerza },
        {
          yPercent: fuerza,
          ease: 'none',
          scrollTrigger: {
            trigger: caja,
            start: esPortada ? 'top top' : 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    });

    // Texto de la portada: sube y se desvanece
    gsap.utils
      .toArray<HTMLElement>('[data-hero-contenido]')
      .forEach((el) =>
        gsap.to(el, {
          yPercent: -14,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#inicio',
            start: '25% top',
            end: 'bottom 30%',
            scrub: true,
          },
        }),
      );

    // Títulos de sección: palabra por palabra, dentro de una máscara
    gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
      SplitText.create(el, {
        type: 'lines,words',
        mask: 'lines',
        autoSplit: true,
        onSplit: (separado) =>
          gsap.from(separado.words, {
            yPercent: 115,
            duration: 0.95,
            ease: 'power4.out',
            stagger: 0.06,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }),
      });
    });

    // Barras que se llenan
    gsap.utils.toArray<HTMLElement>('[data-barra]').forEach((el) =>
      gsap.from(el, {
        width: 0,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 100%', once: true },
      }),
    );

    // Grupos de elementos que aparecen en cascada
    const grupos = new Map<Element, HTMLElement[]>();
    gsap.utils.toArray<HTMLElement>('[data-chip]').forEach((el) => {
      const grupo = el.closest('[data-chips]') ?? el.parentElement!;
      grupos.set(grupo, [...(grupos.get(grupo) ?? []), el]);
    });
    grupos.forEach((elementos, grupo) =>
      gsap.from(elementos, {
        scale: 0.6,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(2)',
        stagger: 0.12,
        scrollTrigger: { trigger: grupo, start: 'top 100%', once: true },
      }),
    );
  });

  // Las imágenes y la tipografía cambian las alturas al cargar: se recalculan las posiciones.
  const recalcular = () => ScrollTrigger.refresh();
  window.addEventListener('load', recalcular);
  void document.fonts?.ready.then(recalcular);

  return () => {
    window.removeEventListener('load', recalcular);
    contexto.revert();
  };
}
