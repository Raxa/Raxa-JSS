/* store for load the concept uuid related to the drug */
Ext.define('RaxaEmr.Outpatient.store.drugConcept', {
    extend: 'Ext.data.Store',
    config: {
        fields: [{
            name: 'uuid',
            type: 'string'
        }]
    }
})