Ext.define("Pharmacy.controller.control", {
    extend: 'Ext.app.Controller',

    models: [
    'dispensemodel'
    ],

    stores: [
    'dispensestore'
    ],

    views:  [
    'dispenseview'
    ],

    init: function () {
    }    
});