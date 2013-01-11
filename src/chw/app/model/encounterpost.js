Ext.define('chw.model.encounterpost', {
	extend: 'Ext.data.Model',
	config: {
		fields: [{
			name: 'id',
			persist: false
		},
		{
			name: 'patient',
			type: 'string',
			mapping: 'patient.uuid'
		},
		{
			name: 'encounterType',
			type: 'string'
		},
		{
			name: 'encounterDatetime',
			type: 'string'
		},
		{
			name: 'provider',
			type: 'string',
			mapping: 'provider.uuid'
		},
		{
			name: 'location',
			type: 'string',
			persist: false
		},
        /*
        {
            name: 'uuid',
            type: 'string'
        }
        */
        ],
        hasMany: {
            model: 'chw.model.observation', 
            name: 'observations',
            // TODO: https://raxaemr.atlassian.net/browse/RAXAJSS-370
            // Can we handle the hasMany + REST scenario better?
            foreignKey: 'encounter', 
            associationKey: 'observations',
        }
	}
});

