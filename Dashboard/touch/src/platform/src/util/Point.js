/**
 * @class Ext.util.Point
 * @extends Object
 *
 * Represents a 2D point with x and y properties, useful for comparison and instantiation
 * from an event:
 * <pre><code>
 * var point = Ext.util.Point.fromEvent(e);
 * </code></pre>
 */

Ext.util.Point = Ext.extend(Object, {
    constructor: function(x, y) {
        this.x = (x != null && !isNaN(x)) ? x : 0;
        this.y = (y != null && !isNaN(y)) ? y : 0;

        return this;
    },

    /**
     * Copy a new instance of this point
     * @return {Ext.util.Point} the new point
     */
    copy: function() {
        return new Ext.util.Point(this.x, this.y);
    },

    /**
     * Copy the x and y values of another point / object to this point itself
     * @param {}
     * @return {Ext.util.Point} this This point
     */
    copyFrom: function(p) {
        this.x = p.x;
        this.y = p.y;

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
    equals: function(p) {
        return (this.x == p.x && this.y == p.y);
    },

    /**
     * Whether the given point is not away from this point within the given threshold amount
     * @param {Ext.util.Point/Object} The point to check with, either an instance
     * of Ext.util.Point or an object with x and y properties
     * @param {Object/Number} threshold Can be either an object with x and y properties or a number
     * @return {Boolean}
     */
    isWithin: function(p, threshold) {
        if (!Ext.isObject(threshold)) {
            threshold = {x: threshold};
            threshold.y = threshold.x;
        }

        return (this.x <= p.x + threshold.x && this.x >= p.x - threshold.x &&
                this.y <= p.y + threshold.y && this.y >= p.y - threshold.y);
    },

    /**
     * Translate this point by the given amounts
     * @param {Number} x Amount to translate in the x-axis
     * @param {Number} y Amount to translate in the y-axis
     * @return {Boolean}
     */
    translate: function(x, y) {
        if (x != null && !isNaN(x))
            this.x += x;

        if (y != null && !isNaN(y))
            this.y += y;
    },

    /**
     * Compare this point with another point when the x and y values of both points are rounded. E.g:
     * [100.3,199.8] will equals to [100, 200]
     * @param {Ext.util.Point/Object} The point to compare with, either an instance
     * of Ext.util.Point or an object with x and y properties
     * @return {Boolean}
     */
    roundedEquals: function(p) {
        return (Math.round(this.x) == Math.round(p.x) && Math.round(this.y) == Math.round(p.y));
    }
});

/**
 * Returns a new instance of Ext.util.Point base on the pageX / pageY values of the given event
 * @static
 * @param {Event} e The event
 * @returns Ext.util.Point
 */
Ext.util.Point.fromEvent = function(e) {
    var a = (e.changedTouches && e.changedTouches.length > 0) ? e.changedTouches[0] : e;
    return new Ext.util.Point(a.pageX, a.pageY);
};