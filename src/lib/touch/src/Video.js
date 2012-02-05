/**
 * Provides a simple Container for HTML5 Video.
 *
 * ## Notes
 *
 * - There are quite a few issues with the <video> tag on Android devices. On Android 2+, the video will
 * appear and play on first attempt, but any attempt afterwards will not work.
 *
 * ## Useful Properties
 *
 * - {@link #url}
 * - {@link #autoPause}
 * - {@link #autoResume}
 *
 * ## Useful Methods
 *
 * - {@link #pause}
 * - {@link #method-play}
 * - {@link #toggle}
 *
 * ## Example
 *
 *     var panel = new Ext.Panel({
 *         fullscreen: true,
 *         items: [
 *             {
 *                 xtype    : 'video',
 *                 x        : 600,
 *                 y        : 300,
 *                 width    : 175,
 *                 height   : 98,
 *                 url      : "porsche911.mov",
 *                 posterUrl: 'porsche.png'
 *             }
 *         ]
 *     });
 *
 */
Ext.define('Ext.Video', {
    extend: 'Ext.Media',
    xtype: 'video',

    config: {
        /**
         * @cfg {String} url
         * Location of the video to play. This should be in H.264 format and in a .mov file format.
         * @accessor
         */

        /**
         * @cfg {String} posterUrl
         * Location of a poster image to be shown before showing the video.
         * @accessor
         */
        posterUrl: null,

        // @inherited
        cls: Ext.baseCSSPrefix + 'video'
    },

    template: [{
        /**
         * @property {Ext.dom.Element} ghost
         * @private
         */
        reference: 'ghost',
        classList: [Ext.baseCSSPrefix + 'video-ghost']
    }, {
        tag: 'video',
        reference: 'media',
        classList: [Ext.baseCSSPrefix + 'media']
    }],

    initialize: function() {
        var me = this;

        me.callParent();

        me.media.hide();
        me.ghost.on({
            tap: 'onGhostTap',
            scope: me
        });

        me.media.on({
            scope: this,
            pause: 'onPause'
        });
    },

    /**
     * @private
     * Called when the {@link #ghost} element is tapped.
     */
    onGhostTap: function() {
        var me = this;

        me.media.show();

        this.media.setTop(0);

        if (Ext.os.is.Android) {
            setTimeout(function() {
                me.play();
            }, 200);
        } else {
            me.ghost.hide();
            me.media.dom.play();
        }
    },

    onPause: function() {
        this.callParent(arguments);

        this.media.setTop(-2000);
        this.ghost.show();
    },

    onPlay: function() {
        this.callParent(arguments);

        this.media.setTop(0);
    },

    /**
     * Updates the URL to the poster, even if it is rendered.
     * @param {Object} newUrl
     */
    updatePosterUrl: function(newUrl) {
        var ghost = this.ghost;
        if (ghost) {
            ghost.setStyle('background-image', 'url(' + newUrl + ')');
        }
    }
});
