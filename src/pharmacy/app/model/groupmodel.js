Ext.define('RaxaEmr.Pharmacy2.model.groupmodel', {
    extend: 'Ext.data.Model',
    fields: ['groupname', 'regimen', 'modelId'],
    hasMany: {
        model: 'RaxaEmr.Pharmacy2.model.drugmodel',
        name: 'drugs'
    },
    proxy: {
        type: 'localstorage',
        id: 'groupId'
    }
});