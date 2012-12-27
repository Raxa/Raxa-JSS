/* store for the get call of drug orders related the patients */
Ext.define('RaxaEmr.Pharmacy.store.drugOrderSearch',{
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.Pharmacy.model.drugOrderSearch',
    listeners:{
        //calculating months left before expiry date on each drug in inventory
        //setting batch + quantity for as one field for easy display
        'load': {
            fn: function(){
                console.log("inside listener of drugOrderSearch");
                console.log(Ext.getStore('drugOrderSearch'));
                this.group('date');
            }
        }
    }
})