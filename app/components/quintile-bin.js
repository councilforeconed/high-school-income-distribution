export default Ember.Component.extend({

  classNames: ['quintile-bin'],

  total: function() {
    var cards = this.get('bin.cards');
    return cards.reduce(function (prev, curr) {
      return prev + curr.get('value');
    }, 0);
  }.property('bin.cards.@each'),

  didInsertElement: function () {
    this.$().droppable({
      activeClass: "box-active",
      hoverClass: "box-hover",
      drop: function( event, ui ) {
        var model = Ember.View.views[ui.draggable[0].id].get('card');
        var element = $(ui.draggable);
        var cards = this.get('bin.cards');
        if (!cards.contains(model)) {
          cards.pushObject(model);
        }
      }.bind(this),
      out: function( event, ui ) {
        var model = Ember.View.views[ui.draggable[0].id].get('card');
        var element = $(ui.draggable);
        var cards = this.get('bin.cards');
        cards.removeObject(model);
      }.bind(this)
    });
  }

});
