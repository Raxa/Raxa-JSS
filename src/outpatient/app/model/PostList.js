Ext.define('RaxaEmr.Outpatient.model.PostList', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'id',
            persist: false
        }, {
			name: 'name',
			type: 'string'
		}, {
			name: 'description',
			type: 'string'
		}, {
			name: 'searchQuery',
			tyep: 'string'
		}, {
            name: 'uuid',
			type: 'string',
			persist: false
        }]
    }
});
