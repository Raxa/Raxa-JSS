//grid view for all the registered drugs
Ext.define('RaxaEmr.Pharmacy.view.alldrugs',{
    extend: 'Ext.grid.Panel',
    title: 'All Drugs',
    alias: 'widget.alldrugs',
    height: 600,
    store: 'alldrugsstore',
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
        height: 100,
        border: false,
        items:[{
            xtype: 'button',
            text: 'Back To Groups',
            action: 'backtogroup'
        }]
    }]
});