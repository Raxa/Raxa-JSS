Ext.define('Registration.controller.Main', {
    extend: 'Ext.app.Controller',
    id: 'main', 
    views: ['Viewport', 'Home', 'RegistrationPart1', 'RegistrationConfirm', 'RegistrationBMI',
    'SearchPart1', 'SearchPart2', 'SearchConfirm'],
    stores: ['Person', 'identifiersType', 'location', 'patient', 'obsStore', 'encounterStore', 'orderStore', 'providerStore'],
    models: ['Person', 'addresses', 'names', 'patient', 'identifiers', 'attributes', 'obsModel', 'encounterModel', 'orderModel', 'providerModel'],
        
    init: function () {
        this.control({
            //clicking continue button on registraion form 2 calls continue()
            "registrationpart1 button[action=continue]": {
                click: this.Continue
            },
            //clicking cancel button on registraion form 2 calls cancel()
            "registrationpart1 button[action=cancel]": {
                click: this.cancel
            },
            //clicking cancel button on confirmation screen calls cancel()
            "registrationconfirm button[action=cancel]": {
                click: this.cancel
            },
            //clicking submit button on confirmation screen calls submit()
            "registrationconfirm button[action=submit]": {
                click: this.submit
            },
            'home button[action=register]': {
                click: this.registerPatient
            },
            'home button[action=search]': {
                click: this.searchPatient
            },
            'registrationbmi button[action=bmiSubmit]': {
                click: this.sendEncounterData
            }
        })
    },
    
    registerPatient: function() {
        var l = Ext.getCmp('mainRegArea').getLayout();
        l.setActiveItem(REG_PAGES.REG_1.value); //Going to Registration Part-1 Page
	  Util.KeyMapButton('continuebutton',Ext.EventObject.ENTER);
    },
    
    
    
    searchPatient: function() {
        var l = Ext.getCmp('mainRegArea').getLayout();
        l.setActiveItem(REG_PAGES.SEARCH_1.value); //Going to Search Part-1 Page
        Util.KeyMapButton('searchbutton1',Ext.EventObject.ENTER);
    },
    /* continue function copy values of all fields from registrations form to the fields in confirmation screen */
    Continue: function () {
        
	  var l = Ext.getCmp('mainRegArea').getLayout();
        // if condition that check if all the required fields are non-empty or not
        if (Ext.getCmp('block').isValid() && Ext.getCmp('street').isValid() && Ext.getCmp('town').isValid() && Ext.getCmp('phoneContactInformation').isValid() && Ext.getCmp('patientPrimaryContact').isValid() && Ext.getCmp('patientSecondaryContact').isValid()) {
            l.setActiveItem(REG_PAGES.REG_CONFIRM.value);
            Util.KeyMapButton('submitbutton',Ext.EventObject.ENTER);
        } else alert("Fields invalid");
        //copies all fields from registration form to confirmation screen
        Ext.getCmp('oldPatientIdentifierConfirm').setValue(Ext.getCmp('oldPatientIdentifier').value);
        Ext.getCmp('patientNameConfirm').setValue(Ext.getCmp('patientFirstName').value + " " + Ext.getCmp('patientLastName').value);
        Ext.getCmp('relativeNameConfirm').setValue(Ext.getCmp('relativeFirstName').value + " " + Ext.getCmp('relativeLastName').value);
        Ext.getCmp('ageConfirm').setValue(Ext.getCmp('patientAge').value);
        Ext.getCmp('sexConfirm').setValue(Ext.getCmp('sexRadioGroup').getChecked()[0].boxLabel);
        Ext.getCmp('educationConfirm').setValue(Ext.getCmp('education').value);
//		This was causing a bug, as none of the fields after this line were copied to confirmation page
//      Ext.getCmp('casteConfirm').setValue(Ext.getCmp('caste').value);
        Ext.getCmp('occupationConfirm').setValue(Ext.getCmp('occupation').value);
        Ext.getCmp('blockConfirm').setValue(Ext.getCmp('block').value);
        Ext.getCmp('stretConfirm').setValue(Ext.getCmp('street').value);
        if (Ext.getCmp('phoneContactInformation').getChecked().length > 0) Ext.getCmp('phoneConfirm').setValue(Ext.getCmp('phoneContactInformation').getChecked()[0].boxLabel)
        Ext.getCmp('patientPrimaryContactNumberConfirm').setValue(Ext.getCmp('patientPrimaryContact').value);
        Ext.getCmp('patientSecondaryContactNumberConfirm').setValue(Ext.getCmp('patientSecondaryContact').value);
        Ext.getCmp('townConfirm').setValue(Ext.getCmp('town').value);
        Ext.getCmp('tehsilConfirm').setValue(Ext.getCmp('tehsil').value);
        Ext.getCmp('districtConfirm').setValue(Ext.getCmp('district').value);
    },

    /* this function return to home screen */
    cancel: function () {
	  Util.DestoryKeyMapButton(Ext.EventObject.ENTER);
        //return to home screen
        var l = Ext.getCmp('mainRegArea').getLayout();
        l.setActiveItem(REG_PAGES.HOME.value); //going to home page
        //reset all the fields in registration form
        Ext.getCmp('patientFirstName').reset()
        Ext.getCmp('patientLastName').reset()
        Ext.getCmp('relativeFirstName').reset()
        Ext.getCmp('relativeLastName').reset()
        Ext.getCmp('sexRadioGroup').reset()
        Ext.getCmp('education').reset()
        Ext.getCmp('dob').reset()
        Ext.getCmp('patientAge').reset()
        Ext.getCmp('caste').reset()
        Ext.getCmp('occupation').reset()
        Ext.getCmp('block').reset()
        Ext.getCmp('street').reset()
        Ext.getCmp('town').reset()
        Ext.getCmp('tehsil').reset()
        Ext.getCmp('district').reset()
        Ext.getCmp('phoneContactInformation').reset()
        Ext.getCmp('patientPrimaryContact').reset()
        Ext.getCmp('patientSecondaryContact').reset()
        Ext.getCmp('oldPatientIdentifier').reset()
    },

    /* this function makes the post call for making the person */
    submit: function () {
	
        //creating the json object to be made
        var jsonperson = Ext.create('Registration.model.Person', {
            gender: Ext.getCmp('sexRadioGroup').getChecked()[0].boxLabel.charAt(0),
            names: [{
                givenName: Ext.getCmp('patientFirstName').value,
                familyName: Ext.getCmp('patientLastName').value
            }],
            addresses: [{
                address1: Ext.getCmp('block').value,
                address2: Ext.getCmp('street').value,
                cityVillage: Ext.getCmp('town').value,
            }]
        //right now there is bug in openmrs server due to which sending attributes with body of 
        //post call leads to 500 response status so right now I am commenting it for
        /*  attributes : [{
                value : Ext.getCmp('relativeFirstName').value,            
                attributeType : '88b65382-496f-4789-b200-f01985e609e5'  
            }, {
                value : Ext.getCmp('relativeLastName').value,
                attributeType : '606157e9-e2d9-454d-bef4-27a56b3da953'
            }]*/
        })
        //this if else statement change the persist property of age field in Person model so that if its
        //empty it should not be sent to server in the body of post call
        if (Ext.getCmp('patientAge').isValid()) {
            jsonperson.data.age = Ext.getCmp('patientAge').value;
            Registration.model.Person.getFields()[2].persist = true;
        } else {
            Registration.model.Person.getFields()[2].persist = false;
        }
        if (Ext.getCmp('dob').isValid()) {
            jsonperson.data.birthdate = Ext.getCmp('dob').value;
            Registration.model.Person.getFields()[3].persist = true;
        } else {
            Registration.model.Person.getFields()[3].persist = false;
        }

        //the following fields are commented because they are the part of attribute
        //TODO: removes this comments atfer the server is updated to latest one
        /*  if(Ext.getCmp('oldPatientIdentifier').getValue() != null){
            jsonperson.data.attributes.push({
                value : Ext.getCmp('oldPatientIdentifier').getValue(),
                //the attributeType will change if we change the server so change them if server changes
                attributeType : 'c2d25bfc-a682-420f-8f38-27582947d4f9'      
            })
        }
        if(Ext.getCmp('caste').getValue() != null){
            jsonperson.data.attributes.push({
                value : Ext.getCmp('caste').getValue(),
                attributeType : '76f7e5db-09dc-47b6-8f30-507ba628bdae'
            })
        }
        if(Ext.getCmp('education').getValue() != null){
            jsonperson.data.attributes.push({
                value : Ext.getCmp('education').getValue(),
                attributeType : '76f7e5db-09dc-47b6-8f30-507ba628bdae'
            })
        }
        if(Ext.getCmp('occupation').getValue() != null){
            jsonperson.data.attributes.push({
                value : Ext.getCmp('occupation').getValue(),
                attributeType : '93c98870-9aa6-4bed-a6cc-9e3112b99cb6'
            })
        }
        if(Ext.getCmp('tehsil').getValue() != ""){
            jsonperson.data.attributes.push({
                value : Ext.getCmp('tehsil').getValue(),
                attributeType : 'eb877b53-3b32-43d2-bb51-a2f85d527d91'
            })
        }
        if(Ext.getCmp('district').getValue() != ""){
            jsonperson.data.attributes.push({
                value : Ext.getCmp('district').getValue(),
                attributeType : '651075c9-b458-4143-88cc-8251b0995e82'
            })
        }
        if(Ext.getCmp('phoneContactInformation').getChecked().length > 0){
            if(Ext.getCmp('phoneContactInformation').getChecked()[0].boxLabel == "Yes"){
                jsonperson.data.attributes.push({
                    value : true,
                    attributeType : '471eb88e-facf-4d37-89e0-c3eda3c767bc'
                })
            }
            else {
                jsonperson.data.attributes.push({
                    value : false,
                    attributeType : '471eb88e-facf-4d37-89e0-c3eda3c767bc'
                })
            }
        }
        if(Ext.getCmp('patientPrimaryContact').getValue() != null){
            jsonperson.data.attributes.push({
                value : Ext.getCmp('patientPrimaryContact').getValue(),
                attributeType : '0e912add-2937-41e9-b192-d8ac77533c85'
            })
        }
        if(Ext.getCmp('patientSecondaryContact').getValue() != null){
            jsonperson.data.attributes.push({
                value : Ext.getCmp('patientSecondaryContact').getValue(),
                attributeType : '27124172-690f-44fa-8017-bc3fc3fb7df2'
            })
        }*/
        var store = Ext.create('Registration.store.Person');
        store.add(jsonperson);
        // this statement makes the post call to make the person
        store.sync();
        // this statement calls getifentifiers() as soon as the post call is successful
        store.on('write', function () {
            this.getidentifierstype(store.getAt(0).getData().uuid)
        }, this)
        //I made this function return this store because i needed this in jasmine unit test
        return store;
    },

    /* this functions makes a get call to get the patient identifiers type */
    getidentifierstype: function (personUuid) {
        var identifiers = Ext.create('Registration.store.identifiersType')
        identifiers.load();
        // this statement calls getlocation() as soon as the get call is successful
        identifiers.on('load', function () {
            var idIterator;
            var idNo = -1;
            for (idIterator = 0; idIterator < identifiers.data.length; idIterator++) {
                var str = identifiers.data.items[idIterator].raw.display;
                if (str.match(idPattern)) {
                    idNo = idIterator;
                }
            }
            if (idNo === -1) {
                this.getlocation(personUuid, identifiers.getAt(0).getData().uuid);
            } else {
                // this statement calls getlocation() as soon as the get call is successful
                this.getlocation(personUuid, identifiers.getAt(idNo).getData().uuid);
            }
        }, this);
    },

    /* this functions makes a get call to get the location uuid */
    getlocation: function (personUuid, identifierType) {
        var locations = Ext.create('Registration.store.location')
        locations.load();
        // this statement calls makePatient() as soon as the get call is successful
        locations.on('load', function () {
            this.makePatient(personUuid, identifierType, locations.getAt(0).getData().uuid)
            var l = Ext.getCmp('mainRegArea').getLayout();
            l.setActiveItem(REG_PAGES.REG_BMI.value); 
        }, this)
    },

    /* this functions makes a post call to creat the patient with three parameter which will sent as person, identifiertype 
       and loaction */
    makePatient: function (personUuid, identifierType, location) {
        localStorage.setItem('newPatientUuid',personUuid)
        // creating the model for posting of patient
        var patient = Ext.create('Registration.model.patient', {
            person: personUuid,
            identifiers: [{
                identifier: Util.getPatientIdentifier(),
                identifierType: identifierType,
                location: location,
                preferred: true
            }]
        });
        // setting the patientid and paient name fields in bmi screen
        Ext.getCmp('bmiPatientID').setValue(patient.getData().identifiers[0].identifier);
        Ext.getCmp('bmiPatientName').setValue(Ext.getCmp('patientNameConfirm').getValue());
        //creating store for posting the patient
        var PatientStore = Ext.create('Registration.store.patient')
        PatientStore.add(patient);
        //makes the post call for creating the patient
        PatientStore.sync();
        //I made this function return this store because i needed this in jasmine unit test
        PatientStore.on('load', function () {
            // going to BMI page
            var l = Ext.getCmp('mainRegArea').getLayout();
            l.setActiveItem(REG_PAGES.REG_BMI.value); 
        }, this)
        //this function return this store because i needed this in jasmine unit test
        return PatientStore;
    },
    // for now the function is called when the emergency button is pressed since the views were not completed
    
    /*creates the json object of the encounter needed to be passed to the server and sends it to the server to post the record*/
    sendEncounterData: function(){
        var t = Util.Datetime(new Date(), Util.getUTCGMTdiff());
        // creates the encounter json object
        var jsonencounter = Ext.create('Registration.model.encounterModel',{
            encounterDatetime : t,
            patient: localStorage.newPatientUuid,//you will get the uuid from ticket 144...pass it here
            encounterType: localStorage.regUuidencountertype//need to pass the type depending on the type of encounter
        });
        // the 3 fields "encounterDatetime, patient, encounterType" are obligatory fields rest are optional
        var location ="Registration Desk";
        var provider1 = "";
        var orders1 = "";
        jsonencounter.data.obs = [];
        jsonencounter.data.provider = [];
        jsonencounter.data.orders = [];
        // the if statement is to check whether the field is null or not..persist false does not pass that field details into the server. this is done to avoid 500 error
        // here I am checking that if a field is null then It should not be send in request payload in post call so I am dynamically changing persist to false
        if(location != ""){
            jsonencounter.data.location = location;
            Registration.model.encounterModel.getFields()[3].persist = true;
        }
        else{
            Registration.model.encounterModel.getFields()[3].persist = false;
        }
        if(provider1 != ""){
            jsonencounter.data.provider = provider1;
            Registration.model.encounterModel.getFields()[4].persist = true;
        //should create an instance of the provider model and push it to the empthy array created...for example see the height instance in obs
        }
        else{
            Registration.model.encounterModel.getFields()[4].persist = false;
        }
        if(orders1 != ""){
            jsonencounter.data.orders = orders1;
            Registration.model.encounterModel.getFields()[5].persist = true;
        }
        else{
            Registration.model.encounterModel.getFields()[5].persist = false;
        }
        
        if((Ext.getCmp('heightIDcm').isValid() && Ext.getCmp('heightIDcm').value != null)||(Ext.getCmp('weightIDkg').isValid() && Ext.getCmp('weightIDkg').value != null)||(Ext.getCmp('bmiNumberfieldID').isValid() && Ext.getCmp('bmiNumberfieldID').value != null)||(Ext.getCmp('registrationfeespaid').isValid() && Ext.getCmp('registrationfeespaid').value != null))
        {
            Registration.model.encounterModel.getFields()[6].persist = true;
        }
        else{
            Registration.model.encounterModel.getFields()[6].persist = false;
        }
        //get the values of each obs from the bmi or registration field
        if(Ext.getCmp('heightIDcm').isValid() && Ext.getCmp('heightIDcm').value != null){
            var jsonencounterheight = Ext.create('Registration.model.obsModel',{
                obsDatetime : t,
                person: localStorage.newPatientUuid,
                concept: localStorage.heightUuidconcept,
                value: parseInt(Ext.getCmp('heightIDcm').getValue())
            });
            jsonencounter.data.obs.push(jsonencounterheight.data);
        }
        if(Ext.getCmp('weightIDkg').isValid() && Ext.getCmp('weightIDkg').value != null){
            var jsonencounterweight = Ext.create('Registration.model.obsModel',{
                obsDatetime : t,
                person: localStorage.newPatientUuid,
                concept: localStorage.weightUuidconcept,
                value: parseFloat(Ext.getCmp('weightIDkg').getValue())
            });
            jsonencounter.data.obs.push(jsonencounterweight.data);
        }
        if(Ext.getCmp('bmiNumberfieldID').isValid() && Ext.getCmp('bmiNumberfieldID').value != null){
            var jsonencounterbmi = Ext.create('Registration.model.obsModel',{
                obsDatetime : t,
                person: localStorage.newPatientUuid,
                concept: localStorage.bmiUuidconcept,
                value: parseFloat(Ext.getCmp('bmiNumberfieldID').getValue())
            });
            jsonencounter.data.obs.push(jsonencounterbmi.data);
        }
        if(Ext.getCmp('registrationfeespaid').isValid() && Ext.getCmp('registrationfeespaid').value != null){
            var jsonencounterregfee = Ext.create('Registration.model.obsModel',{
                obsDatetime : t,
                person: localStorage.newPatientUuid,
                concept: localStorage.regfeeUuidconcept,
                value: Ext.getCmp('registrationfeespaid').value
            });
            jsonencounter.data.obs.push(jsonencounterregfee.data);
        }
        var store = Ext.create('Registration.store.encounterStore');
        store.add(jsonencounter);
        store.sync();
        store.on('write', function () {
            Ext.Msg.alert('Encounter saved successfully.');
            this.cancel();
        }, this)
        return store;
    }
});
