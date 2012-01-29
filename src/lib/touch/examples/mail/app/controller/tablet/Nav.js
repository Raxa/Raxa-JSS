Ext.define('Mail.controller.tablet.Nav', {
    extend: 'Mail.controller.Nav',

    config: {
        refs: {
            nav: '#nav'
        }
    },

    init: function() {
        return;

        this.viewport = Ext.create('Ext.viewport.Viewport', {
            listeners: {
                orientationchange: this.onOrientationChange,
                scope: this
            }
        });
    },

    onAccountTap: function(list, index) {
        this.getNav().getLayout().getAnimation().setReverse(true);
        this.getNav().setActiveItem(1); //this should be addressed with an itemId
        this.getNav().getLayout().getAnimation().setReverse(false);
    },

    onOrientationChange: function(viewport, direction) {
        var nav = this.getNav();
        console.log('controller');

        if (direction == 'portrait') {
            nav.up('#main').hide();
        } else {
            nav.up('#main').show();
        }
    }
});