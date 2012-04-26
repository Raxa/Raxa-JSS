Ext.define('RaxaEmr.Screener.controller.MapDocsList', {
    extend: 'Ext.app.Controller',

    refs: [{
        ref: 'mapdocslistGrid',
        selector: 'mapdocslistgrid'
    }],

    stores: ['MapDocsList'],

    onLaunch: function () {
        var mapdoclistStore = this.getMapDocsListStore();
        mapdoclistStore.load();
    }
});