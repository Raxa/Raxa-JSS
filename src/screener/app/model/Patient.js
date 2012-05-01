/**
 * This class defines a Patient, with strings for
 * first and last name, and ID for FIFO
 * doctorid links a patient to a doctor's current
 * waiting list (-1 if unassigned)
 */
Ext.define('Screener.model.Patient', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'id',
            type: 'int'
        }, {
            name: 'lastname',
            type: 'string'
        }, {
            name: 'firstname',
            type: 'string'
        }, {
            name: 'doctorid',
            type: 'int'
        }]
    }
});