// Enable dynamic dependency to be able find files at appropriate locations automatically
Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.i18n': 'lib/i18n'
    }
});

// Main application entry point
Ext.application({
    name: 'RaxaEmr',
    // Name of the application. Modules should use unique module name
    tabletIcon: 'resources/img/icon_s.png',
    tabletStartupScreen: 'resources/img/icon.png',

    models: ['Session'],
    // List of Models for dynamic loading
    views: ['Login', 'AppGrid'],
    // List of Views for dynamic loading
    controllers: ['Session'],
    // List of Controllers for dynamic loading
    store: ['SessionStore'] // List of Stores for dynamic loading
});

//i18n
Ext.require('Ext.i18n.Bundle', function () {
    Ext.i18n.appBundle = Ext.create('Ext.i18n.Bundle', {
        bundle: 'RaxaEmr',
        //Specify language here.
        lang: 'en-US',
        path: 'app/view',
        noCache: true
    });
});