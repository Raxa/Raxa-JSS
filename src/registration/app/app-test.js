// For more information on testing in Sencha / ExtJS, please see the following resource:
//  http://docs.sencha.com/ext-js/4-0/#!/guide/testing
Ext.Loader.setConfig({
	enabled: true
});

Ext.require('Ext.app.Application');

var Application = null;

Ext.onReady(function() {
	Application = Ext.create('Ext.app.Application', {
		name: 'RaxaEmr.Registration',

		controllers: ['Main'],
        models: ['Patient'],

		launch: function() {
			console.log('app-test start launch');
			//include the tests in the test.html head
			jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
			jasmine.getEnv().execute();
			console.log('app-test end launch');
		}
	});
});

