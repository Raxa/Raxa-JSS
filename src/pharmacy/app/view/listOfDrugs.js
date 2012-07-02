Ext.define('RaxaEmr.Pharmacy.view.listOfDrugs', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.drugGroups',
    layout: {
        type: 'auto'
    },
    items:[{
        xtype: 'pharmacytopbar'
    },{
        xtype: 'container',
        layout:{
            type: 'auto'
        },
        autoScroll: true,
        margin: '20 50 0 110',
        items:[{
            xtype: 'tabpanel',
            activeTab: 0,
            autoScroll: true,
            tabPosition: 'left',
            tabHeight: 100,
            height: 560,
            tabWidth: 60,
            items: [{
                xtype: 'panel',
                title: 'Drugs',
                margin: '10 90 30 120',
                items: [{
                    xtype: 'button',
                    text: 'New Drug',
                    margin: '0 0 0 840' 
                },{
                    xtype: 'gridpanel',
                    title: 'List Of Drugs',
                    height: 450,
                    columns: [
                    {
                        header: 'S no',
                        width: 100
                    },
                    {
                        header: 'Name Of Drug',
                        width: 250
                    },
                    {
                        header: 'Manufacturer',
                        width: 250
                    },
                    {
                        header: 'Drug Group',
                        width: 250
                    }],
                    viewConfig: {
                        stripeRows: false
                    }
                }]
            },{
                xtype: 'panel',
                title: 'Drug Groups',
                items: [{
                    xtype: 'container',
                    layout:{
                        type: 'hbox'
                    },
                    items:[{
                        xtype: 'panel',
                        width: 255,
                        border: false,
                        autoScroll: true,
                        title: 'List OF Drug Groups',
                        margin: '10 10 10 110',
                        height: 500,
                        layout: 'auto',
                        items:[{
                            xtype: 'button',
                            text: 'New Drug Group',
                            width: 120,
                            margin: '10 0 0 0'
                        },{
                            xtype: 'gridpanel',
                            width: 250,
                            height: 420,
                            columns: [
                            {
                                xtype: 'gridcolumn',
                                width: 245,
                                text: 'Drug Group Name'
                            }],
                            viewConfig: {
                                stripeRows: false
                            }
                        }]
                    },{
                        xtype: 'container',
                        layout: {
                            type: 'vbox'
                        },
                        margin: '100 0 0 100',
                        items:[{
                            xtype: 'displayfield',
                            fieldLabel: 'Drug Group Name',
                            labelWidth: 130,
                            value: 'Group Name',
                            id: 'groupnameID',
                            readOnly: true
                        },{
                            xtype: 'displayfield',
                            fieldLabel: 'Regimen',
                            labelWidth: 80,
                            value: 'Regimen',
                            id: 'regimenID',
                            readOnly: true
                        },{
                            xtype: 'gridpanel',
                            width: 350,
                            height: 350,
                            columns: [
                            {
                                header: 'S no',
                                width: 50
                            },{
                                header: 'Name Of Drug',
                                width: 147
                            },{
                                header: 'Manufacturer',
                                width: 147
                            },
                            ],
                            viewConfig: {
                                stripeRows: false
                            }
                        }]
                    }]
                }]
            },{
                xtype: 'panel',
                title: 'Facilities',
                items: [{
                    xtype: 'displayfield',
                    value: 'LIST OF FACILITIES',
                    margin: '30 10 0 150',
                    labelWidth: 130
                },{
                    xtype: 'button',
                    text: 'Create New Facility',
                    width: 150,
                    handler: function() {
                        Ext.widget('addfacility')
                    },
                    margin: '0 0 0 800'
                },{
                    xtype: 'gridpanel',
                    margin: '10 170 10 150',
                    autoScroll: true,
                    height: 450,
                    columns: [
                    {
                        header: 'S no',
                        width: 100
                    },
                    {
                        header: 'Facility Name',
                        width: 150
                    },
                    {
                        header: 'City',
                        width: 100
                    },
                    {
                        header: 'Address',
                        width: 200
                    },
                    {
                        header: 'Contact no',
                        width: 100
                    },
                    {
                        header: 'Person Incharge',
                        width: 140
                    }],
                    viewConfig: {
                        stripeRows: false
                    }
                }]
            }]
        }]
    }]
});