App.QuintileBin = Ember.Object.extend({
  
  init: function () {
    this._super();
    this.set('cards', Em.A());
  },
  
  cardValues: function () {
    var bin = Em.A();
    var cardValues = this.get('cards').map(function (card) {
      return card.get('value');
    });
    return bin.pushObjects(cardValues);
  }.property('cards.@each'),
  
  invalid: true,
  
});