// Genera los fondos desenfocados de las secciones (Apertura, Declaración, Servicios, Trabajos).
// Uso: pnpm generar:fondos
//
// Antes el navegador desenfocaba las fotos en vivo con CSS (blur 32px + brillo + saturación) sobre
// cajas de hasta 1670×1227 px: en laptops sin tarjeta gráfica dedicada eso hacía pesado el scroll.
// Ahora el desenfoque viene hecho en imágenes pequeñas (480 px de ancho, unos KB) que el navegador
// solo estira: se ven igual y no cuestan nada al hacer scroll.
//
// El desenfoque de CSS se mide en píxeles de pantalla, así que equivale a más o menos desenfoque de
// la foto según el ancho de la pantalla. Por eso cada fondo tiene tres versiones (móvil < 768 px,
// tablet < 1280 px y escritorio), con el sigma medido en la página real a 390, 820 y 1440 px.
//
// Si se agrega o cambia un fondo en un componente (<FondoFundido src brillo>), hay que sumarlo aquí.
import { mkdir } from 'node:fs/promises';
import { basename, extname } from 'node:path';
import sharp from 'sharp';

const ANCHO = 480;
const SATURACION = 1.3;

/** sigma: desenfoque en píxeles de la foto original para cada tamaño de pantalla. */
const FONDOS = [
  { src: 'public/fotos/hero.webp', brillo: 0.3, sigma: { movil: 70.7, tablet: 45.7, escritorio: 32 } },
  { src: 'public/trabajos/torre-estructura.webp', brillo: 0.4, sigma: { movil: 47.6, tablet: 39.4, escritorio: 23 } },
  { src: 'public/trabajos/ajuste-equipos.webp', brillo: 0.4, sigma: { movil: 29.4, tablet: 38, escritorio: 23 } },
  { src: 'public/trabajos/torre-trabajo-en-altura.webp', brillo: 0.32, sigma: { movil: 45.9, tablet: 40.4, escritorio: 23 } },
];

// Matriz de saturate() de CSS (Filter Effects, feColorMatrix type="saturate").
const s = SATURACION;
const MATRIZ_SATURACION = [
  [0.213 + 0.787 * s, 0.715 - 0.715 * s, 0.072 - 0.072 * s],
  [0.213 - 0.213 * s, 0.715 + 0.285 * s, 0.072 - 0.072 * s],
  [0.213 - 0.213 * s, 0.715 - 0.715 * s, 0.072 + 0.928 * s],
];

await mkdir('public/fondos', { recursive: true });

for (const { src, brillo, sigma } of FONDOS) {
  const { width: anchoOriginal } = await sharp(src).metadata();
  const factor = ANCHO / anchoOriginal;
  const nombre = basename(src, extname(src));

  for (const [variante, sigmaOriginal] of Object.entries(sigma)) {
    const destino = `public/fondos/${nombre}-${Math.round(brillo * 100)}-${variante}.webp`;
    await sharp(src)
      .resize({ width: ANCHO })
      .blur(sigmaOriginal * factor)
      .linear(brillo, 0) // brightness() de CSS: multiplica cada canal
      .recomb(MATRIZ_SATURACION)
      .webp({ quality: 80 })
      .toFile(destino);
    console.log(destino);
  }
}
