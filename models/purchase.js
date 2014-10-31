function Purchase(purchaseObj) {
    var newPurchase = {};

    newPurchase.amount = purchaseObj.amount;
    newPurchase.description = purchaseObj.description;

    return newPurchase;
}

module.exports = Purchase;