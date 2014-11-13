var atmCtrl = require('../controllers/atm.controller');

module.exports = function(api) {

    // routing middleware.  all requests to any api containing
    // 'atmId' paramater or 'purhaseId' parameter will get run
    // through the provided callback.  This basically just ensures
    // the parameter ids are valid.
    api.param('atmId', atmCtrl.checkATMId);
    api.param('purchaseId', atmCtrl.checkPurchaseId);

    // routes for the API
    api.route('/atm')

        .post(atmCtrl.create)

        .get(atmCtrl.list);

    // routes for specific transaction identified by :atmId
    api.route('/atm/:atmId')

        .get(atmCtrl.listById)

        .put(atmCtrl.update)

        .delete(atmCtrl.delete);

    // routes for the purchases of a specific transaction identified
    // by atmId
    api.route('/atm/:atmId/purchases')

        .get(atmCtrl.listPurchases)

        .post(atmCtrl.createPurchase);

    return api;
};
