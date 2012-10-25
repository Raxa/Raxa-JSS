Ext.define('RaxaEmr.Pharmacy.store.StockList', {
    requires: ['RaxaEmr.Pharmacy.store.DrugInfos'],
    extend: 'Ext.data.Store',
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
        for(var i=0; i<this.data.items.length; i++){
            var item = this.data.items[i];
            if(item.data.batch!==null && item.data.batch!=="" && item.data.quantity!==0){
                item.set("batchQuantity", item.data.batch+" ("+item.data.quantity+")");
            }
            else{
                item.set("batchQuantity", null);
            }
            
            if(item.data.expiryDate!==""){
                item.set("months", Util.monthsFromNow(item.data.expiryDate));
            }
            else{
                item.set("months", null);
            }
        }
    }
});