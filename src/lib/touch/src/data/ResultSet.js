/**
 * @author Ed Spencer
 *
 * Simple wrapper class that represents a set of records returned by a Proxy.
 */
Ext.define('Ext.data.ResultSet', {
    config: {
        /**
         * @cfg {Boolean} loaded
         * True if the records have already been loaded. This is only meaningful when dealing with
         * SQL-backed proxies.
         */
        loaded: true,

        /**
         * @cfg {Number} count
         * The number of records in this ResultSet. Note that total may differ from this number.
         */
        count: null,

        /**
         * @cfg {Number} total
         * The total number of records reported by the data source. This ResultSet may form a subset of
         * those records (see {@link #count}).
         */
        total: 0,

        /**
         * @cfg {Boolean} success
         * True if the ResultSet loaded successfully, false if any errors were encountered.
         */
        success: false,

        /**
         * @cfg {Ext.data.Model[]} records (required)
         * The array of record instances.
         */
        records: null
    },

    /**
     * Creates the resultSet
     * @param {Object} [config] Config object.
     */
    constructor: function(config) {
        this.initConfig(config);

        // @TODO: put back this totalRecords bullshit?
        // /**
        //  * @property {Number} totalRecords
        //  * Copy of this.total.
        //  * @deprecated 2.0.0 Use {@link #total} instead.
        //  */
        //this.totalRecords = this.getTotal();
    },

    applyCount: function(count) {
        if (!count && count !== 0) {
            return this.getRecords().length;
        }
        return count;
    }
});