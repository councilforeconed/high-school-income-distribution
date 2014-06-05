import IncomeCard from 'appkit/models/income-card';

export default Ember.Route.extend({

  model: function () {
    var incomes = [
      5000,
      8250,
      12920,
      20710,
      20720,
      27280,
      32620,
      39000,
      39100,
      48800,
      50200,
      62175,
      62200,
      75800,
      89900,
      100240,
      100350,
      142000,
      165000,
      311400
    ];
    return incomes.map(function (card) {
      return IncomeCard.create({value: card});
    });
  }

});
