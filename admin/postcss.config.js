// Tailwind v4 is processed entirely by the @tailwindcss/vite plugin (see vite.config.js).
// This file exists only to stop postcss-load-config from walking up to the root
// project's postcss.config.js, which references the root's Tailwind v3 install
// and conflicts with this app's own Tailwind v4 (causes a 500 on src/index.css).
export default {
  plugins: {},
}
