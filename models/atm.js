function ATM(atmObj) {
    var newATM = {};

    newATM.idx = atmObj.idx;
    newATM.cashAmount = atmObj.cashAmount;
    newATM.serviceFee = atmObj.serviceFee;
    newATM.date = atmObj.date;
    newATM.purchases = [];

    return newATM;
}

module.exports = ATM;