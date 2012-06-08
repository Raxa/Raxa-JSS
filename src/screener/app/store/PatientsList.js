Ext.define('Screener.store.PatientsList', {
    extend: 'Ext.data.Store',
    config: {
        model: 'Screener.model.PatientList',
        proxy: {
            type: 'ajax',
            url: 'http://raxaemr.jelastic.dogado.eu/ws/rest/v1/patient?q=john',
            reader: {
				type: 'json',
				rootProperty: 'results'
			}
        },
        autoLoad: true
    }
});