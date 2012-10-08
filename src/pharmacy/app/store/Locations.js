/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('RaxaEmr.Pharmacy.store.Locations', {
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.Pharmacy.model.Location',
    autoLoad: true,
    proxy: {
        type: 'rest',
        url: HOST + '/ws/rest/v1/location?v=full',
        headers: Util.getBasicAuthHeaders(),
        reader: {
            type: 'json',
            root: 'results'
        }
    },
    listeners: {
        'load': {
            fn: function(theStore, records){
                for(var i=0; i<records.length; i++){
                    if(records[i].hasTag(RaxaEmr_Pharmacy_Controller_Vars.DEFAULT_PHARMACY_LOCATION_TAG)){
                        localStorage.setItem('pharmacyLocation', records[i].data.uuid);
                    }
                    if(records[i].hasTag(RaxaEmr_Pharmacy_Controller_Vars.DEFAULT_STOCK_CENTER_LOCATION_TAG)){
                        localStorage.setItem('stockLocation', records[i].data.uuid);
                    }
                }
                theStore.filterBy(function(record){
                    if(record.hasTag(RaxaEmr_Pharmacy_Controller_Vars.PHARMACY_TAG)){
                        return true;
                    }
                    return false;
                });
            }
        }
    }
});

