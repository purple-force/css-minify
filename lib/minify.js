const postcss = require('postcss');
const cssnano = require('cssnano');
const minify = async (str) => {
  const result = await postcss([cssnano({
    preset: 'default',
  })]).process(str, { from: 'undefined' });
  return result.css;
};

module.exports = minify;
