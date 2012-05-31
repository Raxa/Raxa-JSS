Ext.define("RaxaEmr.Pharmacy.controller.control", {
    extend: 'Ext.app.Controller',

    models: ['RaxaEmr.Pharmacy.model.dispensemodel'],

    stores: ['RaxaEmr.Pharmacy.store.dispensestore'],

    views:  ['RaxaEmr.Pharmacy.view.dispenseview'],

    init: function () {}    
});