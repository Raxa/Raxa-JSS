/**
 * @class Ext.Media
 * @extends Ext.Container
 *
 * <p>Provides a base class for audio/visual controls. Should not be used directly.</p>
 * @xtype media
 */
Ext.Media = Ext.extend(Ext.Component, {
    /**
     * @constructor
     * @param {Object} config
     * Create a new Media component.
     */

    /**
     * @cfg {String} url
     * Location of the media to play.
     */
    url: '',

    /**
     * @cfg {Boolean} enableControls
     * Set this to false to turn off the native media controls 
     * (Defaults to true).
     */
    enableControls: true,
    
    /**
     * @cfg {Boolean} autoResume
     * Will automatically start playing the media when the container is activated.
     * (Defaults to false)
     */
    autoResume: false,

    /**
     * @cfg {Boolean} autoPause
     * Will automatically pause the media when the container is deactivated.
     * (Defaults to true)
     */
    autoPause: true,

    /**
     * @cfg {Boolean} preload
     * Will begin preloading the media immediately.
     * (Defaults to true)
     */
    preload: true,

    // @private
    playing: false,

    // @private
    afterRender : function() {
        var cfg = this.getConfiguration();
        Ext.apply(cfg, {
            src: this.url,
            preload: this.preload ? 'auto' : 'none'
        });
        if(this.enableControls){
            cfg.controls = 'controls';
        }
        if(this.loop){
            cfg.loop = 'loop';
        }
        /**
         * A reference to the underlying audio/video element.
         * @property media
         * @type Ext.Element
         */
        this.media = this.el.createChild(cfg);
        Ext.Media.superclass.afterRender.call(this);
        
        this.on({
            scope: this,
            activate: this.onActivate,
            beforedeactivate: this.onDeactivate
        });
    },
    
    // @private
    onActivate: function(){
        if (this.autoResume && !this.playing) {
            this.play();
        }
    },
    
    // @private
    onDeactivate: function(){
        if (this.autoPause && this.playing) {
            this.pause();
        }
    },

    /**
     * Starts or resumes media playback
     */
    play : function() {
        this.media.dom.play();
        this.playing = true;
    },

    /**
     * Pauses media playback
     */
    pause : function() {
        this.media.dom.pause();
        this.playing = false;
    },

    /**
     * Toggles the media playback state
     */
    toggle : function() {
        if(this.playing){
            this.pause();    
        }
        else {
            this.play();
        }
    }
});

Ext.reg('media', Ext.Media);