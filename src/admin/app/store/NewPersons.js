/**
 * Does the Post call for creating a person
 */
Ext.define('RaxaEmr.Admin.store.NewPersons', {
    extend: 'Ext.data.Store',
    xtype: 'personStore',
    config: {
        model: 'RaxaEmr.Admin.model.Person',
        proxy: {
            type: 'rest',
            url: HOST + '/ws/rest/v1/person',
            headers: Util.getBasicAuthHeaders(),
            reader: 'json',
            writer: 'json'
        }
    }
});