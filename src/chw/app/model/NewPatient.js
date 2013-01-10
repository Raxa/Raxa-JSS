/**
 * This class defines a Names, holding 2 strings 
 * for id and person
 * and extends to a model Identifiers 
 */
Ext.define('chw.model.NewPatient', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'id',
            persist: false
        }, {
            name: 'person',
            type: 'string'
        }, {
            name: 'identifiers',
            model: 'chw.model.Indentifiers'
        }]
    }
});
