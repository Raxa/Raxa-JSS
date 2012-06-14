//model of an observation

Ext.define('Registration.model.obsmodel', {
    extend: 'Ext.data.Model',
    
    fields: ['person', 'obsDatetime', 'concept', 'value', {
        name: 'id',
        persist: false
    }]    
});