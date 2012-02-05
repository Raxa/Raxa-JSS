/**
 * This is a simple container that is used to combile content and a {@link Ext.scroll.View} instance. It also
 * provides scroll indicators.
 *
 * 99% of the time all you need to use in this class is {@link #getScroller}. It is also sometimes useful to
 * flash the scroll indicators using the {@link #flashIndicator} and {@link #flashIndicators} methods.
 *
 * This should never should be extended.
 */
Ext.define('Ext.scroll.View', {
    extend: 'Ext.Evented',

    alternateClassName: 'Ext.util.ScrollView',

    requires: [
        'Ext.scroll.Scroller',
        'Ext.scroll.Indicator'
    ],

    config: {
        /**
         * @cfg {Number} flashIndicatorTimeout
         * The amount of time to flash the indicators when {@link #flashIndicator} or {@link #flashIndicators}
         * is called.
         */
        flashIndicatorTimeout: 1000,

        element: null,
        scroller: {},
        indicators: {
            x: {
                axis: 'x'
            },
            y: {
                axis: 'y'
            }
        },
        cls: Ext.baseCSSPrefix + 'scroll-view'
    },

    /**
     * @method getScroller
     * Returns the scroller instance in this view. Checkout the documentation of {@link Ext.scroll.Scroller} and
     * {@link Ext.Container#getScrollable} for more information.
     * @return {Ext.scroll.View} The scroller
     */

    /**
     * @private
     */
    processConfig: function(config) {
        if (!config) {
            return null;
        }

        if (typeof config == 'string') {
            config = {
                direction: config
            };
        }

        config = Ext.merge({}, config);

        var scrollerConfig = config.scroller,
            name;

        if (!scrollerConfig) {
            config.scroller = scrollerConfig = {};
        }

        for (name in config) {
            if (config.hasOwnProperty(name)) {
                if (!this.hasConfig(name)) {
                    scrollerConfig[name] = config[name];
                    delete config[name];
                }
            }
        }

        return config;
    },

    constructor: function(config) {
        config = this.processConfig(config);

        this.indicatorLength = { x: 0, y: 0 };

        this.indicatorMaxLength = { x: 0, y: 0 };

        this.indicatorMaxOffset = { x: 0, y: 0 };

        this.useIndicators = { x: true, y: true };

        this.initConfig(config);
    },

    setConfig: function(config) {
        return this.callParent([this.processConfig(config)]);
    },

    applyScroller: function(config, currentScroller) {
        return Ext.factory(config, Ext.scroll.Scroller, currentScroller);
    },

    applyIndicators: function(config, indicators) {
        var defaultClass = Ext.scroll.Indicator,
            useIndicators = this.useIndicators;

        if (!config) {
            config = {};
        }

        if (!config.x) {
            useIndicators.x = false;
            config.x = {};
        }

        if (!config.y) {
            useIndicators.y = false;
            config.y = {};
        }

        return {
            x: Ext.factory(config.x, defaultClass, indicators && indicators.x),
            y: Ext.factory(config.y, defaultClass, indicators && indicators.y)
        };
    },

    updateIndicators: function(indicators) {
        this.indicatorsGrid = Ext.Element.create({
            className: 'x-scroll-bar-grid-wrapper',
            children: [{
                className: 'x-scroll-bar-grid',
                children: [
                    {
                        children: [{}, {
                            children: [indicators.y.barElement]
                        }]
                    },
                    {
                        children: [{
                            children: [indicators.x.barElement]
                        }, {}]
                    }
                ]
            }]
        });
    },

    updateScroller: function(scroller) {
        scroller.on({
            scope: this,
            scrollstart: 'onScrollStart',
            scroll     : 'onScroll',
            scrollend  : 'onScrollEnd',
            refresh    : 'refreshIndicators'
        });
    },

    isAxisEnabled: function(axis) {
        return this.getScroller().isAxisEnabled(axis) && this.useIndicators[axis];
    },

    applyElement: function(element) {
        if (element) {
            return Ext.get(element);
        }
    },

    updateElement: function(element) {
        var scrollerElement = element.getFirstChild().getFirstChild(),
            scroller = this.getScroller();

        element.addCls(this.getCls());
        element.insertFirst(this.indicatorsGrid);

        scroller.setElement(scrollerElement);

        this.refreshIndicators();

        return this;
    },

    getSize: function() {
        var dom = this.getElement().dom;

        return {
            x: dom.offsetWidth,
            y: dom.offsetHeight
        };
    },

    showIndicator: function(axis) {
        if (this.isAxisEnabled(axis)) {
            this.getIndicators()[axis].show();
        }
    },

    hideIndicator: function(axis) {
        if (this.isAxisEnabled(axis)) {
            this.getIndicators()[axis].hide();
        }
    },

    onScrollStart: function() {
        this.showIndicator('x');
        this.showIndicator('y');
    },

    onScroll: function(scroller, x, y) {
        this.setIndicatorValue('x', x);
        this.setIndicatorValue('y', y);
    },

    setIndicatorValue: function(axis, scrollerPosition) {
        if (!this.isAxisEnabled(axis)) {
            return this;
        }

        var scroller = this.getScroller(),
            scrollerMaxPosition = scroller.getMaxPosition()[axis],
            scrollerContainerSize, value;

        if (scrollerMaxPosition === 0) {
            scrollerContainerSize = scroller.getContainerSize()[axis];

            if (scrollerPosition < 0) {
                value = scrollerPosition / scrollerContainerSize;
            }
            else {
                value = 1 + (scrollerPosition / scrollerContainerSize);
            }
        }
        else {
            value = scrollerPosition / scrollerMaxPosition;
        }

        this.getIndicators()[axis].setValue(value);
    },

    onScrollEnd: function() {
        this.hideIndicator('x');
        this.hideIndicator('y');
    },

    refreshIndicator: function(axis) {
        if (!this.isAxisEnabled(axis)) {
            return this;
        }

        var scroller = this.getScroller(),
            indicator = this.getIndicators()[axis],
            scrollerContainerSize = scroller.getContainerSize()[axis],
            scrollerSize = scroller.getSize()[axis],
            ratio = scrollerContainerSize / scrollerSize;

        indicator.setRatio(ratio);
        indicator.refresh();
    },

    refresh: function() {
        return this.getScroller().refresh();
    },

    refreshIndicators: function() {
        this.refreshIndicator('x');
        this.refreshIndicator('y');
    },

    /**
     * Flashes each of the scroll indicators, if they are currently enabled, AND there is scrollable content
     * on that axis.
     * Uses the {@link #flashIndicatorTimeout} configuration.
     */
    flashIndicators: function() {
        this.flashIndicator('x');
        this.flashIndicator('y');
    },

    /**
     * Flashes a specific indicator, on the passed axis, if that axis is enabled and there is
     * scrollable content.
     * Uses the {@link #flashIndicatorTimeout} configuration.
     * @param {String} axis The axis to flash. `x` or `y`
     */
    flashIndicator: function(axis) {
        var me = this,
            indicator = this.getIndicators()[axis];

        if (!me.isAxisEnabled(axis)) {
            return me;
        }

        if (indicator.getRatio() == 1) {
            return me;
        }

        me.showIndicator(axis);

        setTimeout(function() {
            me.hideIndicator(axis);
        }, me.getFlashIndicatorTimeout());
    },

    destroy: function() {
        var element = this.getElement(),
            indicators = this.getIndicators();

        if (element && !element.isDestroyed) {
            element.removeCls(this.getCls());
        }

        indicators.x.destroy();
        indicators.y.destroy();

        Ext.destroy(this.getScroller(), this.indicatorsGrid);
        delete this.indicatorsGrid;

        this.callParent(arguments);
    }
});
