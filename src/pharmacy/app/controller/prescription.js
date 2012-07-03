Ext.define("RaxaEmr.Pharmacy.controller.prescription", {
    extend: 'Ext.app.Controller',
    views: ['Viewport', 'prescription', 'pharmacyTopbar', 'addFacility', 'goodsReceipt', 'listOfDrugs', 'newdrugform', 'pharmacyDetails', 'reports',  'addPatient'],
    
    
    init: function () {
        this.control({
            'prescription [action=addPatient]': {
                click: this.displayForm
            },
            "addPatient button[action=submit]": {
                click: this.savePerson
            }
        })
    },

    displayForm: function () {
        //  a new pop window for new patient form
        var winObj = Ext.create('Ext.window.Window', {
            width: 868,
            height: 225,
            maximizable: false,
            modal: true,
            items: [{
                    xtype: 'addPatient'
                }]
        }).show();


    },


    savePerson: function () {
        var jsonperson = Ext.create('RaxaEmr.Pharmacy.model.Person', {
            gender: Ext.getCmp('sexRadioGroup').getChecked()[0].boxLabel.charAt(0),
            addresses: [{
                    address1: Ext.getCmp('block').value,
                    cityVillage: Ext.getCmp('village').value,
                    countyDistrict: Ext.getCmp('District').value
                }],
            names: [{
                    givenName: Ext.getCmp('givenName').value,
                    familyName: Ext.getCmp('familyName').value
                }]
        })
        //this if else statement change the persist property of age field in Person model so that if its
        //empty it should not be sent to server in the body of post call
        if (Ext.getCmp('age').isValid()) {
            jsonperson.data.age = Ext.getCmp('age').value;
            RaxaEmr.Pharmacy.model.Person.getFields()[2].persist = true;
        } else {
            RaxaEmr.Pharmacy.model.Person.getFields()[2].persist = false;
        }
        if (Ext.getCmp('dob').isValid()) {
            jsonperson.data.birthdate = Ext.getCmp('dob').value;
            RaxaEmr.Pharmacy.model.Person.getFields()[3].persist = true;
        } else {
            RaxaEmr.Pharmacy.model.Person.getFields()[3].persist = false;
        }

        var store = Ext.create('RaxaEmr.Pharmacy.store.Persons');
        store.add(jsonperson);
        // this statement makes the post call to make the person
        store.sync();
        // this statement calls getifentifiers() as soon as the post call is successful
        store.on('write', function () {
            this.getidentifierstype(store.getAt(0).getData().uuid)
        }, this)
        Ext.getCmp('addPatient').getForm().reset();
        //I made this funtion return this store because i needed this in jasmine unit test
        return store;
    },

    getidentifierstype: function (personUuid) {
        var identifiers = Ext.create('RaxaEmr.Pharmacy.store.Identifiers')
        identifiers.load();
        // this statement calls getlocation() as soon as the get call is successful
        identifiers.on('load', function () {
            this.getlocation(personUuid, identifiers.getAt(0).getData().uuid)
        }, this);
    },

    /* this funtions makes a get call to get the location uuid */
    getlocation: function (personUuid, identifierType) {
        var locations = Ext.create('RaxaEmr.Pharmacy.store.Locations')
        locations.load();
        // this statement calls makePatient() as soon as the get call is successful
        locations.on('load', function () {
            this.makePatient(personUuid, identifierType, locations.getAt(0).getData().uuid)
        }, this)
    },

    /* this funtions makes a post call to creat the patient with three parameter which will sent as person, identifiertype 
       and loaction */
    makePatient: function (personUuid, identifierType, location) {
        var patient = Ext.create('RaxaEmr.Pharmacy.model.Patient', {
            person: personUuid,
            identifiers: [{
                    identifier: Util.getPatientIdentifier().toString(),
                    identifierType: identifierType,
                    location: location,
                    preferred: true
                }]
        });
        var PatientStore = Ext.create('RaxaEmr.Pharmacy.store.Patients')
        PatientStore.add(patient);
        //makes the post call for creating the patient
        PatientStore.sync();
        //I made this funtion return this store because i needed this in jasmine unit test
        return PatientStore
    }
});