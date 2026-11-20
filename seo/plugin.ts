/// <reference types="node" />
/**
 * Plugin de Vite para el SEO. Al compilar (pnpm build):
 *
 * 1. Agrega al <head> lo que necesita la dirección pública del sitio: canonical, og:url, la imagen
 *    para compartir y los datos estructurados (JSON-LD).
 * 2. Pre-renderiza la página: escribe todo el contenido dentro de #root, para que Google, Bing y
 *    las vistas previas de WhatsApp o LinkedIn lo lean sin ejecutar JavaScript. Va invisible y
 *    React lo reemplaza al arrancar, así que la página se ve y se anima igual que antes.
 * 3. Escribe dist/robots.txt y dist/sitemap.xml.
 *
 * La dirección pública es https://www.ryscomhmsac.com; si el dominio cambia, se define SITE_URL
 * (en Railway o en .env) sin tocar el código.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createServer, loadEnv, type HtmlTagDescriptor, type Plugin } from 'vite';
import { DESCRIPCION, FOTOS_SITEMAP, IMAGEN_SOCIAL, TITULO, datosEstructurados } from './datos.ts';

/** Dirección pública de la landing. Se puede cambiar sin tocar el código con SITE_URL. */
const URL_POR_DEFECTO = 'https://www.ryscomhmsac.com';

function urlDelSitio(mode: string, raiz: string): string | undefined {
  const env = loadEnv(mode, raiz, '');
  const url = env.SITE_URL || URL_POR_DEFECTO;
  return url ? url.replace(/\/+$/, '') : undefined;
}

const escaparXml = (texto: string) =>
  texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function sitemap(url: string): string {
  const hoy = new Date().toISOString().slice(0, 10);
  const fotos = FOTOS_SITEMAP.map(
    (f) => `    <image:image><image:loc>${escaparXml(url + f)}</image:loc></image:image>`,
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${escaparXml(url)}/</loc>
    <lastmod>${hoy}</lastmod>
${fotos}
  </url>
</urlset>
`;
}

/** Renderiza la App en Node con un servidor de Vite temporal (sin escribir nada en disco). */
async function prerenderizar(raiz: string): Promise<string> {
  const servidor = await createServer({
    root: raiz,
    configFile: false,
    logLevel: 'error',
    appType: 'custom',
    server: { middlewareMode: true, hmr: false, ws: false },
    resolve: { alias: { '@': resolve(raiz, 'src') } },
  });
  try {
    const modulo = await servidor.ssrLoadModule('/src/prerender.tsx');
    return (modulo.renderizar as () => string)();
  } finally {
    await servidor.close();
  }
}

export function seo(): Plugin {
  let url: string | undefined;
  let raiz = process.cwd();
  let salida = 'dist';
  let compilando = false;

  return {
    name: 'ryscom-seo',
    configResolved(config) {
      raiz = config.root;
      salida = resolve(config.root, config.build.outDir);
      compilando = config.command === 'build';
      url = urlDelSitio(config.mode, config.root);
      if (compilando && !url) {
        config.logger.warn(
          '\n[seo] Falta SITE_URL (p. ej. SITE_URL=https://ryscom.pe): se compila sin canonical, ' +
            'og:url, imagen para compartir ni sitemap.\n',
        );
      }
    },

    transformIndexHtml: { order: 'pre', handler(htmlOriginal) {
      // index.html usa %SEO_TITULO% y %SEO_DESCRIPCION%: el texto vive solo en seo/datos.ts.
      const escapar = (t: string) => t.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
      const html = htmlOriginal
        .replaceAll('%SEO_TITULO%', escapar(TITULO))
        .replaceAll('%SEO_DESCRIPCION%', escapar(DESCRIPCION));

      const etiquetas: HtmlTagDescriptor[] = [];
      const meta = (attrs: Record<string, string>) =>
        etiquetas.push({ tag: 'meta', attrs, injectTo: 'head' });

      if (url) {
        etiquetas.push({ tag: 'link', attrs: { rel: 'canonical', href: `${url}/` }, injectTo: 'head' });
        meta({ property: 'og:url', content: `${url}/` });
        const imagen = `${url}${IMAGEN_SOCIAL.ruta}`;
        meta({ property: 'og:image', content: imagen });
        meta({ property: 'og:image:width', content: String(IMAGEN_SOCIAL.ancho) });
        meta({ property: 'og:image:height', content: String(IMAGEN_SOCIAL.alto) });
        meta({ property: 'og:image:alt', content: IMAGEN_SOCIAL.alt });
        meta({ name: 'twitter:image', content: imagen });
      }
      etiquetas.push({
        tag: 'script',
        attrs: { type: 'application/ld+json' },
        // «<» escapado para que ningún texto pueda cerrar la etiqueta <script>.
        children: JSON.stringify(datosEstructurados(url ?? '')).replace(/</g, '\\u003c'),
        injectTo: 'head',
      });
      return { html, tags: etiquetas };
    } },

    async closeBundle() {
      if (!compilando) return;

      const archivo = resolve(salida, 'index.html');
      const html = await readFile(archivo, 'utf8');
      const contenido = await prerenderizar(raiz);
      const marcador = '<div id="root"></div>';
      if (!html.includes(marcador)) throw new Error(`[seo] No se encontró ${marcador} en index.html`);
      await writeFile(
        archivo,
        html.replace(
          marcador,
          `<div id="root"><div data-prerender style="opacity:0">${contenido}</div></div>`,
        ),
      );

      await writeFile(
        resolve(salida, 'robots.txt'),
        `User-agent: *\nAllow: /\n${url ? `\nSitemap: ${url}/sitemap.xml\n` : ''}`,
      );
      if (url) await writeFile(resolve(salida, 'sitemap.xml'), sitemap(url));
    },
  };
}
