Ext.define('RaxaEmr.Pharmacy2.view.drugs', {
    extend: 'Ext.grid.Panel',
    height: 300,
    alias: 'widget.druggrid',
    id: 'ingroup',
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