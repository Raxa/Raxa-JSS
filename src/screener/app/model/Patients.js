Ext.define('Screener.model.Patients', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'uuid',
            type: 'string'
        }, {
            name: 'display',
            type: 'string'
        }, {
            name: 'gender',
            type: 'string'
        }, {
            name: 'age',
            type: 'int'
        }, {
			name: 'bmi',
			persist: false
		}, {
			name: 'time',
			persist: false
		}, {
            name: 'encounters',
            model: 'Screener.model.encounters'
        }]
    }
});
