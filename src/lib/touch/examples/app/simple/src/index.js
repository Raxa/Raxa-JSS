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
        // this.viewport = new twitter.Viewport({
        //     application: this,
        //     listeners: {
        //         selectionchange: this.onSelectionChange
        //     }
        // });
    }
    
    // /**
    //  * @private
    //  * Handles taps on the saved searches list
    //  */ 
    // onSelectionChange: function(selModel, records) {
    //     var search = records[0];

    //     if (search) {
    //         Ext.defer(function() {
    //             Ext.dispatch({
    //                 controller: 'searches',
    //                 action    : 'show',
    //                 instance  : search,
    //                 historyUrl: 'searches/' + search.get('query')
    //             });
    //         }, 10, Ext);
    //     }
    // }
});