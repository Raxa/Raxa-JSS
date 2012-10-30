Ext.define('RaxaEmr.Pharmacy.store.Persons', {
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.Pharmacy.model.Person',
    proxy: {

        type: 'rest',
        url: HOST + '/ws/rest/v1/person',
        headers: Util.getBasicAuthHeaders(),

        reader: {
            type: 'json'
        },
        writer: {
            type: 'json'
        }
    }
});