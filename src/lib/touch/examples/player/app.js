Ext.Loader.setPath({
    Override : 'overrides',
    Player   : 'app'
});

Ext.require([
    'Ext.app.Application',
    'Override.slider.Slider',
    'Player.util.Format'
]);

Ext.setup({
    onReady : function() {
        new Ext.app.Application({
            name     : 'Player',
            profiles : [ 'Phone', 'Tablet' ],
            stores   : [ 'Media' ]
        });
    }
});