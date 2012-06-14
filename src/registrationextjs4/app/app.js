Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'Registration',
    views: ['ConfirmationScreen', 'Home', 'RegistrationPart1', 'RegistrationPart2', 'Viewport'],
    controllers: ['controls'],
    stores: ['obsstore', 'encounterstore'],
    models: ['obsmodel', 'encountersmodel'],
    
    launch: function() {
        Ext.create('Registration.view.Viewport');
    }
});