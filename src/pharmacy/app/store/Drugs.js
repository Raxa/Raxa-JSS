Ext.define('RaxaEmr.Pharmacy.store.Drugs', {
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.Pharmacy.model.Drug',
    autoLoad: true,

    proxy: {
        type: 'localstorage',
        id: 'id',
        reader: {
            type: 'json',
            root: 'drugs',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }

    }



});