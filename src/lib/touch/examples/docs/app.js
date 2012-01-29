Ext.require([
    'Ext.ux.app.Application',
    'Ext.viewport.Viewport'
]);

Ext.onReady(function() {
    app = Ext.create('Ext.ux.app.Application', {
        name: "Docs",
        
        controllers: ["Comments"],
        profiles: ['Phone', 'Tablet'],
        stores: ['Guides', 'Classes'],
        
        launch: function() {
            //optional, called after profile launch
            console.log('launching app');
        }
    });
});