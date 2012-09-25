Ext.define('RaxaEmr.Pharmacy.store.orderStore', {
    extend: 'Ext.data.Store',
    fields: ['drugName', 
        { 
            name: 'dosage',
            type: 'float'
        },
         'duration', 'qty', 'unitprice', 'itemprice', 'batchQuantity', 'batchUuid', 'drugUuid']
});