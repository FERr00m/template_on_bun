import vituum from 'vituum';
import pug from '@vituum/vite-plugin-pug';

//import { resolve } from 'path';
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  build: {
    emptyOutDir: true,
    polyfillModulePreload: false,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        //assetFileNames: `assets/[name].[ext]`,
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/woff|woff2|eot|ttf/i.test(extType)) {
            //console.log(assetInfo);
            extType = 'fonts';
            return `assets/${extType}/[name][extname]`;
          }
          return `assets/[name][extname]`;
        },
      },
    },
    minify: false,
  },
  plugins: [
    vituum(),
    pug({ options: { pretty: true } }), // options https://pugjs.org/api/reference.html
  ],
  server: {
    open: '/index.html',
    port: 5000,
  },
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [
        autoprefixer(), // add options if needed
      ],
    },
  },
});
