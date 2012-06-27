Ext.define('Med-Table.view.CalendarDisplay',{
        extend:'Ext.Panel',
        xtype:'calendardisplay',

        config:
        {
            title:'Calendar',
            iconCls:'time',
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
                                Ext.Viewport.setActiveItem(Ext.create('Med-Table.view.CalendarDisplay'))
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
                    html: '<embed src="calendar.html" width="100%" height="85%"/>'
                }
            ]
        }
    }
)