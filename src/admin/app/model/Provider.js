Ext.define('RaxaEmr.Admin.model.Provider', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'id',
            type: 'int',
            persist: false
        }, {
            name: 'uuid',
            type: 'string'
        }, {
            name: 'display',
            type: 'string'
        },{
			name: 'identifier',
            type: 'number'
		},{
            name: 'person',
            model: 'RaxaEmr.Admin.model.Person'
        },{
            name: 'attributes',
            model: 'RaxaEmr.Admin.model.ProviderAttribute'
        }]
    }
});