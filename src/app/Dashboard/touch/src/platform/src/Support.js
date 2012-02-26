/**
 * @class Ext.is
 * 
 * Determines information about the current platform the application is running on.
 * 
 * @singleton
 */
Ext.is = {

    init: function(navigator) {
        var me = this,
            platforms = me.platforms,
            ln = platforms.length,
            i, platform;

        navigator = navigator || window.navigator;

        for (i = 0; i < ln; i++) {
            platform = platforms[i];
            me[platform.identity] = platform.regex.test(navigator[platform.property]);
        }

        /**
         * @property Desktop True if the browser is running on a desktop machine
         * @type {Boolean}
         */
        me.Desktop = me.Mac || me.Windows || (me.Linux && !me.Android);
        /**
         * @property iOS True if the browser is running on iOS
         * @type {Boolean}
         */
        me.iOS = me.iPhone || me.iPad || me.iPod;

        /**
         * @property Standalone Detects when application has been saved to homescreen.
         * @type {Boolean}
         */
        me.Standalone = !!navigator.standalone;

        /**
         * @property androidVersion Returns Android OS version information.
         * @type {Boolean}
         */
        i = me.Android && (/Android\s(\d+\.\d+)/.exec(navigator.userAgent));
        if (i) {
            me.AndroidVersion = i[1];
            me.AndroidMajorVersion = parseInt(i[1], 10);
        }
        /**
         * @property Tablet True if the browser is running on a tablet (iPad)
         */
        me.Tablet = me.iPad || (me.Android && me.AndroidMajorVersion === 3);

        /**
         * @property Phone True if the browser is running on a phone.
         * @type {Boolean}
         */
        me.Phone = !me.Desktop && !me.Tablet;

        /**
         * @property MultiTouch Returns multitouch availability.
         * @type {Boolean}
         */
        me.MultiTouch = !me.Blackberry && !me.Desktop && !(me.Android && me.AndroidVersion < 3);
    },

    /**
     * @property iPhone True when the browser is running on a iPhone
     * @type {Boolean}
     */
    platforms: [{
        property: 'platform',
        regex: /iPhone/i,
        identity: 'iPhone'
    },

    /**
     * @property iPod True when the browser is running on a iPod
     * @type {Boolean}
     */
    {
        property: 'platform',
        regex: /iPod/i,
        identity: 'iPod'
    },

    /**
     * @property iPad True when the browser is running on a iPad
     * @type {Boolean}
     */
    {
        property: 'userAgent',
        regex: /iPad/i,
        identity: 'iPad'
    },

    /**
     * @property Blackberry True when the browser is running on a Blackberry
     * @type {Boolean}
     */
    {
        property: 'userAgent',
        regex: /Blackberry/i,
        identity: 'Blackberry'
    },

    /**
     * @property Android True when the browser is running on an Android device
     * @type {Boolean}
     */
    {
        property: 'userAgent',
        regex: /Android/i,
        identity: 'Android'
    },

    /**
     * @property Mac True when the browser is running on a Mac
     * @type {Boolean}
     */
    {
        property: 'platform',
        regex: /Mac/i,
        identity: 'Mac'
    },

    /**
     * @property Windows True when the browser is running on Windows
     * @type {Boolean}
     */
    {
        property: 'platform',
        regex: /Win/i,
        identity: 'Windows'
    },

    /**
     * @property Linux True when the browser is running on Linux
     * @type {Boolean}
     */
    {
        property: 'platform',
        regex: /Linux/i,
        identity: 'Linux'
    }]
};

Ext.is.init();

/**
 * @class Ext.supports
 *
 * Determines information about features are supported in the current environment
 * 
 * @singleton
 */
