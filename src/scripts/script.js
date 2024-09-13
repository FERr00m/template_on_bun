'use strict';
import hideMainLoader from './modules/hideMainloader';

window.addEventListener('DOMContentLoaded', () => {
  console.clear();
  console.log('DOMContentLoaded');

  // Images lazyload
  new LazyLoad({
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
