Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    views: ['TopToolbar', 'LogoutConfirmPanel'],
    name: 'Topbar',
    controllers: ['LogoutController'],

    launch: function () {

        Ext.create('Topbar.view.TopToolbar', {
            fullscreen: true
        });
    }

});