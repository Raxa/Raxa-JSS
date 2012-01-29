/**
 * The scroller factory
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
    
    /**
     * @cfg {Number} acceleration A higher acceleration gives the scroller more initial velocity. Defaults to 30
     * Deprecated, please use momentumEasing.momentum.acceleration instead
     * @deprecated 2.0.0
     */

    /**
     * @cfg {Number} friction The friction of the scroller. By raising this value the length that momentum scrolls 
     * becomes shorter. This value is best kept between 0 and 1. The default value is 0.5. Deprecated, please use
     * momentumEasing.momentum.friction instead
     * @deprecated 2.0.0
     */
    
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
