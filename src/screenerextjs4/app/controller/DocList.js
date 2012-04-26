Ext.define('RaxaEmr.Screener.controller.DocList', {
    extend: 'Ext.app.Controller',

    refs: [{
        ref: 'docslistGrid',
        selector: 'docslistgrid'
    }],

    stores: ['DocsList'],

    onLaunch: function () {
        var doclistStore = this.getDocsListStore();
        doclistStore.load();
    }
});