Ext.define('RaxaEmr.Pharmacy.store.orderStore', {
    extend: 'Ext.data.Store',
    fields: ['drugName', 
    { 
        name: 'dosage',
        type: 'float'
    },
    'duration', 'qty', 'batchQuantity', 'batchUuid', 'drugUuid', 'orderUuid',
    {
        name: 'takeInMorning',
        type: 'boolean',
        defaultValue: false
    },
    {
        name:'takeInDay',
        type: 'boolean',
        defaultValue: false
    },
    {
        name:'takeInEvening', 
        type: 'boolean',
        defaultValue: false
    },
    {
        name:'takeInNight',
        type: 'boolean',
        defaultValue: false
    },
    {
        name: 'instructions'
    },
    {
        name : 'date'
    }]
});