Ext.define('Player.controller.Main', {
    extend : 'Ext.app.Controller',

    config : {
        control : {
            'mediaplayer'    : {
                buttonfullscreen : 'videoFullscreen',
                buttonmute       : 'muteVolume',
                buttonplaytoggle : 'togglePlay',
                buttonstop       : 'stopPlayback',
                buttontoggle     : 'toggleList',
                buttonvolume     : 'showVolumeFloater',

                mediapause       : 'handleMediaPause',
                mediaplay        : 'handleMediaPlay',
                mediastop        : 'handleMediaStop',
                mediatimeupdate  : 'handleMediaTimeUpdate',

                slideruserchange : 'handleUserChange',
                sliderdragstart  : 'handleSeekerDragStart',
                sliderdragend    : 'handleSeekerDragEnd',

                swipe            : 'handlePlayerSwipe'
            },
            'volume'         : {
                change           : 'handleVolumeChange'
            }
        },

        refs    : {
            mediaPlayer      : 'mediaplayer',
            stopButton       : 'mediaplayer button[action=stop]',
            toggleButton     : 'mediaplayer button[action=playtoggle]',
            volumeButton     : 'mediaplayer button[action=volume]',
            muteButton       : 'mediaplayer button[action=mute]',
            fullscreenButton : 'mediaplayer button[action=fullscreen]',
            durationCmp      : 'mediaplayer component[time=end]',
            seeker           : 'mediaplayer sliderfield',
            volumeSlider     : 'volume sliderfield',
            volumeFloater    : {
                selector         : 'volume',
                xtype            : 'volume',
                autoCreate       : true
            }
        }
    },

    handlePlayerSwipe : Ext.emptyFn,

    handleMediaSelect : function(list, rec) {
        var me = this;

        if (!(rec instanceof Ext.data.Model)) {
            rec  = list;
            list = me.getMediaList();
        }

        var player           = me.getMediaPlayer(),
            location         = rec.get('location'),
            type             = rec.get('type'),
            media            = player.down('media'),
            reuse            = false,
            toggleButton     = me.getToggleButton(),
            stopButton       = me.getStopButton(),
            volumeButton     = me.getVolumeButton(),
            muteButton       = me.getMuteButton(),
            durationCmp      = me.getDurationCmp(),
            seeker           = me.getSeeker(),
            fullscreenButton = me.getFullscreenButton();

        if (media) {
            reuse = media.isXType(type);
        }

        if (reuse) {
            media.setUrl(location);
        } else {
            if (media) {
                player.remove(media);
            }

            media = player.add({
                xtype          : type,
                url            : location,
                enableControls : false
            });
        }

        toggleButton    .setDisabled(false);
        stopButton      .setDisabled(true);
        volumeButton    .setDisabled(false);
        muteButton      .setDisabled(false);
        seeker          .setDisabled(false);
        fullscreenButton.setDisabled(false);

        media.media.dom.addEventListener('canplay', function() {
            durationCmp.setDuration(media.getDuration());
        });
    },

    stopPlayback : function(player, media) {
        media.stop();
    },

    togglePlay : function(player, media) {
        media.toggle();
    },

    showVolumeFloater : function(player, media, btn) {
        var floater = this.getVolumeFloater(),
            volume, muted, slider;

        if (!floater) {
            floater = new Player.view.Volume();
        }

        volume = floater.getVolume();
        muted  = floater.getMuted();

        if (muted) {
            volume = 0;
        }

        slider = this.getVolumeSlider();
        slider.setValue(volume);

        floater.showBy(btn);
    },

    handleMediaPause : function(player) {
        var toggleButton = this.getToggleButton();

        toggleButton.setIconCls('play1');
        player      .setStatus('pause');
    },

    handleMediaPlay : function(player) {
        var stopButton   = this.getStopButton(),
            toggleButton = this.getToggleButton();

        stopButton  .setDisabled(false);
        toggleButton.setIconCls('pause');
        player      .setStatus('play');
    },

    handleMediaStop : function(player) {
        var stopButton = this.getStopButton();

        stopButton.setDisabled(true);
        player    .setStatus('stop');
    },

    handleMediaTimeUpdate : function(player, media, time) {
        var seeker = this.getSeeker();

        if (seeker.getLocked()) {
            return;
        }

        var durationCmp = this.getDurationCmp(),
            duration    = durationCmp.getDuration(),
            value       = 1 - (duration - time) / duration;

        seeker.setValue(value);
    },

    handleVolumeChange : function(floater, field, volume) {
        var player = this.getMediaPlayer(),
            media  = player.down('media');

        media  .setVolume(volume);
        floater.setVolume(volume);

        if (!media.getMuted()) {
            floater.setLastVolume(volume);
        }
    },

    muteVolume : function(player, media, btn) {
        var muted   = media.getMuted(),
            floater = this.getVolumeFloater(),
            slider  = this.getVolumeSlider();

        media.setMuted(!muted);

        btn.setUi(muted ? 'plain' : 'decline');

        if (floater) {
            floater.setMuted(!muted);
        }

        if (muted && floater && slider) {
            slider.setValue(floater.getLastVolume());
        }
    },

    handleUserChange : function(player, media, field, value) {
        if (Ext.isArray(value)) {
            value = value[0];
        }

        var duration = media.getDuration(),
            time     = duration * value;

        media.setCurrentTime(time);
    },

    handleSeekerDragStart : function() {
        var seeker = this.getSeeker();

        seeker.setLocked(true);
    },

    handleSeekerDragEnd : function() {
        var seeker = this.getSeeker();

        seeker.setLocked(false);
    },

    videoFullscreen : function(player, media) {
        if (media) {
            media.media.dom.webkitEnterFullscreen();
        }
    }
});