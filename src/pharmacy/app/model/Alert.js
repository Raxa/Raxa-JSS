Ext.define('RaxaEmr.Pharmacy.model.Alert', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        //every model have a id field by default and it shouldn't go with post call's body so
        //we defined it and made the persist property false 
        persist: false 
    }, {
        name: 'name',
        type: 'string',
        mapping: 'name'
    }, {
        name: 'description',
        type: 'string',
        mapping: 'description'
    }, {
        name: 'seen',
        type: 'boolean',
        mapping: 'seen'
    }, {
        name: 'alertType',
        type: 'string',
        mapping: 'alertType'
    }, {
        name: 'defaultTask',
        type: 'string',
        mapping: 'defaultTask'
    },{
        name: 'uuid',
        type: 'string',
        persist: false
    },{
        name: 'toLocation',
        model: 'RaxaEmr.Pharmacy.model.Location'
    },{
        name: 'fromLocation',
        model: 'RaxaEmr.Pharmacy.model.Location'
    },{
        name: 'toLocationName',
        mapping: 'toLocation.display'
    },{
        name: 'fromLocationName',
        mapping: 'fromLocation.display'
    },{
        name: 'time',
        type: 'string',
        mapping: 'time'
    }
]
});

