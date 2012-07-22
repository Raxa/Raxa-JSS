Ext.define('Laboratory.store.concept', {
    extend: 'Ext.data.Store',
    fields: [{
            name: 'Specimen',
            type: 'string'
        }, {
            name: 'Test',
            type: 'string'
        }, {
            name: 'Result'
        }, {
            name: 'Units',
            type: 'string'
        }, {
            name: 'Flag',
            type: 'string'
        }],
    groupField: 'Specimen',
    data: [{
            Specimen: 'Urine',
            Test: 'color',
            Result: 'Yellow',
            Units: '-',
            Flag: 'A'
            
    }, {
        Specimen: 'Urine',
            Test: 'pH',
            Result: 5,
            Units: '-',
            Flag: 'A'
            
    }, {
        Specimen: 'Urine',
            Test: 'sugar',
            Result: 5.6,
            Units: 'gm/l',
            Flag: 'A'
            
    }, {
        Specimen: 'Blood',
            Test: 'sugar',
            Result: 5.6,
            Units: 'gm/l',
            Flag: 'A'
            
    }]
})

