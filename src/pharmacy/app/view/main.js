Ext.define('RaxaEmr.Pharmacy.view.main', {
    extend: 'Ext.container.Container',
    alias: 'widget.grouphome',
    autoScroll: true,
    layout:{
        type: 'hbox',
        pack: 'center',
        width: 807
    },
    items:[{
        xtype: 'groupdrugs'
    }]
})