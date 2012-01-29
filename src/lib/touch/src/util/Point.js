/**
 * Represents a 2D point with x and y properties, useful for comparison and instantiation
 * from an event:
 * 
 *     var point = Ext.util.Point.fromEvent(e);
 *
 */
Ext.define('Ext.util.Point', {

    //<debug error>
    requires: ['Ext.Validator'],
    //</debug>

    radianToDegreeConstant: 180 / Math.PI,

    statics: {
        /**
         * Returns a new instance of Ext.util.Point based on the pageX / pageY values of the given event
         * @static
         * @param {Event} e The event
         * @return Ext.util.Point
         */
        fromEvent: function(e) {
            var changedTouches = e.changedTouches,
                touch = (changedTouches && changedTouches.length > 0) ? changedTouches[0] : e;

            return this.fromTouch(touch);
        },

        /**
         * Returns a new instance of Ext.util.Point based on the pageX / pageY values of the given touch
         * @static
         * @param {Event} touch
         * @return Ext.util.Point
         */
        fromTouch: function(touch) {
            return new this(touch.pageX, touch.pageY);
        },

        validate: function(point) {
            if (!point || !('x' in point) || !('y' in point)) {
                throw new Error("[" + Ext.getDisplayName(this.validate.caller) + "] Invalid point, must be either an instance of Ext.util.Point or an object with 'x' and 'y' properties");
            }

            //<debug error>
            Ext.Validator.number(point.x);
            Ext.Validator.number(point.y);
            //</debug>
        }
    },

    constructor: function(x, y) {
        if (typeof x == 'undefined') {
            x = 0;
        }

        if (typeof y == 'undefined') {
            y = 0;
        }

        //<debug error>
        Ext.Validator.number(x);
        Ext.Validator.number(y);
        //</debug>

        this.x = x;
        this.y = y;

        return this;
    },

    /**
     * Copy a new instance of this point
     * @return {Ext.util.Point} the new point
     */
    clone: function() {
        return new this.self(this.x, this.y);
    },

    /**
     * Clones this Point. Deprecated, please use {@link #clone} instead
     * @deprecated 2.0.0
     */
    copy: function() {
        return this.clone.apply(this, arguments);
    },

    /**
     * Copy the x and y values of another point / object to this point itself
     * @param {Ext.util.Point/Object} point
     * @return {Ext.util.Point} this This point
     */
    copyFrom: function(point) {
        //<debug error>
        this.statics().validate(point);
        //</debug>

        this.x = point.x;
        this.y = point.y;

        return this;
    },

    /**
     * Returns a human-eye-friendly string that represents this point,
     * useful for debugging
     * @return {String}
     */
    toString: function() {
        return "Point[" + this.x + "," + this.y + "]";
    },

    /**
     * Compare this point and another point
     * @param {Ext.util.Point/Object} The point to compare with, either an instance
     * of Ext.util.Point or an object with x and y properties
     * @return {Boolean} Returns whether they are equivalent
     */
    equals: function(point) {
        //<debug error>
        this.statics().validate(point);
        //</debug>

        return (this.x === point.x && this.y === point.y);
    },

    /**
     * Whether the given point is not away from this point within the given threshold amount
     * @param {Ext.util.Point/Object} The point to check with, either an instance
     * of Ext.util.Point or an object with x and y properties
     * @param {Object/Number} threshold Can be either an object with x and y properties or a number
     * @return {Boolean}
     */
    isCloseTo: function(point, threshold) {
        //<debug error>
        this.statics().validate(point);
        //</debug>

        if (typeof threshold == 'number') {
            threshold = {x: threshold};
            threshold.y = threshold.x;
        }

        var x = point.x,
            y = point.y,
            thresholdX = threshold.x,
            thresholdY = threshold.y;

        return (this.x <= x + thresholdX && this.x >= x - thresholdX &&
                this.y <= y + thresholdY && this.y >= y - thresholdY);
    },

    /**
     * Returns true if this point is close to another one. Deprecated, please use {@link #isCloseTo} instead
     * @deprecated 2.0.0
     */
    isWithin: function() {
        return this.isCloseTo.apply(this, arguments);
    },

    /**
     * Translate this point by the given amounts
     * @param {Number} x Amount to translate in the x-axis
     * @param {Number} y Amount to translate in the y-axis
     * @return {Boolean}
     */
    translate: function(x, y) {
        //<debug error>
        Ext.Validator.number(x);
        Ext.Validator.number(y);
        //</debug>

        this.x += x;
        this.y += y;

        return this;
    },

    /**
     * Compare this point with another point when the x and y values of both points are rounded. E.g:
     * [100.3,199.8] will equals to [100, 200]
     * @param {Ext.util.Point/Object} The point to compare with, either an instance
     * of Ext.util.Point or an object with x and y properties
     * @return {Boolean}
     */
    roundedEquals: function(point) {
        //<debug error>
        this.statics().validate(point);
        //</debug>

        return (Math.round(this.x) === Math.round(point.x) &&
                Math.round(this.y) === Math.round(point.y));
    },

    getDistanceTo: function(point) {
        //<debug error>
        this.statics().validate(point);
        //</debug>

        var deltaX = this.x - point.x,
            deltaY = this.y - point.y;

        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    },

    getAngleTo: function(point) {
        //<debug error>
        this.statics().validate(point);
        //</debug>

        var deltaX = this.x - point.x,
            deltaY = this.y - point.y;

        return Math.atan2(deltaY, deltaX) * this.radianToDegreeConstant;
    }
});
