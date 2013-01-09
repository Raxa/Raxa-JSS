Ext.define('RaxaEmr.billing.store.previousshow', {
    extend: 'Ext.data.Store',
    fields: ['providerId','description'],//'uuid','billItemIdId','quantity','price','discount','discountReason','value','providerId',{name :'dateCreated',type :'dateCreated', dateFormat: 'Y-n-d h:i:s A'}],
    model: 'RaxaEmr.billing.model.previousModel',
    autoLoad: false,
    autoSync: true,
    proxy: {
        type: 'rest',
        url: HOST + '/ws/rest/v1/raxacore/billingitem',
        headers: Util.getBasicAuthHeaders(),
        reader: {
            type: 'json',
            root: 'results'
        },
        writer: {
            type: 'json'
        }
,        
        afterRequest: function(request,success)
        {console.log("success")}
    }
});



