Ext.define('RaxaEmr.Outpatient.model.patientlist', {
    extend: 'Ext.data.Model',

    config: {
        fields: ['firstName', 'lastName', 'city', 'state', 'disease', 'noofvisits',
        {
            name: 'lastvisit',
            type: 'date'
        }, 'nameofdoc', 'id', 'age', 'urgency']
    }
});