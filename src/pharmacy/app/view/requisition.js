Ext.define('RaxaEmr.Pharmacy.view.requisition', {
    extend: 'Ext.container.Container',
    id: '.requisition',
    autoScroll: true,
    alias: 'widget.requisition',
    items:[{
        xtype: 'requisitionText',
        x : 100
    },{
        xtype: 'requisitionGrid',
        x : 100
    },{
        xtype: 'button',
        text: 'Cancel',
        action: 'cancelRequisition',
        ui: 'raxa-orange-small',
        x: 500
    },
    {
        xtype: 'button',
        width: 60,
        text: 'Submit',
        action: 'submitRequisition',
        ui: 'raxa-aqua-small',
        x: 600
    }]
});
