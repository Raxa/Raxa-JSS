// Sets up basic aspects of application

Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'demoVersion2',
    controllers: ['basic'],
    views: ['loginScreen', 'optionsScreen', 'connectionSettings', 'patientOptions', 'settingsScreen' /*, 'optionsPanel'*/],
    // models: ['Deck'],

    launch: function () {
        Ext.create('demoVersion2.view.loginScreen');
    }
});