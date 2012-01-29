/**
 * @class Ext.data.TwitterProxy
 * @extends Ext.data.proxy.JsonP
 * 
 * This simple proxy allows us to use Twitter's JSON-P API to search for tweets. All we're really doing in this
 * class is setting a few defaults (such as the number of tweets per page and a simple JSON Reader), and using
 * any Filters attached to the read Operation to modify the request url (see buildRequest).
 * 
 */
Ext.define('Ext.data.proxy.Twitter', {
    extend: 'Ext.data.proxy.JsonP',

    //this is the url we always query when searching for tweets
    url: 'http://search.twitter.com/search.json',
    _url: 'http://search.twitter.com/search.json',
    filterParam: undefined,
    
    constructor: function(config) {
        config = config || {};
        
        Ext.applyIf(config, {
            extraParams: {
                //result_type, returns popular tweets at the top of the result
                result_type: 'mixed',

                //lang: only show english results
                lang: 'en'
            },
            
            reader: {
                type: 'json',
                root: 'results'
            }
        });
        
        this.callParent(arguments);
    },
    
    /**
     * We need to add a slight customization to buildRequest - we're just checking for a filter on the 
     * Operation and adding it to the request params/url, and setting the start/limit if paging
     */
    buildRequest: function(operation) {
        var request = this.callParent(arguments),
            filter  = operation.getFilters()[0],
            params  = request.getParams();
        
        Ext.apply(params, {
            rpp: operation.getLimit(),
            page: operation.getPage()
        });
        
        if (filter) {
            delete params.filter;
            Ext.apply(params, {
                //q: pass in the query string to the search api
                q: filter.getValue()
            });
            
            request.setParams(params);
            
            request.setUrl(this._url);
            
            //as we're modified the request params, we need to regenerate the url now
            request.setUrl(this.buildUrl(request));
        }
        
        return request;
    }
});