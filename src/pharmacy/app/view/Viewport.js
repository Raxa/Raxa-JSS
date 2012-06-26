Ext.define('RaxaEmr.Pharmacy.view.Viewport', {
    extend: 'Ext.container.Viewport',
    id: 'mainarea',
    autoScroll: true,
    alias: 'widget.viewport',
    layout: 'card',
    activeItem: 0,
    items:[{
        layout: 'auto', 
        items:[{   
            xtype: 'button',
            text: 'Dispensed Drugs',
            margin: '200 0 0 200',
            height: 90,
            width: 160,
            action: 'dispensepage'
        },{
            xtype: 'button',
            text: 'Groups',
            margin: '200 0 0 200',
            height: 90,
            width: 160,
            action: 'groupmain'
        },{
            xtype: 'button',
            text: 'Prescription',
            margin: '200 0 0 200',
            height: 90,
            width: 160,
            action: 'prescription'
        }]
    },{
        xtype: 'Dispense'
    },{
        xtype: 'groupdrugs'
    },{
        xtype: 'prescription'
    }]
})