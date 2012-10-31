Ext.define('RaxaEmr.Pharmacy.view.requisition', {
    extend: 'Ext.panel.Panel',
    id: '.requisition',
    autoScroll: true,
    alias: 'widget.requisition',
    title: 'Orders >> Request Drugs',
    width: 780,
    items:[{
        margin: '10 0 0 0',
        xtype: 'requisitionText'
    },{
        xtype: 'requisitionGrid'
    },{
        xtype: 'button',
        text: 'Submit',
        action: 'submitRequisition',
        margin: 5
    }]
});
