Ext.define('RaxaEmr.Outpatient.model.Patients', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
		{
			name: 'id',
            persist: false
		},{
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
            name: 'encounters',
            persist: false,
            model: 'RaxaEmr.Outpatient.model.encounters'
        }]
    }
});
