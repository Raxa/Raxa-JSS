/**
 * This class acts as a factory for environment-specific viewport implementations.
 * 
 * Please refer to the {@link Ext.Viewport} documentation about using the global instance.
 * @private
 */
Ext.define('Ext.viewport.Viewport', {
    requires: [
        'Ext.viewport.Ios',
        'Ext.viewport.Android'
    ],

    constructor: function(config) {
        var osName = Ext.os.name,
            viewportName, viewport;

        switch (osName) {
            case 'Android':
                viewportName = 'Android';
                break;

            case 'iOS':
                viewportName = 'Ios';
                break;

            default:
                viewportName = 'Default';
        }

        viewport = Ext.create('Ext.viewport.' + viewportName, config);

        return viewport;
    }
});

/**
 * @class Ext.Viewport
 * @extends Ext.Container
 * @singleton
 * 
 * Ext.Viewport is a instance created when you use {@link Ext#setup}. Because {@link Ext.Viewport} extends from 
 * {@link Ext.Container}, it has as {@link #layout} (which defaults to {@link Ext.layout.Card}). This means you
 * can add items to it at any time, from anywhere in your code. The {@link Ext.Viewport} {@link #cfg-fullscreen} 
 * configuration is `true` by default, so it will take up your whole screen.
 * 
 *     Ext.setup({
 *         onReady: function() {
 *             Ext.Viewport.add({
 *                 xtype: 'container',
 *                 html: 'My new container!'
 *             });
 *         }
 *     });
 * 
 * If you want to customize anything about this {@link Ext.Viewport} instance, you can do so by adding a property
 * called `viewport` into your {@link Ext#setup} object:
 * 
 *     Ext.setup({
 *         viewport: {
 *             autoMaximize: false
 *         },
 *         onReady: function() {
 *             //do something
 *         }
 *     });
 * 
 * If you are using a MVC structure for your application, and you are using {@link Ext#application}, you can still pass 
 * in the `viewport` object to configure your viewport.
 * 
 *     Ext.application({
 *         viewport: {
 *             xclass: 'MyApp.view.Viewport'
 *         },
 *         launch: function() {
 *             //do something
 *         }
 *     });
 * 
 * **Note** if you use {@link Ext#onReady}, this instance of {@link Ext.Viewport} will **not** be created.
 */

/**
 * @cfg {Boolean} autoMaximize
 * Whether or not to always automatically maximize the viewport on first load and all subsequent orientation changes.
 * Defaults to `true` (unless the application is inside a native shell).
 * @accessor
 */

/**
 * @cfg {Boolean} preventPanning
 * Whether or not to always prevent default panning behavior of the browser's viewport.
 * Defaults to `true`
 * @accessor
 */

/**
 * @cfg {Boolean} preventZooming
 * Whether or not to always prevent default zooming feature of the
 * browser's viewport via finger gestures such as pinching and / or double-tapping.
 * Defaults to `true
 * @accessor
 */

/**
 * @cfg {Object/String} layout Configuration for this Container's layout. Example:
 *
 *    Ext.create('Ext.Container', {
 *        layout: {
 *            type: 'hbox',
 *            align: 'middle'
 *        },
 *        items: [
 *            {
 *                xtype: 'panel',
 *                flex: 1,
 *                style: 'background-color: red;'
 *            },
 *            {
 *                xtype: 'panel',
 *                flex: 2,
 *                style: 'background-color: green'
 *            }
 *        ]
 *    });
 *
 * See the layouts guide for more information
 * 
 * Defaults to {@link Ext.layout.Card card}
 * @accessor
 */

/**
 * @cfg {Number} width
 * @hide
 */

/**
 * @cfg {Number} height
 * @hide
 */

/**
 * @member Ext.Viewport
 * @method hideKeyboard
 * Convience method to hide the keyboard on devices, if it is visible.
 */
