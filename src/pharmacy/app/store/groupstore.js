//store to add groups
Ext.define('RaxaEmr.Pharmacy.store.groupstore', {
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.Pharmacy.model.groupmodel',
    proxy: {
        type: 'ajax',
        url: 'data/group.json',
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        } 
    }
});