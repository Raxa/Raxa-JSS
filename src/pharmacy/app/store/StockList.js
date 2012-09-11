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
    },
    listeners:{
        //calculating days left before expiry date on each drug in inventory
        //setting batch + quantity for as one field for easy display
        'load': {
            fn: function(){
                this.updateFields();
            }
        }

        
    },
    updateFields: function(){
        for(var i=0; i<this.data.items.length; i++){
            if(this.data.items[i].data.batch!==null && this.data.items[i].data.batch!=="" && this.data.items[i].data.quantity!==0){
                this.data.items[i].set("batchQuantity", this.data.items[i].data.batch+" ("+this.data.items[i].data.quantity+")");
            }
            else{
                this.data.items[i].set("batchQuantity", null);
            }
            if(this.data.items[i].data.expiryDate!==""){
                this.data.items[i].set("days", Util.daysFromNow(this.data.items[i].data.expiryDate));
            }
            else{
                this.data.items[i].set("days", null);
            }
        }

    }
});