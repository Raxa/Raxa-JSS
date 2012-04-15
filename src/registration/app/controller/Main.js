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
			firstname: '#firstnameregister',
			firstnameconfirm: '#firstname',
			lastname: '#lastnameregister',
			lastnameconfirm: '#lastname',
			guardianfirstname: '#guardianfirstnameregister',
			guardianfirstnameconfirm: '#guardianfirstname',
			guardianlastname: '#guardianlastnameregister',
			guardianlastnameconfirm: '#guardianlastname',
			gender: '#genderregister',
			genderconfirm: '#gender',
			education: '#educationregister',
			educationconfirm: '#education',
			dob: '#dobregister',
			dobconfirm: '#dob',
			caste: '#casteregister',
			casteconfirm: '#caste',
			block: '#blockregister',
			blockconfirm: '#block',
			street: '#streetregister',
			streetconfirm: '#street',
			town: '#townregister',
			townconfirm: '#town',
			postoffice: '#postofficeregister',
			postofficeconfirm: '#postoffice',
			tehsil: '#tehsilregister',
			tehsilconfirm: '#tehsil',
			district: '#districtregister',
			districtconfirm: '#district',
			contactviaphone: '#contactviaphoneregister',
			contactviaphoneconfirm: '#contactviaphone',
			primaryphone: '#primaryphoneregister',
			primaryphoneconfirm: '#primaryphone',
			secondaryphone: '#secondaryphoneregister',
			secondaryphoneconfirm: '#secondaryphone'
			
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
		this.getFirstnameconfirm().setValue(this.getFirstname().getValue());
		this.getLastnameconfirm().setValue(this.getLastname().getValue());
		this.getGuardianfirstnameconfirm().setValue(this.getGuardianfirstname().getValue());
		this.getGuardianlastnameconfirm().setValue(this.getGuardianlastname().getValue());
		this.getGenderconfirm().setValue(this.getGender().getValue());
		this.getEducationconfirm().setValue(this.getEducation().getValue());
		this.getDobconfirm().setValue(this.getDob().getValue());
		this.getCasteconfirm().setValue(this.getCaste().getValue());
		this.getBlockconfirm().setValue(this.getBlock().getValue());
		this.getStreetconfirm().setValue(this.getStreet().getValue());
		this.getTownconfirm().setValue(this.getTown().getValue());
		this.getPostofficeconfirm().setValue(this.getPostoffice().getValue());
		this.getTehsilconfirm().setValue(this.getTehsil().getValue());
		this.getDistrictconfirm().setValue(this.getDistrict().getValue());
		this.getContactviaphoneconfirm().setValue(this.getContactviaphone().getValue());
		this.getPrimaryphoneconfirm().setValue(this.getPrimaryphone().getValue());
		this.getSecondaryphoneconfirm().setValue(this.getSecondaryphone().getValue());
		viewer.animateActiveItem(results,{type:'slide',direction:'left'});
	},
	
	confirmPatient: function() {
		console.log('confirmPatient');
		this.addPatientToStore();
		var viewer = Ext.getCmp('viewer');
		var target = viewer.getComponent(0);
		this.getFirstname().setValue('');
		this.getLastname().setValue('');
		this.getGuardianfirstname().setValue('');
		this.getGuardianlastname().setValue('');
		this.getGender().setValue('');
		this.getEducation().setValue('');
		this.getDob().setValue('');
		this.getCaste().setValue('');
		this.getBlock().setValue('');
		this.getStreet().setValue('');
		this.getTown().setValue('');
		this.getPostoffice().setValue('');
		this.getTehsil().setValue('');
		this.getDistrict().setValue('');
		this.getContactviaphone().setValue('');
		this.getPrimaryphone().setValue('');
		this.getSecondaryphone().setValue('');
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
