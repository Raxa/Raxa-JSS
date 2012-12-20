/* model for addresses field in the person model */
Ext.define('RaxaEmr.billing.model.previousModel', {
    extend: 'Ext.data.Model',

    fields: [{
       
        name: 'OldproviderId',
        type: 'int'
    }, 
    {
       
        name: 'Olddescription',
        type: 'string'
    }, 
    
    {
       
        name: 'Oldname',
        type: 'string'
    },
    {
       
        name: 'OlddiscountReason',
        type: 'string'
    },
    {
       
        name: 'Olduuid',
        type: 'string'
    },
    {
       
        name: 'Olddiscount',
        type: 'int'
    },
    {
       
        name: 'Oldquantity',
        type: 'int'
    },
    {
       
        name: 'Oldvalue',
        type: 'int'
    },
    {
       
        name: 'OldbillItemId',
        type: 'int'
    },
]
});