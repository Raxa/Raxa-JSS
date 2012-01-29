/**
 * @private
 */
Ext.define('Ext.data.identifier.Simple', {
    alias: 'data.identifier.simple',
    
    statics: {
        AUTO_ID: 1
    },

    config: {
        prefix: 'ext-record',
        model: null
    },

    constructor: function(config) {
        this.initConfig(config);
    },

    generate: function(record) {
        return this._prefix + '-' + this.self.AUTO_ID++;
    }
});