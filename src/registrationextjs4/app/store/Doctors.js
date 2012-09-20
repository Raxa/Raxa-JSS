Ext.define('Registration.store.Doctors', {
    extend: 'Ext.data.Store',
    model: 'Registration.model.Doctor',
    proxy: {
        type: 'ajax',
        url: HOST +'/ws/rest/v1/provider',
        headers: Util.getBasicAuthHeaders(),
        reader: {
            type: 'json',
            root: 'results'
        }
    },
    autoLoad: true
}); 