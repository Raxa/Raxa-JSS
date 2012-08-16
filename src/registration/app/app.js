Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'RaxaEmr.Registration',
    controllers: ['Main'],
    views: ['Home', 'Register', 'Search', 'Bmi', 'PatientScreen1', 'PatientScreen2', 'Viewport'],
    models: ['Patient'],

    launch: function () {
        if(Util.checkModulePrivilege('registration')){
            Ext.create('RaxaEmr.Registration.view.Viewport');
        }
    }
});