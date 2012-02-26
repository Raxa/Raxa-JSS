/**
 * @class Ext.util.Date
 * @singleton
 */

Ext.util.Date = {
    /**
     * Returns the number of milliseconds between two dates
     * @param {Date} dateA
     * @param {Date} dateB (optional) Defaults to now
     * @return {Number} The diff in milliseconds
     */
    getElapsed: function(dateA, dateB) {
        return Math.abs(dateA - (dateB || new Date));
    }
};