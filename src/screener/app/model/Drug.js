/*
 * This class defines a Patient, with strings for
 * first and last name, and ID for FIFO
 * doctorid links a patient to a doctor's current
 * waiting list (-1 if unassigned)
 */
Ext.define('Screener.model.Drug', {
	extend: 'Ext.data.Model',
	config: {
		fields: [
		         { name: 'drugname', type: 'string' },
		         { name: 'strength', type: 'string' },
		         { name: 'qty', type: 'int' },
		         { name: 'duration', type: 'string'}
		         ]
	},

});