// Automatically load views
Ext.Loader.setConfig({
	enabled: true
});

var App = new Ext.Application({
    // Same name as registration module
    name: 'RaxaEmr.Registration',
    
    // Controllers to test
	controllers: ['Main'],

    launch: function () {
        // include the tests in the test.html head
        jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
        jasmine.getEnv().execute();
    }
});
