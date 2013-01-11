// Enable dynamic dependency to be able find files at appropriate locations automatically
// Ext.Loader.setConfig({
//     enabled: true,
//     paths: {
//         'Ext.i18n': 'lib/i18n' //Path to the i18n library
//     }
// });


// Main application entry point
Ext.application({
    name: 'RaxaEmr',
    // Name of the application. Modules should use unique module name
    tabletIcon: 'resources/img/icon_s.png',
    tabletStartupScreen: 'resources/img/icon.png',
    models: ['Session', 'Location'],
    // List of Models for dynamic loading
    views: ['Login', 'AppGrid','AppCarousel','smartApp', 'NewProvider', 'NewPatient'],
    // List of Views for dynamic loading
    controllers: ['Session'],
    // List of Controllers for dynamic loading
    stores: ['Locations'] // List of Stores for dynamic loading
});
