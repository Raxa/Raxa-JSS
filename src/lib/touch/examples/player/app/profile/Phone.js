Ext.define('Player.profile.Phone', {
    extend : 'Ext.app.Profile',

    config : {
        name        : 'phone',
        namespace   : 'phone',
        controllers : [ 'Main' ],
        views       : [ 'Viewport' ]
    },

    isActive : function() {
        return Ext.os.is.Phone;
    },

    launch : function() {
        var viewport = Ext.create('Player.view.phone.Viewport'),
            btns     = viewport.query('button'),
            hide     = ['fullscreen', 'mute', 'volume'];

        Ext.Array.each(btns, function(btn) {
            if (Ext.Array.indexOf(hide, btn.action) >= 0) {
                btn.hide();
            }

            if (btn.action === 'toggle') {
                btn.setIconCls('arrow_right');
            }
        });
    }
});