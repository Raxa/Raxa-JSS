Ext.define('RaxaEmr.Outpatient.view.patient.work', {
    extend: 'Ext.Container',
    xtype: 'work',
    requires: ['RaxaEmr.Outpatient.view.patient.history', 'RaxaEmr.Outpatient.view.patient.treatment', 'RaxaEmr.Outpatient.view.patient.diagnosis'],
    config: {
        layout: {
            type: 'hbox'
        },
        height: 490,
        items: [{
            xtype: 'tabpanel',
            border: '1 1 1 0',
            margin: '0 20 10 0',
            style: 'border:solid #aaaaaa;',
            flex: 1,
            id: 'main-tabs',
            items: [{
                xtype: 'history-panel'
            }, {
                xtype: 'container',
                title: 'Examination'
            }, {
                xtype: 'diagnosis-panel'
            }, {
                xtype: 'treatment-panel'
            }],
            tabBar: {
                docked: 'top',
                hidden: true
            }
        }, {
            xtype: 'segmentedbutton',
            docked: 'left',
            margin: '0 0 0 15',
            width: 40,
            height: 480,
            layout: {
                type: 'vbox'
            },
            cls: 'x-segmentedbutton-vertical',
            items: [{
                xtype: 'button',
                width: 40,
                flex: 1,
                cls: 'x-button-vikas',
                icon: '../outpatient/resources/images/history.png',
                padding: '0 0 0 0',
                pressed: true,
                handler: function () {
                    Ext.getCmp('main-tabs').setActiveItem(0)
                }
            }, {
                xtype: 'button',
                width: 40,
                flex: 1,
                cls: 'x-button-vikas',
                icon: '../outpatient/resources/images/examination.png',
                padding: '0 0 0 0',
                handler: function () {
                    Ext.getCmp('main-tabs').setActiveItem(1)
                }
            }, {
                xtype: 'button',
                width: 40,
                flex: 1,
                cls: 'x-button-vikas',
                icon: '../outpatient/resources/images/diagnosis.png',
                padding: '0 0 0 0',
                handler: function () {
                    Ext.getCmp('main-tabs').setActiveItem(2)
                }
            }, {
                xtype: 'button',
                width: 40,
                flex: 1,
                cls: 'x-button-vikas',
                icon: '../outpatient/resources/images/treatment.png',
                padding: '0 0 0 0',
                handler: function () {
                    Ext.getCmp('main-tabs').setActiveItem(3)
                }
            }]
        }]
    }
});