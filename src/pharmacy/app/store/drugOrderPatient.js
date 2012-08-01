/* store for searching(GET calls) patients in advanced search */
Ext.define('RaxaEmr.Pharmacy.store.drugOrderPatient',{
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.Pharmacy.model.drugOrderPatient'
})