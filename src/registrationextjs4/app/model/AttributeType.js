/* model for the attributs field in the person model need to made for fields like "caste", "education", 
etc in the registration form*/
Ext.define('Registration.model.AttributeType', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'display'
    }, {
        name: 'uuid'
    }]
});