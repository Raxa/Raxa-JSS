//model for a group
Ext.define('RaxaEmr.Pharmacy.model.groupmodel', {
    extend: 'Ext.data.Model',
    fields: ['groupname', 'regimen'],
    //has a one to many relation with drugs
    hasMany: {
        model: 'RaxaEmr.Pharmacy.model.drugmodel',
        name: 'drugs'
    }
}); 