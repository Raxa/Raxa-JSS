Ext.define('RaxaEmr.Pharmacy.view.requisition', {
    extend: 'Ext.panel.Panel',
    id: '.requisition',
    autoScroll: true,
    alias: 'widget.requisition',
    title: 'Orders >> Request Drugs',
    width: 780,
    items:[{
        xtype: 'requisitionText'
    },{
        xtype: 'requisitionGrid'
    },{
        xtype: 'button',
        text: 'Cancel',
        action: 'cancelRequisition'
    },
    {
        xtype: 'button',
        // width: 60,
        text: 'Submit',
        action: 'submitRequisition'
    }]
});
