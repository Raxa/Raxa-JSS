/**
 * @class Ext.LayoutManager
 * <p>Provides a registry of all Layouts (instances of {@link Ext.layout.Layout} or any subclass
 * thereof) on a page.
 * @singleton
 */
Ext.layout.LayoutManager = new Ext.AbstractManager({
    /**
     * Creates a new Component from the specified config object using the
     * config object's {@link Ext.component#xtype xtype} to determine the class to instantiate.
     * @param {Object} config A configuration object for the Component you wish to create.
     * @param {Constructor} defaultType The constructor to provide the default Component type if
     * the config object does not contain a <code>xtype</code>. (Optional if the config contains a <code>xtype</code>).
     * @return {Ext.Component} The newly instantiated Component.
     */
    create : function(config, defaultType) {
        if (!config) {
            config = defaultType;
        }
        if (Ext.isString(config)) {
            return new this.types[config || defaultType];
        }
        else if (Ext.isObject(config)) {
            if (config.isLayout) {
                return config;
            }
            else {
                return new this.types[config.type || defaultType](config);
            }
        }
    }
});

/**
 * Shorthand for {@link Ext.layout.LayoutManager#registerType}
 * @param {String} type The {@link Ext.layout.Layout#type mnemonic string} by which the Layout class
 * may be looked up.
 * @param {Constructor} cls The new Layout class.
 * @member Ext
 * @method regLayout
 */
Ext.regLayout = function() {
    return Ext.layout.LayoutManager.registerType.apply(Ext.layout.LayoutManager, arguments);
};