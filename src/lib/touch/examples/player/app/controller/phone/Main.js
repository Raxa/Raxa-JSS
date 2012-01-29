Ext.define('Player.controller.phone.Main', {
    extend : 'Player.controller.Main',

    config : {
        control : {
            'phone-medialist' : {
                buttonclose : 'closeMediaList',
                disclose    : 'handleMediaSelect'
            }
        },

        refs    : {
            mediaList         : {
                selector    : 'phone-medialist',
                xtype       : 'phone-medialist',
                autoCreate  : true
            }
        }
    },

    toggleList : function() {
        var list = this.getMediaList();

        list.show();
    },

    closeMediaList : function(list) {
        list.hide();
    },

    handleMediaSelect : function() {
        this.callParent(arguments);

        this.closeMediaList(this.getMediaList());
    },

    handlePlayerSwipe : function(player, direction) {
        this[direction === 'right' ? 'toggleList' : 'closeMediaList']();
    }
});