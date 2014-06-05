/* globals d3, _, console */

import BinCollection from 'appkit/models/bin-collection';

export default Ember.ArrayController.extend(Ember.Evented, {

  init: function () {
    this._super();
    this.on('binChange', this.onBinChange);
  },

  zIndex: 0,
  isComplete: false,
  correctAnswer: false,
  errorMessage: null,
  successMessage: null,
  binValues: null,

  sum: function () {
    var binValues = this.get('binValues');
    if (!binValues) return 0;
    return binValues.reduce(function (p,c) {
      return p + c;
    }, 0);
  }.property('binValues'),

  mean: function () {
    var binValues = this.get('binValues');
    if (!binValues) return 0;
    return this.get('sum') / binValues.length;
  }.property('binValues', 'sum'),

  median: function () {
    var binValues = this.get('binValues');
    if (!binValues) return 0;
    var length = binValues.length;
    if (length % 2 === 0) {
      var a = binValues[Math.floor(length/2)];
      var b = binValues[Math.floor(length/2) - 1];
      return (a + b) / 2;
    } else {
      return binValues[Math.floor(length/2)];
    }
  }.property('binValues'),

  quintiles: function () {
    var incomes = this.get('content').sortBy('value');
    var quintiles = Array.apply(null, new Array(5)).map(function () { return []; });
    var scale = d3.scale.quantize().domain([0, incomes.length]).range(d3.range(0,5));
    incomes.forEach(function (income, index) {
      quintiles[scale(index)].push(income);
    });
    return quintiles;
  }.property('content'),

  sortedValues: function () {
    return _.flatten(this.get('quintiles'))
      .map(function (card) {
        return card.get('value');
      }).sort(function (a, b) {
        return a - b;
      });
  }.property('quintiles'),

  bins: function () {
    var bins = BinCollection.create({ controller: this });
    return bins.get('bins');
  }.property(),

  onBinChange: function () {
    var binValues = _(this.get('bins'))
      .map(function (x) { return x.get('cards'); })
      .flatten()
      .map(function (card) { return card.get('value'); })
      .sort(function (a, b) {
        return a - b;
      }).value();
    this.set('binValues', binValues);
    var values = this.get('sortedValues');
    this.set('correctAnswer', _.isEqual(binValues,values));
  },

  actions: {
    checkAnswers: function () {
      if (!this.get('correctAnswer')) {
        var self = this;
        this.set('errorMessage', 'Hmm. That doesn\'t seem to be correct. Keep trying.');
        setTimeout(function () {
          self.set('errorMessage', null);
        }, 3000);
      } else {
        this.set('successMessage', 'Correct!');
      }
    }
  }

});
