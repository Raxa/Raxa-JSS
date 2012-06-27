Ext.define('Med-Table.view.ExpandedAfternoon',{
    extend:'Ext.Panel',
    xtype:'expandedafternoon',

    config:{

        title:'AfternoonSchedule',
        iconCls:'time',

        layout:'vbox',
        items:[
            {   xtype: 'toolbar',
                ui:'light',
                height : 'auto',
                items: [


                    {
                     xtype: 'button',
                     disabled:'true',
                     text : '<img src="resources/images/sched_clicked.png">',
                     handler: function()
                     {
                     Ext.Viewport.setActiveItem(Ext.create('Med-Table.view.Schedule'))
                     },
                     padding:'5px'
                     },
                    {
                        xtype: 'button',
                        text : '<img src="resources/images/instructions-small.png">',
                        handler: function()
                        {
                            Ext.Viewport.setActiveItem(Ext.create('Med-Table.view.Instructions'))
                        },
                        padding:'5px'
                    },
                    {
                        xtype: 'button',
                        text : '<img src="resources/images/appoint-small.png">',
                        handler: function()
                        {
                            Ext.Viewport.setActiveItem(Ext.create('Med-Table.view.Appointment'))
                        },
                        padding:'5px'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        text : '<img src="resources/images/home-small.png">',
                        handler: function()
                        {
                            Ext.Viewport.setActiveItem(Ext.create('Med-Table.view.Main'))
                        },
                        padding:'5px'
                    }

                ]

            },

            {

                xtype:'container',

                layout: 'hbox',
                flex:1,
                items: [

                    {
                        xtype: 'container',
                        //id: 'morningctnr',
                        flex: 1,
                        layout:'vbox',

                        items:[

                            {
                                xtype:'container',
                                height: '286',
                                style: 'background-color: #63B8FF;',

                                //docked:'top',
                                //flex:1,
                                layout : 'hbox',

                                //height: 'auto',
                                //ui:'light',
                                items: [
                                    {xtype: "spacer"},
                                    {
                                        xtype: 'button',
                                        text: '<img src="resources/images/morning-small.png">',
                                        padding:'0px',

                                        //padding:'5px',
                                        //cls: 'morningImageButton',
                                        handler: function()
                                        {
                                            Ext.Viewport.setActiveItem(Ext.create('Med-Table.view.ExpandedMorning'))
                                        }
                                    },
                                    {xtype: "spacer"}
                                ]
                            },
                            {
                                xtype:'list',
                                flex:1,
                                store:'MorningMedicines',
                                itemTpl:'<img src="{icon}"/><h6>{name:ellipsis(22)}</h6>',//<h6>{dose:ellipsis(30)}</h6>',
                                itemCls:'medicine-entry',
                                style: 'background-color: #63B8FF;'

                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        //id: 'morningctnr',
                        width :'625px',
                        //flex: 1,
                        layout:'vbox',

                        items:[

                            {
                                xtype:'container',
                                height: '286',
                                style: 'background-color: #C6E2FF;',

                                //docked:'top',
                                //flex:1,
                                layout : 'hbox',

                                //height: 'auto',
                                //ui:'light',
                                items: [
                                    {xtype: "spacer"},
                                    {
                                        xtype: 'button',
                                        text: '<img src="resources/images/day_expanded-01-01.png" height="286px">',
                                        padding:'0px',
                                        //cls: 'morningImageButton',
                                        handler: function()
                                        {
                                            Ext.Viewport.setActiveItem(Ext.create('Med-Table.view.Schedule'))
                                        }
                                    },
                                    {xtype: "spacer"}
                                ]
                            },
                            {
                                xtype:'list',
                                flex:1,
                                store:'AfternoonMedicines',
                                itemTpl:'<img src="{icon}"/> <h1>{name:ellipsis(22)}</h1> <h3>{dose:ellipsis(30)}</h3>',
                                itemCls:'medicine-entry',
                                style: 'background-color: #C6E2FF;'

                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        //id: 'morningctnr',
                        flex: 1,
                        layout:'vbox',

                        items:[

                            {
                                xtype:'container',
                                height: '286',
                                style: 'background-color: #63B8FF;',

                                //docked:'top',
                                //flex:1,
                                layout : 'hbox',

                                //height: 'auto',
                                //ui:'light',
                                items: [
                                    {xtype: "spacer"},
                                    {
                                        xtype: 'button',
                                        text: '<img src="resources/images/evening-small.png">',
                                        padding:'0px',

                                        //padding:'5px',
                                        //cls: 'morningImageButton',
                                        handler: function()
                                        {
                                            Ext.Viewport.setActiveItem(Ext.create('Med-Table.view.ExpandedEvening'))
                                        }
                                    },
                                    {xtype: "spacer"}
                                ]
                            },
                            {
                                xtype:'list',
                                flex:1,
                                store:'EveningMedicines',
                                itemTpl:'<img src="{icon}"/><h6>{name:ellipsis(22)}</h6>',//<h6>{dose:ellipsis(30)}</h6>',
                                itemCls:'medicine-entry',
                                style: 'background-color: #63B8FF;'

                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        //id: 'morningctnr',
                        flex: 1,
                        layout:'vbox',

                        items:[

                            {
                                xtype:'container',
                                height: '286',
                                style: 'background-color: #C6E2FF;',

                                //docked:'top',
                                //flex:1,
                                layout : 'hbox',

                                //height: 'auto',
                                //ui:'light',
                                items: [
                                    {xtype: "spacer"},
                                    {
                                        xtype: 'button',
                                        text: '<img src="resources/images/night-small.png">',
                                        padding:'0px',

                                        //padding:'5px',
                                        //cls: 'morningImageButton',
                                        handler: function()
                                        {
                                            Ext.Viewport.setActiveItem(Ext.create('Med-Table.view.ExpandedNight'))
                                        }
                                    },
                                    {xtype: "spacer"}
                                ]
                            },
                            {
                                xtype:'list',
                                flex:1,
                                store:'NightMedicines',
                                itemTpl:'<img src="{icon}"/><h6>{name:ellipsis(22)}</h6>',//<h6>{dose:ellipsis(30)}</h6>',
                                itemCls:'medicine-entry',
                                style: 'background-color: #C6E2FF;'

                            }
                        ]
                    }
                ]}
        ]


    }

});