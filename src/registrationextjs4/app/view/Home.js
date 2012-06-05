Ext.define('Registration.view.Home', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.home',
    border: 0,
    padding: 10,
    autoScroll: true,
    layout: {
        type: 'fit'
    },
    initComponent: function () {
        this.items = {
            border: 0,
            layout: {
                type: 'fit'
            },
            items: [{
                xtype: 'form',
                border: 0,
                layout: {
                    align: 'center',
                    pack: 'center',
                    type: 'vbox'
                },
                bodyPadding: 10,
                items: [{
                    xtype: 'image',
                    height: 130,
                    margin: '0 0 20 0',
                    width: 130,
                    src: '../resources/img/logo.png'
                }, {
                    xtype: 'combobox',
                    typeAhead: true,
                    triggerAction: 'all',
                    selectOnTab: true,
                    store: [
                        ['vikas', 'vikas'],
                        ['anshu', 'anshu'],
                        ['nathan', 'nathan'],
                        ['mohit', 'mohit'],
                        ['daniel', 'daniel'],
                        ['akash', 'akash'],
                        ['ankit', 'ankit'],
                        ['suraj', 'suraj'],
                        ['subodh', 'subodh'],
                        ['ashwini', 'ashwini']
                    ],
                    lazyRender: true,
                    listClass: 'x-combo-list-small',
                    fieldLabel: 'Search Patient',
                    labelAlign: 'top',
                    width: 300,
                    hideTrigger: true
                }, {
                    xtype: 'button',
                    height: 35,
                    margin: '10 0 13 0',
                    width: 300,
                    text: 'Register New Patient',
                    handler: function () {
                        var l = Ext.getCmp('mainregarea').getLayout();
                        l.setActiveItem(1); //going to registration part-1 page
                    }
                }, {
                    xtype: 'button',
                    height: 35,
                    width: 300,
                    text: 'Emergency'
                }]
            }]
        };
        this.callParent();
    }
});
