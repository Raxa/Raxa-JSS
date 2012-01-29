Ext.define('Kitchensink.view.tablet.Main', {
    extend: 'Ext.Container',
    xtype: 'mainview',
    
    requires: [
        'Ext.dataview.NestedList',
        'Ext.navigation.Bar'
    ],
    
    config: {
        fullscreen: true,
        
        layout: {
            type: 'card',
            animation: {
                type: 'slide',
                direction: 'left',
                duration: 250
            }
        },
        
        items: [
            {
                id: 'launchscreen',
                cls : 'launchscreen',
                html: '<div style="text-align:center;"><img src="resources/img/sencha.png" width="210" height="291" /><h1>Welcome to Sencha Touch</h1><p>This is a comprehensive collection of our examples in an <br /> easy-to-navigate format. Each sample has a “view source” button which dynamically displays its associated code.<br /><br /><span>Sencha Touch (' + Ext.version +')</span></p></div>'
            }, 
            {
                id: 'mainNestedList',
                xtype : 'nestedlist',
                useTitleAsBackText: false,
                docked: 'left',
                width : 250,
                store: 'Demos'
            },
            {
                id: 'mainNavigationBar',
                xtype : 'titlebar',
                docked: 'top',
                title : 'Kitchen Sink',
                items: {
                    xtype : 'button',
                    id: 'viewSourceButton',
                    hidden: true,
                    align : 'right',
                    ui    : 'action',
                    action: 'viewSource',
                    text  : 'Source'
                }
            }
        ]
    }
});