Ext.define('RaxaEmr.Outpatient.model.patientlist', {
    extend: 'Ext.data.Model',

    config: {
        fields: ['firstName', 'telephone', 'city', 'state', 'disease', 'noofvisits', 'lastvisit', 'nameofdoc', 'id', 'age']
    }
});