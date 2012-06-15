Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'Registration',
    controllers: ['Main'],
    views: ['RegistrationPart1', 'RegistrationPart2', 'Home', 'Viewport', 'ConfirmationScreen'],
    autoCreateViewport: true
});