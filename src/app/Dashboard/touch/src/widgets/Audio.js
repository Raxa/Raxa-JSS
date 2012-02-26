/**
 * @class Ext.Audio
 * @extends Ext.Media
 *
 * <p>Provides a simple container for HTML5 Audio.</p>
 * <p><i>Recommended types: Uncompressed WAV and AIF audio, MP3 audio, and AAC-LC or HE-AAC audio</i></p>
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
 * {@img Ext.Audio/screenshot.png Ext.Audio screenshot}
 * 
 * <h2>Example code:</h2>
 * <pre><code>
var pnl = new Ext.Panel({
    fullscreen: true,
    items: [
        {
            xtype: 'audio',
            url  : "who-goingmobile.mp3"
        }
    ]
});</code></pre>
 * @xtype audio
 */
Ext.Audio = Ext.extend(Ext.Media, {
    /**
     * @constructor
     * @param {Object} config
     * Create a new Audio container.
     */

    /**
     * @cfg {String} url
     * Location of the audio to play.
     */

    componentCls: 'x-audio',
    
    // @private
    onActivate: function(){
        Ext.Audio.superclass.onActivate.call(this);
        if (Ext.is.Phone) {
            this.media.show();
        }    
    },
    
    // @private
    onDeactivate: function(){
        Ext.Audio.superclass.onDeactivate.call(this);
        if (Ext.is.Phone) {
            this.media.hide();
        }
    },
    
    // @private
    getConfiguration: function(){
        var hidden = !this.enableControls;
        if (!Ext.supports.AudioTag) {
            return {
                tag: 'embed',
                type: 'audio/mpeg',
                target: 'myself',
                controls: 'true',
                hidden: hidden
            };
        } else {
            return {
                tag: 'audio',
                hidden: hidden
            };
        }    
    }
});

Ext.reg('audio', Ext.Audio);