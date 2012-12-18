Ext.define('Registration.controller.Main', {
    extend: 'Ext.app.Controller',
    id: 'main',
    views: ['Viewport', 'Home', 'RegistrationPart1', 'RegistrationConfirm', 'IllnessDetails', 'RegistrationBMI', 'SearchPart1', 'SearchPart2', 'SearchConfirm'],
    stores: ['patient', 'obsStore', 'encounterStore', 'orderStore', 'providerStore', 'Doctors', 'autoCompleteAddress'],
    models: ['patient', 'addresses', 'names', 'attributes', 'obsModel', 'encounterModel', 'orderModel', 'providerModel', 'Doctor', 'AttributeType'],

    init: function() {
        // connect the actions to eventHandlers
        this.control({
            "registrationpart1 button[action=continue]": {
                click: this.confirmPage
            },
            "registrationpart1 button[action=cancel]": {
                click: this.cancel
            },
            "registrationpart1 button[action=takePhoto]": {
                click: this.takePhoto
            },
            "registrationconfirm button[action=back]": {
                click: this.backToPage1
            },
            "registrationconfirm button[action=submit]": {
                click: this.submit
            },
            'illnessdetails button[action=goToBMI]': {
                click: this.goToBMI
            },
            'illnessdetails button[action=back]': {
                click: this.cancel
            },
            'illnessdetails button[action=cancel]': {
                click: this.cancel
            },
            'home button[action=register]': {
                click: this.registerPatient
            },
            'home button[action=search]': {
                click: this.searchPatient
            },
            'registrationbmi button[action=bmiSubmit]': {
                click: this.checkPrintedCard
            }
        });
    },

    registerPatient: function() {
        var l = Ext.getCmp('mainRegArea').getLayout();
        l.setActiveItem(REG_PAGES.REG_1.value); //Going to Registration Part-1 Page
        Util.KeyMapButton('continuebutton', Ext.EventObject.ENTER);
    },

    searchPatient: function() {
        var l = Ext.getCmp('mainRegArea').getLayout();
        l.setActiveItem(REG_PAGES.SEARCH_1.value); //Going to Search Part-1 Page
        Util.KeyMapButton('searchbutton1', Ext.EventObject.ENTER);
    },

    // Copy values of all fields from registrations form to the fields in confirmation screen
    confirmPage: function() {
        // Before proceeding to confirmation page, check if all the required fields are valid
        var requiredFields = ['patientFirstName', 'patientLastName', 'centreId'];
        var allFieldsAreValid = true;
        for (var i=0; i<requiredFields.length; i++) {
            if (!Ext.getCmp(requiredFields[i]).isValid()) {
                allFieldsAreValid = false;
            }
        }

        // Check if all fields are valid, else warn user that she cannot continue
        if(allFieldsAreValid) {
            // Handle Age and Date of Birth separately, since we only need one of these
            if(Ext.getCmp('patientAge').isValid() || Ext.getCmp('dob').isValid()) {
                var l = Ext.getCmp('mainRegArea').getLayout();
                l.setActiveItem(REG_PAGES.REG_CONFIRM.value);
                // TODO: Bug. After first use, keymap get set to go directly to illness screen
                Util.KeyMapButton('submitButton', Ext.EventObject.ENTER);
            } else {
                Ext.Msg.alert('Fields Invalid', 'Please enter age or date of birth');
            }
        } else {
            Ext.Msg.alert('Fields Invalid', 'Please enter all required fields');
        }

        // Copies all fields from registration form to confirmation screen
        Ext.getCmp('oldPatientIdentifierConfirm').setText(Ext.getCmp('oldPatientIdentifier').value);
        Ext.getCmp('patientNameConfirm').setText(Ext.getCmp('patientFirstName').value + " " + Ext.getCmp('patientLastName').value);
        Ext.getCmp('patientNameHindiConfirm').setText((Ext.getCmp('patientFirstNameHindi').value || "") + " " + (Ext.getCmp('patientLastNameHindi').value || ""));
        Ext.getCmp('relativeNameConfirm').setText((Ext.getCmp('relativeFirstName').value || "") + " " + (Ext.getCmp('relativeLastName').value || ""));
        Ext.getCmp('ageConfirm').setText(Ext.getCmp('patientAge').value || "");
        var gender = Ext.getCmp('sexComboBox').value || "Unknown";    // TODO: Come up with better solution. For now, gender dropdown defaults to giving a value of other if not inputted
        Ext.getCmp('sexConfirm').setText(gender);
        Ext.getCmp('educationConfirm').setText(Ext.getCmp('education').value);
        Ext.getCmp('casteConfirm').setText(Ext.getCmp('caste').value);
        Ext.getCmp('occupationConfirm').setText(Ext.getCmp('occupation').value);
        // TODO: https://raxaemr.atlassian.net/browse/RAXAJSS-613
        // Ext.getCmp('religionConfirm').setText(Ext.getCmp('religion').value); 
        Ext.getCmp('residentialAreaConfirm').setText(Ext.getCmp('residentialArea').value);
        Ext.getCmp('stretConfirm').setText(Ext.getCmp('street').value);
        if(!(!Ext.getCmp('patientPrimaryContact').value || Ext.getCmp('patientPrimaryContact').value === "")) {
            Ext.getCmp('patientPrimaryContactNumberConfirm').setText(Ext.getCmp('patientPrimaryContact').value + ' (Pri) ');
        } else {
            Ext.getCmp('patientPrimaryContactNumberConfirm').setText('');
        }
        if(!(!Ext.getCmp('patientSecondaryContact').value || Ext.getCmp('patientSecondaryContact').value === "")) {
            Ext.getCmp('patientSecondaryContactNumberConfirm').setText(Ext.getCmp('patientSecondaryContact').value + ' (Sec)');
        } else {
            Ext.getCmp('patientSecondaryContactNumberConfirm').setText('');
        }
        Ext.getCmp('townConfirm').setText(Ext.getCmp('town').value);
        Ext.getCmp('tehsilConfirm').setText(Ext.getCmp('tehsil').value);
        Ext.getCmp('districtConfirm').setText(Ext.getCmp('district').value);
        Ext.getCmp('stateConfirm').setText(Ext.getCmp('state').value);
    },

    //Navigates to BMI page
    goToBMI: function() {
        var l = Ext.getCmp('mainRegArea').getLayout();
        l.setActiveItem(REG_PAGES.REG_BMI.value);
    },

    backToPage1: function() {
        var l = Ext.getCmp('mainRegArea').getLayout();
        l.setActiveItem(REG_PAGES.REG_1.value);
    },

    // Return to home screen
    cancel: function() {
        Util.DestroyKeyMapButton(Ext.EventObject.ENTER);

        var l = Ext.getCmp('mainRegArea').getLayout();
        l.setActiveItem(REG_PAGES.HOME.value);

        // Reset all the fields in registration form
        this._resetNewPatientRegistrationForm();
    },

    // Make the post call for making the person
    submit: function() {
        //have to disable when clicked so user doesn't create 2 patients by clicking twice
        // Ext.getCmp('confirmationBackButton').disable();
        Ext.getCmp('submitButton').disable();

        // Gender
        var personGender = Ext.getCmp('sexComboBox').value || "Unknown";

        // Names
        // By default, just include "regular" name
        var personNames = [{
            givenName: Ext.getCmp('patientFirstName').value,
            familyName: Ext.getCmp('patientLastName').value
        }];

        // Add Hindi name IFF both Given and Family names exist (required by OpenMRS to have both)
        var firstNameHindi = Ext.getCmp('patientFirstNameHindi').value || "";
        var lastNameHindi = Ext.getCmp('patientLastNameHindi').value || "";
        if(firstNameHindi !== "" && lastNameHindi !== "") {
            personNames.push({
                givenName: firstNameHindi,
                familyName: lastNameHindi
            });
        }

        // Addresses
        var personAddresses = {};
        var addressItems = [
            {componentId:'street', name:'address1'},
            // {componentId:'residentialArea', name:'address2'},
            {componentId:'tehsil', name:'address3'},
            {componentId:'town', name:'cityVillage'},
            {componentId:'state', name:'stateProvince'},
            {componentId:'district', name:'countyDistrict'}
        ];

        for (var i=0; i < addressItems.length; i++) {
            var val = Ext.getCmp(addressItems[i].componentId).value;
            if (val) {
                personAddresses[addressItems[i].name] = val;
            }
        }

        // Add relative name if first OR last name exists
        // TODO: move this down with other attributes. it's just a special case because it combines two fields
        var personAttributes =  {};
        var relativeFirstName = Ext.getCmp('relativeFirstName').value || "";
        var relativeLastName = Ext.getCmp('relativeLastName').value || "";
        if(relativeFirstName !== "" || relativeLastName !== "") {
            personAttributes =  {
                // TODO: Introduces an unnecessary space if just one name added
                value: relativeFirstName + " " + relativeLastName,
                attributeType: localStorage.primaryRelativeUuidpersonattributetype
            };
        }
        
        // Creating the json object to be saved via REST
        var person = {
            gender: personGender,
            names: personNames,
            addresses: [personAddresses],
            attributes: [personAttributes]
        };
        var jsonperson = Ext.create('Registration.model.patient', person);

        // This if else statement change the persist property of age field in Person model so that if its
        // empty it should not be sent to server in the body of post call
        // TODO: What happens if Age and DOB are inconsistent?
        if(Ext.getCmp('patientAge').isValid()) {
            jsonperson.data.age = Ext.getCmp('patientAge').value;
            Registration.model.patient.getFields()[2].persist = true;
        } else {
            Registration.model.patient.getFields()[2].persist = false;
        }
        if(Ext.getCmp('dob').isValid()) {
            jsonperson.data.birthdate = Ext.getCmp('dob').value;
            Registration.model.patient.getFields()[3].persist = true;
        } else {
            Registration.model.patient.getFields()[3].persist = false;
        }

        // Adds an attribute, if it's present in the UI and valid.
        var controller = this;
        // TODO: Can generalize this fn to add attribute, obs, whatever.
        //      just need to ensure that valid, nonblank, etc is the right way to validate
        //      in all scenarios. is "" ever the proper input?
        var addAttribute = function (componentId, attributeTypeUuid) {
            if(controller._isOkToSendByREST(componentId)) {
                jsonperson.data.attributes.push({
                    value: Ext.getCmp(componentId).getValue(),
                    attributeType: attributeTypeUuid
                });
            }
        };

        // Person attributes
        var attributes = [
            {componentId: 'oldPatientIdentifier', uuid: localStorage.oldPatientIdentificationNumberUuidpersonattributetype},
            {componentId: 'caste', uuid: localStorage.casteUuidpersonattributetype},
            {componentId: 'education', uuid: localStorage.educationUuidpersonattributetype},
            {componentId: 'occupation', uuid: localStorage.occupationUuidpersonattributetype},
            // TODO: https://raxaemr.atlassian.net/browse/RAXAJSS-613
            // {componentId: 'religion', uuid: localStorage.religionUuidpersonattributetype},
            {componentId: 'tehsil', uuid: localStorage.tehsilUuidpersonattributetype},
            {componentId: 'district', uuid: localStorage.districtUuidpersonattributetype},
            {componentId: 'patientPrimaryContact', uuid: localStorage.primaryContactUuidpersonattributetype},
            {componentId: 'patientSecondaryContact', uuid: localStorage.secondaryContactUuidpersonattributetype}
        ];

        // Add attributes, if they exist
        for (var i = 0; i < attributes.length; i++) {
            addAttribute(attributes[i].componentId, attributes[i].uuid );
        }

        var store = Ext.create('Registration.store.patient');
        store.add(jsonperson);
        // this statement makes the post call to make the person
        store.sync({
            success: function() {
                localStorage.setItem('navigation', 'New Registration');
                localStorage.setItem('newPatientUuid', store.getAt(0).data.uuid);
                // setting the patientid and paient name fields in bmi screen
                console.log(store);
                Ext.getCmp('bmiPatientID').setValue(store.getAt(0).data.identifier);
                Ext.getCmp('bmiPatientName').setValue(Ext.getCmp('patientNameConfirm').text);
                var l = Ext.getCmp('mainRegArea').getLayout();
                l.setActiveItem(REG_PAGES.ILLNESS_DETAILS.value);
                Ext.getCmp('submitButton').enable();
            },
            failure: function() {
                Ext.Msg.alert("Failure -- Please try again");
                Ext.getCmp('submitButton').enable();
                // Ext.getCmp('confirmationBackButton').disable();
            },
            scope: this
        });

        //I made this function return this store because i needed this in jasmine unit test
        return store;
    },

    // for now the function is called when the emergency button is pressed since the views were not completed
    /*creates the json object of the encounter needed to be passed to the server and sends it to the server to post the record*/
    sendEncounterData: function() {
        var t = Util.Datetime(new Date(), Util.getUTCGMTdiff());
        // creates the encounter json object
        var jsonencounter = Ext.create('Registration.model.encounterModel', {
            encounterDatetime: t,
            patient: localStorage.newPatientUuid,
            //you will get the uuid from ticket 144...pass it here
            encounterType: localStorage.regUuidencountertype //need to pass the type depending on the type of encounter
        });
        // the 3 fields "encounterDatetime, patient, encounterType" are obligatory fields rest are optional
        var location = "Registration Desk";
        var provider1 = "";
        var orders1 = "";
        jsonencounter.data.obs = [];
        jsonencounter.data.provider = [];
        jsonencounter.data.orders = [];
        // the if statement is to check whether the field is null or not..persist false does not pass that field details into the server. this is done to avoid 500 error
        // here I am checking that if a field is null then It should not be send in request payload in post call so I am dynamically changing persist to false
        if(location !== "") {
            jsonencounter.data.location = location;
            Registration.model.encounterModel.getFields()[3].persist = true;
        } else {
            Registration.model.encounterModel.getFields()[3].persist = false;
        }
        if(provider1 !== "") {
            jsonencounter.data.provider = provider1;
            Registration.model.encounterModel.getFields()[4].persist = true;
            //should create an instance of the provider model and push it to the empthy array created...for example see the height instance in obs
        } else {
            Registration.model.encounterModel.getFields()[4].persist = false;
        }
        if(orders1 !== "") {
            jsonencounter.data.orders = orders1;
            Registration.model.encounterModel.getFields()[5].persist = true;
        } else {
            Registration.model.encounterModel.getFields()[5].persist = false;
        }

        
        var observationTypes = ['heightIDcm', 'weightIDkg', 'bmiNumberfieldID', 'registrationFeesPaid', 'complaintArea'];
        var shouldSubmitObs = false;
        for (var i=0; i < observationTypes.length; i++) {
            var cmp = Ext.getCmp(observationTypes[i]);
            if (cmp.isValid() && cmp.value !== null) {
                shouldSubmitObs = true;
                break;
            }
        }

        if(shouldSubmitObs) {
            Registration.model.encounterModel.getFields()[6].persist = true;
        } else {
            Registration.model.encounterModel.getFields()[6].persist = false;
        }

        //POST Encounter with no observation if called immediately after creating Patient. (RAXAJSS-386)
        if(arguments[0] != 'send no obs') {
            // TODO: Refactor ...

            
            // function validateAndAddObs(componentId, personUuid, conceptUuid) {
            //     if(this._isOkToSendByREST()) {
            //         console.log("pushing obs for component: '" + componentId + "'");
            //         var val = Ext.getCmp(componentId).getValue();
            //         if (type == "int") { 
            //             val = parseInt(val); 
            //         } else if (type == "float") { 
            //             val = parseFloat(val);
            //         }

            //         var o = Ext.create('Registration.model.obsModel', {
            //             obsDatetime: t,
            //             person: personUuid,
            //             concept: conceptUuid,
            //             value: val
            //         });
            //         jsonencounter.data.obs.push(o.data);
            //     }
            // }
            //
            // validateAndAddObs('heightIDcm', localStorage.newPatientUuid, localStorage.heightUuidconcept, date());
                
            // {
            //     {
            //         id : '',
            //         type : 'string'
            //     },
            //     {

            //     }
            // }

            //get the values of each obs from the bmi or registration field
            if(this._isOkToSendByREST('heightIDcm')) {
                console.log("pushing obs.. heightIDcm");
                var jsonencounterheight = Ext.create('Registration.model.obsModel', {
                    obsDatetime: t,
                    person: localStorage.newPatientUuid,
                    concept: localStorage.heightUuidconcept,
                    value: parseInt(Ext.getCmp('heightIDcm').getValue())
                });
                jsonencounter.data.obs.push(jsonencounterheight.data);
            }
            if(this._isOkToSendByREST('weightIDkg')) {
                console.log("pushing obs.. weightIDkg");
                var jsonencounterweight = Ext.create('Registration.model.obsModel', {
                    obsDatetime: t,
                    person: localStorage.newPatientUuid,
                    concept: localStorage.weightUuidconcept,
                    value: parseFloat(Ext.getCmp('weightIDkg').getValue())
                });
                jsonencounter.data.obs.push(jsonencounterweight.data);
            }
            if(this._isOkToSendByREST('bmiNumberfieldID')) {
                console.log("pushing obs.. bmiNumberfieldID");
                var jsonencounterbmi = Ext.create('Registration.model.obsModel', {
                    obsDatetime: t,
                    person: localStorage.newPatientUuid,
                    concept: localStorage.bmiUuidconcept,
                    value: parseFloat(Ext.getCmp('bmiNumberfieldID').getValue())
                });
                jsonencounter.data.obs.push(jsonencounterbmi.data);
            }
            if(this._isOkToSendByREST('registrationFeesPaid')) {
                console.log("pushing obs.. registrationFeesPaid");
                var jsonencounterregfee = Ext.create('Registration.model.obsModel', {
                    obsDatetime: t,
                    person: localStorage.newPatientUuid,
                    concept: localStorage.regfeeUuidconcept,
                    value: Ext.getCmp('registrationFeesPaid').value
                });
                jsonencounter.data.obs.push(jsonencounterregfee.data);
            }
            if(this._isOkToSendByREST('complaintArea')) {
                console.log("pushing obs.. complaintArea");
                var jsonencountercomplaint = Ext.create('Registration.model.obsModel', {
                    obsDatetime: t,
                    person: localStorage.newPatientUuid,
                    concept: localStorage.regcomplaintUuidconcept,
                    value: Ext.getCmp('complaintArea').value
                });
                jsonencounter.data.obs.push(jsonencountercomplaint.data);
            }
            if(localStorage.patientImageTaken=="true") {
                console.log("pushing obs.. patientImage");
                var jsonencountercomplaint = Ext.create('Registration.model.obsModel', {
                    obsDatetime: t,
                    person: localStorage.newPatientUuid,
                    concept: localStorage.patientImageUuidconcept,
                    value: localStorage.patientImage
                });
                jsonencounter.data.obs.push(jsonencountercomplaint.data);
            }
        }

        var store = Ext.create('Registration.store.encounterStore');
        store.add(jsonencounter);
        store.sync({
            scope: this,
            success: function() {
                Ext.Msg.alert('Encounter saved successfully.');
                this._resetNewPatientRegistrationForm();
                if(localStorage.getItem('navigation') === 'New Registration') {
                    Ext.getCmp('mainRegArea').getLayout().setActiveItem(REG_PAGES.REG_1.value);
                } else {
                    Ext.getCmp('mainRegArea').getLayout().setActiveItem(REG_PAGES.HOME.value);
                }
                localStorage.setItem('printtaken', false);
            },
            failure: function() {
                Ext.Msg.alert("Error", Util.getMessageSyncError());
            }
        });
        return store;

    },

    // Checks if would send values such as "" or undefined, which cause whole REST call
    // to be rejected by OpenMRS REST WebServices module
    _isOkToSendByREST: function(componentId) {
        var cmp = Ext.getCmp(componentId);
        if (!cmp.isValid() || cmp.value === null || cmp.value === "" || cmp.value === undefined) {
            return false;
        } else {
            return true;
        }
    },

    //Warns user if he is pressing Submit without printing card
    checkPrintedCard: function() {
        var printtaken = localStorage.getItem('printtaken');
        if(printtaken == 'true') {
            this.sendEncounterData();
        } else {
            Ext.Msg.confirm("Confirmation", "Are you sure you want to submit without printing card?", function(btn) {
                if(btn === 'yes') {
                    this.sendEncounterData();
                }
            }, this);
        }
    },

    //function which reset all the fields in new patient registertation form
    _resetNewPatientRegistrationForm: function() {
        // TODO: https://raxaemr.atlassian.net/browse/RAXAJSS-613            
        var fields = ['oldPatientIdentifier', 'patientFirstName', 'patientLastName', 'patientFirstNameHindi', 'patientLastNameHindi', 'relativeFirstName', 'relativeLastName', 'patientAge', 'dob', 'street', 'town', 'residentialArea', 'tehsil', 'district', 'state', 'patientPrimaryContact', 'patientSecondaryContact', 'education', 'caste', 'occupation', 'complaintArea', 'heightIDcm', 'weightIDkg', 'bmiNumberfieldID'];

        for(var i = 0; i < fields.length; i++) {
            Ext.getCmp(fields[i]).reset();
        }
        
        localStorage.setItem('patientImageTaken', false);
        document.getElementById('ConfirmedPatientImage').src= "../resources/img/camera.png";
    },
    
    takePhoto: function() {
    if(!Ext.getCmp('photo'))
	{
		Ext.create('Ext.window.Window', {
		id: 'photo',
		title: 'Taking Photo',
		height: 500,
		width: 700,
		modal:true,
		layout: 'fit',
		    loader : {
		    url : "app/patientImageBooth.html",
		    loadMask : false,
		    scripts: true,
		    autoLoad : true,
		    renderer : 'html'
		},
	}).show();
	}
	else
	{
		Ext.getCmp('photo').show();
	}
}
});
