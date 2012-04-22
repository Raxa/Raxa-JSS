var patientStore;

Ext.define('RaxaEmr.Registration.controller.Main', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			// gives getCreatePatientForm()
			createPatientForm: '#createPatientForm',
			// gives getSearchPatientsForm()
            searchPatientsForm: '#searchPatientsForm',
			confirmPatientForm: '#confirmPatientForm',
			firstName: '#firstnameregister',
			firstNameConfirm: '#firstname',
			lastName: '#lastnameregister',
			lastNameConfirm: '#lastname',
			guardianFirstName: '#guardianfirstnameregister',
			guardianFirstNameConfirm: '#guardianfirstname',
			guardianLastName: '#guardianlastnameregister',
			guardianLastNameConfirm: '#guardianlastname',
			gender: '#genderregister',
			genderConfirm: '#gender',
			education: '#educationregister',
			educationConfirm: '#education',
			dob: '#dobregister',
			dobConfirm: '#dob',
			caste: '#casteregister',
			casteConfirm: '#caste',
			block: '#blockregister',
			blockConfirm: '#block',
			street: '#streetregister',
			streetConfirm: '#street',
			town: '#townregister',
			townConfirm: '#town',
			postOffice: '#postofficeregister',
			postOfficeConfirm: '#postoffice',
			tehsil: '#tehsilregister',
			tehsilConfirm: '#tehsil',
			district: '#districtregister',
			districtConfirm: '#district',
			contactViaPhone: '#contactviaphoneregister',
			contactViaPhoneConfirm: '#contactviaphone',
			primaryPhone: '#primaryphoneregister',
			primaryPhoneConfirm: '#primaryphone',
			secondaryPhone: '#secondaryphoneregister',
			secondaryPhoneConfirm: '#secondaryphone'
			
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
			},
			'button[action=confirmPatient]': {
				tap: 'confirmPatient'
			},
			'button[handler=backtoEdit]': {
				tap: 'backtoEdit'
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
		var viewer = Ext.getCmp('viewer');
		var results = Ext.getCmp('viewer').getComponent(1);
		this.getFirstNameConfirm().setValue(this.getFirstName().getValue());
		this.getLastNameConfirm().setValue(this.getLastName().getValue());
		this.getGuardianFirstNameConfirm().setValue(this.getGuardianFirstName().getValue());
		this.getGuardianLastNameConfirm().setValue(this.getGuardianLastName().getValue());
		this.getGenderConfirm().setValue(this.getGender().getValue());
		this.getEducationConfirm().setValue(this.getEducation().getValue());
		this.getDobConfirm().setValue(this.getDob().getValue());
		this.getCasteConfirm().setValue(this.getCaste().getValue());
		this.getBlockConfirm().setValue(this.getBlock().getValue());
		this.getStreetConfirm().setValue(this.getStreet().getValue());
		this.getTownConfirm().setValue(this.getTown().getValue());
		this.getPostOfficeConfirm().setValue(this.getPostOffice().getValue());
		this.getTehsilConfirm().setValue(this.getTehsil().getValue());
		this.getDistrictConfirm().setValue(this.getDistrict().getValue());
		this.getContactViaPhoneConfirm().setValue(this.getContactViaPhone().getValue());
		this.getPrimaryPhoneConfirm().setValue(this.getPrimaryPhone().getValue());
		this.getSecondaryPhoneConfirm().setValue(this.getSecondaryPhone().getValue());
		viewer.animateActiveItem(results,{type:'slide',direction:'left'});
	},
	
	confirmPatient: function() {
		console.log('confirmPatient');
		this.addPatientToStore();
		var viewer = Ext.getCmp('viewer');
		var target = viewer.getComponent(0);
		this.getFirstName().setValue('');
		this.getLastName().setValue('');
		this.getGuardianFirstName().setValue('');
		this.getGuardianLastName().setValue('');
		this.getGender().setValue('');
		this.getEducation().setValue('');
		this.getDob().setValue('');
		this.getCaste().setValue('');
		this.getBlock().setValue('');
		this.getStreet().setValue('');
		this.getTown().setValue('');
		this.getPostOffice().setValue('');
		this.getTehsil().setValue('');
		this.getDistrict().setValue('');
		this.getContactViaPhone().setValue('');
		this.getPrimaryPhone().setValue('');
		this.getSecondaryPhone().setValue('');
		viewer.animateActiveItem(target,{type:'slide',direction:'left'});
	},
	
	backtoEdit: function() {
		console.log('back pressed');
		var viewer = Ext.getCmp('viewer');
		var target = viewer.getComponent(0);
		viewer.animateActiveItem(target,{type:'slide',direction:'right'});
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
