/* model for the patients for searching of patients */
Ext.define('RaxaEmr.Pharmacy.model.drugOrderPatient', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id'
    },{
        name: 'uuid',
        type: 'string'
    }, {
        name: 'display',
        type: 'string'
    }, {
        name: 'age',
        type: 'number'
    }, {
        name: 'gender',
        type: 'string'
    }
    // below its commented out as right not identifiers are not sent in response for patient search
    /*, {
        name: 'patientId',
        type: 'string',
        mapping: 'identifiers.identidier'
    }*/]
})