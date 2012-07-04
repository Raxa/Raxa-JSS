Ext.define('RaxaEmr.Pharmacy.store.orderStore', {
    extend: 'Ext.data.Store',
    fields: ['no', 'drugname', 'dosage', 'duration', 'qty', 'unitprice', 'itemprice'],
    autoLoad: true,
    autoSync: false,
    proxy: {
        type: 'ajax',
        url: 'data/drugs.json',
        reader: {
            type: 'json'
        }
    }
});