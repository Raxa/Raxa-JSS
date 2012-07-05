Ext.define("RaxaEmr.Pharmacy.controller.prescription", {
    extend: 'Ext.app.Controller',
    
    views: ['Viewport', 'prescription', 'pharmacyTopbar', 'addFacility', 'goodsReceipt', 'listOfDrugs', 'newdrugform', 'pharmacyDetails', 
        'reports', 'addPatient', 'stockIssue', 'stockIssueGrid', 'goodReceiptGrid', 'goodReceipt', 'goodIssueText', 'goodIssuePop', 'goodIssue',
        'allStockPanel', 'allStockGrid', 'allStockForm', 'allStock', 'addDrug', 'allStock', 'prescribedDrugs'],
    stores: ['orderStore'],
    
    init: function () {
        this.control({
            'prescription [action=addPatient]': {
                click: this.displayForm
            },
            "prescription button[action=done2]": {
                click: this.savePerson
            },
            'prescribedDrugs': {
                render: this.onEditorRender,
                edit: this.afterMovieEdit,
                drugEdit: this.onDrugEdit,
                drugDelete: this.onDrugDelete
            },
            'prescribedDrugs button': {
                click: this.addDrug
            }
        })
    },
    
    onEditorRender: function () {
        // cache a reference to the moviesEditor and rowEditor
        this.drugsEditor = Ext.ComponentQuery.query('prescribedDrugs')[0];
        this.rowEditor = this.drugsEditor.rowEditor;
    },

    afterMovieEdit: function () {
        var drugStore = this.getStore('orderStore');
        var x = Ext.getCmp('prescribedDrugs').getSelectionModel().getSelection()
        console.log(x[0].data.itemprice);
        if(x[0].data.unitprice != null && x[0].data.qty){
            x[0].data.itemprice = x[0].data.unitprice*x[0].data.qty;
        }
        drugStore.sync();
    },

    onDrugEdit: function (evtData) {
        var store = this.getStore('orderStore');
        var record = store.getAt(evtData.rowIndex);
        if(record) {
            this.rowEditor.startEdit(record, this.drugsEditor.columns[evtData.colIndex]);
        }
    },

    onDrugDelete: function (evtData) {
        var store = this.getStore('orderStore');
        var record = store.getAt(evtData.rowIndex);
        if(record) {
            store.remove(record);
            store.sync();
        }
    }, 
    
    addDrug: function() {
        var newDrug;
        drugStore = Ext.getStore('orderStore');
        // add blank item to store -- will automatically add new row to grid
        newDrug = drugStore.add({
            drugname: '',
            dosage: '',
            duration: '',
            unitprice: '',
            itemprice: ''
        })[0];
        this.rowEditor.startEdit(newDrug, this.drugsEditor.columns[0]);
    },
    
    displayForm: function () {
        var l = Ext.getCmp('addpatientarea').getLayout();
        l.setActiveItem(1);
        var l1 = Ext.getCmp('addpatientgridarea').getLayout();
        l1.setActiveItem(1);
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