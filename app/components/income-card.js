export default Ember.Component.extend({
  classNames: ['income-card'],

    didInsertElement: function () {
      this.$().draggable({
        containment: '.playground',
        scroll: true,
        cursor: 'crosshair',
        start: function (event, ui) {
          this.$().css('z-index', parseInt((+new Date()).toString().slice(6), 10));
          this.$().addClass('income-card-active');
        }.bind(this),
        stop: function() {
          this.$().removeClass('income-card-active');
        }.bind(this)
      });
    }
});
