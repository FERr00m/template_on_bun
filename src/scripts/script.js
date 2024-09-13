'use strict';
import hideMainLoader from './modules/hideMainloader';

window.addEventListener('DOMContentLoaded', () => {
  console.clear();

  // Images lazyload
  const lazyImagesInstance = new LazyLoad({
    callback_loaded: (img) => {
      //console.log('image loaded', img);
    },
  });

  const myUtils = new MyUtils();

  console.log('Cookies ', myUtils.getCookies());
});

window.addEventListener('load', () => {
  setTimeout(() => {
    hideMainLoader();
  }, 2000);
});
