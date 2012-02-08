/**
 * @class Ext.EventManager
 *
 * This object is deprecated.
 *
 * @deprecated
 * @singleton
 */

//<deprecated product=touch since=2.0>
Ext.ns('Ext.core');
Ext.core.EventManager =
Ext.EventManager = {
    addListener: function(element, eventName, fn, scope, options) {
        //<debug warn>
        Ext.Logger.deprecate("Ext.EventManager.addListener is deprecated, use addListener() directly from an instance of Ext.Element instead", 2);
        //</debug>
        element.on(eventName, fn, scope, options);
    },

    removeListener: function(element, eventName, fn, scope) {
        //<debug warn>
        Ext.Logger.deprecate("Ext.EventManager.removeListener is deprecated, use removeListener() directly from an instance of Ext.Element instead", 2);
        //</debug>
        element.un(eventName, fn, scope);
    },

    removeAll: function(element){
        //<debug warn>
        Ext.Logger.deprecate("Ext.EventManager.removeAll is deprecated, use clearListeners() directly from an instance of Ext.Element instead", 3);
        //</debug>
        Ext.get(element).clearListeners();
    },

    onWindowResize: function(fn, scope, options) {
        //<debug warn>
        Ext.Logger.deprecate("Ext.EventManager.onWindowResize is deprecated, attach listener to Ext.Viewport instead, i.e: Ext.Viewport.on('resize', ...)", 2);
        //</debug>
        Ext.Viewport.on('resize', fn, scope, options);
    },

    onOrientationChange: function(fn, scope, options) {
        //<debug warn>
        Ext.Logger.deprecate("Ext.EventManager.onOrientationChange is deprecated, attach listener to Ext.Viewport instead, i.e: Ext.Viewport.on('orientationchange', ...)", 2);
        //</debug>
        Ext.Viewport.on('orientationchange', fn, scope, options);
    },

    unOrientationChange: function(fn, scope, options) {
        //<debug warn>
        Ext.Logger.deprecate("Ext.EventManager.unOrientationChange is deprecated, remove listener from Ext.Viewport instead, i.e: Ext.Viewport.un('orientationchange', ...)", 2);
        //</debug>
        Ext.Viewport.un('orientationchange', fn, scope, options);
    }
};

Ext.EventManager.on = Ext.EventManager.addListener;
Ext.EventManager.un = Ext.EventManager.removeListener;
//</deprecated>
