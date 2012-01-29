Ext.define('DataSink.view.Viewport', {
    extend: 'Ext.Container',
    xtype: 'app-viewport',
    requires: [
        'Ext.TitleBar',
        'Ext.List'
    ],
    config: {
        fullscreen: true,
        layout: {
            type: 'card',
            animation: {
                type: 'slide',
                direction: 'up',
                duration: 300
            }
        },
        items: [
            {
                id: 'launchscreen',
                cls: 'launchscreen',
                html: 'Data examples.'
            },
            {
                xtype : 'list',
                docked: 'left',
                cls: 'demo-list',
                itemId: 'demo-list',
                width : 250,

                itemTpl: '{type}',
                store: 'Demos',
                grouped: true,

                items: [
                    { xtype: 'toolbar', docked: 'top' }
                ]
            }, {
                xtype : 'titlebar',
                docked: 'top',
                title : 'Data Sink'
            }
        ]
    }
});
