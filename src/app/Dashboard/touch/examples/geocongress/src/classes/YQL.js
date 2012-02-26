/**
 * @class Ext.YQL
 * @extends Object
 * @singleton
 */
Ext.YQL = {
    useAllPublicTables: true,
    yqlUrl: 'http://query.yahooapis.com/v1/public/yql',
   
   /**
    * Performs a request against YQL. Configurations are query, params, callback and scope.
    * @param {Object} configuration
    */
    request: function(cfg) {
        var p = cfg.params || {};
        p.q = cfg.query;

        p.format = 'json';
        if (this.useAllPublicTables) {
            p.env = 'store://datatables.org/alltableswithkeys';
        }
        
        Ext.util.JSONP.request({
            url: this.yqlUrl,
            callbackKey: 'callback',
            params: p,
            callback: cfg.callback,
            scope: cfg.scope || window
        });
    }
};