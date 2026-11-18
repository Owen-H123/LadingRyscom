// Convierte las fotos de public/fotos y public/trabajos a WebP, el formato liviano para la web,
// y borra el original. Uso: pnpm optimizar:fotos
//
// - La portada (hero) se guarda hasta 1920 px de ancho; el resto hasta 1400 px.
// - Calidad 78: casi no se nota la diferencia y el archivo pesa una fracción.
// - Las fotos que ya son .webp no se tocan.
import { readdir, rm, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';
import sharp from 'sharp';

const CARPETAS = ['public/fotos', 'public/trabajos'];
const FORMATOS = new Set(['.png', '.jpg', '.jpeg']);
const kb = (n) => `${Math.round(n / 1024)} KB`;

for (const carpeta of CARPETAS) {
  for (const nombre of await readdir(carpeta)) {
    const extension = extname(nombre).toLowerCase();
    if (!FORMATOS.has(extension)) continue;

    const origen = join(carpeta, nombre);
    const destino = origen.slice(0, -extension.length) + '.webp';
    const ancho = nombre.startsWith('hero') ? 1920 : 1400;

    await sharp(origen)
      .rotate() // respeta la orientación con la que se tomó la foto
      .resize({ width: ancho, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(destino);

    const antes = (await stat(origen)).size;
    const despues = (await stat(destino)).size;
    await rm(origen);
    console.log(`${origen} → ${destino}: ${kb(antes)} → ${kb(despues)}`);
  }
}
