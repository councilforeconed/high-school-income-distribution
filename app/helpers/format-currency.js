/* globals numeral */
export default Ember.Handlebars.makeBoundHelper(function(number, options) {
  if (!number) {
    if (options.hash.alt) {
      return numeral(options.hash.alt).format('$0,0');
    }
    return '';
  } else {
    return numeral(number).format('$0,0');
  }
});
