/**
 * Provides a simple Container for HTML5 Video.
 *
 * # Useful Properties
 *
 * - {@link #url}
 * - {@link #autoPause}
 * - {@link #autoResume}
 *
 * # Useful Methods
 *
 * - {@link #pause}
 * - {@link #method-play}
 * - {@link #toggle}
 *
 * # Example code:
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

    initialize: function() {
        this.callParent();
        if (Ext.os.is.Android) {
            var ghost = this.ghost = this.element.append(Ext.Element.create({
                cls: Ext.baseCSSPrefix + 'video-ghost',
                style: 'background-image: url(' + this.getPosterUrl() + ');'
            }));
            ghost.on({
                tap: 'onGhostTap',
                scope: this
            });
        }
    },

    /**
     * @private
     * Called when the {@link #ghost} element is tapped.
     */
    onGhostTap: function() {

        //on android we need to continue to show the ghost, as the video player popups out
        //and we need to set a timeout and play the video later, to make it work.
        //it shows a popup, instead of inline

        var me = this;
        setTimeout(function() {
            me.play();
            me.media.hide();
        }, 200);
    },

    template: [{
        tag: 'video',
        reference: 'media',
        classList: [Ext.baseCSSPrefix + 'media']
    }],

    /**
     * Updates the URL to the poster, even if it is rendered.
     * @param {Object} newUrl
     */
    updatePosterUrl: function(newUrl) {
        var ghost = this.ghost;
        if (ghost) {
            ghost.dom.style.backgroundImage = newUrl ? 'url(' + newUrl + ')' : '';
        }
    }
});
