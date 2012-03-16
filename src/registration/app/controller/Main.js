var patientStore;

Ext.define('RaxaEmr.Registration.controller.Main', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			// gives getCreatePatientForm()
			createPatientForm: '#createPatientForm',
			// gives getSearchPatientsForm()
            searchPatientsForm: '#searchPatientsForm'
		}
	},

	init: function() {
		console.log('Main controller init');
		this.initializePatientStore();
		this.printPatientStore();

		this.control({
			'button[action=createPatient]': {
				tap: 'createPatient'
			},
			'button[action=searchPatients]': {
				tap: 'searchPatients'
			}
		});
	},

	initializePatientStore: function() {
		console.log('initializePatientStore');
		//our Store automatically picks up the LocalStorageProxy defined on the
		//Patient model
		patientStore = Ext.create('Ext.data.Store', {
			model: "RaxaEmr.Registration.model.Patient"
		});
	},

	addPatientToStore: function() {
		console.log("add patient to patientStore");

		var form = this.getCreatePatientForm();
		var values = form.getValues();

		console.log("form values:");
		console.log(values);
		patientStore.add(values);
		patientStore.sync();

		console.log("patient object:");
		console.log(patientStore.last());
	},

	printPatientStore: function() {
		patientStore.load();
		console.log("# of records in PatientStore = " + patientStore.getCount());
	},

	// TODO: Remove this. Just a test to validate that Jasmine hooks are working
	testFunction: function() {
		return true;
	},

	/*
     * Takes input from Registration Form and creates a patient in LocalStorage
     */
	createPatient: function() {
        console.log("createPatient");
		this.addPatientToStore();
	},

    /*
     * Takes input from Search Form and returns one exact match
     * TODO: Make search a lot more flexible, to return multiple matches,
     * and imperfect matches
     */
	searchPatients: function() {
		console.log("searchPatients");
		// TODO: patient store must be initialize
		var form = this.getSearchPatientsForm();
		var values = form.getValues();
        console.log(values);
        console.log('First name: ' + values.firstName);
        var query = values.firstName;
        /*var rec = patientStore.findRecord('firstName', query);*/
		var rec = patientStore.findRecord('firstName', query);
        console.log(rec);
        wasPatientFound = (rec === null) ? "No patient found" : "Patient found";
        alert("Searching for patient with first name = '" + query + "'..." +  wasPatientFound);
	}
});

