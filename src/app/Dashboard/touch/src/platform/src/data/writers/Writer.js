/**
 * @author Ed Spencer
 * @class Ext.data.Writer
 * @extends Object
 * 
 * <p>Base Writer class used by most subclasses of {@link Ext.data.ServerProxy}. This class is
 * responsible for taking a set of {@link Ext.data.Operation} objects and a {@link Ext.data.Request}
 * object and modifying that request based on the Operations.</p>
 * 
 * <p>For example a {@link Ext.data.JsonWriter} would format the Operations and their {@link Ext.data.Model} 
 * instances based on the config options passed to the {@link Ext.data.JsonWriter JsonWriter's} constructor.</p>
 * 
 * <p>Writers are not needed for any kind of local storage - whether via a
 * {@link Ext.data.WebStorageProxy Web Storage proxy} (see {@link Ext.data.LocalStorageProxy localStorage}
 * and {@link Ext.data.SessionStorageProxy sessionStorage}) or just in memory via a
 * {@link Ext.data.MemoryProxy MemoryProxy}.</p>
 * 
 * @constructor
 * @param {Object} config Optional config object
 */
Ext.data.Writer = Ext.extend(Object, {

    constructor: function(config) {
        Ext.apply(this, config);
    },

    /**
     * Prepares a Proxy's Ext.data.Request object
     * @param {Ext.data.Request} request The request object
     * @return {Ext.data.Request} The modified request object
     */
    write: function(request) {
        var operation = request.operation,
            records   = operation.records || [],
            ln        = records.length,
            i         = 0,
            data      = [];

        for (; i < ln; i++) {
            data.push(this.getRecordData(records[i]));
        }
        return this.writeRecords(request, data);
    },

    /**
     * Formats the data for each record before sending it to the server. This
     * method should be overridden to format the data in a way that differs from the default.
     * @param {Object} record The record that we are writing to the server.
     * @return {Object} An object literal of name/value keys to be written to the server.
     * By default this method returns the data property on the record.
     */
    getRecordData: function(record) {
        return record.data;
    }
});

Ext.data.WriterMgr.registerType('base', Ext.data.Writer);