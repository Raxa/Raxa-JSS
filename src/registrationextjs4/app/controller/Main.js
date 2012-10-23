Ext.define('Registration.controller.Main', {
    extend: 'Ext.app.Controller',
    id: 'main',
    views: ['Viewport', 'Home', 'RegistrationPart1', 'RegistrationConfirm', 'IllnessDetails', 'RegistrationBMI', 'SearchPart1', 'SearchPart2', 'SearchConfirm'],
    stores: ['Person', 'identifiersType', 'location', 'patient', 'obsStore', 'encounterStore', 'orderStore', 'providerStore', 'Doctors', 'autoCompleteAddress'],
    models: ['Person', 'addresses', 'names', 'patient', 'identifiers', 'attributes', 'obsModel', 'encounterModel', 'orderModel', 'providerModel', 'Doctor', 'AttributeType'],

    init: function() {
        // connect the actions to eventHandlers
        this.control({
            "registrationpart1 button[action=continue]": {
                click: this.confirmPage
            },
            "registrationpart1 button[action=cancel]": {
                click: this.cancel
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
        var l = Ext.getCmp('mainRegArea').getLayout();

        // Check if all the required fields are non-empty or not
        if(Ext.getCmp('patientFirstName').isValid() && Ext.getCmp('patientLastName').isValid() && Ext.getCmp('relativeFirstName').isValid() && Ext.getCmp('relativeLastName').isValid() && Ext.getCmp('residentialArea').isValid() && Ext.getCmp('street').isValid() && Ext.getCmp('town').isValid() && Ext.getCmp('patientPrimaryContact').isValid() && Ext.getCmp('patientSecondaryContact').isValid()) {
            if(Ext.getCmp('patientAge').isValid() || Ext.getCmp('dob').isValid()) {
                l.setActiveItem(REG_PAGES.REG_CONFIRM.value);
                Util.KeyMapButton('submitButton', Ext.EventObject.ENTER);
            } else {
                Ext.Msg.alert('Please enter Age or DOB of the patient');
            }

        } else {
            Ext.Msg.alert("Fields invalid - enter patient name and age");
        }

        // Copies all fields from registration form to confirmation screen
        Ext.getCmp('oldPatientIdentifierConfirm').setText(Ext.getCmp('oldPatientIdentifier').value);
        Ext.getCmp('patientNameConfirm').setText(Ext.getCmp('patientFirstName').value + " " + Ext.getCmp('patientLastName').value);
        Ext.getCmp('patientNameHindiConfirm').setText((Ext.getCmp('patientFirstNameHindi').value || "") + " " + (Ext.getCmp('patientLastNameHindi').value || ""));
        Ext.getCmp('relativeNameConfirm').setText((Ext.getCmp('relativeFirstName').value || "") + " " + (Ext.getCmp('relativeLastName').value || ""));
        Ext.getCmp('ageConfirm').setText(Ext.getCmp('patientAge').value || "");
        Ext.getCmp('sexConfirm').setText(Ext.getCmp('sexRadioGroup').getChecked()[0].boxLabel);
        Ext.getCmp('educationConfirm').setText(Ext.getCmp('education').value);
        Ext.getCmp('casteConfirm').setText(Ext.getCmp('caste').value);
        Ext.getCmp('occupationConfirm').setText(Ext.getCmp('occupation').value);
        Ext.getCmp('religionConfirm').setText(Ext.getCmp('religion').value);
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
        Ext.getCmp('submitButton').disable();

        // By default, just include "regular" name
        var patientNames = [{
            givenName: Ext.getCmp('patientFirstName').value,
            familyName: Ext.getCmp('patientLastName').value
        }];

        // Add Hindi name IFF it exists
        var firstNameHindi = Ext.getCmp('patientFirstNameHindi').value || "";
        var lastNameHindi = Ext.getCmp('patientLastNameHindi').value || "";
        if(firstNameHindi !== "" && lastNameHindi !== "") {
            patientNames.push({
                givenName: firstNameHindi,
                familyName: lastNameHindi
            });
        }

        //creating the json object to be made
        var jsonperson = Ext.create('Registration.model.Person', {
            gender: Ext.getCmp('sexRadioGroup').getChecked()[0].boxLabel.charAt(0),
            names: patientNames,
            addresses: [{
                address1: Ext.getCmp('street').value,
                address2: Ext.getCmp('residentialArea').value,
                address3: Ext.getCmp('tehsil').value,
                cityVillage: Ext.getCmp('town').value,
                stateProvince: Ext.getCmp('state').value,
                countyDistrict: Ext.getCmp('district').value
            }],
            attributes: [{
                value: Ext.getCmp('relativeFirstName').value + " " + Ext.getCmp('relativeLastName').value,
                attributeType: localStorage.primaryRelativeUuidpersonattributetype
            }]
        });
        //this if else statement change the persist property of age field in Person model so that if its
        //empty it should not be sent to server in the body of post call
        if(Ext.getCmp('patientAge').isValid()) {
            jsonperson.data.age = Ext.getCmp('patientAge').value;
            Registration.model.Person.getFields()[2].persist = true;
        } else {
            Registration.model.Person.getFields()[2].persist = false;
        }
        if(Ext.getCmp('dob').isValid()) {
            jsonperson.data.birthdate = Ext.getCmp('dob').value;
            Registration.model.Person.getFields()[3].persist = true;
        } else {
            Registration.model.Person.getFields()[3].persist = false;
        }
        if(Ext.getCmp('oldPatientIdentifier').getValue() !== null) {
            jsonperson.data.attributes.push({
                value: Ext.getCmp('oldPatientIdentifier').getValue(),
                //the attributeType will change if we change the server so change them if server changes
                attributeType: localStorage.oldPatientIdentificationNumberUuidpersonattributetype
            });
        }
        if(Ext.getCmp('caste').getValue() !== null) {
            jsonperson.data.attributes.push({
                value: Ext.getCmp('caste').getValue(),
                attributeType: localStorage.casteUuidpersonattributetype
            });
        }
        if(Ext.getCmp('education').getValue() !== null) {
            jsonperson.data.attributes.push({
                value: Ext.getCmp('education').getValue(),
                attributeType: localStorage.educationUuidpersonattributetype
            });
        }
        if(Ext.getCmp('occupation').getValue() !== null) {
            jsonperson.data.attributes.push({
                value: Ext.getCmp('occupation').getValue(),
                attributeType: localStorage.occupationUuidpersonattributetype
            });
        }
        if(Ext.getCmp('religion').getValue() !== null) {
            jsonperson.data.attributes.push({
                value: Ext.getCmp('religion').getValue(),
                attributeType: localStorage.religionUuidpersonattributetype
            });
        }
        if(Ext.getCmp('tehsil').getValue() !== "") {
            jsonperson.data.attributes.push({
                value: Ext.getCmp('tehsil').getValue(),
                attributeType: localStorage.tehsilUuidpersonattributetype
            });
        }
        if(Ext.getCmp('district').getValue() !== "") {
            jsonperson.data.attributes.push({
                value: Ext.getCmp('district').getValue(),
                attributeType: localStorage.districtUuidpersonattributetype
            });
        }
        if(Ext.getCmp('patientPrimaryContact').getValue() !== null) {
            jsonperson.data.attributes.push({
                value: Ext.getCmp('patientPrimaryContact').getValue(),
                attributeType: localStorage.primaryContactUuidpersonattributetype
            });
        }
        if(Ext.getCmp('patientSecondaryContact').getValue() !== null) {
            jsonperson.data.attributes.push({
                value: Ext.getCmp('patientSecondaryContact').getValue(),
                attributeType: localStorage.secondaryContactUuidpersonattributetype
            });
        }
        var store = Ext.create('Registration.store.Person');
        store.add(jsonperson);
        // this statement makes the post call to make the person
        store.sync({
            success: function() {
                this.getidentifierstype(store.getAt(0).getData().uuid);
                localStorage.setItem('navigation', 'New Registration');
            },
            failure: function() {
                Ext.Msg.alert("Failure -- Please try again");
                Ext.getCmp('submitButton').enable();
            },
            scope: this
        });

        //I made this function return this store because i needed this in jasmine unit test
        return store;
    },

    /* this functions makes a get call to get the patient identifiers type */
    getidentifierstype: function(personUuid) {
        var identifiers = Ext.create('Registration.store.identifiersType');
        identifiers.load({
            scope: this,
            callback: function(records, operation, success) {
                if(success) {
                    var idIterator;
                    var idNo = 0;
                    for(idIterator = 0; idIterator < identifiers.data.length; idIterator++) {
                        var str = identifiers.data.items[idIterator].raw.name;
                        if(str.match(idPattern)) {
                            idNo = idIterator;
                        }
                    }
                    //get default identifier if 'RaxaEMR Identification No' isn't in the system
                    var identifierType = identifiers.getAt(idNo).getData().uuid;
                    this.getlocation(personUuid, identifierType);
                } else {
                    Ext.Msg.alert("Failure -- Please try again");
                    Ext.getCmp('submitButton').enable();
                }
            }
        });
    },

    /* this functions makes a get call to get the location uuid */
    getlocation: function(personUuid, identifierType) {
        var locations = Ext.create('Registration.store.location');
        locations.load({
            scope: this,
            callback: function(records, operation, success) {
                if(success) {
                    var foundLocation = false;
                    for(var idIterator = 0; idIterator < locations.data.length; idIterator++) {
                        var str = locations.data.items[idIterator].raw.display;

                        if(str.toLowerCase().indexOf(Ext.getCmp('centreId').getValue().toLowerCase()) !== -1 && !foundLocation) {
                            this.makePatient(personUuid, identifierType, locations.getAt(idIterator).getData().uuid);
                            foundLocation = true;
                        }
                    }
                    if(!foundLocation) {
                        Ext.Msg.alert('Please select a centre location');
                        Ext.getCmp('submitButton').enable();
                    }
                } else {
                    Ext.Msg.alert("Failure -- Please try again");
                    Ext.getCmp('submitButton').enable();
                }
            }
        });
    },

    // Makes a post call to creat the patient with three parameter which will sent as person, identifiertype and location
    makePatient: function(personUuid, identifierType, location) {
        localStorage.setItem('newPatientUuid', personUuid);
        // creating the model for posting of patient
        var patient = Ext.create('Registration.model.patient', {
            person: personUuid,
            identifiers: [{
                identifier: Util.getPatientIdentifier(Ext.getCmp('centreId').getValue()),
                identifierType: identifierType,
                location: location,
                preferred: true
            }]
        });
        // setting the patientid and paient name fields in bmi screen
        Ext.getCmp('bmiPatientID').setValue(patient.getData().identifiers[0].identifier);
        Ext.getCmp('bmiPatientName').setValue(Ext.getCmp('patientNameConfirm').text);

        //creating store for posting the patient
        var PatientStore = Ext.create('Registration.store.patient');
        PatientStore.add(patient);

        //makes the post call for creating the patient
        PatientStore.sync({
            success: function() {
                var l = Ext.getCmp('mainRegArea').getLayout();
                l.setActiveItem(REG_PAGES.ILLNESS_DETAILS.value);
                Ext.getCmp('submitButton').enable();
            },
            failure: function() {
                Ext.Msg.alert("Failure -- Please check old id number and subcentre location");
                Ext.getCmp('submitButton').enable();
            }
        });

        //this function return this store because i needed this in jasmine unit test
        return PatientStore;
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
        var fields = ['oldPatientIdentifier', 'patientFirstName', 'patientLastName', 'patientFirstNameHindi', 'patientLastNameHindi', 'relativeFirstName', 'relativeLastName', 'patientAge', 'dob', 'street', 'town', 'residentialArea', 'tehsil', 'district', 'state', 'patientPrimaryContact', 'patientSecondaryContact', 'education', 'caste', 'occupation', 'religion', 'complaintArea', 'heightIDcm', 'weightIDkg', 'bmiNumberfieldID'];

        for(var i = 0; i < fields.length; i++) {
            Ext.getCmp(fields[i]).reset();
        }
    },
});