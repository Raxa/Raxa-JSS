Ext.define('RaxaEmr.Pharmacy.view.Viewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.addDrug',
    config: {
        items: [{
            xtype: 'drugDet',
            title: 'ADD/MODIFY DRUGS',
            width: '300',
            hideMode: 'offsets',
            layout: {
                align: 'center',
                pack: 'center',
                type: 'vbox'
            }
        },{
        xtype: 'Dispense',
        title: 'Drug Dispense in this package'
    }]
    }

});