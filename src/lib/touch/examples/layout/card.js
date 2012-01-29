Ext.require(['Ext.Container', 'Ext.Button'], function() {
    Ext.setup({
        onReady: function() {
            container = new Ext.Container({
                fullscreen: true,
                layout: 'card',
                defaults: {
                    xtype: 'container'
                },
                activeItem: 0,
                items: [{
                    style: 'background-color: black',
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
                }]
            });
        }
    });    
});