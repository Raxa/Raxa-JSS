/**
 * Does the Post call for creating a person
 */
Ext.define('Screener.store.NewPersons', {
    extend: 'Ext.data.Store',
    xtype: 'personStore',
    config: {
        model: 'Screener.model.Person',
        proxy: {
            type: 'rest',
            url: HOST + '/ws/rest/v1/person',
            headers: Util.getBasicAuthHeaders(),
            reader: 'json',
            writer: 'json'
        }
    }
});