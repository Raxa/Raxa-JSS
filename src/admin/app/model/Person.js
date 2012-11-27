/**
 * This class defines a Person, holding 3 strings 
 * for id, gender and uuid
 * and extends to a model Names 
 */
Ext.define('RaxaEmr.Admin.model.Person',{
    extend: 'Ext.data.Model',
    config: {
        fields: [ {
            name: 'id',
            persist: false
        }, {
            name: 'gender',
            type: 'string'
        },{
            name: 'uuid',
            type: 'string',
            persist: false
        }, {
            name: 'age',
            type: 'string'
        },{
            name: 'dateOfBirth',
            type: 'string'
        }]
    }
});