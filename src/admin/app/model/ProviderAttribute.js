Ext.define('RaxaEmr.Admin.model.ProviderAttribute',{
    extend: 'Ext.data.Model',
    config:{
        fields: [{
            name: 'id',
            type: 'int',
            persist: false
        }, {
            name: 'uuid',
            type: 'string'
        }, {
            name: 'display',
            type: 'string'
        }]
    }
});