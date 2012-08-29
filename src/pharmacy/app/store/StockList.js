Ext.define('RaxaEmr.Pharmacy.store.StockList', {
    extend: 'Ext.data.Store',
    id: 'stockList',
    model: 'RaxaEmr.Pharmacy.model.DrugInventory',
    autoLoad: true,
    autoSync: false,
    proxy: {
        type: 'ajax',
        url: HOST + '/ws/rest/v1/raxacore/druginventory',
        headers: Util.getBasicAuthHeaders(),
        reader: {
            type:'json',
            root: 'results'
        }
    }
});