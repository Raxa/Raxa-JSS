Ext.define('RaxaEmr.Pharmacy.model.PostList', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        persist: false
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'description',
        type: 'string'
    }, {
        name: 'searchQuery',
        tyep: 'string'
    }, {
        name: 'uuid',
        type: 'string',
        persist: false
    }]
    
});
