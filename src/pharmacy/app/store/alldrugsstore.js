//store reading the drugs in the alldrugs
Ext.define('RaxaEmr.Pharmacy.store.alldrugsstore',{
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.Pharmacy.model.alldrugsmodel',
    id: 'alldrugs',
    
    proxy:{
        type: 'ajax',
        url: 'data/list.json',
            
        reader: {
            type: 'json',
            root: 'drug',
            successProperty: 'success'
        }
    },
    autoLoad: true
});