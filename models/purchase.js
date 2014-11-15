// define the Purchase model using the constructor pattern

var Purchase = function(opts) {
    var purchase= {};

    purchase.amount = opts.amount || 0.00;
    purchase.description = opts.description || 'no description provided';

    return purchase;
};

module.exports = Purchase;
