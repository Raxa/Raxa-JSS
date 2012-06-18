Ext.define('Registration.view.Home', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.home',
    border: 0,
    padding: 10,
    layout: {
        type: 'fit'
    },
    
    requires: ['Ext.tab.*', 'Ext.grid.*', 'Ext.data.*', 'Ext.util.*', 'Ext.state.*', 'Ext.form.*', ],
    
    initComponent: function () {
        this.items = {
            border: 0,
            layout: {
                type: 'fit'
            },
            items: [{
                xtype: 'panel',
                title: 'Drug Group',
                scrollable: true,
                border: 0,
                layout: 'auto',
                height: 600,
                width: 550,
                bodyPadding: 10,
                items: [{
                    xtype: 'panel',
                    layout: 'column',
                    scrollable: true,
                    height: 250,
                    width: 550,
                    fields: ['name', 'regimen'],
                    items:[{
                        title: 'Group Name',
                        dataIndex: 'name',
                        sortable: true,
                        hideable: false,
                        columnWidth: .5
                    },
                    {
                        title: 'Regimen',
                        dataIndex: 'regimen',
                        sortable: false,
                        hideable: false,
                        columnWidth: .5
                    }]
                },
                {
                    xtype: 'panel',
                    layout: 'column',
                    scrollable: true,
                    height: 250,
                    width: 550,
                    fields: ['name', 'number', 'days'],
                    items: [{
                        title: 'Drug Name',
                        dataIndex: 'name',
                        sortable: true,
                        hideable: false,
                        columnWidth: .5
                    },
                    {
                        title: 'No. of tablets',
                        dataIndex: 'number',
                        sortable: true,
                        hideable: false,
                        columnWidth: .25
                    },
                    {
                        title: 'Times A Day',
                        dataIndex: 'days',
                        sortable: true,
                        hideable: false,
                        columnWidth: .25
                    }]
                },
                {
                    xtype: 'button',
                    width: 60,
                    text: 'Back'
                },
                {
                    xtype: 'button',
                    pack: 'right',
                    width: 60,
                    text: 'List',
                    handler: function () {
                        var l = Ext.getCmp('mainarea').getLayout();
                        l.setActiveItem(2); //going to registration part-2 page
                    }
                }]
            }]
        };
        this.callParent();
    }
});