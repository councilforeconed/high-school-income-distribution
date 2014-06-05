export default Ember.Handlebars.makeBoundHelper(function(number, options) {
  var unit = number === 1 ? "resource" : "resources";
  if (options.hash.capitalize) unit = unit.capitalize();
  return '%@ %@'.fmt(number, unit);
});
