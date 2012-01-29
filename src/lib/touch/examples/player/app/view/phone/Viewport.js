Ext.define('Player.view.phone.Viewport', {
    extend : 'Ext.Container',
    xtype  : 'tablet-viewport',

     requires : [
        'Player.view.phone.MediaList',
        'Player.view.MediaPlayer'
    ],

    config : {
        fullscreen : true,
        layout     : 'fit',
        items      : [
            {
                xtype : 'mediaplayer'
            }
        ]
    }
});