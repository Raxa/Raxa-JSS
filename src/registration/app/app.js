// Enable dynamic dependency to be able find files at appropriate locations automatically
Ext.Loader.setConfig({
    enabled: true
});

// Main application entry point
Ext.application({
    name: 'RaxaEmr.Registration', // Name of the application. Modules should use unique module name
    tabletIcon: 'resources/img/icon_s.png',
    tabletStartupScreen: 'resources/img/icon.png',
    
    models: [], // List of Models for dynamic loading
    views: ['PatientProfile', 'Vitals'], // List of Views for dynamic loading
    controllers: [], // List of Controllers for dynamic loading
    store: [] // List of Stores for dynamic loading
});