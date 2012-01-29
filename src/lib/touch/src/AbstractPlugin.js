/**
 * @class Ext.AbstractPlugin
 * @extends Object
 *
 * <p>The AbstractPlugin class is the base class from which user-implemented plugins should inherit.</p>
 * <p>This class defines the essential API of plugins as used by Components by defining the following methods:</p>
 * <ul>
 * <li><code>init</code> : The plugin initialization method which the owning Component calls at Component initialization
 * time.<div class="sub-desc"><p>The Component passes itself as the sole parameter.</p><p>Subclasses should set up bidirectional
 * links between the plugin and its client Component here.</p></div></li>
 * <li><code>destroy</code> : The plugin cleanup method which the owning Component calls at Component destruction time.<div class="sub-desc">Use
 * this method to break links between the plugin and the Component and to free any allocated resources.</div></li>
 * <li><code>enable</code> : The base implementation just sets the plugin's <code>disabled</code> flag to <code>false</code><div class="sub-desc"></div></li>
 * <li><code>disable</code> : The base implementation just sets the plugin's <code>disabled</code> flag to <code>true</code><div class="sub-desc"></div></li>
 * </ul>
 */
Ext.define('Ext.AbstractPlugin', {
    disabled: false,

    constructor: function(config) {
        //<debug>
        if (!config.cmp && Ext.global.console) {
            Ext.global.console.warn("Attempted to attach a plugin ");
        }
        //</debug>
        Ext.apply(this, config);
    },

    getCmp: function() {
        return this.cmp;
    },

    /**
     * <p>The init method is invoked after initComponent method has been run for the client Component.</p>
     * <p>The supplied implementation is empty. Subclasses should perform plugin initialization, and set up bidirectional
     * links between the plugin and its client Component in their own implementation of this method.</p>
     * @param {Ext.Component} client The client Component which owns this plugin.
     * @method
     */
    init: Ext.emptyFn,

    /**
     * <p>The destroy method is invoked by the owning Component at the time the Component is being destroyed.</p>
     * <p>The supplied implementation is empty. Subclasses should perform plugin cleanup in their own implementation of this method.</p>
     * @method
     */
    destroy: Ext.emptyFn,

    /**
     * <p>The base implementation just sets the plugin's <code>disabled</code> flag to <code>false</code></p>
     * <p>Plugin subclasses which need more complex processing may implement an overriding implementation.</p>
     */
    enable: function() {
        this.disabled = false;
    },

    /**
     * <p>The base implementation just sets the plugin's <code>disabled</code> flag to <code>true</code></p>
     * <p>Plugin subclasses which need more complex processing may implement an overriding implementation.</p>
     */
    disable: function() {
        this.disabled = true;
    }
});