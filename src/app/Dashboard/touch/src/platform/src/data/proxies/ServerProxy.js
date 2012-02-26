/**
 * @author Ed Spencer
 * @class Ext.data.ServerProxy
 * @extends Ext.data.Proxy
 * 
 * <p>ServerProxy is a superclass of {@link Ext.data.ScriptTagProxy ScriptTagProxy} and {@link Ext.data.AjaxProxy AjaxProxy},
 * and would not usually be used directly.</p>
 * 
 * <p>ServerProxy should ideally be named HttpProxy as it is a superclass for all HTTP proxies - for Ext JS 4.x it has been 
 * called ServerProxy to enable any 3.x applications that reference the HttpProxy to continue to work (HttpProxy is now an 
 * alias of AjaxProxy).</p>
 */
Ext.data.ServerProxy = Ext.extend(Ext.data.Proxy, {
    /**
     * @cfg {String} url The URL from which to request the data object.
     */
    
    /**
     * @cfg {Object/String/Ext.data.Reader} reader The Ext.data.Reader to use to decode the server's response. This can
     * either be a Reader instance, a config object or just a valid Reader type name (e.g. 'json', 'xml').
     */
    
    /**
     * @cfg {Object/String/Ext.data.Writer} writer The Ext.data.Writer to use to encode any request sent to the server.
     * This can either be a Writer instance, a config object or just a valid Writer type name (e.g. 'json', 'xml').
     */
    
    /**
     * @cfg {String} pageParam The name of the 'page' parameter to send in a request. Defaults to 'page'. Set this to
     * undefined if you don't want to send a page parameter
     */
    pageParam: 'page',
    
    /**
     * @cfg {String} startParam The name of the 'start' parameter to send in a request. Defaults to 'start'. Set this
     * to undefined if you don't want to send a start parameter
     */
    startParam: 'start',

    /**
     * @cfg {String} limitParam The name of the 'limit' parameter to send in a request. Defaults to 'limit'. Set this
     * to undefined if you don't want to send a limit parameter
     */
    limitParam: 'limit',
    
    /**
     * @cfg {String} groupParam The name of the 'group' parameter to send in a request. Defaults to 'group'. Set this
     * to undefined if you don't want to send a group parameter
     */
    groupParam: 'group',
    
    /**
     * @cfg {String} sortParam The name of the 'sort' parameter to send in a request. Defaults to 'sort'. Set this
     * to undefined if you don't want to send a sort parameter
     */
    sortParam: 'sort',
    
    /**
     * @cfg {String} filterParam The name of the 'filter' parameter to send in a request. Defaults to 'filter'. Set 
     * this to undefined if you don't want to send a filter parameter
     */
    filterParam: 'filter',
    
    /**
     * @cfg {Boolean} noCache (optional) Defaults to true. Disable caching by adding a unique parameter
     * name to the request.
     */
    noCache : true,
    
    /**
     * @cfg {String} cacheString The name of the cache param added to the url when using noCache (defaults to "_dc")
     */
    cacheString: "_dc",
    
    /**
     * @cfg {Number} timeout (optional) The number of milliseconds to wait for a response. Defaults to 30 seconds.
     */
    timeout : 30000,
    
    /**
     * @ignore
     */
    constructor: function(config) {
        config = config || {};
        
        Ext.data.ServerProxy.superclass.constructor.call(this, config);
        
        /**
         * @cfg {Object} extraParams Extra parameters that will be included on every request. Individual requests with params
         * of the same name will override these params when they are in conflict.
         */
        this.extraParams = config.extraParams || {};
        
        //backwards compatibility, will be deprecated in 5.0
        this.nocache = this.noCache;
    },
    
    //in a ServerProxy all four CRUD operations are executed in the same manner, so we delegate to doRequest in each case
    create: function() {
        return this.doRequest.apply(this, arguments);
    },
    
    read: function() {
        return this.doRequest.apply(this, arguments);
    },
    
    update: function() {
        return this.doRequest.apply(this, arguments);
    },
    
    destroy: function() {
        return this.doRequest.apply(this, arguments);
    },
    
    /**
     * Creates and returns an Ext.data.Request object based on the options passed by the {@link Ext.data.Store Store}
     * that this Proxy is attached to.
     * @param {Ext.data.Operation} operation The {@link Ext.data.Operation Operation} object to execute
     * @return {Ext.data.Request} The request object
     */
    buildRequest: function(operation) {
        var params = Ext.applyIf(operation.params || {}, this.extraParams || {});
        
        //copy any sorters, filters etc into the params so they can be sent over the wire
        params = Ext.applyIf(params, this.getParams(params, operation));
        
        var request = new Ext.data.Request({
            params   : params,
            action   : operation.action,
            records  : operation.records,
            operation: operation
        });
        
        request.url = this.buildUrl(request);
        
        /*
         * Save the request on the Operation. Operations don't usually care about Request and Response data, but in the
         * ServerProxy and any of its subclasses we add both request and response as they may be useful for further processing
         */
        operation.request = request;
        
        return request;
    },
    
    /**
     * Encodes the array of {@link Ext.util.Sorter} objects into a string to be sent in the request url. By default, 
     * this simply JSON-encodes the sorter data
     * @param {Array} sorters The array of {@link Ext.util.Sorter Sorter} objects
     * @return {String} The encoded sorters
     */
    encodeSorters: function(sorters) {
        var min = [],
            length = sorters.length,
            i;
        
        for (i = 0; i < length; i++) {
            min[i] = {
                property : sorters[i].property,
                direction: sorters[i].direction
            };
        }
        
        return Ext.encode(min);
    },
    
    /**
     * Encodes the array of {@link Ext.util.Filter} objects into a string to be sent in the request url. By default, 
     * this simply JSON-encodes the filter data
     * @param {Array} sorters The array of {@link Ext.util.Filter Filter} objects
     * @return {String} The encoded filters
     */
    encodeFilters: function(filters) {
        var min = [],
            length = filters.length,
            i;
        
        for (i = 0; i < length; i++) {
            min[i] = {
                property: filters[i].property,
                value   : filters[i].value
            };
        }
        
        return Ext.encode(min);
    },
    
    /**
     * Encodes the grouping object (field and direction) into a string to be sent in the request url. Be default, this
     * simply JSON-encodes the grouping data
     * @param {Object} group The group configuration (field and direction)
     * @return {String} The encoded group string
     */
    encodeGroupers: function(group) {
        return Ext.encode(group);
    },
    
    /**
     * @private
     * Copy any sorters, filters etc into the params so they can be sent over the wire
     */
    getParams: function(params, operation) {
        params = params || {};
        
        var group       = operation.group,
            sorters     = operation.sorters,
            filters     = operation.filters,
            page        = operation.page,
            start       = operation.start,
            limit       = operation.limit,
            
            pageParam   = this.pageParam,
            startParam  = this.startParam,
            limitParam  = this.limitParam,
            groupParam  = this.groupParam,
            sortParam   = this.sortParam,
            filterParam = this.filterParam;
        
        if (pageParam && page) {
            params[pageParam] = page;
        }
        
        if (startParam && start) {
            params[startParam] = start;
        }
        
        if (limitParam && limit) {
            params[limitParam] = limit;
        }
        
        if (groupParam && group && group.field) {
            params[groupParam] = this.encodeGroupers(group);
        }
        
        if (sortParam && sorters && sorters.length > 0) {
            params[sortParam] = this.encodeSorters(sorters);
        }
        
        if (filterParam && filters && filters.length > 0) {
            params[filterParam] = this.encodeFilters(filters);
        }
        
        return params;
    },
    
    /**
     * Generates a url based on a given Ext.data.Request object. By default, ServerProxy's buildUrl will
     * add the cache-buster param to the end of the url. Subclasses may need to perform additional modifications
     * to the url.
     * @param {Ext.data.Request} request The request object
     * @return {String} The url
     */
    buildUrl: function(request) {
        var url = request.url || this.url;
        
        if (!url) {
            throw new Error("You are using a ServerProxy but have not supplied it with a url.");
        }
        
        if (this.noCache) {
            url = Ext.urlAppend(url, Ext.util.Format.format("{0}={1}", this.cacheString, (new Date().getTime())));
        }
        
        return url;
    },
    
    /**
     * In ServerProxy subclasses, the {@link #create}, {@link #read}, {@link #update} and {@link #destroy} methods all pass
     * through to doRequest. Each ServerProxy subclass must implement the doRequest method - see {@link Ext.data.ScriptTagProxy}
     * and {@link Ext.data.AjaxProxy} for examples. This method carries the same signature as each of the methods that delegate to it.
     * @param {Ext.data.Operation} operation The Ext.data.Operation object
     * @param {Function} callback The callback function to call when the Operation has completed
     * @param {Object} scope The scope in which to execute the callback
     */
    doRequest: function(operation, callback, scope) {
        throw new Error("The doRequest function has not been implemented on your Ext.data.ServerProxy subclass. See src/data/ServerProxy.js for details");
    },
    
    /**
     * Optional callback function which can be used to clean up after a request has been completed.
     * @param {Ext.data.Request} request The Request object
     * @param {Boolean} success True if the request was successful
     */
    afterRequest: Ext.emptyFn,
    
    onDestroy: function() {
        Ext.destroy(this.reader, this.writer);
        
        Ext.data.ServerProxy.superclass.destroy.apply(this, arguments);
    }
});