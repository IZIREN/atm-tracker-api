// define the Purchase model using the constructor pattern

var Purchase = function(opts) {

    this.amount = opts.amount || 0.00;
    this.description = opts.description || 'no description provided';

};

module.exports = Purchase;
