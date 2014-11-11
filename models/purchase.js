// define the Purchase model using the constructor pattern

var Purchase = function(args) {
    var purchase= {};

    purchase.amount = args.amount || 0.00;
    purchase.description = args.description || 'no description provided';

    return purchase;
};

module.exports = Purchase;
