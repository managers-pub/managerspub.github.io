// Header
module.exports = function footer(path) {
  'use strict';
  const strings = require('../content/strings.json');

  if(path === undefined) {
    path = '';
  }
  const svgHeart = `<svg class="heart"><use xlink:href="#heart"></use></svg>`;
  const template = `<footer>
      <div class="row">${strings.footer}</div>
  </footer>`;

  return template;
};