Ext.define('RaxaEmr.Registration.controller.Main', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
            contactForm: '#contactForm' // gives getContactForm()
		}
	},

	init: function() {
		console.log('Main controller init');
		this.control({
			'button[action=SubmitContact]': {
				tap: 'submitContactForm'
			}
		});
	},
	submitContactForm: function() {
		console.log('submitContactForm');
		var form = this.getContactForm();
		console.log(form);
		form.submit({
			url: 'contact.php'
		});
	}
});

