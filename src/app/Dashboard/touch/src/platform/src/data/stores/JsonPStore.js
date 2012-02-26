/**
 * @class Ext.data.JsonPStore
 * @extends Ext.data.Store
 * @ignore
 * @private
 * <p><b>NOTE:</b> This class is in need of migration to the new API.</p>
 * <p>Small helper class to make creating {@link Ext.data.Store}s from different domain JSON data easier.
 * A JsonPStore will be automatically configured with a {@link Ext.data.JsonReader} and a {@link Ext.data.ScriptTagProxy ScriptTagProxy}.</p>
 * <p>A store configuration would be something like:<pre><code>
var store = new Ext.data.JsonPStore({
    // store configs
    autoDestroy: true,
    storeId: 'myStore',

    // proxy configs
    url: 'get-images.php',

    // reader configs
    root: 'images',
    idProperty: 'name',
    fields: ['name', 'url', {name:'size', type: 'float'}, {name:'lastmod', type:'date'}]
});
 * </code></pre></p>
 * <p>This store is configured to consume a returned object of the form:<pre><code>
stcCallback({
    images: [
        {name: 'Image one', url:'/GetImage.php?id=1', size:46.5, lastmod: new Date(2007, 10, 29)},
        {name: 'Image Two', url:'/GetImage.php?id=2', size:43.2, lastmod: new Date(2007, 10, 30)}
    ]
})
 * </code></pre>
 * <p>Where stcCallback is the callback name passed in the request to the remote domain. See {@link Ext.data.ScriptTagProxy ScriptTagProxy}
 * for details of how this works.</p>
 * An object literal of this form could also be used as the {@link #data} config option.</p>
 * <p><b>*Note:</b> Although not listed here, this class accepts all of the configuration options of
 * <b>{@link Ext.data.JsonReader JsonReader}</b> and <b>{@link Ext.data.ScriptTagProxy ScriptTagProxy}</b>.</p>
 * @constructor
 * @param {Object} config
 * @xtype jsonpstore
 */
Ext.data.JsonPStore = Ext.extend(Ext.data.Store, {
    /**
     * @cfg {Ext.data.DataReader} reader @hide
     */
    constructor: function(config) {
        Ext.data.JsonPStore.superclass.constructor.call(this, Ext.apply(config, {
            reader: new Ext.data.JsonReader(config),
            proxy : new Ext.data.ScriptTagProxy(config)
        }));
    }
});

Ext.reg('jsonpstore', Ext.data.JsonPStore);