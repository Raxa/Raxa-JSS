Ext.define('RaxaEmr.Pharmacy.store.DrugInfos', {
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.Pharmacy.model.DrugInfo',
    autoLoad: true,
    storeId: 'DrugInfos',
    autoSync: false,
    proxy: {
        type: 'ajax',
        url: HOST + '/ws/rest/v1/raxacore/druginfo?v=full&limit=400',
        headers: Util.getBasicAuthHeaders(),
        reader: {
            type:'json',
            root: 'results'
        }
    },
    listeners: {
        load: function() {
            if(Ext.getStore('allDrugs')){
                //update fields in drug
                console.log('all drugs here');
            }
        }
    }
});