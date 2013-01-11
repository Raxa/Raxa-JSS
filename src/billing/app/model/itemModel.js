Ext.define('RaxaEmr.billing.model.itemModel', {
    extend: 'Ext.data.Model',

    field: [{
       
        name: 'item_name',
        type: 'string'
    },
    
    { name: 'category',
        type: 'string'
    },
    
     { name: 'quantity',
        type: 'int'
    },
    
    
     { name: 'discount',
        type: 'int'
    },
    
     { name: 'total',
        type: 'int'
    },
    
    {
        name :'discountReason',
        type :'string'
    },
    {
        name: 'price',
        type: 'int'
}]
});


