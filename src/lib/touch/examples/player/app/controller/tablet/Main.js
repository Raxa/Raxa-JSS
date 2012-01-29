Ext.define('Player.controller.tablet.Main', {
    extend : 'Player.controller.Main',

    config : {
        control : {
            'tablet-medialist' : {
                disclose : 'handleMediaSelect'
            }
        },

        refs    : {
            mediaList : 'tablet-medialist'
        }
    },

    toggleList : function(player, media, btn) {
        var list   = this.getMediaList(),
            width  = list.getWidth(),
            expand = width === 0;

        list.setWidth(   expand ? list.initialConfig.width : 0             );
        btn .setIconCls( expand ? 'arrow_left'             : 'arrow_right' );
    }
});