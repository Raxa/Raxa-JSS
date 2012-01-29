Ext.define('Player.view.tablet.Viewport', {
    extend : 'Ext.Container',
    xtype  : 'player-viewport',

    requires : [
        'Player.view.tablet.MediaList',
        'Player.view.MediaPlayer'
    ],

    config : {
        fullscreen : true,
        layout     : 'fit',
        items      : [
            {
                xtype  : 'tablet-medialist',
                docked : 'left',
                width  : 250
            },
            {
                xtype  : 'mediaplayer'
            }
        ]
    }
});