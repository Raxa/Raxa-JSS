/**
 * @class Ext.LoadMask
 * A simple utility class for generically masking elements while loading data.  If the {@link #store}
 * config option is specified, the masking will be automatically synchronized with the store's loading
 * process and the mask element will be cached for reuse.
 * <p>Example usage:</p>
 *<pre><code>
// Basic mask:
var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});
myMask.show();
</code></pre>
 * @constructor
 * Create a new LoadMask
 * @param {Mixed} el The element or DOM node, or its id
 * @param {Object} config The config object
 */
Ext.LoadMask = Ext.extend(Ext.util.Observable, {
    /**
     * @cfg {Ext.data.Store} store
     * Optional Store to which the mask is bound. The mask is displayed when a load request is issued, and
     * hidden on either load sucess, or load fail.
     */

    /**
     * @cfg {String} msg
     * The text to display in a centered loading message box (defaults to 'Loading...')
     */
    msg : 'Loading...',
    /**
     * @cfg {String} msgCls
     * The CSS class to apply to the loading message element (defaults to "x-mask-loading")
     */
    msgCls : 'x-mask-loading',

    /**
     * Read-only. True if the mask is currently disabled so that it will not be displayed (defaults to false)
     * @type Boolean
     */
    disabled: false,

    constructor : function(el, config) {
        this.el = Ext.get(el);
        Ext.apply(this, config);

        this.addEvents('show', 'hide');
        if (this.store) {
            this.bindStore(this.store, true);
        }
        Ext.LoadMask.superclass.constructor.call(this);
    },

    /**
     * Changes the data store bound to this LoadMask.
     * @param {Store} store The store to bind to this LoadMask
     */
    bindStore : function(store, initial) {
        if (!initial && this.store) {
            this.mun(this.store, {
                scope: this,
                beforeload: this.onBeforeLoad,
                load: this.onLoad,
                exception: this.onLoad
            });
            if(!store) {
                this.store = null;
            }
        }
        if (store) {
            store = Ext.StoreMgr.lookup(store);
            this.mon(store, {
                scope: this,
                beforeload: this.onBeforeLoad,
                load: this.onLoad,
                exception: this.onLoad
            });

        }
        this.store = store;
        if (store && store.isLoading()) {
            this.onBeforeLoad();
        }
    },

    /**
     * Disables the mask to prevent it from being displayed
     */
    disable : function() {
       this.disabled = true;
    },

    /**
     * Enables the mask so that it can be displayed
     */
    enable : function() {
        this.disabled = false;
    },

    /**
     * Method to determine whether this LoadMask is currently disabled.
     * @return {Boolean} the disabled state of this LoadMask.
     */
    isDisabled : function() {
        return this.disabled;
    },

    // private
    onLoad : function() {
        this.el.unmask();
        this.fireEvent('hide', this, this.el, this.store);
    },

    // private
    onBeforeLoad : function() {
        if (!this.disabled) {
            this.el.mask(Ext.LoadingSpinner + '<div class="x-loading-msg">' + this.msg + '</div>', this.msgCls, false);
            this.fireEvent('show', this, this.el, this.store);
        }
    },

    /**
     * Show this LoadMask over the configured Element.
     */
    show: function() {
        this.onBeforeLoad();
    },

    /**
     * Hide this LoadMask.
     */
    hide: function() {
        this.onLoad();
    },

    // private
    destroy : function() {
        this.hide();
        this.clearListeners();
    }
});

Ext.LoadingSpinner = '<div class="x-loading-spinner"><span class="x-loading-top"></span><span class="x-loading-right"></span><span class="x-loading-bottom"></span><span class="x-loading-left"></span></div>';
