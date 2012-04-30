/**
 * This class defines a Doctor, holding 2 strings for first and 
 * last name, and an int for number of patients in the 
 * waiting list. Also links Patient models inside as a store
 * using the hasMany property.
 */
Ext.define('Screener.model.Doctor', {
    requires: ['Screener.model.Patient'],
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
            name: 'numpatients',
            type: 'int'
        }, ],
        hasMany: {
            model: 'Screener.model.Patient',
            name: 'patients'
        }
    },

    //increments the number of patients
    addPatient: function () {
        this.data.numpatients = this.data.numpatients + 1;
        return 0;
    },

    //returns how many patients currently with doctor
    getNumPatients: function () {
        return this.numpatients;
    }
});