import { useLayoutEffect, useState } from 'react';
import { iniciarAnimaciones } from '@/lib/animaciones-scroll';
import { crearSuavizado } from '@/lib/gsap';
import { BarraSuperior } from '@/modules/landingryscom/layout/barra-superior';
import { BotonWhatsapp } from '@/modules/landingryscom/layout/boton-whatsapp';
import { Pie } from '@/modules/landingryscom/layout/pie';
import { Apertura } from '@/modules/landingryscom/secciones/apertura';
import { Contacto } from '@/modules/landingryscom/secciones/contacto';
import { Declaracion } from '@/modules/landingryscom/secciones/declaracion';
import { HeroEditorial } from '@/modules/landingryscom/secciones/hero';
import { Servicios } from '@/modules/landingryscom/secciones/servicios';
import { Trabajos } from '@/modules/landingryscom/secciones/trabajos';

/** Todo lo que se desplaza con la página, de arriba hacia abajo. */
function Contenido() {
  useLayoutEffect(() => iniciarAnimaciones(), []);
  return (
    <>
      <main>
        <HeroEditorial />
        <Apertura />
        <Declaracion />
        <Servicios />
        <Trabajos />
        <Contacto />
      </main>
      <Pie />
    </>
  );
}

/**
 * La landing completa. El scroll suave debe existir ANTES que cualquier animación atada al
 * scroll: por eso el contenido solo se monta cuando ya está listo.
 */
export function App() {
  const [listo, setListo] = useState(false);
  useLayoutEffect(() => {
    const deshacer = crearSuavizado();
    setListo(true);
    return () => {
      setListo(false);
      deshacer();
    };
  }, []);

  return (
    <div className="bg-[#050f1c] text-white">
      {/* Lo fijo va fuera del contenedor del scroll suave, que se mueve con transform. */}
      <BarraSuperior />
      <BotonWhatsapp />
      <div id="smooth-wrapper">
        <div id="smooth-content">{listo && <Contenido />}</div>
      </div>
    </div>
  );
}
