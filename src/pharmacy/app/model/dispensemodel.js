Ext.define('Pharmacy.model.dispensemodel', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'drugname',
            type: 'string'
        }, 
		{
            name: 'dosage',
            type: 'string'
        },
		{
            name: 'disp',
            type: 'string'
        }, 
		{
            name: 'instock',
            type: 'string'
        }, 
		{
            name: 'labels',
            type: 'string'
        }, 
		{
            name: 'inhand',
            type: 'string'
        },
		]
    }
);