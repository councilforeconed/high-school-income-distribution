/* globals d3, _, console */

import BinCollection from 'appkit/models/bin-collection';

export default Ember.ArrayController.extend(Ember.Evented, {

  init: function () {
    this._super();
    this.on('binChange', this.onBinChange);
  },

  correctAnswer: false,

  quintiles: function () {
    var incomes = this.get('content').sortBy('value');
    var quintiles = Array.apply(null, new Array(5)).map(function () { return []; });
    var scale = d3.scale.quantize().domain([0, incomes.length]).range(d3.range(0,5));
    incomes.forEach(function (income, index) {
      quintiles[scale(index)].push(income);
    });
    return quintiles;
  }.property('content'),

  bins: function () {
    var bins = BinCollection.create({ controller: this });
    return bins.get('bins');
  }.property(),

  onBinChange: function () {
    var binValues = this.get('bins')
      .map(function (x) { return x.get('cards'); });
    binValues = _.flatten(binValues)
      .map(function (card) { return card.get('value'); })
      .sort(function (a, b) {
        return a - b;
      });
    var quintiles = _.flatten(this.get('quintiles'))
      .map(function (card) {
        return card.get('value');
      }).sort(function (a, b) {
        return a - b;
      });
    this.set('correctAnswer', _.isEqual(binValues,quintiles));
    console.log(binValues, quintiles, this.get('correctAnswer'));
  }

});
