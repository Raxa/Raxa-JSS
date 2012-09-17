var RaxaEmr_Pharmacy_Controller_Vars = {
    PHARM_PAGES: {
        PRESCRIPTION: {
            value: 0,
            name: "prescription"
        },
        GOODSDETAILS: {
            value: 1,
            name: "goodsdetails"
        },
        REPORTS: {
            value: 2,
            name: "reports"
        },
        DRUGGROUPS: {
            value: 3,
            name: "drugGroups"
        },
        ALLSTOCK: {
            value: 4,
            name: "allStock"
        },
        REQUISITION: {
            value: 5,
            name: "requisition"
        },
        GOODSRECEIPT: {
            value: 6,
            name: "goodsReceipt"
        },
        DRUGDETAILS: {
            value: 7,
            name: "drugDetails"
        }
    },
    
    //Here we store all the various strings to keep track of where the inventory is.
    STOCK_STATUS: {
        AVAILABLE: 'available',
        ORDERED: 'ordered',
        SENT: 'sent'
    },
    
    STOCK_CENTER_LOCATION_TAG: "Stock Center",
    PHARMACY_LOCATION_TAG: "Pharmacy",
    DEFAULT_STOCK_LOCATION: "Unknown Location",
    
    DRUG_INVENTORY_MODEL:{
        UUID_INDEX: 6,
        BATCH_UUID_INDEX: 12
    },
    
    DAYS_TO_EXPIRE: 30,
    STOCK_OUT_LIMIT: 80,
    
    TOP_BAR_HEIGHT: 65
};


