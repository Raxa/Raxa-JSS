/* store for the get call of drug orders related the patients */
Ext.define('RaxaEmr.Pharmacy.store.drugOrderSearch',{
    extend: 'Ext.data.Store',
    storeId: 'drugOrder',
    model: 'RaxaEmr.Pharmacy.model.drugOrderSearch'
})