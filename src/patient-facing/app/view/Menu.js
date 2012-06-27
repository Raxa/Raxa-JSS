Ext.define('Med-Table.view.Menu', {
    extend:'Ext.Panel',
    xtype:'menu',
	
	initialize: function () {
        audio = (Ext.getCmp('audio2'));
        audio.toggle();
    },
	
    config:{
         title:'Menu',
         iconCls:'home',
		
		items: [
		/*{   xtype: 'toolbar',
            ui:'light',
                height : 'auto',
                items: [
                    {
                        xtype: 'button',
                        text : '<img src="resources/images/home-small.png">',
                        handler: function()
                        {
                            Ext.Viewport.setActiveItem(Ext.create('Med-Table.view.Home'))
                        },
                        padding:'5px'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        text : '<img src="resources/images/reminder-small.png">',
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
                            Ext.Viewport.setActiveItem(Ext.create('Med-Table.view.Menu'))
                        },
                        padding:'5px'
                    }

                ]

            },*/
		
		{
         xtype: 'container',
         items:[
             {  xtype: 'button',
                 //cls: 'instructionImageButton',
                 text : '<img src="resources/images/medicine reminder_without drop shadow.png">',
                 handler: function()
                 {
                     audio.stop();
                     Ext.Viewport.setActiveItem(Ext.create('Med-Table.view.Schedule'))
                 },

                 left: '35px',
                 top: '50px'
             },
			 {
                        xtype : 'audio',
                        id:'audio2',
                        hidden: true,
                        url   : 'resources/Audio/Menu.mp3'
                    },

         {
            xtype: 'button',
             text : '<img src="resources/images/instructions-01.png">',
             handler: function()
             {
                 audio.stop();
                 Ext.Viewport.setActiveItem(Ext.create('Med-Table.view.Instructions'))
             },

             //cls: 'medicineReminderButton',
            left: '372px',
			top: '50px'
         },
             {
                 xtype: 'button',
                 text : '<img src="resources/images/next appointment-01.png">',
                 handler: function()
                 {
                     audio.stop();
                     Ext.Viewport.setActiveItem(Ext.create('Med-Table.view.Appointment'))
                 },
                 //cls: 'nextAppointmentButton',
                 left: '709px',
                 top: '50px'

             }

        ]
	 }
	]

    }
});


