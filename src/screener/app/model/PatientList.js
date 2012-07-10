Ext.define('Screener.model.PatientList', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'uuid',
            type: 'string',
            persist: false
        }, {
            name: 'name',
            type: 'string'
        }, {
			name: 'description',
			type: 'string'					
		}, {
			name: 'searchQuery',
			type: 'string'
		}, {
            name: 'patients',
            model: 'Screener.model.Patients'
        }]
    }
});