Ext.supports = {
    init: function() {
        var doc = document,
            div = doc.createElement('div'),
            tests = this.tests,
            ln = tests.length,
            i, test;

        div.innerHTML = ['<div style="height:30px;width:50px;">', '<div style="height:20px;width:20px;"></div>', '</div>', '<div style="float:left; background-color:transparent;"></div>'].join('');

        doc.body.appendChild(div);

        for (i = 0; i < ln; i++) {
            test = tests[i];
            this[test.identity] = test.fn.call(this, doc, div);
        }

        doc.body.removeChild(div);
    },

    /**
     * @property OrientationChange True if the device supports orientation change
     * @type {Boolean}
     */
    OrientationChange: ((typeof window.orientation != 'undefined') && ('onorientationchange' in window)),

    /**
     * @property DeviceMotion True if the device supports device motion (acceleration and rotation rate)
     * @type {Boolean}
     */
    DeviceMotion: ('ondevicemotion' in window),

    /**
     * @property Touch True if the device supports touch
     * @type {Boolean}
     */
    // is.Desktop is needed due to the bug in Chrome 5.0.375, Safari 3.1.2
    // and Safari 4.0 (they all have 'ontouchstart' in the window object).
    Touch: ('ontouchstart' in window) && (!Ext.is.Desktop),

    tests: [
    /**
     * @property Transitions True if the device supports CSS3 Transitions
     * @type {Boolean}
     */
    {
        identity: 'Transitions',
        fn: function(doc, div) {
            var prefix = ['webkit', 'Moz', 'o', 'ms', 'khtml'],
                TE = 'TransitionEnd',
                transitionEndName = [
            prefix[0] + TE, 'transitionend', //Moz bucks the prefixing convention
            prefix[2] + TE, prefix[3] + TE, prefix[4] + TE],
                ln = prefix.length,
                i = 0,
                out = false;
            div = Ext.get(div);
            for (; i < ln; i++) {
                if (div.getStyle(prefix[i] + "TransitionProperty")) {
                    Ext.supports.CSS3Prefix = prefix[i];
                    Ext.supports.CSS3TransitionEnd = transitionEndName[i];
                    out = true;
                    break;
                }
            }
            return out;
        }
    },

    /**
     * @property RightMargin True if the device supports right margin
     * @type {Boolean}
     */
    {
        identity: 'RightMargin',
        fn: function(doc, div, view) {
            view = doc.defaultView;
            return ! (view && view.getComputedStyle(div.firstChild.firstChild, null).marginRight != '0px');
        }
    },

    /**
     * @property TransparentColor True if the device supports transparent color
     * @type {Boolean}
     */
    {
        identity: 'TransparentColor',
        fn: function(doc, div, view) {
            view = doc.defaultView;
            return ! (view && view.getComputedStyle(div.lastChild, null).backgroundColor != 'transparent');
        }
    },

    /**
     * @property SVG True if the device supports SVG
     * @type {Boolean}
     */
    {
        identity: 'SVG',
        fn: function(doc) {
            return !!doc.createElementNS && !!doc.createElementNS("http:/" + "/www.w3.org/2000/svg", "svg").createSVGRect;
        }
    },

    /**
     * @property Canvas True if the device supports Canvas
     * @type {Boolean}
     */
    {
        identity: 'Canvas',
        fn: function(doc) {
            return !!doc.createElement('canvas').getContext;
        }
    },

    /**
     * @property VML True if the device supports VML
     * @type {Boolean}
     */
    {
        identity: 'VML',
        fn: function(doc) {
            var d = doc.createElement("div");
            d.innerHTML = "<!--[if vml]><br><br><![endif]-->";
            return (d.childNodes.length == 2);
        }
    },

    /**
     * @property Float True if the device supports CSS float
     * @type {Boolean}
     */
    {
        identity: 'Float',
        fn: function(doc, div) {
            return !!div.lastChild.style.cssFloat;
        }
    },

    /**
     * @property AudioTag True if the device supports the HTML5 audio tag
     * @type {Boolean}
     */
    {
        identity: 'AudioTag',
        fn: function(doc) {
            return !!doc.createElement('audio').canPlayType;
        }
    },

    /**
     * @property History True if the device supports HTML5 history
     * @type {Boolean}
     */
    {
        identity: 'History',
        fn: function() {
            return !! (window.history && history.pushState);
        }
    },

    /**
     * @property CSS3DTransform True if the device supports CSS3DTransform
     * @type {Boolean}
     */
    {
        identity: 'CSS3DTransform',
        fn: function() {
            return (typeof WebKitCSSMatrix != 'undefined' && new WebKitCSSMatrix().hasOwnProperty('m41'));
        }
    },

    /**
     * @property CSS3LinearGradient True if the device supports CSS3 linear gradients
     * @type {Boolean}
     */
    {
        identity: 'CSS3LinearGradient',
        fn: function(doc, div) {
            var property = 'background-image:',
                webkit = '-webkit-gradient(linear, left top, right bottom, from(black), to(white))',
                w3c = 'linear-gradient(left top, black, white)',
                moz = '-moz-' + w3c,
                options = [property + webkit, property + w3c, property + moz];

            div.style.cssText = options.join(';');

            return ("" + div.style.backgroundImage).indexOf('gradient') !== -1;
        }
    },

    /**
     * @property CSS3BorderRadius True if the device supports CSS3 border radius
     * @type {Boolean}
     */
    {
        identity: 'CSS3BorderRadius',
        fn: function(doc, div) {
            var domPrefixes = ['borderRadius', 'BorderRadius', 'MozBorderRadius', 'WebkitBorderRadius', 'OBorderRadius', 'KhtmlBorderRadius'],
                pass = false,
                i;

            for (i = 0; i < domPrefixes.length; i++) {
                if (document.body.style[domPrefixes[i]] !== undefined) {
                    return pass = true;
                }
            }

            return pass;
        }
    },

    /**
     * @property GeoLocation True if the device supports GeoLocation
     * @type {Boolean}
     */
    {
        identity: 'GeoLocation',
        fn: function() {
            return (typeof navigator != 'undefined' && typeof navigator.geolocation != 'undefined') || (typeof google != 'undefined' && typeof google.gears != 'undefined');
        }
    }]
};
