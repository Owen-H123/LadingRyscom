import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BarraSuperior } from '@/modules/landingryscom/components/barra-superior';
import { HeroEditorial } from '@/modules/landingryscom/components/hero-editorial';
import { Pie } from '@/modules/landingryscom/components/pie';
import {
  Compromisos,
  Contacto,
  Evidencia,
  Llamada,
  Proceso,
  Servicios,
} from '@/modules/landingryscom/components/secciones';
import './styles.css';

// Los enlaces del menú (#servicios…) se deslizan en vez de saltar.
document.documentElement.classList.add('scroll-smooth');

function Inicio() {
  return (
    <div className="bg-background text-foreground">
      <BarraSuperior />
      <main>
        <HeroEditorial />
        <Servicios />
        <Proceso />
        <Evidencia />
        <Compromisos />
        <Llamada />
        <Contacto />
      </main>
      <Pie />
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Inicio />
  </StrictMode>,
);
