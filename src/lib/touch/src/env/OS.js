/**
 * Provide useful information about the current operating system environment. Access the global instance stored in Ext.os. Example:
 * <pre><code>
 * if (Ext.os.is.Windows) {
 *      // Windows specific code here
 * }
 *
 * if (Ext.os.is.iOS) {
 *      // iPad, iPod, iPhone, etc.
 * }
 *
 * console.log("Version " + Ext.os.version);
 * </code></pre>
 *
 * For a full list of supported values, refer to: {@link Ext.env.OS#is}
 */
Ext.define('Ext.env.OS', {

    requires: ['Ext.Version'],

    statics: {
        names: {
            ios: 'iOS',
            android: 'Android',
            webos: 'webOS',
            blackberry: 'BlackBerry',
            rimTablet: 'RIMTablet',
            mac: 'MacOS',
            win: 'Windows',
            linux: 'Linux',
            bada: 'Bada',
            other: 'Other'
        },
        prefixes: {
            ios: 'i(?:Pad|Phone|Pod)(?:.*)CPU(?: iPhone)? OS ',
            android: 'Android ',
            blackberry: 'BlackBerry(?:.*)Version\/',
            rimTablet: 'RIM Tablet OS ',
            webos: '(?:webOS|hpwOS)\/',
            bada: 'Bada\/'
        }
    },

    /**
     * A "hybrid" property, can be either accessed as a method call, i.e:
     * <pre><code>
     * if (Ext.os.is('Android')) { ... }
     * </code></pre>
     *
     * or as an object with boolean properties, i.e:
     * <pre><code>
     * if (Ext.os.is.Android) { ... }
     * </code></pre>
     *
     * Versions can be conveniently checked as well. For example:
     * <pre><code>
     * if (Ext.os.is.Android2) { ... } // Equivalent to (Ext.os.is.Android && Ext.os.version.equals(2))
     *
     * if (Ext.os.is.iOS32) { ... } // Equivalent to (Ext.os.is.iOS && Ext.os.version.equals(3.2))
     * </code></pre>
     *
     * Note that only {@link Ext.Version#getMajor major component}  and {@link Ext.Version#getShortVersion simplified}
     * value of the version are available via direct property checking.
     *
     * Supported values are: iOS, iPad, iPhone, iPod, Android, WebOS, BlackBerry, Bada, MacOSX, Windows, Linux and Other
     *
     * @param {String} value The OS name to check
     * @return {Boolean}
     */
    is: Ext.emptyFn,

    /**
     * Read-only - the full name of the current operating system
     * Possible values are: iOS, Android, WebOS, BlackBerry, MacOSX, Windows, Linux and Other
     * @type String
     */
    name: null,

    /**
     * Read-only, refer to {@link Ext.Version}
     * @type Ext.Version
     */
    version: null,

    setFlag: function(name, value) {
        if (typeof value == 'undefined') {
            value = true;
        }

        this.is[name] = value;
        this.is[name.toLowerCase()] = value;

        return this;
    },

    constructor: function(userAgent, platform) {
        var statics = this.statics(),
            names = statics.names,
            prefixes = statics.prefixes,
            name,
            version = '',
            i, prefix, match, item, is;

        is = this.is = function(name) {
            return this.is[name] === true;
        };

        for (i in prefixes) {
            if (prefixes.hasOwnProperty(i)) {
                prefix = prefixes[i];

                match = userAgent.match(new RegExp('(?:'+prefix+')([^\\s;]+)'));

                if (match) {
                    name = names[i];
                    version = new Ext.Version(match[match.length - 1]);
                    break;
                }
            }
        }

        if (!name) {
            name = names[(userAgent.toLowerCase().match(/mac|win|linux/) || ['other'])[0]];
            version = new Ext.Version('');
        }

        Ext.apply(this, {
            name: name,
            version: version
        });

        if (platform) {
            this.setFlag(platform);
        }

        this.setFlag(name);

        if (version) {
            this.setFlag(name + (version.getMajor() || ''));
            this.setFlag(name + version.getShortVersion());
        }

        for (i in names) {
            if (names.hasOwnProperty(i)) {
                item = names[i];

                if (!is.hasOwnProperty(name)) {
                    this.setFlag(item, (name === item));
                }
            }
        }

        return this;
    }

}, function() {
    /**
     * @class Ext.is
     * @deprecated
     * Used to detect if the current browser supports a certain feature, and the type of the current browser.
     *
     * Please refer to the {@link Ext.env.Browser}, {@link Ext.env.OS} and {@link Ext.feature.has} classes instead.
     */
    var navigator = Ext.global.navigator,
        osEnv, osName, osVersion, deviceType;

    //<deprecated product=touch since=2.0>
    this.override('constructor', function() {
        this.callOverridden(arguments);

        var is = this.is;

        if (is.MacOS) {
            Ext.deprecatePropertyValue(is, 'Mac', true, "Ext.is.Mac is deprecated, please use Ext.os.is.MacOS instead");
            Ext.deprecatePropertyValue(is, 'mac', true, "Ext.is.Mac is deprecated, please use Ext.os.is.MacOS instead");
        }

        if (is.BlackBerry) {
            Ext.deprecatePropertyValue(is, 'Blackberry', true, "Ext.is.Blackberry is deprecated, please use Ext.os.is.BlackBerry instead");
        }

        return this;
    });
    //</deprecated>

    Ext.os = osEnv = new this(navigator.userAgent, navigator.platform);

    osName = osEnv.name;
    osVersion = osEnv.version;

    //<deprecated product=touch since=2.0>
    var flags = Ext.os.is,
        search = window.location.search.match(/deviceType=(Tablet|Phone)/),
        name;

    if (!Ext.is) {
        Ext.is = {};
    }

    for (name in flags) {
        if (flags.hasOwnProperty(name)) {
            Ext.deprecatePropertyValue(Ext.is, name, flags[name], "Ext.is." + name + " is deprecated, please use Ext.os.is." + name + " instead");
        }
    }
    //</deprecated>

    // Override deviceType by adding a get variable of deviceType. NEEDED FOR DOCS APP.
    // E.g: example/kitchen-sink.html?deviceType=Phone
    if (search && search[1]) {
        deviceType = search[1];
    } else {
        //TODO Clean me up, this is not nice
        if (/Windows|Linux|MacOS/.test(osName)) {
            deviceType = 'Desktop';
        }
        else if (osEnv.is.iPad || osEnv.is.Android3) {
            deviceType = 'Tablet';
        }
        else {
            deviceType = 'Phone';
        }
    }

    osEnv.setFlag(deviceType, true);
    osEnv.deviceType = deviceType;

});
