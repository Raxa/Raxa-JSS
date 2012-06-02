Ext.define('RaxaEmr.Pharmacy2.model.drugmodel', {
    extend: 'Ext.data.Model',
    modelId: 'modelId',
    fields: ['drugname', 'tablets', 'days'],
    proxy: {
        type: 'localstorage',
        id: 'grouped'
    }
});