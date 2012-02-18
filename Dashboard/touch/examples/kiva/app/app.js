/**
 * This file sets application-wide settings and launches the application when everything has
 * been loaded onto the page.
 * 
 * The global variable kiva holds a reference to the application, and namespaces are automatically
 * set up for kiva.views, kiva.models, kiva.controllers and kiva.stores
 */ 
Ext.regApplication({
    name: "kiva",
    
    icon: 'resources/images/kiva.png',
    glossOnIcon: false,
    tabletStartupScreen: 'resources/images/tablet_startup.png',
    
    /**
     * This function is automatically called when the document has finished loading. All we do here
     * is launch the application by calling the loans controller's 'list' action (see app/controllers/loans.js)
     */
    launch: function() {
        Ext.dispatch({
            controller: 'loans',
            action    : 'list'
        });
    }
});