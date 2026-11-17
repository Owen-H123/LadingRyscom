/**
 * Dirección del sistema (la app de RYSCOM). Se define en Railway con VITE_APP_URL,
 * sin barra final. Los botones «Ingresar» llevan a su pantalla de login.
 */
const APP_URL = (
  import.meta.env.VITE_APP_URL ?? 'https://ryscom-production.up.railway.app'
).replace(/\/$/, '');

export const URL_LOGIN = `${APP_URL}/login`;
