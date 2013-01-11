Ext.define('RaxaEmr.Admin.model.Location', {
    extend: 'Ext.data.Model',
    config: {
        fields: [ {
            name: 'id',
            persist: false
        },{
            name: 'uuid',
            type: 'string'
        }, {
            name: 'display',
            type: 'string'
        },{
            name: 'name'
        },{
            name: 'parentLocation'
        },
        {
            name: 'childLocations'
        },
        ]
    }
});