Ext.define('RaxaEmr.Pharmacy.store.groupstore', {
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.Pharmacy.model.groupmodel',
    proxy: {
        type: 'ajax',
        url: 'data/group.json',
        reader: {
            type: 'json',
            root: 'groups',
            successProperty: 'success'
        }
    /* writer: {
             type: 'json',
             root: 'groups'
         }*/
    },
    autoLoad: true
});