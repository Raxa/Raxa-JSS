/**
 * @class Ext.data.TwitterProxy
 * @extends Ext.data.ScriptTagProxy
 * 
 * This simple proxy allows us to use Twitter's JSON-P API to search for tweets. All we're really doing in this
 * class is setting a few defaults (such as the number of tweets per page and a simple JSON Reader), and using
 * any Filters attached to the read Operation to modify the request url (see buildRequest).
 * 
 */
Ext.data.TwitterProxy = Ext.extend(Ext.data.ScriptTagProxy, {
    //this is the url we always query when searching for tweets
    url: 'http://search.twitter.com/search.json',
    perPage: 50,
    filterParam: undefined,
    
    constructor: function(config) {
        config = config || {};
        
        Ext.applyIf(config, {
            extraParams: {
                suppress_response_codes: true
            },
            
            reader: {
                type: 'json',
                root: 'results'
            }
        });
        
        Ext.data.TwitterProxy.superclass.constructor.call(this, config);
    },
    
    /**
     * We need to add a slight customization to buildRequest - we're just checking for a filter on the 
     * Operation and adding it to the request params/url, and setting the start/limit if paging
     */
    buildRequest: function(operation) {
        var request = Ext.data.TwitterProxy.superclass.buildRequest.apply(this, arguments),
            filter  = operation.filters[0],
            params  = request.params;
        
        Ext.apply(params, {
            rpp: operation.limit,
            page: operation.page || 1
        });
        
        if (filter) {
            Ext.apply(params, {
                q: filter.value
            });
            
            //as we're modified the request params, we need to regenerate the url now
            request.url = this.buildUrl(request);
        }
        
        return request;
    }
});

Ext.data.ProxyMgr.registerType('twitter', Ext.data.TwitterProxy);