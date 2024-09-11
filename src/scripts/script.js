'use strict';
window.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');

  const myUtils = new MyUtils();

  console.log(myUtils.classof([]));
});

window.addEventListener('load', () => {
  console.log('load');
});
