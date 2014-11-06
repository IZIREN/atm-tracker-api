// define the Purchase model using the constructor pattern

var Purchase = function(args) {
    var purchase= {};

    purchase.amount = args.amount;
    purchase.description = args.description;

    return purchase;
};

module.exports = Purchase;
