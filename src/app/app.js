// Enable dynamic dependency to be able find files at appropriate locations automatically
Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.i18n': 'lib/i18n' //Path to the i18n library
    }
});

//i18n
Ext.require('Ext.i18n.Bundle', function () {
    Ext.i18n.appBundle = Ext.create('Ext.i18n.Bundle', {
        bundle: 'RaxaEmr',
        //Specify language here.
        lang: 'en-US',
        path: 'app/view', // Path to the .properties file
        noCache: true
    });
});

// Main application entry point
Ext.application({
    name: 'RaxaEmr',
    // Name of the application. Modules should use unique module name
    tabletIcon: 'resources/img/icon_s.png',
    tabletStartupScreen: 'resources/img/icon.png',
    models: ['Session'],
    // List of Models for dynamic loading
    views: ['Login', 'AppGrid','AppCarousel','smartApp'],
    // List of Views for dynamic loading
    controllers: ['Session'],
    // List of Controllers for dynamic loading
    store: ['SessionStore'] // List of Stores for dynamic loading
});