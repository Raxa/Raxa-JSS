/**
 * @class Ext.util.TapRepeater
 * @extends Ext.util.Observable
 *
 * A wrapper class which can be applied to any element. Fires a "tap" event while
 * touching the device. The interval between firings may be specified in the config but
 * defaults to 20 milliseconds.
 *
 * @constructor
 * @param {Mixed} el The element to listen on
 * @param {Object} config
 */
Ext.util.TapRepeater = Ext.extend(Ext.util.Observable, {

    constructor: function(el, config) {
        this.el = Ext.get(el);

        Ext.apply(this, config);

        this.addEvents(
        /**
         * @event touchstart
         * Fires when the touch is started.
         * @param {Ext.util.TapRepeater} this
         * @param {Ext.EventObject} e
         */
        "touchstart",
        /**
         * @event tap
         * Fires on a specified interval during the time the element is pressed.
         * @param {Ext.util.TapRepeater} this
         * @param {Ext.EventObject} e
         */
        "tap",
        /**
         * @event touchend
         * Fires when the touch is ended.
         * @param {Ext.util.TapRepeater} this
         * @param {Ext.EventObject} e
         */
        "touchend"
        );

        this.el.on({
            touchstart: this.onTouchStart,
            touchend: this.onTouchEnd,
            scope: this
        });

        if (this.preventDefault || this.stopDefault) {
            this.el.on('tap', this.eventOptions, this);
        }

        Ext.util.TapRepeater.superclass.constructor.call(this);
    },

    interval: 10,
    delay: 250,
    preventDefault: true,
    stopDefault: false,
    timer: 0,

    // @private
    eventOptions: function(e) {
        if (this.preventDefault) {
            e.preventDefault();
        }
        if (this.stopDefault) {
            e.stopEvent();
        }
    },

    // @private
    destroy: function() {
        Ext.destroy(this.el);
        this.clearListeners();
    },

    // @private
    onTouchStart: function(e) {
        clearTimeout(this.timer);
        if (this.pressClass) {
            this.el.addCls(this.pressClass);
        }
        this.tapStartTime = new Date();

        this.fireEvent("touchstart", this, e);
        this.fireEvent("tap", this, e);

        // Do not honor delay or interval if acceleration wanted.
        if (this.accelerate) {
            this.delay = 400;
        }
        this.timer = Ext.defer(this.tap, this.delay || this.interval, this, [e]);
    },

    // @private
    tap: function(e) {
        this.fireEvent("tap", this, e);
        this.timer = Ext.defer(this.tap, this.accelerate ? this.easeOutExpo(Ext.util.Date.getElapsed(this.tapStartTime),
            400,
            -390,
            12000) : this.interval, this, [e]);
    },

    // Easing calculation
    // @private
    easeOutExpo: function(t, b, c, d) {
        return (t == d) ? b + c : c * ( - Math.pow(2, -10 * t / d) + 1) + b;
    },

    // @private
    onTouchEnd: function(e) {
        clearTimeout(this.timer);
        this.el.removeCls(this.pressClass);
        this.fireEvent("touchend", this, e);
    }
});
