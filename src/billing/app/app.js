// Enable dynamic dependency to be able find files at appropriate locations automatically
Ext.Loader.setConfig({
  enabled: true
});

// Main application entry point
Ext.application({
  name: 'RaxaEmr.billing',
  // Name of the application. Modules should use unique module name
  tabletIcon: 'resources/img/icon_s.png',
  tabletStartupScreen: 'resources/img/icon.png',
  //models: ['Session'],
  // List of Models for dynamic loading
  requires: ['RaxaEmr.billing.view.main', 'RaxaEmr.billing.view.EditItem', 'RaxaEmr.billing.view.currentbill', 'RaxaEmr.billing.view.discount', 'RaxaEmr.billing.view.previousBills', 'RaxaEmr.billing.view.currentBill_main', 'RaxaEmr.billing.view.print_Final', 'RaxaEmr.billing.view.previousShow', 'RaxaEmr.billing.view.searchPatient'],

  controllers: ['RaxaEmr.billing.controller.billings'],

  stores: ['RaxaEmr.billing.store.itemS', 'RaxaEmr.billing.store.billingstore', 'RaxaEmr.billing.store.itemStore', 'RaxaEmr.billing.store.previousshow', 'RaxaEmr.billing.store.billingItemstore'],

  models: ['RaxaEmr.billing.model.billModel', 'RaxaEmr.billing.model.itemModel', 'RaxaEmr.billing.model.billingItem', 'RaxaEmr.billing.model.previousModel'],

  launch: function() {
    Ext.onReady(function() {
      // if(Util.checkModulePrivilege('billing')){
      //console.log("Hello");
      var bill = Ext.create('RaxaEmr.billing.view.Viewport');
      //Ext.Viewport.add(bill);
      // }
    })
  }
  // List of Views for dynamic loading
  // controllers: ['Session'],
  // List of Controllers for dynamic loading
  // store: ['SessionStore'] // List of Stores for dynamic loading
});

//i18n
/*Ext.require('Ext.i18n.Bundle', function () {
    Ext.i18n.appBundle = Ext.create('Ext.i18n.Bundle', {
        bundle: 'RaxaEmr',
        //Specify language here.
        lang: 'en-US',
        path: 'app/view', // Path to the .properties file
        noCache: true
    });
});*/