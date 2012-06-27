Ext.define('Med-Table.view.Instructions',{
    extend:'Ext.Panel',
    xtype:'instructions',

    initialize: function () {
        audio = (Ext.getCmp('audio3'));
        audio.toggle();
    },
    config:{

        title:'Instructions',
        iconCls:'maps',
        xtype: 'container',
        layout:'vbox',
        items:[
            {
                xtype : 'audio',
                id:'audio3',
                hidden: true,
                url : 'resources/Audio/Instruction.mp3'
            },
            {
                xtype: 'toolbar',
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
                    disabled:'true',
                    text : '<img src="resources/images/instr_clicked.png">',
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
                        audio.stop();
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

        },
            {
                flex:1,
        layout: 'hbox',
        pack: 'center',
        /*layout:'fit',
        align: 'center',
        pack:'center',*/
        items: [
                {
                xtype: 'image',
                src: 'resources/images/instructions-02.png',
                flex: 1,
                margin:'20'
                },
                {
                xtype:'list',
                style: 'background-color: #759E60;',
                flex:3,
                margin: '100 0 0 0',
                store:'Instructions',
                itemTpl:'<img src="{image}" height="150" width="150" hspace="90" vspace="20"></img>',
                inline: { wrap: true },
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                }
                }
    ]}]



    }

})