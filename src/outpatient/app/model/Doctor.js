/**
 * This class defines a Doctor, holding 2 strings for first and 
 * last name, and an int for number of patients in the 
 * waiting list. Also links Patient models inside as a store
 * using the hasMany property.
 */
Ext.define('Screener.model.Doctor', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'id',
            type: 'int'
        }, {
            name: 'uuid',
            type: 'string'
        }, {
            name: 'display',
            type: 'string'
        },{
            name: 'numpatients',
            type: 'number',
        },{
            name: 'person',
            model: 'Screener.model.Person'
        }]
    
    }
});