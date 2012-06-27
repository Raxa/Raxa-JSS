Ext.define('Med-Table.view.Appointment',{
    extend:'Ext.Panel',
    xtype:'appointment',

    initialize: function () {
        audio = (Ext.getCmp('audio4'));
        audio.toggle();
    },
    config:{

        title:'Next Appointment',
        iconCls:'time',

        layout:'vbox',
        items:[
            {
                xtype : 'audio',
                id:'audio4',
                hidden: true,
                url : 'resources/Audio/Appointment.mp3'
            },
            {   xtype: 'toolbar',
                ui:'light',
                height : 'auto',
                items: [

                    {
                     xtype: 'button',
                     text : '<img src="resources/images/reminder-small.png">',
                     handler: function()
                     {
                     audio.stop();
                     Ext.Viewport.setActiveItem(Ext.create('Med-Table.view.Schedule'))
                     },
                     padding:'5px'
                     },
                    {
                        xtype: 'button',
                        text : '<img src="resources/images/instructions-small.png">',
                        handler: function()
                        {
                            audio.stop();
                            Ext.Viewport.setActiveItem(Ext.create('Med-Table.view.Instructions'))
                        },
                        padding:'5px'
                    },
                    {
                        xtype: 'button',
                        disabled:'true',
                        text : '<img src="resources/images/appt_clicked.png">',
                        disabled : 'true',
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
                            audio.stop();
                            Ext.Viewport.setActiveItem(Ext.create('Med-Table.view.Main'))
                        },
                        padding:'5px'
                    }


                ]

            }]

    }

});