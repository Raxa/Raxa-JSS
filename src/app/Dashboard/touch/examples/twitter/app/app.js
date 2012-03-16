/**
 * This file sets up the Twitter application. We register an application called 'twitter' - this automatically sets up
 * a global variable with the same name.
 * 
 * The most important part of this is the launch function, which is called automatically when the page has finished 
 * loading. In this case, we render a Viewport class (see app/views/Viewport.js) - this is just the main panel in the
 * app which houses the saved searches (on the left) and the search results (center).
 * 
 * It also listens for the selectionchange event, which is fired when the user taps on one of the saved Searches. When
 * this happens we use the framework's history support to show the search results. When the user refreshes or comes back
 * later they'll be taken right back to where they were.
 * 
 * The defaultUrl is used if the user has come to the app for the first time and has nothing in the browser url history.
 * In this case we dispatch through to the searches controller's 'first' action to show the first saved search.
 * 
 * The defaultTarget config tells the controllers where to render views to by default. The Viewport class we create at
 * launch is set at the default render target (see app/views/Viewport.js - it sets its id to "viewport"), so whenever
 * we call 'render' in a controller, the view will be rendered to the viewport container by default.
 * 
 */ 
Ext.regApplication({
    name         : "twitter",
    
    defaultUrl   : 'searches/first',
    defaultTarget: "viewport",
    
    icon: 'resources/images/icon.png',
    glossOnIcon: false,
    phoneStartupScreen: 'resources/images/phone_startup.png',
    tabletStartupScreen: 'resources/images/tablet_startup.png',
    
    /**
     * This is called automatically when the page loads. Here we set up the main component on the page - the Viewport
     */
    launch: function() {
        this.viewport = new twitter.Viewport({
            application: this,
            listeners: {
                selectionchange: this.onSelectionChange
            }
        });
    },
    
    /**
     * @private
     * Handles taps on the saved searches list
     */ 
    onSelectionChange: function(selModel, records) {
        var search = records[0];

        if (search) {
            Ext.defer(function() {
                Ext.dispatch({
                    controller: 'searches',
                    action    : 'show',
                    instance  : search,
                    historyUrl: 'searches/' + search.get('query')
                });
            }, 10, Ext);
        }
    }
});