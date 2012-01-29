Ext.require(['Ext.Container', 'Ext.Button'], function() {
    Ext.setup({
        onReady: function() {
            item1 = new Ext.Container({
                style: 'background-color: green',
                height: 100,
                hidden: true,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'button',
                    text: 'stretch'
                }, {
                    xtype: 'button',
                    text: 'flex: 1',
                    flex: 1
                }, {
                    xtype: 'button',
                    text: 'flex: 2, height: 40',
                    height: 40,
                    flex: 2
                }, {
                    xtype: 'button',
                    text: 'width: 120'
                }]
            });
            
            var container = new Ext.Container({
                fullscreen: true,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults: {
                    xtype: 'container'
                },
                items: [item1, {
                    style: 'background-color: black',
                    height: 100,
                    docked: 'top',
                    layout: {
                        type: 'hbox',
                        align: 'stretchmax',
                        pack: 'center'
                    },
                    items: [{
                        xtype: 'button',
                        text: 'stretchmax'
                    }, {
                        xtype: 'button',
                        text: 'width: 120'
                    }, {
                        xtype: 'button',
                        text: 'flex: 2, height: 50',
                        height: 50,
                        flex: 2,
                        minWidth: 200,
                        maxWidth: 500
                    }, {
                        xtype: 'button',
                        text: 'flex: 1, mH: 40',
                        maxHeight: 40,
                        flex: 1,
                        minWidth: 200,
                        maxWidth: 400
                    }]
                }, {
                    style: 'background-color: gray',
                    layout: {
                        type: 'hbox',
                        align: 'bottom'
                    },
                    items: [{
                        xtype: 'button',
                        text: 'auto-height, bottom'
                    }, {
                        xtype: 'button',
                        text: 'width: 120'
                    }, {
                        xtype: 'button',
                        text: 'flex: 2, height: 100',
                        height: 100,
                        flex: 2
                    }, {
                        xtype: 'button',
                        text: 'flex: 1',
                        flex: 1
                    }]
                }, {
                    style: 'background-color: red',
                    docked: 'left',
                    layout: {
                        type: 'vbox',
                        align: 'middle'
                    },
                    width: 140,
                    items: [{
                        xtype: 'button',
                        text: 'flex: 1',
                        flex: 1
                    }, {
                        xtype: 'button',
                        text: 'flex: 2',
                        flex: 2
                    }, {
                        xtype: 'button',
                        text: 'height: 100',
                        height: 100
                    }, {
                        xtype: 'button',
                        text: 'auto'
                    }, {
                        xtype: 'button',
                        text: 'flex: 1',
                        flex: 1
                    }]
                }, {
                    style: 'background-color: purple',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    height: 100,
                    items: [{
                        xtype: 'button',
                        text: 'Horizontally Scrollable',
                        width: 800
                    }, {
                        xtype: 'button',
                        text: 'Uses Sencha Touch scroller',
                        width: 800
                    }, {
                        xtype: 'button',
                        text: 'Cancels vertical scroller',
                        width: 800
                    }]
                }, {
                    style: 'background-color: yellow',
                    docked: 'bottom',
                    height: 100,
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [{
                        xtype: 'button',
                        text: 'middle'
                    }, {
                        xtype: 'button',
                        text: 'width: 120'
                    }, {
                        xtype: 'button',
                        text: 'flex: 2, height: 40',
                        height: 40,
                        flex: 2
                    }, {
                        xtype: 'button',
                        text: 'flex: 1',
                        flex: 1
                    }]                    
                }]
            });

            item1.show();
        }
    });    
});