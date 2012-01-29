Ext.require(['Ext.Container', 'Ext.Button'], function() {
    Ext.setup({
            onReady: function() {
                container = new Ext.Container({
                    fullscreen: true,
                    layout: 'fit',
                    style: 'background-color: blue',
                    items: [{
                        xtype: 'container',
                        docked: 'top',
                        layout: 'hbox',
                        style: 'background-color: red',
                        items: [{
                            xtype: 'button',
                            text: 'Flex 1',
                            flex: 1
                        }, {
                            xtype: 'button',
                            text: 'Flex 2',
                            flex: 2
                        }, {
                            xtype: 'button',
                            text: 'Flex 3',
                            flex: 3
                        }, {
                            xtype: 'button',
                            docked: 'left',
                            text: 'Left'
                        }, {
                            xtype: 'button',
                            docked: 'left',
                            text: 'Left 2'
                        }, {
                            xtype: 'button',
                            docked: 'right',
                            text: 'Right'
                        }]
                    }, {
                        centered: true,
                        xtype: 'container',
                        html: 'Auto-width body based on this content<br>asdfasdfasdf<br>asdfasdfasdf<br>test',
                        style: 'background-color: green',
                        items: [{
                            xtype: 'button',
                            text: 'Inline 8',
                            docked: 'right'
                        }, {
                            xtype: 'button',
                            text: 'Inline 1',
                            docked: 'left'
                        }, {
                            xtype: 'button',
                            text: 'Inline 7',
                            docked: 'right'
                        }, {
                            docked: 'bottom',
                            text: 'Inline 5',
                            xtype: 'button'
                        }, {
                            xtype: 'button',
                            text: 'Inline 2',
                            docked: 'left'
                        }, {
                            xtype: 'button',
                            text: 'Inline 3',
                            docked: 'top'
                        }, {
                            xtype: 'button',
                            text: 'Inline 6',
                            docked: 'bottom'
                        }, {
                            xtype: 'button',
                            text: 'Inline 4',
                            docked: 'top'
                        }]
                    }]
                });
            }
        });    
});