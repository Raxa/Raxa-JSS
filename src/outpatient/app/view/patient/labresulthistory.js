Ext.define('RaxaEmr.Outpatient.view.patient.labresulthistory', {
    extend: 'Ext.dataview.List',
    xtype: 'Lab-Result-History',
    config: {
        store: 'labresulthistory',
        ui: 'round',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            items: [{
                xtype: 'segmentedbutton',
                margin: '0 0 0 10',
                allowDepress: false,
                items: [{
                    xtype: 'button',
                    text: 'Completed',
                    pressed: true,
                    width: 150,
                }, {
                    xtype: 'button',
                    text: 'Pending',
                    width: 150,
                }]
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'searchfield',
                placeHolder: 'Search...'
            }]
        }],
        itemTpl: ['<div>{labtesttype}/Lab Order No: {laborderno}</br>Specimen ID: {specimenid}</br>Date: {labtestdate}</div>']
    }

});