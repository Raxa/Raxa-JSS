/*
 * This store loads the doctors from file 'doctors.json'
 * Note: there is no writer attached, so changes will
 * only occur in local cache
 */
Ext.define('Screener.store.Doctors', {
	extend: 'Ext.data.Store',
	xtype: 'doctorStore',
    config: {
    	model: 'Screener.model.Doctor',
    	proxy: {
    		type: 'ajax',
    		url : 'doctors.json',
    		reader: 'json',    	
    		},
    	autoLoad: true,

    }
});
