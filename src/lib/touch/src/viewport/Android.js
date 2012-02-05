/*
 * @private
 */
Ext.define('Ext.viewport.Android', {
    extend: 'Ext.viewport.Default',

    constructor: function() {
        this.on('orientationchange', 'doFireOrientationChangeEvent', this, { prepend: true });

        return this.callParent(arguments);
    },

    doFireOrientationChangeEvent: function() {
        var eventController = arguments[arguments.length - 1];

        this.orientationChanging = true;

        eventController.pause();

        this.waitUntil(function() {
            return this.getWindowOuterHeight() !== this.windowOuterHeight;
        }, function() {
            this.windowOuterHeight = this.getWindowOuterHeight();
            this.updateSize();

            eventController.firingArguments[1] = this.windowWidth;
            eventController.firingArguments[2] = this.windowHeight;
            eventController.resume();
            this.orientationChanging = false;

        }, function() {
            //<debug error>
            Ext.Logger.error("Timeout waiting for viewport's outerHeight to change before firing orientationchange", this);
            //</debug>
        });

        return this;
    },

    maximize: function() {
        var stretchHeights = this.stretchHeights,
            orientation = this.orientation,
            height;

        height = stretchHeights[orientation];

        if (!height) {
            stretchHeights[orientation] = height = Math.round(this.getWindowOuterHeight() / window.devicePixelRatio);
        }

        if (!this.addressBarHeight) {
            this.addressBarHeight = height - this.getWindowHeight();
        }

        this.setHeight(height);

        var isHeightMaximized = Ext.Function.bind(this.isHeightMaximized, this, [height]);

        this.scrollToTop();
        this.waitUntil(isHeightMaximized, this.fireMaximizeEvent, this.fireMaximizeEvent);
    },

    isHeightMaximized: function(height) {
        this.scrollToTop();
        return this.getWindowHeight() === height;
    }

}, function() {
    if (!Ext.os.is.Android) {
        return;
    }

    var version = Ext.os.version,
        userAgent = Ext.browser.userAgent,
        // These Android devices have a nasty bug which causes JavaScript timers to be completely frozen
        // when the browser's viewport is being panned.
        isBuggy = /(htc|desire|incredible|ADR6300)/i.test(userAgent) && version.lt('2.3');

    if (isBuggy) {
        this.override({
            constructor: function(config) {
                if (!config) {
                    config = {};
                }

                config.autoMaximize = false;

                this.watchDogTick = Ext.Function.bind(this.watchDogTick, this);

                setInterval(this.watchDogTick, 1000);

                return this.callParent([config]);
            },

            watchDogTick: function() {
                this.watchDogLastTick = Ext.Date.now();
            },

            doPreventPanning: function() {
                var now = Ext.Date.now(),
                    lastTick = this.watchDogLastTick,
                    deltaTime = now - lastTick;

                // Timers are frozen
                if (deltaTime >= 2000) {
                    return;
                }

                return this.callParent(arguments);
            },

            doPreventZooming: function() {
                var now = Ext.Date.now(),
                    lastTick = this.watchDogLastTick,
                    deltaTime = now - lastTick;

                // Timers are frozen
                if (deltaTime >= 2000) {
                    return;
                }

                return this.callParent(arguments);
            }
        });
    }

    if (version.match('2')) {
        this.override({
            onReady: function() {
                this.addWindowListener('resize', Ext.Function.bind(this.onWindowResize, this));

                this.callParent(arguments);
            },

            scrollToTop: function() {
                document.body.scrollTop = 100;
            },

            onWindowResize: function() {
                var oldWidth = this.windowWidth,
                    oldHeight = this.windowHeight,
                    width = this.getWindowWidth(),
                    height = this.getWindowHeight();

                if (this.getAutoMaximize() && !this.isMaximizing && !this.orientationChanging
                    && window.scrollY === 0
                    && oldWidth === width
                    && height < oldHeight
                    && ((height >= oldHeight - this.addressBarHeight) || !this.focusedElement)) {
                        this.scrollToTop();
                }
            }
        });
    }
    else if (version.gtEq('3.1')) {
        this.override({
            isHeightMaximized: function(height) {
                this.scrollToTop();
                return this.getWindowHeight() === height - 1;
            }
        });
    }
    else if (version.match('3')) {
        this.override({
            isHeightMaximized: function() {
                this.scrollToTop();
                return true;
            }
        })
    }
});
