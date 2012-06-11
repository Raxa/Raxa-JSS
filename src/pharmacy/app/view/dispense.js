Ext.define('RaxaEmr.Pharmacy.view.dispense', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.Dispense',
    store: 'dispense',
    columns: [{
        header: 'Drug Name',
        sortable: false,
        width: 300,
        hideable: false,
        dataIndex: 'drugname'
    }, {
        header: 'Dosage',
        width: 250,
        hideable: false,
        sortable: false,
        dataIndex: 'dosage'
    }, {
        width: 100,
        header: 'Disp',
        hideable: false,
        sortable: false,
        dataIndex: 'disp'
    }, {
        width: 100,
        header: 'In Stock',
        sortable: false,
        hideable: false,
        dataIndex: 'instock'
    }, {
        sortable: false,
        width: 300,
        hideable: false,
        header: 'Labels',
        dataIndex: 'labels'
    }, {
        sortable: false,
        flex: 1,
        hideable: false,
        header: 'In Hand',
        dataIndex: 'inhand'
    }]
});