Ext.define('Docs.view.tablet.Main', {
    extend: "Ext.Container",
    requires: ['Docs.view.ContentList'],
    id: 'mainPanel',
    
    config: {
        fullscreen: true,
        layout: 'hbox',
        items: [
            {
                width: 300,
                xtype: 'contentlist'
            },
            {
                flex: 1,
                html: 'content',
                layout: 'card',
                itemId: 'content'
            }
        ]
    }
});