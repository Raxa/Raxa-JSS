Ext.define('Docs.view.phone.Main', {
    extend: 'Ext.TabPanel',
    id: 'mainPanel',
    
    config: {
        tabBarPosition: 'bottom',
        fullscreen: true,
        
        items: [
            {
                title: 'API',
                iconCls: 'star',
                html: 'API Reference',
                itemId: 'api'
            },
            {
                title: 'Guides',
                iconCls: 'user',
                itemId: 'guides',
                
                xtype: 'nestedlist',
                displayField: 'text',
                rootVisible: false,

                store: Ext.create('Docs.store.Guides')
            },
            {
                title: 'Videos',
                iconCls: 'video',
                html: 'Videos',
                itemId: 'videos'
            },
            {
                title: 'Examples',
                iconCls: 'example',
                html: 'Examples',
                itemId: 'examples'
            }
        ]
    }
});