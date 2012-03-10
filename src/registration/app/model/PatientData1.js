Ext.define('RaxaEmr.Registration.model.PatientData1', {
	extend: 'Ext.data.Model',
	id: 'PatientData1',
	fields:[
		{name: 'patientRegNum', type: 'string'},
		{name: 'firstName', type: 'string'},
		{name: 'lastName', type: 'string'},
		{name: 'gurdianFirstName', type: 'string'},
		{name: 'gurdianLastName', type: 'string'},
		{name: 'gender', type: 'string'},
		{name: 'dob', type:'date'},
		{name: 'age', type: 'int'},
		{name: 'education', type: 'string'},
		{name: 'caste', type: 'string'},
		{name: 'occupation', type: 'string'}
	]
});