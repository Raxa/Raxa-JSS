/*
Ext.define('RaxaEmr.Pharmacy.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',
    items: [{
        xtype: 'Dispense',
        title: 'Drug Dispense in this package'
    }]
});
*/

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
            margin: '200 0 0 400',
            height: 90,
            width: 160,
            action: 'dispensepage'
        },{
            xtype: 'button',
            text: 'Groups',
            margin: '200 0 0 300',
            height: 90,
            width: 160,
            action: 'groupmain'
        }]
    },{
        xtype: 'Dispense'
    },{
        xtype: 'grouphome'
    }]
})