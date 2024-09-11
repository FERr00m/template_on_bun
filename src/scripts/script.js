'use strict';
window.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');

  const myUtils = new MyUtils();

  console.log(myUtils.classof([]));
});

window.addEventListener('load', () => {
  const hideMainLoader = () => {
    document.body.classList.remove('not-ready');
  };

  setTimeout(() => {
    hideMainLoader();
  }, 2000);
});
