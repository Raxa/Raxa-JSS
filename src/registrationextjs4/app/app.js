Ext.Loader.setConfig({
	enabled: true
});

Ext.application({
	name: 'Registration',
	views: ['BMICalc', 'Home', 'RegistrationPart1', 'RegistrationPart2', 'ConfirmationScreen'],
	controllers: ['BMI'],

	launch: function () {
		Ext.create('Registration.view.Viewport');
	}
});