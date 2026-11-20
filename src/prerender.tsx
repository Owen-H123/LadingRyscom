import { renderToString } from 'react-dom/server';
import { App } from '@/app/App';

/**
 * Se ejecuta al compilar (ver seo/plugin.ts), nunca en el navegador: devuelve el HTML de toda la
 * página para escribirlo dentro de #root. Así los buscadores y las vistas previas de WhatsApp o
 * LinkedIn leen el contenido sin ejecutar JavaScript.
 */
export function renderizar(): string {
  return renderToString(<App prerenderizado />);
}
