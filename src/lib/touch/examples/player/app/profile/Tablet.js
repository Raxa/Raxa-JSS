Ext.define('Player.profile.Tablet', {
    extend : 'Ext.app.Profile',

    config : {
        name        : 'tablet',
        namespace   : 'tablet',
        controllers : [ 'Main' ],
        views       : [ 'Viewport' ]
    },

    isActive : function() {
        return Ext.os.is.Tablet || Ext.os.is.Desktop;
    },

    launch : function() {
        Ext.create('Player.view.tablet.Viewport');
    }
});