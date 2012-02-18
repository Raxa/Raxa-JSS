/**
 * @author Ed Spencer
 * @class Ext.util.Route
 * @extends Object
 * @ignore
 * <p>Represents a mapping between a url and a controller/action pair. May also contain additional params</p>
 */
Ext.util.Route = Ext.extend(Object, {
    /**
     * @cfg {String} url The url string to match. Required.
     */
    
    constructor: function(config) {
        Ext.apply(this, config, {
            conditions: {}
        });
        
        /*
         * The regular expression we use to match a segment of a route mapping
         * this will recognise segments starting with a colon,
         * e.g. on 'namespace/:controller/:action', :controller and :action will be recognised
         */
        this.paramMatchingRegex = new RegExp(/:([0-9A-Za-z\_]*)/g);
        
        /*
         * Converts a route string into an array of symbols starting with a colon. e.g.
         * ":controller/:action/:id" => [':controller', ':action', ':id']
         */
        this.paramsInMatchString = this.url.match(this.paramMatchingRegex) || [];
        
        this.matcherRegex = this.createMatcherRegex(this.url);
    },
    
    /**
     * Attempts to recognize a given url string and return controller/action pair for it
     * @param {String} url The url to recognize
     * @return {Object} The matched data, or false if no match
     */
    recognize: function(url) {
        if (this.recognizes(url)) {
            var matches = this.matchesFor(url);
            
            return Ext.applyIf(matches, {
                controller: this.controller,
                action    : this.action,
                historyUrl: url
            });
        }
    },
    
    /**
     * Returns true if this Route matches the given url string
     * @param {String} url The url to test
     * @return {Boolean} True if this Route recognizes the url
     */
    recognizes: function(url) {
        return this.matcherRegex.test(url);
    },
    
    /**
     * @private
     * Returns a hash of matching url segments for the given url.
     * @param {String} url The url to extract matches for
     * @return {Object} matching url segments
     */
    matchesFor: function(url) {
        var params = {},
            keys   = this.paramsInMatchString,
            values = url.match(this.matcherRegex),
            length = keys.length,
            i;
        
        //first value is the entire match so reject
        values.shift();

        for (i = 0; i < length; i++) {
            params[keys[i].replace(":", "")] = values[i];
        }

        return params;
    },
    
    /**
     * Constructs a url for the given config object by replacing wildcard placeholders in the Route's url
     * @param {Object} config The config object
     * @return {String} The constructed url
     */
    urlFor: function(config) {
        
    },
    
    /**
     * @private
     * Takes the configured url string including wildcards and returns a regex that can be used to match
     * against a url
     * @param {String} url The url string
     * @return {RegExp} The matcher regex
     */
    createMatcherRegex: function(url) {
        /**
         * Converts a route string into an array of symbols starting with a colon. e.g.
         * ":controller/:action/:id" => [':controller', ':action', ':id']
         */
        var paramsInMatchString = this.paramsInMatchString,
            length = paramsInMatchString.length,
            i, cond, matcher;
        
        for (i = 0; i < length; i++) {
            cond    = this.conditions[paramsInMatchString[i]];
            matcher = Ext.util.Format.format("({0})", cond || "[%a-zA-Z0-9\\_\\s,]+");

            url = url.replace(new RegExp(paramsInMatchString[i]), matcher);
        }

        //we want to match the whole string, so include the anchors
        return new RegExp("^" + url + "$");
    }
});