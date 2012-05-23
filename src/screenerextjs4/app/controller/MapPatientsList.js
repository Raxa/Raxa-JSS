Ext.define('RaxaEmr.Screener.controller.MapPatientsList', {
    extend: 'Ext.app.Controller',

    refs: [{
        ref: 'mappatientsGrid',
        selector: 'mappatientsgrid'
    }],

    stores: ['MapPatientsList'],

    onLaunch: function () {
        var mappatientslistStore = this.getMapPatientsListStore();
        mappatientslistStore.load();
    }
});