Ext.define("RaxaEmr.Pharmacy.controller.prescription", {
    extend: 'Ext.app.Controller',

    
    views: ['Viewport', 'prescription', 'pharmacyTopbar', 'addFacility', 'goodsReceiptText', 'listOfDrugs', 'newdrugform', 'pharmacyDetails', 
    'reports', 'addPatient', 'stockIssue', 'stockIssueGrid', 'goodsReceiptGrid', 'goodsReceipt', 'goodsIssueText', 'goodsIssueGrid', 'goodsIssue',
    'allStockPanel', 'allStockGrid', 'allStockForm', 'allStock', 'addDrug', 'allStock', 'prescribedDrugs', 'patientsGridPanel', 'requisition',
    'requisitionText', 'requisitionGrid', 'DrugDetails', 'DrugDetailsText', 'DrugDetailsGrid', 'alertGrid'],
    
    stores: ['orderStore', 'Doctors', 'Identifiers', 'Locations', 'Patients', 'Persons', 'drugOrderPatient', 'drugOrderSearch', 'drugConcept', 'drugEncounter', 'allDrugs', 'Alerts'],
    models: ['Address', 'Doctor', 'Identifier', 'Name', 'Patient', 'Person', 'drugOrderPatient', 'drugOrderSearch', 'drugOrder', 'drugEncounter', 'LocationTag', 'Location', 'PurchaseOrder', 'Alert', 'Provider'],
    
    init: function () {
        //setting Logged in Provider
        Util.getLoggedInProviderUuid();
        this.control({
            'prescription [action=addPatient]': {
                click: this.displayForm
            },
            "prescription button[action=doneWithNewPatientPrescription]": {
                click: function(){
                    this.savePerson();
                    this.prescriptionFillNewPatient();
                }
            },
            'prescription button[action=doneWithQueuedPatientPrescription]': {
                click: this.prescriptionFillQueuedPatient
            },
            'prescription button[action=printPrescribedDrugs]': {   //Action of Print button in Search Patient
                click: this.printPrescribedDrugs
            },
            'prescribedDrugs': {
                edit: this.afterDrugEdit,
                deleteDrug: this.deleteDrug

            },
            'prescribedDrugs button': {
                click: this.addDrug
            },
            'patientsgridpanel': {
                click: this.patientSelect
            },
            "prescription": {
                // as the perscription view activates it attaches listners to the 3 fields and 2
                // girds of advanced search
                activate: function () {
                    // below three listners call searchPatient() as enter key is pressed when cursor is in any of the
                    // field in advanced search form
                    Ext.getCmp('patientNameASearch').on('specialkey', function (field, e) {
                        if (e.getKey() == KEY.ENTER) {
                            this.searchPatient()
                        }
                    }, this)
                    Ext.getCmp('prescriptionIdASearch').on('specialkey', function (field, e) {
                        if (e.getKey() == KEY.ENTER) {
                            this.searchPatient()
                        }
                    }, this)
                    Ext.getCmp('prescriptionDateASearch').on('specialkey', function (field, e) {
                        if (e.getKey() == KEY.ENTER) {
                            this.searchPatient()
                        }
                    }, this)
                    // listner on patient search results to show drugorders when a patient is selected
                    Ext.getCmp('patientASearchGrid').on('cellClick', function () {
                        this.patientSelect(Ext.getCmp('patientASearchGrid').getSelectionModel().getSelection()[0].getData());
                    }, this)
                    // listner on perscription grid to show drugorder on main grid with more details
                    Ext.getCmp('drugOrderASearchGrid').on('cellClick', function () {
                        this.DrugOrderSelect(Ext.getCmp('drugOrderASearchGrid').getSelectionModel().getSelection()[0])
                    }, this)
                    //set the proxy for 1 week patient list and make the get call
                    this.getSevenDaysPatients();
                    //set the proxy for todays patient list and make the get call
                    this.getTodayPatients();
                }
            },
            // show patient search results when pressed
            'prescription button[action=back]': {
                click: this.goback
            },
            "todayPatientGrid": {
                select: this.showQueuedPatient
            },
            "allStockForm button[action=newPurchaseOrder]": {
                click: this.newPurchaseOrder
            },
            "allStockForm button[action=newRequisition]": {
                click: this.newRequisition
            },
            "allStockForm button[action=newIssue]": {
                click: this.newIssue
            },
            "allStockForm button[action=newReceipt]": {
                click: this.newReceipt
            },
            "allStockForm button[action=newDrug]": {
                click: this.newDrug
            },
            "allStockForm button[action=newDrugGroup]": {
                click: this.newDrugGroup
            },
            "allStockPanel button[action=showAllStock]": {
                click: this.showAllStock
            },
            "allStockPanel button[action=showExpiringStock]": {
                click: this.showExpiringStock
            },
            "allStockPanel button[action=showStockOut]": {
                click: this.showStockOut
            },
            "allStockPanel button[action=showAllOrders]": {
                click: this.showAllOrders
            },
            'requisitionGrid': {
                deleteRequisitionDrug: this.deleteRequisitionDrug
            },
            'requisitionGrid button[action=addRequisitionDrug]': {
                click: this.addRequisitionDrug
            },
            'requisition button[action=cancelRequisition]': {
                click: this.cancelInventoryChange
            },
            'requisition button[action=submitRequisition]': {
                click: this.submitRequisition
            },
            'drugDetails button[action=backFromDrugDetails]': {
                click: function(){
                    Ext.getStore('stockList').clearFilter();
                    Ext.getCmp('mainarea').getLayout().setActiveItem(PHARM_PAGES.ALLSTOCK);
                }
            },
            'goodsIssueText button[action=cancelIssuePurchaseOrder]':{
                click: this.cancelIssuePurchaseOrder
            },
            'goodsIssueText #issuePurchaseOrderPicker':{
                select: this.populateIssueFromPurchaseOrder
            },
            'goodsIssueGrid button[action=addIssueDrug]': {
                click: this.addIssueDrug
            },
            'goodsIssueGrid': {
                deleteIssueDrug: this.deleteIssueDrug
            },
            'goodsReceiptGrid': {
                deleteReceiptDrug: this.deleteReceiptDrug
            },
            'goodsReceiptGrid button[action=addReceiptDrug]': {
                click: this.addReceiptDrug
            },
            'goodsReceipt button[action=cancelReceipt]': {
                click: this.cancelInventoryChange
            },
            'goodsReceipt button[action=submitReceipt]': {
                click: this.submitReceipt
            },
            'goodsReceiptText #receiptPurchaseOrderPicker':{
                select: this.populateReceiptFromPurchaseOrder
            },
            'goodsIssue button[action=cancelIssue]': {
                click: this.cancelInventoryChange
            },
            'goodsIssue button[action=submitIssue]': {
                click: this.submitIssue
            },
            "addDrug button[action=submitNewDrug]": {
                click: this.submitNewDrug
            },
            "addDrug button[action=cancelNewDrug]": {
                click: this.newDrug
            }
        })
    },
    
    // function updates the todays patient grid
    getTodayPatients: function () {
        var enddate = new Date()
        this.getpatientlist(enddate, 12, -12, 'todayPatientGrid');
    },

    // function updates the 1 week patient grid
    getSevenDaysPatients: function () {
        var enddate = new Date()
        this.getpatientlist(enddate, 24*7 , -12, 'sevenDaysPatientGrid');
    },

    getpatientlist: function (enddate, backwardtime, forwardtime, patientGridId) {
        var d = new Date();
        var list_preEncounter = Ext.create('RaxaEmr.Pharmacy.model.PostList', {
            name: "Prescription Encounter",
            // defining the seach query according to the current date and period of time for prescription encounter
            searchQuery: "?encounterType=" + localStorage.prescriptionUuidencountertype + "&startDate=" + Util.Datetime(enddate, backwardtime) + "&endDate=" + Util.Datetime(enddate,forwardtime)
        });
        var list_prefillEncounter = Ext.create('RaxaEmr.Pharmacy.model.PostList', {
            name: "Priscriptionfill Encounter",
            // defining the seach query according to the current date and period of time for prescriptionfill encounter
            searchQuery: "?encounterType=" + localStorage.prescriptionfillUuidencountertype + "&startDate=" + Util.Datetime(enddate, backwardtime) + "&endDate=" + Util.Datetime(enddate,forwardtime)

        });
        //this.createRegList(list_regEncounter, list_scrEncounter);
        var k = 0;
        this.createList(list_preEncounter, list_prefillEncounter, k, patientGridId);

    },
    //Creates two different List of Patients with prescription encounter and not prescriptionfill
    createList: function (list_pre, list_prefill, k, patientGridId) {
        // creating store for posting the list of patient
        var store_pre = Ext.create('RaxaEmr.Pharmacy.store.PostLists');
        var store_prefill = Ext.create('RaxaEmr.Pharmacy.store.PostLists');
        store_pre.add(list_pre);
        store_prefill.add(list_prefill);
        // make the post call for both the list
        store_pre.sync();
        store_prefill.sync();
        store_pre.on('write', function () {
            k = k + 1;
            if (k == 2) {
                // call the funtion "finalPatientList" when the 2 list are posted successfully
                this.finalPatientList(store_pre, store_prefill, patientGridId);
            }
        }, this);
        store_prefill.on('write', function () {
            k = k + 1;
            if (k == 2) {
                // call the funtion "finalPatientList" when the 2 list are posted successfully
                this.finalPatientList(store_pre, store_prefill, patientGridId);
            }
        }, this);
    },

    // Creates List of Patients with prescription encounter and not prescriptionfill
    finalPatientList: function (store_preEncounter, store_prefillEncounter, patientGridId) {
        // Setting the url dynamically for store to store patients list
        Ext.getCmp(patientGridId).getStore().setProxy({
            type: 'rest',
            url: this.getPatientListUrl(store_preEncounter.getAt(0).getData().uuid, store_prefillEncounter.getAt(0).getData().uuid, localStorage.prescriptionUuidencountertype),
            headers: Util.getBasicAuthHeaders(),
            reader: {
                type: 'json',
                root: 'patients'
            }
        })
        // makes the GET call to get the list with patients with prescription encounter and not prescription fill
        Ext.getCmp(patientGridId).getStore().load();
    },
    // returns dynamically changed URL for getting patientList
    getPatientListUrl: function (reg_UUID, scr_UUID, encountertype) {
        return (HOST + '/ws/rest/v1/raxacore/patientlist' + '?inList=' + reg_UUID + '&notInList=' + scr_UUID + '&encounterType=' + encountertype);
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
        }).show()
    },
    afterDrugEdit: function () {
        var drugStore = this.getStore('orderStore');
        var x = Ext.getCmp('prescribedDrugs').getSelectionModel().getSelection()
        if(x[0].data.unitprice != null && x[0].data.qty != null){
            x[0].data.itemprice = x[0].data.unitprice*x[0].data.qty;
        }
    },

    deleteDrug: function (evtData) {
        var store = this.getStore('orderStore');
        var record = store.getAt(evtData.rowIndex);
        if(record) {
            store.remove(record);
        }
    }, 
    printPrescribedDrugs: function() {
        var Grid=this.readGrid();
        var selectedPatient = {
            GiveName: Ext.getCmp('givenName').getValue(),
            FamilyName:Ext.getCmp('familyName').getValue(),
            village: Ext.getCmp('village').getValue(),
            block: Ext.getCmp('block').getValue(),
            District: Ext.getCmp('District').getValue(),
            Doctor: Ext.getCmp('doctor').getValue(),
            Dob: Ext.getCmp('dob').getValue(),
            Age: Ext.getCmp('age').getValue(),
            Gender:Ext.getCmp('sexRadioGroup').getChecked()[0].boxLabel.charAt(0),
            Length : Grid.length,
            DrugGrid:Grid
        };
        this.printing(selectedPatient);
    },
    readGrid: function() {
        var drugs = Ext.getStore('orderStore').data;
        var noofdrugs=0;
        if(drugs.items)
        {
            noofdrugs = drugs.items.length;
        }
        var drugGrid=new Array(noofdrugs);
        for (var i1 = 0; i1 < noofdrugs; i1++) {
            drugGrid[i1]={};
            drugGrid[i1].drugname=drugs.items[i1].data.drugname ;
            drugGrid[i1].dosage=drugs.items[i1].data.dosage ;
            drugGrid[i1].duration=drugs.items[i1].data.duration ;
            drugGrid[i1].qty=drugs.items[i1].data.qty ;
            drugGrid[i1].unitprice=drugs.items[i1].data.unitprice ;
            drugGrid[i1].itemprice=drugs.items[i1].data.itemprice ;
        }
        return(drugGrid);
    },
    
    //adds a drug to the current prescription
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
    },
    
    //when a patient from the queue is clicked, this function makes the orders appear
    showQueuedPatient: function(selection, record) {
        record.data.encounters[record.data.encounters.length-1]
    },
    
    displayForm: function () {
        var l = Ext.getCmp('addpatientarea').getLayout();
        l.setActiveItem(1);
        var l1 = Ext.getCmp('addpatientgridarea').getLayout();
        l1.setActiveItem(1);
        Ext.getCmp('prescribedDrugs').setPosition(190,260);
    },

    fillPrescription: function() {
        var controller = this;
        Ext.Msg.confirm("Confirmation", "Are you sure you want to fill prescription?", function (btn) {
            if (btn == 'yes') {
                var l = Ext.getCmp('mainarea').getLayout();
                l.setActiveItem(0);
                var l1 = Ext.getCmp('addpatientarea').getLayout();
                l1.setActiveItem(0);
                var l2 = Ext.getCmp('addpatientgridarea').getLayout();
                l2.setActiveItem(0);
                Ext.getCmp('drugASearchGrid').getStore().removeAll();
                Ext.getCmp('prescriptionDate').setValue('');
            } else {
                controller.printPrescribedDrugs();
            }
        });
    },
    
    printing:function(selectedPatient) {
        localStorage.setItem('selectedPatient', JSON.stringify(selectedPatient));
        popupWindow = window.open('app/print.html', 'popUpWindow', 'height=500,width=1100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes');
    },
    savePerson: function () {
        if(Ext.getCmp('givenName').isValid() && Ext.getCmp('familyName').isValid() && Ext.getCmp('village').isValid() && Ext.getCmp('block').isValid() && Ext.getCmp('District').isValid() && Ext.getCmp('doctor').isValid() && (Ext.getCmp('dob').getValue() != null || Ext.getCmp('age').getValue() != null)){
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
            if (Ext.getCmp('age').getValue()!= null) {
                jsonperson.data.age = Ext.getCmp('age').value;
                RaxaEmr.Pharmacy.model.Person.getFields()[2].persist = true;
            } else {
                RaxaEmr.Pharmacy.model.Person.getFields()[2].persist = false;
            }
            if (Ext.getCmp('dob').getValue()!= null) {
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
        }
        else{
            Ext.Msg.alert('fields invalid');
            return null
        }
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
        var locations = this.getStore('Locations');
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
        PatientStore.on('write', function() {
            this.sendPharmacyEncounter(personUuid, localStorage.pharmacyUuidencountertype);
        },this)
    //I made this funtion return this store because i needed this in jasmine unit test
    //return PatientStore
    },
    
    ISODateString: function (d) {
        function pad(n) {
            return n < 10 ? '0' + n : n
        }
        return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + 'Z'
    },
    
    sendPharmacyEncounter: function(uuid, typeOfEncounter) {
        concept = new Array();
        order = new Array();
        var k = 0,k1 = 0,k2 = 0;
        var drugs = Ext.getStore('orderStore').data;
        var noofdrugs = drugs.items.length;
        for (var i1 = 0; i1 < drugs.items.length; i1++) {
            // value of Url for get call is made here using name of drug
            if(drugs.items[i1].data.drugname != ""){
                k2++;
                var Url = HOST + '/ws/rest/v1/concept?q='
                Url = Url + drugs.items[i1].data.drugname
                concept.push(Ext.create('RaxaEmr.Pharmacy.store.drugConcept'))
                // setting up the proxy for store with the above Url
                concept[k++].setProxy({
                    type: 'rest',
                    url: Url,
                    headers: Util.getBasicAuthHeaders(),
                    reader: {
                        type: 'json',
                        root: 'results'
                    }
                })
                var startdate = new Date()
                // value of end date depending on the duration 
                var enddate
                if (drugs.items[i1].data.duration == "1 week") enddate = new Date(startdate.getFullYear(), startdate.getMonth(), startdate.getDate() + 7);
                if (drugs.items[i1].data.duration == "2 week") enddate = new Date(startdate.getFullYear(), startdate.getMonth(), startdate.getDate()+ 14);
                if (drugs.items[i1].data.duration == "3 week") enddate = new Date(startdate.getFullYear(), startdate.getMonth(), startdate.getDate()+ 21);
                if (drugs.items[i1].data.duration == "1 month") enddate = new Date(startdate.getFullYear(), startdate.getMonth()+ 1, startdate.getDate());
                if (drugs.items[i1].data.duration == "2 month") enddate = new Date(startdate.getFullYear(), startdate.getMonth()+ 2, startdate.getDate());
                // model for drug order is created here
                order.push({
                    patient: uuid,
                    drug: drugs.items[i1].data.drugname,
                    startDate: startdate,
                    autoExpireDate: enddate,
                    dose: drugs.items[i1].data.dosage,
                    quantity: drugs.items[i1].data.qty,
                    // type should be "drugorder" in order to post a drug order
                    type: 'drugorder'
                })
                // here it makes the get call for concept of related drug
                concept[i1].load();
                // added a counter k which increment as a concept load successfully, after all the concept are loaded
                // value of k should be equal to the no. of drug forms
                concept[i1].on('load', function () {
                    k1++;
                    if (k == drugs.items.length && k1 == k2) {
                        for (var j = 0; j < concept.length; j++) {
                            order[j].concept = concept[j].getAt(0).getData().uuid;
                        }
                        if(order.length == 0){
                            RaxaEmr.Pharmacy.model.drugEncounter.getFields()[4].persist = false;
                        }
                        var time = this.ISODateString(new Date());
                        // model for posting the encounter for given drug orders
                        var encounter = Ext.create('RaxaEmr.Pharmacy.model.drugEncounter', {
                            patient: uuid,
                            // this is the encounter for the prescription encounterType
                            encounterType: typeOfEncounter,
                            encounterDatetime: time,
                            orders: order
                        })
                        var encounterStore = Ext.create('RaxaEmr.Pharmacy.store.drugEncounter')
                        encounterStore.add(encounter)
                        // make post call for encounter
                        encounterStore.sync()
                        encounterStore.on('write', function () {
                            Ext.Msg.alert('successfull');
                            Ext.getStore('orderStore').removeAll();
                        }, this)
                    }
                }, this);
            }
            else{
                if (i1 == drugs.items.length - 1) {
                    for (var j = 0; j < concept.length; j++) {
                        order[j].concept = concept[j].getAt(0).getData().uuid;
                    }
                    var time = this.ISODateString(new Date());
                    // model for posting the encounter for given drug orders
                    var encounter = Ext.create('RaxaEmr.Pharmacy.model.drugEncounter', {
                        patient: uuid,
                        // this is the encounter for the prescription encounterType
                        encounterType: encounterType,
                        encounterDatetime: time,
                        orders: order
                    })
                    var encounterStore = Ext.create('RaxaEmr.Pharmacy.store.drugEncounter')
                    encounterStore.add(encounter)
                    // make post call for encounter
                    encounterStore.sync()
                    encounterStore.on('write', function () {
                        Ext.Msg.alert('successfull')
                    }, this)
                }
            }
        }
    },
    
    
    //fuction to be called when a drug order is selected in prescription grid of advanced search
    //sets the prescription date and store for main prescription grid
    DrugOrderSelect: function(x){
        var l = Ext.getCmp('mainarea').getLayout();
        l.setActiveItem(0);
        var l1 = Ext.getCmp('addpatientarea').getLayout();
        l1.setActiveItem(0);
        var l2 = Ext.getCmp('addpatientgridarea').getLayout();
        l2.setActiveItem(0);
        Ext.getCmp('drugASearchGrid').getStore().removeAll();
        Ext.getCmp('drugASearchGrid').getStore().add(x)
        Ext.getCmp('prescriptionDate').setValue(x.getData().startDate.toLocaleDateString())
    },

    //function to be call when a patient is selected in the patient search results gird of advanced search
    //sets the fields realted to patient in main screen and then calls for function getDrugOrders()
    patientSelect: function (x) {
        Ext.getCmp('prescriptionPatientName').setValue(x.display)
        //below its commented as the identifier are not sent in patient search results
        //Ext.getCmp('prescriptionPatientId').setValue(x.identifier)
        if (x.age != 0) Ext.getCmp('prescriptionPatientAge').setValue(x.age)
        else Ext.getCmp('prescriptionPatientAge').setValue(null)
        Ext.getCmp('prescriptionPatientGender').setValue(x.gender)
        this.getDrugOrders(x.uuid)
    },

    //function for the get call for drugorder for related patient
    getDrugOrders: function (x) {
        var Url = HOST + '/ws/rest/v1/order?patient=';
        Url = Url + x + '&&v=full';
        // setting up the proxy here because url is not fixed
        Ext.getCmp('drugOrderASearchGrid').getStore().setProxy({
            type: 'rest',
            url: Url,
            headers: Util.getBasicAuthHeaders(),
            reader: {
                type: 'json',
                root: 'results'
            }
        })
        // make the GET call for patients with given uuid
        Ext.getCmp('drugOrderASearchGrid').getStore().load();
        Ext.getCmp('drugOrderASearchGrid').getStore().on('load', function () {
            if(Ext.getCmp('drugOrderASearchGrid').getStore().count()>0)
                // show prescriptions grid(drugOrderASearchGrid) when drug orders are loaded
                Ext.getCmp('searchGrid').getLayout().setActiveItem(1)
            else{
                var l1 = Ext.getCmp('addpatientarea').getLayout();
                l1.setActiveItem(0);
                var l1 = Ext.getCmp('addpatientgridarea').getLayout();
                l1.setActiveItem(1);
                Ext.getCmp('prescribedDrugs').setPosition(190,180);
            }
        }, this)
    },

    //function that make the get call when enter is pressed within any of the 3 text fieds in advanced search
    searchPatient: function () {
        Ext.getCmp('searchGrid').getLayout().setActiveItem(0)
        if (Ext.getCmp('patientNameASearch').getValue() != "") {
            // setting up url with the query for given patient name
            var Url = HOST + '/ws/rest/v1/patient?q=';
            Url = Url + Ext.getCmp('patientNameASearch').getValue() + "&"
            Url = Url + "&v=full";
            // setting up the proxy here because url is not fixed
            Ext.getCmp('patientASearchGrid').getStore().setProxy({
                type: 'rest',
                url: Url,
                headers: Util.getBasicAuthHeaders(),
                reader: {
                    type: 'json',
                    root: 'results'
                }
            })
            // makes the Get call for the patient list
            Ext.getCmp('patientASearchGrid').getStore().load();
        }
    },
    //functiont to go to patient search grid when back button is pressed in advanced search
    goback: function () {
        Ext.getCmp('searchGrid').getLayout().setActiveItem(0)
    },
    
    //creates a new purchase order
    newPurchaseOrder: function() {
    },
    
    //creates new stock issue
    newIssue: function(){
        Ext.getCmp('mainarea').getLayout().setActiveItem(RaxaEmr_Pharmacy_Controller_Vars.PHARM_PAGES.GOODSDETAILS.value);
    },
    
    //creates new receipt
    newReceipt: function() {
        Ext.getCmp('mainarea').getLayout().setActiveItem(RaxaEmr_Pharmacy_Controller_Vars.PHARM_PAGES.GOODSRECEIPT.value);
    },
    
    //deletes current row of requisition grid
    deleteReceiptDrug: function (evtData) {
        var store = this.getStore('newReceipt');
        var record = store.getAt(evtData.rowIndex);
        if(record) {
            store.remove(record);
        }
    },
    
    //adds new row to requisition grid
    addReceiptDrug: function(){
        // add blank item to store -- will automatically add new row to grid
        Ext.getStore('newReceipt').add({
            drugname: '',
            quantity: ''
        })[0];
    },

    //cancels a change to inventory, goes back to stock overview page
    cancelInventoryChange: function(){
        Ext.getCmp('mainarea').getLayout().setActiveItem(RaxaEmr_Pharmacy_Controller_Vars.PHARM_PAGES.ALLSTOCK.value);
    },
    
    /**
     * Fills a purchase order when a stock admin wants to make a new issue
     * Populates issue drug fields with drugs + quantites from the purchase order
     */
    populateReceiptFromPurchaseOrder: function(combo, records){
        Ext.getCmp('receiptLocationPicker').setValue(records[0].data.dispenseLocationName);
        //emptying previous fields
        Ext.getStore('newReceipt').removeAll();
        Ext.ComponentQuery.query('goodsReceiptGrid')[0].getSelectionModel().deselectAll();
        var purchaseOrderUuid = Ext.getCmp('issuePurchaseOrderPicker').getValue();
        for(var i=0; i<records[0].data.inventories.length; i++){
            //for each inventory, populate the drug name and quantity
            var currDrugUuid = records[0].data.inventories[i].drug.uuid;
            var currDrugName = records[0].data.inventories[i].drug.display;
            var currDrugIndex = Ext.getStore('allDrugs').find('uuid', currDrugUuid);
            Ext.getStore('newReceipt').add({
                drug: {
                    text: 'currDrugName',
                    uuid: currDrugUuid
                },
                batch: records[0].data.inventories[i].batch,
                quantity: records[0].data.inventories[i].quantity,
                originalQuantity: records[0].data.inventories[i].originalQuantity,
                drugName: records[0].data.inventories[i].drug.display,
                expiryDate: records[0].data.inventories[i].expiryDate,
                uuid: records[0].data.inventories[i].uuid
            })[0];
        }
        //setting value so that store keeps same filter -- otherwise will stop listening
        Ext.getCmp('receiptPurchaseOrderPicker').setValue(records[0]);
    },
    
    
    submitReceipt: function(){
        var drugInventories = new Array();
        var receipts = Ext.getStore('newReceipt').data;
        var receiptLocationIndex = Ext.getStore("receiptLocations").find('display', Ext.getCmp("receiptLocationPicker").value);
        var stockLocationIndex = Ext.getStore("Locations").find('display', RaxaEmr_Pharmacy_Controller_Vars.DEFAULT_STOCK_LOCATION);
        var receiptLocationString = Ext.getStore("receiptLocations").getAt(receiptLocationIndex).data.display.toString().split(" - ")[0];
        var purchaseOrderUuid = Ext.getCmp('receiptPurchaseOrderPicker').getValue();
        for (var i = 0; i < receipts.items.length; i++) {
            if(receipts.items[i].data.drugname != ""){
                //getting index of drug in store
                var drugIndex = Ext.getStore('allDrugs').find('text', receipts.items[i].data.drugName);
                // model for drug inventory is created here
                drugInventories.push({
                    status: RaxaEmr_Pharmacy_Controller_Vars.STOCK_STATUS.AVAILABLE,
                    //get uuid of drug
                    drug: Ext.getStore('allDrugs').getAt(drugIndex).data.uuid,
                    quantity: receipts.items[i].data.quantity,
                    batch: receipts.items[i].data.batch,
                    originalQuantity: receipts.items[i].data.quantity,
                    expiryDate: receipts.items[i].data.expiryDate,
                    roomLocation: receipts.items[i].data.roomLocation,
                    location: Ext.getStore("receiptLocations").getAt(receiptLocationIndex).data.uuid
                });
                if(purchaseOrderUuid!==null){
                    drugInventories[i].uuid = receipts.items[i].data.uuid;
                }
            }
        }
        var time = Util.getCurrentTime();
        // model for posting the encounter for given drug orders
        var purchaseOrder = Ext.create('RaxaEmr.Pharmacy.model.PurchaseOrder', {
            name: "Pharmacy Receipt",
            description: "Receipt at "+receiptLocationString+ " on "+time.toString().substr(0, 10),
            received: "true",
            provider: Util.getLoggedInProviderUuid(),
            stockLocation: Ext.getStore("Locations").getAt(stockLocationIndex).data.uuid,
            dispenseLocation: Ext.getStore("receiptLocations").getAt(receiptLocationIndex).data.uuid,
            drugPurchaseOrderDate: time,
            inventories: drugInventories
        });
        var purchaseOrderStore = Ext.create('RaxaEmr.Pharmacy.store.PurchaseOrders');
        purchaseOrderStore.add(purchaseOrder);
        // make post call for encounter
        if(purchaseOrderUuid!==null){
            purchaseOrderStore.getProxy().url = HOST + '/ws/rest/v1/raxacore/drugpurchaseorder/'+purchaseOrderUuid;
        }
        purchaseOrderStore.sync();
        purchaseOrderStore.on('write', function () {
            purchaseOrderStore.getProxy().url = HOST + '/ws/rest/v1/raxacore/drugpurchaseorder';
            Ext.getStore('stockList').load();
            Ext.getCmp('allStockGrid').getView().refresh();
            Ext.getStore('batches').load();
            Ext.Msg.alert('successful');
        }, this);
    },


    //creates new requisition
    newRequisition: function() {
        Ext.getCmp('mainarea').getLayout().setActiveItem(RaxaEmr_Pharmacy_Controller_Vars.PHARM_PAGES.REQUISITION.value);
    },
    
    //creates new drug
    newDrug: function() {
        if(Ext.getCmp('addDrug').isHidden()){
            Ext.getCmp('addDrug').show();
            var x = Ext.getCmp('pharmacytopbar').x + Ext.getCmp('pharmacytopbar').width - Ext.getCmp('alertPanel').width;
            Ext.getCmp('newDrugButton').setText('Close');
            Ext.getCmp('newDrugButton').setUI('raxa-orange-small');

        }else{
            Ext.getCmp('addDrug').hide();
            Ext.getCmp('newDrugButton').setText('New Drug');
            Ext.getCmp('newDrugButton').setUI('default');
        }
    },
    
    submitNewDrug: function() {
        //getting drug concept from OpenMRS
        Ext.Ajax.request({
            url: HOST + '/ws/rest/v1/concept?q='+Ext.getCmp('addDrugName').getValue()+"&v=full",
            method: 'GET',
            disableCaching: false,
            headers: Util.getBasicAuthHeaders(),
            success: function (response) {
                var jsonResponse = Ext.decode(response);
                var j=0;
                var complete=false;
                while(j<jsonResponse.results.length && !complete){
                    var k=0;
                    var isUpper = true;
                    while (k<jsonResponse.results[j].display.length && isUpper){
                        var character = jsonResponse.results[j].display.charAt(k);
                        if (!isNaN(character * 1)){
                            isUpper = false;
                        }else{
                            if (character == character.toUpperCase()) {
                            }
                            if (character == character.toLowerCase()){
                                isUpper = false;
                            }
                        }
                        k++;
                    }
                    if(isUpper){
                        complete = true;
                        console.log("found new drug concept: "+jsonResponse.results[j].display);
                        var newDrug = {
                            concept: jsonResponse.results[j].uuid,
                            name: Ext.getCmp('addDrugName').getValue(),
                            dosageForm: Ext.getCmp('dosageFormPicker').getValue(),
                            minimumDailyDose: Ext.getCmp('addDrugMinimumDose').getValue(),
                            maximumDailyDose: Ext.getCmp('addDrugMaximumDose').getValue(),
                            units: Ext.getCmp('addDrugUnits')
                        };
                        var newDrugParam = Ext.encode(newDrug);
                        Ext.Ajax.request({
                            url: HOST + '/ws/rest/v1/raxacore/drug',
                            method: 'POST',
                            params: newDrugParam,
                            disableCaching: false,
                            headers: Util.getBasicAuthHeaders(),
                            success: function (response) {
                                console.log("Drug created: "+newDrug.name);
                            },
                            failure: function (response) {
                                console.log('POST alert failed with response status: ' + response.status);
                            }
                        });
                    }
                    j++;
                }
            }
        });
    },
    
    //creates new drug group
    newDrugGroup: function() {
    },
    
    //deletes current row of requisition grid
    deleteRequisitionDrug: function (evtData) {
        var store = this.getStore('RequisitionItems');
        var record = store.getAt(evtData.rowIndex);
        
        if(record) {
            store.remove(record);
        }
    },
    
    //adds new row to requisition grid
    addRequisitionDrug: function(){
        // add blank item to store -- will automatically add new row to grid
        Ext.getStore('RequisitionItems').add({
            drugname: '',
            quantity: ''
        })[0];
    },
        
    submitRequisition: function(){
        var drugInventories = new Array();
        var requisitions = Ext.getStore('RequisitionItems').data;
        for (var i = 0; i < requisitions.items.length; i++) {
            // value of Url for get call is made here using name of drug
            if(requisitions.items[i].data.drugname != ""){
                //getting index of drug in store
                var drugIndex = Ext.getStore('allDrugs').find('text', requisitions.items[i].data.drugname);
                var startdate = Util.getCurrentTime();
                // model for drug inventory is created here
                drugInventories.push({
                    status: RaxaEmr_Pharmacy_Controller_Vars.STOCK_STATUS.ORDERED,
                    //get uuid of drug
                    drug: Ext.getStore('allDrugs').getAt(drugIndex).data.uuid,
                    quantity: requisitions.items[i].data.quantity
                });
            }
        }
        var time = Util.getCurrentTime();
        var dispenseLocationIndex = Ext.getStore("dispenseLocations").find('display', Ext.getCmp("dispenseLocationPicker").value);
        var stockLocationIndex = Ext.getStore("stockLocations").find('display', Ext.getCmp("stockLocationPicker").value);
        var dispenseLocationString = Ext.getStore("dispenseLocations").getAt(dispenseLocationIndex).data.display.toString().split(" - ")[0];
        // model for posting the encounter for given drug orders
        var purchaseOrder = Ext.create('RaxaEmr.Pharmacy.model.PurchaseOrder', {
            name: "Pharmacy Requisition",
            description: "Requisition from "+dispenseLocationString+ " on "+time.toString().substr(0, 10),
            received: "false",
            provider: Util.getLoggedInProviderUuid(),
            stockLocation: Ext.getStore("stockLocations").getAt(stockLocationIndex).data.uuid,
            dispenseLocation: Ext.getStore("dispenseLocations").getAt(dispenseLocationIndex).data.uuid,
            drugPurchaseOrderDate: time,
            inventories: drugInventories
        });
        console.log(purchaseOrder);
        var purchaseOrderStore = Ext.create('RaxaEmr.Pharmacy.store.PurchaseOrders');
        purchaseOrderStore.add(purchaseOrder);
        // make post call for encounter
        purchaseOrderStore.sync();
        purchaseOrderStore.on('write', function () {
            //sending alert that requisition has been made
            var alertParams = {
                name: "New Requisition from "+Ext.getCmp("dispenseLocationPicker").value,
                toLocation: Ext.getStore("stockLocations").getAt(stockLocationIndex).data.uuid,
                providerSent: Util.getLoggedInProviderUuid(),
                alertType: "newRequisition",
                defaultTask: "newIssue"
            };
            Util.sendAlert(alertParams);
            Ext.getCmp('alertButton').setUI('raxa-orange-small');
            Ext.getStore('stockList').load();
            Ext.getCmp('allStockGrid').getView().refresh();
            Ext.getStore('fillRequisitions').load();
            Ext.Msg.alert('successful');
        }, this);
    },
    
    
    /**
         * Fills a purchase order when a stock admin wants to make a new issue
         * Populates issue drug fields with drugs + quantites from the purchase order
         */
    populateIssueFromPurchaseOrder: function(combo, records){
        Ext.getCmp('issuedispenseLocationPicker').setValue(records[0].data.dispenseLocationName);
        Ext.getCmp('issueStockLocationPicker').setValue(records[0].data.stockLocationName);
        //emptying previous fields
        Ext.getStore('newIssue').removeAll();
        Ext.ComponentQuery.query('goodsIssueGrid')[0].getSelectionModel().deselectAll();
        for(var i=0; i<records[0].data.inventories.length; i++){
            //for each inventory, populate the drug name and quantity
            var currDrugUuid = records[0].data.inventories[i].drug.uuid;
            var currDrugName = records[0].data.inventories[i].drug.display;
            var currDrugIndex = Ext.getStore('allDrugs').find('uuid', currDrugUuid);
            Ext.getStore('newIssue').add({
                drug: {
                    text: 'currDrugName',
                    uuid: currDrugUuid
                },
                batch: records[0].data.inventories[i].batch,
                quantity: records[0].data.inventories[i].quantity,
                drugName: records[0].data.inventories[i].drug.display,
                uuid: records[0].data.inventories[i].uuid
            })[0];
        }
        //setting value so that store keeps same filter -- otherwise will stop listening
        Ext.getCmp('issuePurchaseOrderPicker').setValue(records[0]);
    },

    //adds new row to goods issue grid
    addIssueDrug: function(){
        // add blank item to store -- will automatically add new row to grid
        Ext.getStore('newIssue').add({
            drugname: '',
            quantity: ''
        })[0];
    },

    //deletes current row of issue grid
    deleteIssueDrug: function (evtData) {
        var store = this.getStore('newIssue');
        var record = store.getAt(evtData.rowIndex);
        if(record) {
            store.remove(record);
        }
    },
    
    updateStockListFields: function(theStore){
        for(var i=0; i<this.data.items.length; i++){
            if(theStore.data.items[i].data.batch!==null && theStore.data.items[i].data.batch!=="" && theStore.data.items[i].data.quantity!==0){
                theStore.data.items[i].set("batchQuantity", theStore.data.items[i].data.batch+" ("+theStore.data.items[i].data.quantity+")");
            }
            else{
                theStore.data.items[i].set("batchQuantity", null);
            }
            if(theStore.data.items[i].data.expiryDate!==""){
                theStore.data.items[i].set("days", Util.daysFromNow(theStore.data.items[i].data.expiryDate));
            }
            else{
                theStore.data.items[i].set("days", null);
            }
        }        
    },
    
    /**
         * checks whether the issue is valid -- returns with error message, or null if issue is valid
         */
    validateIssue: function(issues){
        if(issues.items.length === 0){
            return "Please enter a drug";
        }
        for (var i=0; i<issues.items.length; i++){
            if (issues.items[i].data.drugName==="" || issues.items[i].data.batch==="" || issues.items[i].data.quantity<0 || issues.items[i].data.expiryDate===""){
                return "Blank fields not allowed";
            }
            if (Ext.getStore('allDrugs').find('text', issues.items[i].data.drugName)===-1){
                return "Drug "+issues.items[i].data.drugName+" not found";
            }
            var batchIndex = Ext.getStore('stockList').find('batchQuantity', issues.items[i].data.batch);
            if (batchIndex===-1){
                return "Batch "+issues.items[i].data.batch+" not found";
            }
            var batch = Ext.getStore('stockList').getAt(batchIndex);
            var qtyLeft = batch.get('quantity');
            if(qtyLeft < issues.items[i].data.quantity){
                return "Quantity cannot exceed batch";
            }
        }
        if(Ext.getCmp('issuedispenseLocationPicker').getValue()===null){
            return "Please select a dispense location";
        }
        return null;
    },
    
    submitIssue: function(){
        var drugInventories = new Array();
        var issues = Ext.getStore('newIssue').data;
        var msg = this.validateIssue(issues);
        if(msg!==null){
            Ext.Msg.alert(msg);
            return;
        }
        RaxaEmr.Pharmacy.model.DrugInventory.getFields()[RaxaEmr_Pharmacy_Controller_Vars.DRUG_INVENTORY_MODEL.BATCH_UUID_INDEX].persist = true;
        var issuedispenseLocationIndex = Ext.getStore("issuedispenseLocations").find('display', Ext.getCmp("issuedispenseLocationPicker").value);
        var issueStockLocationIndex = Ext.getStore("issueStockLocations").find('display', Ext.getCmp("issueStockLocationPicker").value);
        var purchaseOrderUuid = Ext.getCmp('issuePurchaseOrderPicker').getValue();
        var issueStockLocationString = Ext.getStore("issueStockLocations").getAt(issueStockLocationIndex).data.display.toString().split(" - ")[0];
        for (var i = 0; i < issues.items.length; i++) {
            //getting index of drug in store
            var drugIndex = Ext.getStore('allDrugs').find('text', issues.items[i].data.drugName);
            drugInventories.push({
                status: RaxaEmr_Pharmacy_Controller_Vars.STOCK_STATUS.SENT,
                batch: issues.items[i].data.batch,
                batchUuid: issues.items[i].data.batchUuid,
                drug: Ext.getStore('allDrugs').getAt(drugIndex).data.uuid,
                quantity: issues.items[i].data.quantity,
                originalQuantity: issues.items[i].data.quantity,
                expiryDate: issues.items[i].data.expiryDate,
                location: Ext.getStore("issuedispenseLocations").getAt(issuedispenseLocationIndex).data.uuid
            });
            if(purchaseOrderUuid!==null){
                drugInventories[i].uuid = issues.items[i].data.uuid;
            }
        }
        var time = Util.getCurrentTime();
        // model for posting the encounter for given drug orders
        var purchaseOrder = Ext.create('RaxaEmr.Pharmacy.model.PurchaseOrder', {
            name: "Stock Issue",
            description: "Issue from "+issueStockLocationString+ " on "+time.toString().substr(0, 10),
            received: "false",
            provider: Util.getLoggedInProviderUuid(),
            stockLocation: Ext.getStore("issueStockLocations").getAt(issueStockLocationIndex).data.uuid,
            dispenseLocation: Ext.getStore("issuedispenseLocations").getAt(issuedispenseLocationIndex).data.uuid,
            drugPurchaseOrderDate: time,
            inventories: drugInventories
        });
        var purchaseOrderStore = Ext.create('RaxaEmr.Pharmacy.store.PurchaseOrders');
        purchaseOrderStore.add(purchaseOrder);
        // make post call for encounter -- if we are updating a purchase order, set url, otherwise post
        if(purchaseOrderUuid!==null){
            purchaseOrderStore.getProxy().url = HOST + '/ws/rest/v1/raxacore/drugpurchaseorder/'+purchaseOrderUuid;
        }
        purchaseOrderStore.sync();
        purchaseOrderStore.on('write', function () {
            //sending alert that requisition has been made
            var alertParams = {
                name: "New Issue from stock center",
                toLocation: Ext.getStore("issueStockLocations").getAt(issueStockLocationIndex).data.uuid,
                fromLocation: Ext.getStore("issuedispenseLocations").getAt(issuedispenseLocationIndex).data.uuid,
                providerSent: Util.getLoggedInProviderUuid(),
                alertType: "newIssue",
                defaultTask: "newReceipt"
            };
            Util.sendAlert(alertParams);
            Ext.getCmp('alertButton').setUI('raxa-orange-small');
            purchaseOrderStore.getProxy().url = HOST + '/ws/rest/v1/raxacore/drugpurchaseorder';
            RaxaEmr.Pharmacy.model.DrugInventory.getFields()[RaxaEmr_Pharmacy_Controller_Vars.DRUG_INVENTORY_MODEL.BATCH_UUID_INDEX].persist = false;
            Ext.getStore('stockList').load();
            Ext.getCmp('allStockGrid').getView().refresh();
            Ext.getStore('stockIssues');
            Ext.Msg.alert('successful');
        }, this);
    },
    
    cancelIssuePurchaseOrder: function() {
        Ext.getCmp('issuePurchaseOrderPicker').clearValue();
        Ext.getStore('newIssue').removeAll();
        Ext.getStore('newIssue').add({
            drugname: '',
            quantity: ''
        })[0];    
    },
    
    //Called when 'stock analysis' button is pressed
    showAllStock: function(){
        Ext.getStore('stockList').clearFilter();
        //if current location, filter by that
        Ext.getStore('stockList').filter('status', 'available');
    },
    
    //Called when 'Expiring Stock' button is pressed
    showExpiringStock: function(){
        Ext.getStore('stockList').clearFilter();
        //if current location, filter by that
        Ext.getStore('stockList').filterBy(function(record, id){
            return(Util.daysFromNow(record.data.expiryDate)<RaxaEmr_Pharmacy_Controller_Vars.DAYS_TO_EXPIRE)
        });
        Ext.getStore('stockList').filter('status', RaxaEmr_Pharmacy_Controller_Vars.STOCK_STATUS.AVAILABLE);
    },
    
    showStockOut: function(){
        Ext.getStore('stockList').clearFilter();
        Ext.getStore('stockList').filterBy(function(record, id){
            return(record.data.quantity<RaxaEmr_Pharmacy_Controller_Vars.STOCK_OUT_LIMIT)
        });
        Ext.getStore('stockList').filter('status', RaxaEmr_Pharmacy_Controller_Vars.STOCK_STATUS.AVAILABLE);
    },
    
    showAllOrders: function(){
        Ext.getStore('stockList').clearFilter();
    },
    
    prescriptionFillNewPatient: function() {
        var time = Util.getCurrentTime();
        // the order here will be the encounter selected from the prescription grid from 'Ext.getSelection()'
        // model for posting the encounter for given drug orders
        var encounter = Ext.create('RaxaEmr.Pharmacy.model.drugEncounter', {
            patient: localStorage.person,
            // this is the encounter for the prescription encounterType
            encounterType: localStorage.prescriptionfillUuidencountertype,
            encounterDatetime: time,
            provoider: localStorage.loggedInUser
            //orders: order
        })
        var encounterStore = Ext.create('RaxaEmr.Pharmacy.store.drugEncounter')
        encounterStore.add(encounter)
        // make post call for encounter
        encounterStore.sync()
        encounterStore.on('write', function () {
            var l = Ext.getCmp('mainarea').getLayout();
            l.setActiveItem(0);
            var l1 = Ext.getCmp('addpatientarea').getLayout();
            l1.setActiveItem(0);
            var l2 = Ext.getCmp('addpatientgridarea').getLayout();
            l2.setActiveItem(0);
            Ext.getCmp('drugASearchGrid').getStore().removeAll();
            Ext.getCmp('prescriptionDate').setValue('');
            Ext.Msg.alert('successfull')
        }, this)
    },
    
    prescriptionFillQueuedPatient: function(){
        this.sendPharmacyEncounter(localStorage.person,localStorage.prescriptionfillUuidencountertype)
        var l = Ext.getCmp('mainarea').getLayout();
        l.setActiveItem(0);
        var l1 = Ext.getCmp('addpatientarea').getLayout();
        l1.setActiveItem(0);
        var l2 = Ext.getCmp('addpatientgridarea').getLayout();
        l2.setActiveItem(0);
        Ext.getCmp('drugASearchGrid').getStore().removeAll();
        Ext.getCmp('prescriptionDate').setValue('');
    }

});
