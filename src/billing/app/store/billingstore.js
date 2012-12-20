Ext.define('RaxaEmr.billing.store.billingstore', {
    extend: 'Ext.data.Store',
     fields:['uuid','billId', 'status','providerId','balance','totalAmount', {name :'dateCreated',type :'dateCreated', dateFormat: 'Y-n-d h:i:s A'}],
    model: 'RaxaEmr.billing.model.billModel',
    autoLoad: false,
    autoSync: false,
  proxy: {

       type: 'rest',
 
         url: 'http://localhost:8081/openmrs-standalone/ws/rest/v1/raxacore/billing',
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