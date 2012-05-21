Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'pharmacy',
        appFolder: 'app',
//         views: ['Home','Viewport'],
//    autoCreateViewport: true,
        controllers: ['Users'],
            launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: {
                xtype: 'adddrug'
            }
        });
    }
});
        
