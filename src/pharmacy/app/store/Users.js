Ext.define('RaxaEmr.Pharmacy.store.Users', {
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.Pharmacy.model.User',
    autoLoad: true,

    proxy: {
        type: 'localstorage',
        id: 'id',
        reader: {
            type: 'json',
            root: 'users',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }

    }



});