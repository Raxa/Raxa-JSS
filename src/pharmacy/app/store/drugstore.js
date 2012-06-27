Ext.define('RaxaEmr.Pharmacy.store.drugstore', {
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.Pharmacy.model.drugmodel',
    proxy: {
        type: 'ajax',
        url: 'data/drugs.json',
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        } 
    }
});