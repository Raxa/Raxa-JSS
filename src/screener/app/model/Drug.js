/*
 * This class defines a Drug, with strings for
 * Strength,drugname and duration,with quantity
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