/**
 * @class Ext.Video
 * @extends Ext.Media
 *
 * <p>Provides a simple Container for HTML5 Video.</p>
 *
 * <h2>Useful Properties</h2>
 * <ul class="list">
 *   <li>{@link #url}</li>
 *   <li>{@link #autoPause}</li>
 *   <li>{@link #autoResume}</li>
 * </ul>
 * 
 * <h2>Useful Methods</h2>
 * <ul class="list">
 *   <li>{@link #pause}</li>
 *   <li>{@link #play}</li>
 *   <li>{@link #toggle}</li>
 * </ul>
 * 
 * <h2>Screenshot:</h2>
 *
 * {@img Ext.Video/screenshot.png Ext.Video screenshot}
 * 
 * <h2>Example code:</h2>
 * <pre><code>
var pnl = new Ext.Panel({
    fullscreen: true,
    items: [
        {
            xtype    : 'video',
            x        : 600,
            y        : 300,
            width    : 175,
            height   : 98,
            url      : "porsche911.mov",
            posterUrl: 'porsche.png'
        }
    ]
});</code></pre>
 * @xtype video
 */
Ext.Video = Ext.extend(Ext.Media, {
    /**
     * @constructor
     * @param {Object} config
     * Create a new Video Panel.
     */

    /**
     * @cfg {String} url
     * Location of the video to play. This should be in H.264 format and in a
     * .mov file format.
     */

    /**
     * @cfg {String} posterUrl
     * Location of a poster image to be shown before showing the video.
     */
    posterUrl: '',
    
    // private
    componentCls: 'x-video',

    afterRender : function() {
        Ext.Video.superclass.afterRender.call(this);
        if (this.posterUrl) {
            this.media.hide();
            this.ghost = this.el.createChild({
                cls: 'x-video-ghost',
                style: 'width: 100%; height: 100%; background: #000 url(' + this.posterUrl + ') center center no-repeat; -webkit-background-size: 100% auto;'
            });
            this.ghost.on('tap', this.onGhostTap, this, {single: true});
        }
    },
    
    onGhostTap: function(){
        this.media.show();
        this.ghost.hide();
        this.play();
    },
    
    // private
    getConfiguration: function(){
        return {
            tag: 'video',
            width: '100%',
            height: '100%'
        };
    }    
});

Ext.reg('video', Ext.Video);