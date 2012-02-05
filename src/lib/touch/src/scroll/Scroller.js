/**
 * In Sencha Touch there are several scroller implementations so we can have the best performance on
 * all mobile devices and browsers. This class acts as a `factory` to those scrollers, and when instanciated,
 * will automatically create the correct scroller instance for the currect device type.
 *
 * Scroller settings can be changed using the {@link Ext.Container#scrollable scrollable} configuration in
 * {@link Ext.Container}. Anything you pass to that method will be passed to the scroller when it is
 * instanciated in your container.
 *
 * Please note that the {@link Ext.Container#getScrollable} method returns an instance of {@link Ext.scroll.View}.
 * So if you need to get access to the scroller after your container has been instansiated, you must used the
 * {@link Ext.scroll.View#getScroller} method.
 *
 *     //lets assume container is a container you have
 *     //created which is scrollable
 *     container.getScrollable.getScroller().setFps(10);
 *
 * ## Example
 *
 * Here is a simple example of how to adjust the scroller settings when using a {@link Ext.Container} (or anything
 * that extends it).
 *
 *     @example
 *     var container = Ext.create('Ext.Container', {
 *         fullscreen: true,
 *         html: 'This container is scrollable!',
 *         scrollable: {
 *             direction: 'vertical'
 *         }
 *     });
 *
 * As you can see, we are passing the {@link #direction} configuration into the scroller instance in our container.
 *
 * You can pass any of the configs below in that {@link Ext.Container#scrollable scrollable} configuration and it will
 * just work.
 *
 * Go ahead and try it in the live code editor above!
 */
Ext.define('Ext.scroll.Scroller', {
    alternateClassName: 'Ext.util.Scroller',

    requires: [
        'Ext.scroll.scroller.ScrollPosition',
        'Ext.scroll.scroller.CssPosition',
        'Ext.scroll.scroller.CssTransform'
    ],

    defaultConfig: {
        fps: 'auto',

        scrollMethod: 'auto'
    },
    
    constructor: function(config) {
        var namespace = Ext.scroll.scroller,
            ScrollPosition = namespace.ScrollPosition,
            CssTransform = namespace.CssTransform,
            CssPosition = namespace.CssPosition,
            Scroller = ScrollPosition,
            osName = Ext.os.name,
            osVersion = Ext.os.version,
            userAgent = Ext.browser.userAgent,
            scrollMethod, fps, element;

        //<deprecated product=touch since=2.0>
        if (arguments.length == 2) {
            //<debug warn>
            Ext.Logger.deprecate("Passing element as the first argument is deprecated, pass it as the 'element' property of the config object instead");
            //</debug>
            element = config;
            config = arguments[1];

            if (!config) {
                config = {};
            }

            config.element = element;
        }
        //</deprecated>

        if (typeof config == 'string') {
            config = {
                direction: config
            };
        }

        config = Ext.merge({}, this.defaultConfig, config || {});

        if (config.fps === 'auto') {
            if (/(htc|desire|incredible|adr6300)/i.test(userAgent) && osVersion.lt('2.3')) {
                fps = 30;
            }
            else if (Ext.os.is.Android && !/(droid2)/i.test(userAgent)) {
                fps = 50;
            }
            else {
                fps = 60;
            }

            config.fps = fps;
        }

        scrollMethod = config.scrollMethod.toLowerCase();

        switch (scrollMethod) {
            case 'csstransform':
                Scroller = CssTransform;
                break;

            case 'cssposition':
                Scroller = CssPosition;
                break;

            case 'scrollposition':
                Scroller = ScrollPosition;
                break;

            case 'auto':
                if (/^(iOS|RIMTablet|MacOS|Windows)$/.test(osName) || Ext.os.is.BlackBerry) {
                    Scroller = CssTransform;
                }
                break;

            default:
                //<debug error>
                Ext.Logger.error("Unrecognized scrollMethod config value of '" +
                        scrollMethod + "'. Valid values are: 'csstransform', " +
                        "'cssposition', 'scrollposition' or 'auto'.");
                //</debug>

        }

        return new Scroller(config);
    }

});
