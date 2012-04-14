/*
 * This store loads the drugs from file 'drugs.json'
 * Note: there is no writer attached, so changes will
 * only occur in local cache
 */
Ext.define('Screener.store.Drugs', {
	extend: 'Ext.data.Store',
	
    config: {
    	model: 'Screener.model.Drug',
    	proxy: {
    		type: 'ajax',
    		url : 'drugs.json',
    		reader: 'json',    	
    		},
    	autoLoad: true,

    }
});
