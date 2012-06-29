Ext.define('RaxaEmr.Pharmacy.view.listOfDrugs', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.drugGroups',
    
    layout: {
        type: 'card'
    },
    id: 'drugList',
    activeItem: 0,
    items:[{
        layout: {
            type: 'auto'
        },
        items:[{
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            renderTo: Ext.getBody(),
            border: 1,
            style: { 
                borderColor: '#000000',
                borderStyle: 'solid',
                borderWidth: '1px'
            },
            defaults: {
                labelWidth: 80,
                xtype: 'datefield',
                flex: 1,
                style: {
                    padding: '10px'
                }
            },
            items: [{
                xtype: 'toolbar',
                height: 65,
                dock: 'top',
                items: [{
                    xtype: 'tbtext',
                    text: Util.getHospitalName()
                },

                {
                    xtype: 'button',
                    text: 'Patient Queue',
                    icon: '../../resources/img/mLogo.png',
                    iconAlign: 'top',
                    scale: 'large',
                    width: 80

                }, {
                    xtype: 'button',
                    text: 'Bill Records',
                    icon: '../../resources/img/mLogo.png',
                    iconAlign: 'top',
                    scale: 'large',
                    width: 80
                }, {
                    xtype: 'button',
                    text: 'Inventory',
                    icon: '../../resources/img/mLogo.png',
                    iconAlign: 'top',
                    scale: 'large',
                    width: 80
                }, {
                    xtype: 'button',
                    text: 'Reports',
                    icon: '../../resources/img/mLogo.png',
                    iconAlign: 'top',
                    scale: 'large',
                    width: 80
                }, {
                    xtype: 'button',
                    text: 'Admin',
                    icon: '../../resources/img/mLogo.png',
                    iconAlign: 'top',
                    scale: 'large',
                    width: 80
                }, {
                    xtype: 'tbfill'
                }, {
                    xtype: 'tbtext',
                    text: Ext.Date.format(new Date(), 'F j, Y, g:i a')
                }, {
                    xtype: 'tbseparator'
                }, {
                    xtype: 'button',
                    text: 'Alert',
                    menu: new Ext.menu.Menu({
                        items: []
                    })
                }]

            }]
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
                    },
                    {
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
                                }
                                ],
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
                                //TODO: Patient Identifier Comes Here
                                value: 'Group Name comes here',
                                id: 'groupnameID',
                                readOnly: true
                            },{
                                xtype: 'displayfield',
                                fieldLabel: 'Regimen',
                                labelWidth: 80,
                                //TODO: Patient Identifier Comes Here
                                value: 'Group Name comes here',
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
                            var v = Ext.widget('addfacility')
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
    }]
});