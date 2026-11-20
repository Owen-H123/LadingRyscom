// Genera las imágenes que usan los buscadores y las redes. Uso: pnpm generar:imagenes-seo
//
// - public/ryscom-logo.webp  el único logo que publica el sitio: barra, pie y datos para Google.
//                            Sale del original en PNG (scripts/originales/, ~360 KB), que no se publica.
// - public/og-ryscom.jpg     la tarjeta de 1200×630 que aparece al compartir el enlace en WhatsApp,
//                            LinkedIn, Facebook o X. Sale de la foto de portada y el logo.
//
// Solo hay que volver a correrlo si cambian el logo o la foto de portada.
import sharp from 'sharp';

const ANCHO = 1200;
const ALTO = 630;
const NARANJA = '#ffa31a';
const LOGO_ORIGINAL = 'scripts/originales/ryscom-logo.png';

// Logo: 320 px de ancho alcanza para verse nítido en pantallas de alta densidad.
await sharp(LOGO_ORIGINAL)
  .resize({ width: 320 })
  .webp({ quality: 90, alphaQuality: 100 })
  .toFile('public/ryscom-logo.webp');

// Tarjeta para compartir: foto, velo oscuro a la izquierda, texto y logo en un cuadro blanco.
const foto = await sharp('public/fotos/hero.webp')
  .resize(ANCHO, ALTO, { fit: 'cover', position: 'right' })
  .toBuffer();

const texto = `
<svg width="${ANCHO}" height="${ALTO}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="velo" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#050f1c" stop-opacity="0.92"/>
      <stop offset="0.55" stop-color="#050f1c" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#050f1c" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#velo)"/>
  <g font-family="Inter, 'Segoe UI', Arial, sans-serif">
    <text x="72" y="250" fill="${NARANJA}" font-size="22" font-weight="700" letter-spacing="5">TELECOMUNICACIONES · PERÚ</text>
    <text x="72" y="320" fill="#ffffff" font-size="58" font-weight="800">Mantenimiento de torres</text>
    <text x="72" y="388" fill="#ffffff" font-size="58" font-weight="800">de telecomunicaciones</text>
    <text x="72" y="440" fill="#ffffff" fill-opacity="0.82" font-size="26">Preventivo, correctivo y obras nuevas, con informe fotográfico.</text>
  </g>
</svg>`;

const logo = await sharp(LOGO_ORIGINAL).resize({ height: 70 }).toBuffer();
const { width: anchoLogo = 104 } = await sharp(logo).metadata();
const cuadro = await sharp({
  create: { width: anchoLogo + 32, height: 70 + 24, channels: 4, background: '#ffffff' },
})
  .composite([{ input: logo, top: 12, left: 16 }])
  .png()
  .toBuffer();
const esquinas = Buffer.from(
  `<svg width="${anchoLogo + 32}" height="94"><rect width="100%" height="100%" rx="18" fill="#fff"/></svg>`,
);
const cuadroRedondeado = await sharp(cuadro)
  .composite([{ input: esquinas, blend: 'dest-in' }])
  .png()
  .toBuffer();

await sharp(foto)
  .composite([
    { input: Buffer.from(texto), top: 0, left: 0 },
    { input: cuadroRedondeado, top: 72, left: 72 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/og-ryscom.jpg');

console.log('Listo: public/ryscom-logo.webp y public/og-ryscom.jpg');
