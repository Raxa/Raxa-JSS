/* model for addresses field in the person model */
Ext.define('Registration.model.addresses', {
    extend: 'Ext.data.Model',

    field: [{
        name: 'address1',
        type: 'string'
    }, {
        name: 'address2',
        type: 'string'
    }, {
        name: 'cityVillage',
        type: 'string'
    }, {
        name: 'postalCode',
        type: 'boolean'
    }]
});