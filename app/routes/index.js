import IncomeCard from 'appkit/models/income-card';

export default Ember.Route.extend({

  model: function () {
    var incomes = [
      5000,
      8000,
      13000,
      21000,
      22000,
      27000,
      33000,
      39000,
      40000,
      49000,
      50000,
      62000,
      63000,
      76000,
      90000,
      100000,
      101000,
      142000,
      165000,
      311000
    ];
    return _.shuffle(incomes.map(function (card) {
      return IncomeCard.create({value: card});
    }));
  }

});
