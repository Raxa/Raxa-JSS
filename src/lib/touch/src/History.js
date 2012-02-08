/**
 * @class Ext.History
 * @extends Ext.util.Observable
 * @private
 * 
 * Mobile-optimized port of Ext.History. Note - iPad on iOS < 4.2 does not have HTML5 History support so we still
 * have to poll for changes.
 */
Ext.History = new Ext.util.Observable({
    constructor: function() {
        Ext.History.superclass.constructor.call(this, config);
        
        this.addEvents(
            /**
             * @event change
             */
            'change'
        );
    },
    
    /**
     * @private
     * Initializes event listeners
     */
    init: function() {
        var me = this;
        
        me.setToken(window.location.hash);
        
        if (Ext.supports.History) {
            window.addEventListener('hashchange', this.onChange);
        } else {
            setInterval(function() {
                var newToken = me.cleanToken(window.location.hash),
                    oldToken = me.getToken();
                
                if (newToken != oldToken) {
                    me.onChange();
                }
            }, 50);
        }
    },
    
    /**
     * @private
     * Event listener for the hashchange event
     */
    onChange: function() {
        var me       = Ext.History,
            newToken = me.cleanToken(window.location.hash);
        
        if (me.token != newToken) {
            me.fireEvent('change', newToken);
        }
        
        me.setToken(newToken);
    },
    
    /**
     * Sets a new token, stripping of the leading # if present. Does not fire the 'change' event
     * @param {String} token The new token
     * @return {String} The cleaned token
     */
    setToken: function(token) {
        return this.token = this.cleanToken(token);
    },
    
    /**
     * @private
     * Cleans a token by stripping off the leading # if it is present
     * @param {String} token The unclean token
     * @return {String} The clean token
     */
    cleanToken: function(token) {
        return token[0] == '#' ? token.substr(1) : token;
    },
    
    /**
     * Returns the current history token
     * @return {String} The current token
     */
    getToken: function() {
        return this.token;
    },
    
    /**
     * Adds a token to the history stack by updation the address bar hash
     * @param {String} token The new token
     */
    add: function(token) {
        window.location.hash = this.setToken(token);
        
        if (!Ext.supports.History) {
            this.onChange();
        }
    }
});