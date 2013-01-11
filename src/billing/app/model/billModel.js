/* model for addresses field in the person model */
Ext.define('RaxaEmr.billing.model.billModel', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'billId',
       // type: 'int'
       persist: false
        
        
    }, {
        name: 'uuid',
        type: 'string'
    }, {
        name: 'status',
        type: 'string'
    },
    
    {
        name: 'dateCreated',
        type: 'date'
    },
    
        {
        name: 'providerId',
        type: 'int'
    },
     {
        name: 'patientId',
        type: 'int'
    },
    {
        name: 'balance',
        type: 'int'
    },
    {
        name: 'totalAmount',
        type: 'int'
    },
    
       {
        name: 'name',
        type: 'string'
    } ,
    {
        name: 'description',
        type: 'string'
    } ,
    
     {
        name: 'billItems',
         model: 'RaxaEmr.billing.model.billingItem'
    } 

]
});
