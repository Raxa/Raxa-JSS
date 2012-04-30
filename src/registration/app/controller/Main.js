var patientStore;

Ext.define('RaxaEmr.Registration.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        control: {
            'button[action=CalculateBmiAction]': {
                tap: 'CalculateBmiMethod'
            }
        },

        refs: {
            // gives getCreatePatientForm()
            createPatientForm: '#createPatientForm',
            // gives getSearchPatientsForm()
            searchPatientsForm: '#searchPatientsForm'
        }
    },

    //function to calculate bmi (from Bmi.js)
    CalculateBmiMethod: function () {
        var weight_kg = parseInt(Ext.getCmp('weightId').getValue()); //Get Weight value from Form
        var height_cm = parseInt(Ext.getCmp('heightCmId').getValue()); //Get Height(cm) value from Form
        var height_m = height_cm / 100; //Convert cm in to m
        var bmi = (weight_kg) / (height_m * height_m); //BMI Calculation
        var bmi_rounded = Math.round(bmi * 100) / 100; //Rouded till 2 digits
        Ext.getCmp('BMITextFieldId').setPlaceHolder(bmi_rounded); //Bmi displayed to user
        Ext.getCmp('bmiSlider').setValue(bmi); //Slider set to calculated Bmi
        // Bmi status from WHO Standards
        var WHO_BMI_UNDERWEIGHT = 18.5;
        var WHO_BMI_NORMAL = 25;
        var WHO_BMI_OVERWEIGHT = 30;

        if (bmi < WHO_BMI_UNDERWEIGHT) {
            this.updateBmiDisplay('red', 'Underweight');
        }
        if (bmi >= WHO_BMI_UNDERWEIGHT && bmi < WHO_BMI_NORMAL) {
            this.updateBmiDisplay('green', 'Normal');
        }
        if (bmi >= WHO_BMI_NORMAL && bmi < WHO_BMI_OVERWEIGHT) {
            this.updateBmiDisplay('blue', 'Overweight');
        }
        if (bmi >= WHO_BMI_OVERWEIGHT) {
            this.updateBmiDisplay('red', 'Obese');
        }

    },

    updateBmiDisplay: function (color, bmiStatusText) {
        var updatedHtml = '<div align="center" style="color:' + color + '"><b>BMI Status: ' + bmiStatusText + '</div>';

        Ext.getCmp('BmiStatusId').setHtml(updatedHtml);
    },

    init: function () {
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

    initializePatientStore: function () {
        console.log('initializePatientStore');
        //our Store automatically picks up the LocalStorageProxy defined on the
        //Patient model
        patientStore = Ext.create('Ext.data.Store', {
            model: "RaxaEmr.Registration.model.Patient"
        });
    },

    addPatientToStore: function () {
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

    printPatientStore: function () {
        patientStore.load();
        console.log("# of records in PatientStore = " + patientStore.getCount());
    },

    // TODO: Remove this. Just a test to validate that Jasmine hooks are working
    testFunction: function () {
        return true;
    },

    /*
     * Takes input from Registration Form and creates a patient in LocalStorage
     */
    createPatient: function () {
        console.log("createPatient");
        this.addPatientToStore();
    },

    /**
     * Takes input from Search Form and returns one exact match
     * TODO: Make search a lot more flexible, to return multiple matches,
     * and imperfect matches
     */
    searchPatients: function () {
        console.log("searchPatients");
        // TODO: patient store must be initialize
        var form = this.getSearchPatientsForm();
        var values = form.getValues();
        console.log(values);
        console.log('First name: ' + values.firstName);
        var query = values.firstName;
        // var rec = patientStore.findRecord('firstName', query);
        var rec = patientStore.findRecord('firstName', query);
        console.log(rec);
        wasPatientFound = (rec === null) ? "No patient found" : "Patient found";
        alert("Searching for patient with first name = '" + query + "'..." + wasPatientFound);
    }
});