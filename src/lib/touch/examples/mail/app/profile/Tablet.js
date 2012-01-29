Ext.define('Mail.profile.Tablet', {
    extend: 'Ext.ux.app.Profile',

    config: {
        namespace: 'tablet',
        name: 'tablet',

        views: ['Main', 'Viewer', 'Compose'],
        controllers: ['Nav', 'Messages', 'Accounts']
    },

    isActive: function() {
        // return Ext.os.is('Tablet');
        // return !Ext.os.is('Phone');
        return true;
    },

    launch: function() {
        Ext.Viewport.on('orientationchange', this.onOrientationChange, this);

        Ext.create('Mail.view.tablet.Main');
    },

    onOrientationChange: function(viewport, direction) {
        var nav = this.getApplication().getController('tablet.Nav').getNav();

        if (direction == 'portrait') {
            nav.up('#main').hide();
        } else {
            nav.up('#main').show();
        }
    }
});