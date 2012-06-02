Ext.define('RaxaEmr.Pharmacy2.store.AllDrugslist',{
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.Pharmacy2.model.alldrugsmodel',
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
})