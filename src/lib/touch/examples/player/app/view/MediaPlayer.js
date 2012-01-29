Ext.define('Player.view.MediaPlayer', {
    extend : 'Ext.Container',
    xtype  : 'mediaplayer',

    requires : [
        'Ext.Toolbar',
        'Ext.field.Slider',
        'Ext.Audio',
        'Ext.Video',
        'Ext.XTemplate',
        'Player.view.Seeker',
        'Player.view.Time',
        'Player.view.Volume'
    ],

    config : {
        status : 'stop',
        layout : 'fit',
        items  : [
            {
                xtype    : 'toolbar',
                docked   : 'bottom',
                controls : 'playvolume',
                defaults : {
                    iconMask     : true,
                    ui           : 'plain'
                },
                items    : [
                    {
                        action   : 'toggle',
                        iconCls  : 'arrow_left'
                    },
                    {
                        xtype    : 'spacer'
                    },
                    {
                        ui       : 'decline',
                        action   : 'stop',
                        iconCls  : 'stop',
                        disabled : true
                    },
                    {
                        ui       : 'confirm',
                        action   : 'playtoggle',
                        iconCls  : 'play1',
                        disabled : true
                    },
                    {
                        xtype    : 'spacer'
                    },
                    {
                        action   : 'fullscreen',
                        iconCls  : 'expand',
                        disabled : true
                    },
                    {
                        action   : 'mute',
                        iconCls  : 'volume_mute',
                        disabled : true
                    },
                    {
                        action   : 'volume',
                        iconCls  : 'volume',
                        disabled : true
                    }
                ]
            },
            {
                xtype    : 'toolbar',
                docked   : 'bottom',
                controls : 'time',
                items    : [
                    {
                        xtype    : 'time',
                        time     : 'start'
                    },
                    {
                        xtype    : 'seeker',
                        flex     : 1,
                        disabled : true
                    },
                    {
                        xtype    : 'time',
                        time     : 'end'
                    }
                ]
            }
        ],

        control : {
            'button'      : {
                tap            : 'fireButtonEvent'
            },
            'media'       : {
                pause          : 'fireMediaPauseEvent',
                play           : 'fireMediaPlayEvent',
                stop           : 'fireMediaStopEvent',
                timeupdate     : 'fireMediaTimeEvent'
            },
            'sliderfield' : {
                userchange     : 'fireUserChange',
                thumbdragstart : 'fireThumbDragStart',
                thumbdragend   : 'fireThumbDragEnd'
            }
        }
    },

    initialize          : function() {
        this.callParent(arguments);

        this.element.on({
            scope : this,
            swipe : 'bubbleSwipe'
        });
    },

    bubbleSwipe         : function(e) {
        this.fireEvent('swipe', this, e.direction);
    },
    
    fireButtonEvent     : function(btn) {
        this.fireEvent('button' + btn.action, this, this.down('media'), btn);
    },

    fireMediaEvent      : function(event, media, time) {
        this.fireEvent('media' + event, this, media, time);
    },

    fireMediaPauseEvent : function(media, time) {
        this.fireMediaEvent('pause', media, time);
    },

    fireMediaPlayEvent  : function(media) {
        this.fireMediaEvent('play', media, null);
    },

    fireMediaStopEvent  : function(media, time) {
        this.fireMediaEvent('stop', media, time);
    },

    fireMediaTimeEvent  : function(media, time) {
        this.fireMediaEvent('timeupdate', media, time)
    },

    fireUserChange      : function(field, value) {
        this.fireEvent('slideruserchange', this, this.down('media'), field, value);
    },

    fireThumbDragStart  : function() {
        this.fireEvent('sliderdragstart', this, this.down('media'));
    },

    fireThumbDragEnd    : function() {
        this.fireEvent('sliderdragend', this, this.down('media'));
    }
});