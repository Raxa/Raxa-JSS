Ext.define('RaxaEmr.Pharmacy.store.dispensestore', {  
    extend: 'Ext.data.Store',
    autoLoad: true,
    fields: ['drugname','dosage','disp','instock','labels','inhand'],
    proxy: {
        type: 'ajax',
        url : 'data/drugdispensed.json',
        reader: {
            type: 'json',
            root: 'drug'
        }
    }
});
