Ext.define('RaxaEmr.Pharmacy.model.Address', {
    extend: 'Ext.data.Model',

    field: [{
        name: 'address1',
        type: 'string'
    }, {
        name: 'cityVillage',
        type: 'string'
    },{
        name: 'countyDistrict',
        type: 'string'
}]
});