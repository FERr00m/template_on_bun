import vituum from 'vituum';
import pug from '@vituum/vite-plugin-pug';

//import { resolve } from 'path';
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        //assetFileNames: `assets/[name].[ext]`,
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
            return `assets/${extType}/[name][extname]`;
          }
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

// export default {
//   plugins: [
//     ,
//   ],
//   build: {
//     rollupOptions: {
//       input: ['index.pug'],
//     },
//   },
// };
