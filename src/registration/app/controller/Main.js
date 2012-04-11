var patientStore;

Ext.define('RaxaEmr.Registration.controller.Main', {
	extend: 'Ext.app.Controller',


	config: {
	
		 control: {
         		'button[action=calculatebmi]': {
                				tap: 'docalculatebmi'
            					  }
       			  },
	
	
		refs: {
			// gives getCreatePatientForm()
			createPatientForm: '#createPatientForm',
			// gives getSearchPatientsForm()
		         searchPatientsForm: '#searchPatientsForm'
			
			
				
			},
		
		
		
	},


	//function to calculate bmi (from Bmi.js)
	docalculatebmi: function(){
	var weight_kg = parseInt(Ext.getCmp('weightId').getValue());		//Get Weight value from Form
	var height_feet=parseInt(Ext.getCmp('heightFeetId').getValue());	//Get Height(feet) value from Form
	var height_inch=parseInt(Ext.getCmp('heightInchesId').getValue());	//Get Height (inches) value from Form
	var weight_pound = weight_kg*2.2;					//Kg to Pound conversion
	var height_total_inches= (height_feet*12) + height_inch;    		//Conversion of Feets & Inches to total Inches
	var bmi = (weight_pound*703)/(height_total_inches*height_total_inches); //BMI Calculation
	var bmi_rounded=Math.round(bmi*100)/100;  				//Rouded till 2 digits
	Ext.getCmp('BMITextFieldId').setPlaceHolder(bmi_rounded);  		//Bmi displayed to user
	Ext.getCmp('bmiSlider').setValue(bmi);					//Slider set to calculated Bmi

	// Bmi status from WHO Standards	
	if (bmi_rounded<18.5)
		{
	Ext.getCmp('BmiStatusId').setHtml('<div align="center" style="color:#FF0000"><b>BMI Status: Underweight</div>');
		}
	if (bmi_rounded>=18.5 && bmi_rounded <=24.99)
		{
	Ext.getCmp('BmiStatusId').setHtml('<div align="center" style="color:#00FF00"><b>BMI Status: Normal</div>');
		}
	if (bmi_rounded>=25.00 && bmi_rounded <=29.99)
		{
	Ext.getCmp('BmiStatusId').setHtml('<div align="center" style="color:#0000FF"><b>BMI Status: Overweight</div>');
		}
	if (bmi_rounded>=30.00)
		{
	Ext.getCmp('BmiStatusId').setHtml('<div align="center" style="color:#FF0000"><b>BMI Status: Obese</div>');
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
	},
	
//	submitBMI: function() {
//        console.log("Adding BMI to patient");
//
//	},

	calculateBMI: function() {
        console.log("Adding BMI to patient");
	//BMI Funcation will be implimented here	
	//BMI = ( Weight in Pounds / ( Height in inches x Height in inches ) ) x 703
	}
	
	
});

