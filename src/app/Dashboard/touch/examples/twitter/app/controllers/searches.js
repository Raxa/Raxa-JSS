/**
 * @class searches
 * @extends Ext.Controller
 * 
 * The searches controller renders the tweets list for a given Search record. We have two public actions - first and
 * show. Usually, the 'show' action will be called, either because the user tapped on a search or because when the app
 * first loaded the browser url was in the form #searches/Search%20Term (see app/routes.js for more details).
 * 
 * The 'show' action shows the Tweets for a given Search. The 'first' action is used when initializing the application
 * for the first time - it makes sure that the shared Searches Store (see app/stores/Searches.js) is loaded and then
 * loads the first available Search. Because we add to history using the historyUrl config, if the user refreshes now
 * they will be taken straight to the 'show' action.
 * 
 */
Ext.regController("searches", {
    model: "Search",
    
    /**
     * Shows the first Search instance in the global Searches store (see app/stores/Search.js). If no Searches are
     * found, renders a message to the user asking them to add a search
     */
    first: function() {
        var store = Ext.getStore('Searches'),
            first = store.first();
        
        if (first) {
            Ext.dispatch({
                controller: "searches",
                action    : "show",
                instance  : first,
                historyUrl: "searches/" + first.get('query')
            });
        } else {
            this.noSearches();
        }
    },
    
    /**
     * Shows the results of a given Search. Handles both a Search model instance being passed or a query string
     * @param {Object} options Config object expected to have either an instance or a query property
     */
    show: function(options) {
        var search = options.instance,
            list   = this.list;
        
        //if we weren't given a Search instance, create a new one now
        if (!search) {
            search = new this.model({
                query: options.query.replace("%20", " ")
            });
        }
        
        this.highLightSearch(search.get('query'));
        
        /*
         * This uses the hasMany association set up in app/models/Search.js to load the tweets for the given Search
         */
        var store = search.tweets();
        
        /**
         * The first time we render the tweetsList component, we store a reference to it in this.list so that we can
         * reuse the instance we already have. If we haven't rendered yet, we render the list, otherwise we just bind
         * a new Store.
         */
        if (!list) {
            list = this.list = this.render({
                xtype: 'tweetsList',
                store: store
            });
        } else {
            list.scroller.scrollTo({x: 0, y: 0}, 700);
            list.bindStore(store);
        }
        
        Ext.getCmp('viewport').setActiveItem(list);
        
        store.load();
    },
    
    /**
     * Highlights the item in the search list for the given search term. This is usually only called
     * when the application just launched - because this application has history support it is possible
     * that a search is still selected but the user hasn't tapped the item yet so we make sure it is
     * highlighted here.
     * 
     * @param {String} query The search query to highlight
     */
    highLightSearch: function(query) {
        var list  = twitter.viewport.down('searchesList'),
            store = list.store,
            index = store.find('query', query, 0, false, false, true),
            record;
        
        if (index != -1) {
            record = store.getAt(index);
            
            var sm = list.getSelectionModel();
            sm.select(record, false, true);
        }
    },
    
    /**
     * @private
     * Renders a Panel telling the user that there are no saved searches yet
     */
    noSearches: function() {
        this.render({
            xtype: 'panel',
            cls  : 'no-searches',
            html : '<p>Make a search with the text field on the left</p>'
        });
    }
    
});
