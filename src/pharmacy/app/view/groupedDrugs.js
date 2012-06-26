//grid view for the drugs in a group
Ext.define('RaxaEmr.Pharmacy.view.groupedDrugs', {
    extend: 'Ext.grid.Panel',
    height: 300,
    id: 'drugID',
    alias: 'widget.drugs',
    title: 'Drug Group Selected: ',
    width: 807,
    fields: ['drugname', 'tablets', 'days'],
    
    columns: [{
        header: 'Drug Name',
        dataIndex: 'drugname',
        width: 400,
        hideable: false
    },{
        header: 'No. Of Tablets',
        dataIndex: 'tablets',
        width: 200,
        hideable: false,
        sortable: false
    },{
        header: 'No. Of Days',
        dataIndex: 'days',
        width: 200,
        hideable: false,
        sortable: false
    }]
});