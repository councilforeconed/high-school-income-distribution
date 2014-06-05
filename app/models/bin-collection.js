import QuintileBin from 'appkit/models/quintile-bin';

export default Ember.Object.extend({

  firstQuintile: function () {
    return QuintileBin.create();
  }.property(),

  secondQuintile: function () {
    return QuintileBin.create();
  }.property(),

  thirdQuintile: function () {
    return QuintileBin.create();
  }.property(),

  fourthQuintile: function () {
    return QuintileBin.create();
  }.property(),

  fifthQuintile: function () {
    return QuintileBin.create();
  }.property(),

  bins: function () {
    return Em.A([
      this.get('firstQuintile'),
      this.get('secondQuintile'),
      this.get('thirdQuintile'),
      this.get('fourthQuintile'),
      this.get('fifthQuintile')
    ]);
  }.property('firstQuintile', 'secondQuintile', 'thirdQuintile', 'fourthQuintile', 'fifthQuintile'),

  onChange: function () {
    this.get('controller').trigger('binChange');
  }.observes('firstQuintile.cards.@each', 'secondQuintile.cards.@each', 'thirdQuintile.cards.@each', 'fourthQuintile.cards.@each', 'fifthQuintile.cards.@each')

});
