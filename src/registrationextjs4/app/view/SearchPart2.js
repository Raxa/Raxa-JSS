Ext.define('Registration.view.SearchPart2', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.searchpart2',
    border: 0,
    autoScroll: true,
    padding: 10,
    layout: {
        type: 'auto'
    },
    initComponent: function () {
        this.items = {
            border: 0,
            items: [{
                xtype: 'panel',
                autoScroll : true, 
                border: 0,
                bodyPadding: 10,
                 items: [{
                    xtype: 'fieldset',
                    padding: 10,
                    title: 'Search Results of Patient',
                    fieldDefaults: {
                        msgTarget: 'side'
                    },
                    items: [
                           {
                    xtype: 'gridpanel',
                    align: 'centre',
                    margin: '10 0 0 10', 
                    forceFit: true,
                    hideHeaders: false,
                    columns: [
                        {
                            xtype: 'rownumberer',
                            text: 'Sr. No',
                        },
                        {
                            xtype: 'gridcolumn',
                            text: 'First Name'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: 'Last Name'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: 'Sex',
                        },
                        {
                            xtype: 'gridcolumn',
                            text: 'DOB'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: 'Patient Id'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: 'Husband/Father\'s Name',
                            forceFit : true
                        },
                        {
                            xtype: 'gridcolumn',
                            text: 'Village'
                        },
                        {
                            xtype: 'gridcolumn',
                            text: 'Town'
                        }
                        
                    ],
                    viewConfig: {
                        autoScroll: true,
                        emptyText: 'No Data Available',
                        stripeRows: false
                    }
                },{
                        xtype: 'button',
                        margin: '10 50 0 270',
                        width: 120,
                        text: 'View Details',
                        handler: function () {
                            var l = Ext.getCmp('mainregarea').getLayout();
                            l.setActiveItem(6); //going to Patient Detail screen
                        }
                    }, {
                        xtype: 'button',
                        margin: '10 0 0 0',
                        width: 120,
                        text: 'Modify Search',
                         handler: function () {
                            var l = Ext.getCmp('mainregarea').getLayout();
                            l.setActiveItem(4); //confirm patient screen
                        }
                    }
                 ]
                }]
            }]
        };
        this.callParent();
    }
});
