/* store for load the concept uuid related to the drug */
Ext.define('RaxaEmr.Pharmacy.store.drugConcept', {
    extend: 'Ext.data.Store',
    fields: [{
        name: 'uuid',
        type: 'string'
    }]
})