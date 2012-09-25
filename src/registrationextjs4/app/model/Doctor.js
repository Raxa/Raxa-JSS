Ext.define('Registration.model.Doctor', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    }, {
        name: 'uuid',
        type: 'string'
    }, {
        name: 'display',
        type: 'string'
    }]
});
