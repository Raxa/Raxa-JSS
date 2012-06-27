Ext.define('Med-Table.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'home',

    initialize: function () {
        audio = (Ext.getCmp('audio1'));
        audio.toggle();
    },

    config: {
        title: 'Home',
        iconCls: 'home',
        xtype: 'container',
        layout: 'hbox',
        pack: 'center',
        items: [
            {
                xtype : 'audio',
                id:'audio1',
                hidden: true,
                url : 'resources/Audio/Welcome.mp3'
            },
            {
            xtype: 'image',
            src: 'resources/images/regcard.png',
            flex: 1,
            //height: 398,
            //width: 348,
            //top :50,
            //left: 50,
            margin: 50
        }, {
            xtype: 'container',
            flex: 1,
            margin : 50,
            layout: "vbox",
            items: [{
                xtype: 'textfield',
                name: 'regno',
                id: 'regno'
                //flex:1
            },

                {
                    xtype: 'container',
                    layout: 'hbox',
                    flex: 1,
                    items: [{
                        xtype: 'button',
                        text: '1',
                        handler: function()
                        {
                            var inp = Ext.getCmp('regno').getValue();
                            Ext.getCmp('regno').setValue(inp + "1")
                        },
                        flex: 1
                    }, {
                        xtype: 'button',
                        text: '2',
                        handler: function()
                        {
                            var inp = Ext.getCmp('regno').getValue();
                            Ext.getCmp('regno').setValue(inp + "2")
                        },
                        flex: 1
                    }, {
                        xtype: 'button',
                        text: '3',
                        handler: function()
                        {
                            var inp = Ext.getCmp('regno').getValue();
                            Ext.getCmp('regno').setValue(inp + "3")
                        },
                        flex: 1
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    flex: 1,
                    items: [{
                        xtype: 'button',
                        text: '4',
                        handler: function()
                        {
                            var inp = Ext.getCmp('regno').getValue();
                            Ext.getCmp('regno').setValue(inp + "4")
                        },
                        flex: 1
                    }, {
                        xtype: 'button',
                        text: '5',
                        handler: function()
                        {
                            var inp = Ext.getCmp('regno').getValue();
                            Ext.getCmp('regno').setValue(inp + "5")
                        },
                        flex: 1
                    }, {
                        xtype: 'button',
                        text: '6',
                        handler: function()
                        {
                            var inp = Ext.getCmp('regno').getValue();
                            Ext.getCmp('regno').setValue(inp + "6")
                        },
                        flex: 1
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    flex: 1,
                    items: [{
                        xtype: 'button',
                        text: '7',
                        handler: function()
                        {
                            var inp = Ext.getCmp('regno').getValue();
                            Ext.getCmp('regno').setValue(inp + "7")
                        },
                        flex: 1
                    }, {
                        xtype: 'button',
                        text: '8',
                        handler: function()
                        {
                            var inp = Ext.getCmp('regno').getValue();
                            Ext.getCmp('regno').setValue(inp + "8")
                        },
                        flex: 1
                    }, {
                        xtype: 'button',
                        text: '9',
                        handler: function()
                        {
                            var inp = Ext.getCmp('regno').getValue();
                            Ext.getCmp('regno').setValue(inp + "9")
                        },
                        flex: 1
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    flex: 1,
                    items: [{
                        xtype: 'button',
                        text: '<img src="resources/images/backspace1.png" height="60">',
                        handler: function()
                        {
                            var inp = Ext.getCmp('regno').getValue();
                            inp = inp.slice(0, -1);
                            Ext.getCmp('regno').setValue(inp)
                        },
                        ui: 'decline',
                        flex: 1
                    }, {
                        xtype: 'button',
                        text: '0',
                        handler: function()
                        {
                            var inp = Ext.getCmp('regno').getValue();
                            Ext.getCmp('regno').setValue(inp + "0")
                        },
                        flex: 1
                    }, {
                        xtype: 'button',
                        text: '<img src="resources/images/enter reg no.png" height="100px" width="100px">',
                        ui: 'confirm',
                        handler: function() {
                            if (!this.overlay) {
                                this.overlay = Ext.Viewport.add({
                                    xtype: 'panel',
                                    id:'confirmpanel',
                                    modal: true,
                                    //hideOnMaskTap: true,
                                    showAnimation: {
                                        type: 'popIn',
                                        duration: 250,
                                        easing: 'ease-out'
                                    },
                                    hideAnimation: {
                                        type: 'popOut',
                                        duration: 250,
                                        easing: 'ease-out'
                                    },
                                    centered: true,
                                    width: Ext.os.deviceType == 'Phone' ? 360 : 500,
                                    height: Ext.os.deviceType == 'Phone' ? 320 : 550,
                                    styleHtmlContent: true,
                                    items: [
                                        {
                                            docked: 'top',
                                            xtype: 'toolbar',
                                            title: 'Confirmation',
                                            height:'60px'
                                        },
                                        {
                                            xtype: 'image',
                                            src: 'resources/images/boy.jpg',
                                            height:'200px',
                                            margin: '10 0 10 125'
                                        },
                                        {
                                            html:'<h2>Name: XYZ</h2><h2>Teshil: Bilaspur</h2>'
                                        },
										{
										docked: 'bottom',
                                        xtype: 'toolbar',
                                        height:'100px',
										items: [
										{
											xtype: 'button',
											text : '<img src="resources/images/tick-01.png">',
											handler: function()
											{
                                                Ext.getCmp('confirmpanel').destroy(),
                                                audio.stop();
												Ext.Viewport.setActiveItem(Ext.create('Med-Table.view.Menu'))
											},
											padding:'2px',
                                            left:'50px'
										},
										{
											xtype: 'button',
											text : '<img src="resources/images/cross-01.png">',
											handler: function (hideOnMaskTap)
											{
                                                //Ext.getCmp('confirmpanel').hide(),
                                                Ext.getCmp('confirmpanel').destroy(),
                                                audio.stop();
												Ext.Viewport.setActiveItem(Ext.create('Med-Table.view.Main'))
											},
											padding:'2px',
                                            left:'240px'
										}
										]}
										
                                    ],
                                    scrollable: true
                                });
                            }
                            this.overlay.show();
                        },
                        flex: 1
                    }]
                }
            ]
        }]
    }

});