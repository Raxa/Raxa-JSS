Ext.define('RaxaEmr.Pharmacy.view.requisition', {
    extend: 'Ext.container.Container',
    id: '.requisition',
    autoScroll: true,
    alias: 'widget.requisition',
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
        width: 60,
        text: 'Submit',
        action: 'submitRequisition'
    }]
});
