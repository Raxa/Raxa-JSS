Ext.require(['Ext.Container', 'Ext.Button'], function() {
    Ext.setup({
        onReady: function() {
            container = new Ext.Container({
                fullscreen: true,
                defaults: {
                    xtype: 'container'
                },
                items: [{
                    docked: 'top',
                    height: 50,
                    style: 'background-color: green'
                }, {
                    docked: 'left',
                    width: 50,
                    style: 'background-color: orange'
                }, {
                    docked: 'right',
                    width: 50,
                    style: 'background-color: gray'
                }, {
                    docked: 'bottom',
                    height: 50,
                    style: 'background-color: purple'
                }]
            });
        }
    });
});