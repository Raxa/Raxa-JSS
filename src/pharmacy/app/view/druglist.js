Ext.define('RaxaEmr.Pharmacy2.view.druglist',{
    extend: 'Ext.grid.Panel',
    title: 'All Drugs',
    alias: 'widget.alldrugs',
    height: 600,
    store: 'AllDrugslist',
    fields: ['drugname', 'tablets', 'days'],
    
    columns:[{
        header: 'Drug Name',
        dataIndex: 'drugname',
        width: 400,
        hideable: false
    },{
        header: 'No. Of Tablets',
        dataIndex: 'tablets',
        width: 200,
        sortable: false,
        hideable: false
    },{
        header: 'No. Of Days',
        dataIndex: 'days',
        width: 200,
        sortable: false,
        hideable: false
    }],

    dockedItems:[{
        dock: 'bottom',
        height: 30,
        border: false,
        items:[{
            xtype: 'button',
            text: 'Back',
            action: 'back'
        }]
    }]
});