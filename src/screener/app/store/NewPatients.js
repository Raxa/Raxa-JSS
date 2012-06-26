/**
 * Does the Post call for creating a new patient 
 */
Ext.define('Screener.store.NewPatients', {
    extend: 'Ext.data.Store',
    xtype: 'patientStore',
    config: {
        model: 'Screener.model.NewPatient',
        proxy: {
            type: 'rest',
            headers: Util.getBasicAuthHeaders(),
            url: HOST + '/ws/rest/v1/patient',
            reader: {
              type: 'json',
              rootProperty: 'results'
            },
            writer: {
              type: 'json'
            }
        }
    }
});