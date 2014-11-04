var atmCtrl = require('../controllers/atm.controller');

module.exports = function(api) {

    api.param('atmId', atmCtrl.checkId);

    // routes for the API
    api.route('/atm')

        .post(atmCtrl.create)

        .get(atmCtrl.list);

    api.route('/atm/:atmId')

        .get(atmCtrl.listById)

        .put(atmCtrl.update)

        .delete(atmCtrl.delete);

    api.route('/atm/:atmId/purchases')

        .get(atmCtrl.listPurchases)

        .post(atmCtrl.createPurchase);

    return api;
};
