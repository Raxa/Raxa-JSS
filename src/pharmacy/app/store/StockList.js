Ext.define('RaxaEmr.Pharmacy.store.StockList', {
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.Pharmacy.model.DrugInventory',
    storeId: 'stockList',
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
    },
    listeners:{
        //calculating months left before expiry date on each drug in inventory
        //setting batch + quantity for as one field for easy display
        'load': {
            fn: function(){
                this.updateFields();
            }
        }
    },
    updateFields: function(){
        this.group('drugName');
        for(var i=0; i<this.data.items.length; i++){
            var item = this.data.items[i];
            if(item.data.batch!==null && item.data.batch!=="" && item.data.quantity!==0){
                item.set("batchQuantity", item.data.batch+" ("+item.data.quantity+")");
            }
            else{
                item.set("batchQuantity", null);
            }
            if(item.data.expiryDate!==""){
                var days = Util.daysFromNow(item.data.expiryDate);
                item.set("days", days);
                if(days <= 0){
                    item.set("status", RaxaEmr_Pharmacy_Controller_Vars.STOCK_STATUS.EXPIRED);
                }
            }
            else{
                item.set("days", null);
            }
        }
        this.filter('status', RaxaEmr_Pharmacy_Controller_Vars.STOCK_STATUS.AVAILABLE);
    }
});