Ext.define('Screener.model.encounterpost', {
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
		}],
        
        hasMany: {
            model: 'Screener.model.observation', 
            name: 'observations',
            // TODO: Can we handle the hasMany + REST scenario better?
            //
            // Note: Using foreignKey to override default name of encounterpost_id, 
            // which breaks OpenMRS rest. (since that field dne in back-end) 
            // http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.HasManyAssociation
            //
            // However, the uuid for the 'encounter' isn't actually persisted
            // in the observation, else it would pass a totally wrong value like
            // "encounter":"ext-record-27". Instead the observation gets saved
            // with "encounter":null
            foreignKey: 'encounter', 
        }
	}
});

