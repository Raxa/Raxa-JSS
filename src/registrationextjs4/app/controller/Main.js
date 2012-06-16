Ext.define('Registration.controller.Main', {
    extend: 'Ext.app.Controller',
    id: 'main',
    views: ['RegistrationPart1', 'RegistrationPart2', 'Home', 'Viewport', 'RegistrationConfirm', 'RegistrationBMI'],
    stores: ['Person', 'identifiersType', 'location', 'patient'],
    models: ['Person', 'addresses', 'names', 'patient', 'identifiers', 'attributes'],
    init: function () {
        this.control({
            //clicking next button on registraion form 1 calls next()
            "registrationpart1 button[action=next]": {
                click: this.next
            },
            //clicking reset button on registraion form 1 calls reset()
            "registrationpart1 button[action=reset]": {
                click: this.reset
            },
            //clicking continue button on registraion form 2 calls continue()
            "registrationpart2 button[action=continue]": {
                click: this.Continue
            },
            //clicking cancel button on registraion form 2 calls cancel()
            "registrationpart2 button[action=cancel]": {
                click: this.cancel
            },
            //clicking back button on registraion form 2 calls back()
            "registrationpart2 button[action=back]": {
                click: this.back
            },
            //clicking cancel button on confirmation screen calls cancel()
            "registrationconfirm button[action=cancel]": {
                click: this.cancel
            },
            //clicking submit button on confirmation screen calls submit()
            "registrationconfirm button[action=submit]": {
                click: this.submit
            }
        })
    },
    /* next function checks whether the fields are valid(like some of them which are reuired should not be empty)
     and then 2nd screen of form is shown otherwise it gives an alert "fields invlaid" */
    next: function () {
        var l = Ext.getCmp('mainRegArea').getLayout();
        if (Ext.getCmp('patientFirstName').isValid() && Ext.getCmp('patientLastName').isValid() && Ext.getCmp('relativeFirstName').isValid() && Ext.getCmp('relativeLastName').isValid() && Ext.getCmp('sexRadioGroup').isValid() && Ext.getCmp('education').isValid() && (Ext.getCmp('dob').isValid() || Ext.getCmp('patientAge').isValid())) {
            l.setActiveItem(REG_PAGES.REG_2.value)
        } else alert("Fields invalid");
    },

    back: function () {
        var l = Ext.getCmp('mainRegArea').getLayout();
        l.setActiveItem(REG_PAGES.REG_1.value)
    },

    /*reset function reset all the components of both screen of form to empty fields*/
    reset: function () {
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
        Ext.getCmp('pincode').reset()
        Ext.getCmp('postoffice').reset()
        Ext.getCmp('tehsil').reset()
        Ext.getCmp('district').reset()
        Ext.getCmp('phoneContactInformation').reset()
        Ext.getCmp('patientPrimaryContact').reset()
        Ext.getCmp('patientSecondaryContact').reset()
        Ext.getCmp('oldPatientIdentifier').reset()
    },
    /* continue function copy values of all fields from registrations form to the fields in confirmation screen */
    Continue: function () {
        var l = Ext.getCmp('mainRegArea').getLayout();
        if (Ext.getCmp('block').isValid() && Ext.getCmp('street').isValid() && Ext.getCmp('town').isValid() && Ext.getCmp('pincode').isValid() && Ext.getCmp('phoneContactInformation').isValid() && Ext.getCmp('patientPrimaryContact').isValid() && Ext.getCmp('patientSecondaryContact').isValid()) {
            l.setActiveItem(REG_PAGES.REG_CONFIRM.value);
        } else alert("Fields invalid");
        Ext.getCmp('oldPatientIdentifierConfirm').setValue(Ext.getCmp('oldPatientIdentifier').value);
        Ext.getCmp('patientNameConfirm').setValue(Ext.getCmp('patientFirstName').value + " " + Ext.getCmp('patientLastName').value);
        Ext.getCmp('relativeNameConfirm').setValue(Ext.getCmp('relativeFirstName').value + " " + Ext.getCmp('relativeLastName').value);
        Ext.getCmp('ageConfirm').setValue(Ext.getCmp('patientAge').value);
        Ext.getCmp('sexConfirm').setValue(Ext.getCmp('sexRadioGroup').getChecked()[0].boxLabel);
        Ext.getCmp('educationConfirm').setValue(Ext.getCmp('education').value);
        Ext.getCmp('casteConfirm').setValue(Ext.getCmp('caste').value);
        Ext.getCmp('occupationConfirm').setValue(Ext.getCmp('occupation').value);
        Ext.getCmp('blockConfirm').setValue(Ext.getCmp('block').value);
        Ext.getCmp('stretConfirm').setValue(Ext.getCmp('street').value);
        if (Ext.getCmp('phoneContactInformation').getChecked().length > 0) Ext.getCmp('phoneConfirm').setValue(Ext.getCmp('phoneContactInformation').getChecked()[0].boxLabel)
        Ext.getCmp('patientPrimaryContactNumberConfirm').setValue(Ext.getCmp('patientPrimaryContact').value);
        Ext.getCmp('patientSecondaryContactNumberConfirm').setValue(Ext.getCmp('patientSecondaryContact').value);
        Ext.getCmp('townConfirm').setValue(Ext.getCmp('town').value);
        Ext.getCmp('pinConfirm').setValue(Ext.getCmp('pincode').value);
        Ext.getCmp('tehsilConfirm').setValue(Ext.getCmp('tehsil').value);
        Ext.getCmp('postOfficeConfirm').setValue(Ext.getCmp('postoffice').value);
        Ext.getCmp('districtConfirm').setValue(Ext.getCmp('district').value);
    },

    /* this function return to home screen */
    cancel: function () {
        var l = Ext.getCmp('mainRegArea').getLayout();
        l.setActiveItem(REG_PAGES.HOME.value); //going to home page
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
                postalCode: Ext.getCmp('pincode').value
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
        var l = Ext.getCmp('mainRegArea').getLayout();
        l.setActiveItem(REG_PAGES.REG_BMI.value); //Going to BMI Page
        //I made this funtion return this store because i needed this in jasmine unit test
        return store;
    },

    /* this funtions makes a get call to get the patient identifiers type */
    getidentifierstype: function (personUuid) {
        var identifiers = Ext.create('Registration.store.identifiersType')
        identifiers.load();
        // this statement calls getlocation() as soon as the get call is successful
        identifiers.on('load', function () {
            this.getlocation(personUuid, identifiers.getAt(0).getData().uuid)
        }, this);
    },

    /* this funtions makes a get call to get the location uuid */
    getlocation: function (personUuid, identifierType) {
        var locations = Ext.create('Registration.store.location')
        locations.load();
        // this statement calls makePatient() as soon as the get call is successful
        locations.on('load', function () {
            this.makePatient(personUuid, identifierType, locations.getAt(0).getData().uuid)
        }, this)
    },

    /* this funtions makes a post call to creat the patient with three parameter which will sent as person, identifiertype 
       and loaction */
    makePatient: function (personUuid, identifierType, location) {
        var patient = Ext.create('Registration.model.patient', {
            person: personUuid,
            identifiers: [{
                identifier: Util.getPatientIdentifier().toString(),
                identifierType: identifierType,
                location: location,
                preferred: true
            }]
        });
        Ext.getCmp('bmiPatientID').setValue(patient.getData().identifiers[0].identifier);
        var PatientStore = Ext.create('Registration.store.patient')
        PatientStore.add(patient);
        //makes the post call for creating the patient
        PatientStore.sync();
        //I made this funtion return this store because i needed this in jasmine unit test
        return PatientStore
    }
});