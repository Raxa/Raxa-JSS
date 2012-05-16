Ext.define('pharmacy.view.Viewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.adddrug',
    store: 'Users',
    layout: {
        align: 'center',
        pack: 'center',
        type: 'hbox',
        title: 'ADD/MODIFY DRUGS'
        
    },
    requires: [ 'Ext.tab.*', 'Ext.grid.*', 'Ext.data.*', 'Ext.util.*', 'Ext.state.*', 'Ext.form.*', ],



    initComponent: function () {
        this.items = {
            dockedItems: [{
                xtype: 'toolbar',
                height: 40,
                dock: 'top',
                items: [{
                    xtype: 'tbspacer',
                    width: 320
                },  {
                    xtype: 'tbtext',
                    text: 'ADD/MODIFY DRUGS'
                    
               
                }]
            }, ],
            width: 800,
            id: 'mainregarea',
            activeItem: 0,
            layout: {
                type: 'card'
            },
            margin: '2 0 2 0',
            region: 'center',
            items: [{
                xtype: 'form',
                border: 0,
                layout: {
                    align: 'center',
                    pack: 'center',
                    type: 'vbox'
                },
                bodyPadding: 10,
                items: [ {
                    xtype: 'combobox',
                    typeAhead: true,
                    triggerAction: 'all',
                    selectOnTab: true,
                    
                    lazyRender: true,
                    listClass: 'x-combo-list-small',
                    emptyText: 'Drug Name',
                   labelAlign: 'top',
                    width: 300,
                }, {
                    xtype: 'combobox',
                    typeAhead: true,
                    selectOnTab: true,
                    lazyRender: true,
                    emptyText: 'MIMS Reference',
                    labelAlign: 'top',
                    width: 300,
                    hideTrigger: true
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
                    emptyText: 'Form',
                    labelAlign: 'top',
                    width: 300,
                }, {
                    xtype: 'combobox',
                    typeAhead: true,
                    selectOnTab: true,
                    lazyRender: true,
                    emptyText: 'Pack size',
                    labelAlign: 'top',
                    width: 300,
                    hideTrigger: true
                }, {
                    xtype: 'combobox',
                    typeAhead: true,
                    selectOnTab: true,
                    lazyRender: true,
                    labelAlign: 'top',
                    emptyText: 'Dispencing Instruction',
                    width: 300,
                    hideTrigger: true
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
                    emptyText: 'Side Treatment',
                    labelAlign: 'top',
                    width: 300,
                }, {
                    xtype: 'combobox',
                    typeAhead: true,
                    selectOnTab: true,
                    lazyRender: true,
                    emptyText: 'Standard Dosage',
                    labelAlign: 'top',
                    width: 300,
                    hideTrigger: true
                }, {
                xtype: 'button',    
                text: 'ADD/MODIFY Drugs',
                action: 'addmod'
            },
            
        ]
            }]
        };
        

        this.callParent();
    }
});
