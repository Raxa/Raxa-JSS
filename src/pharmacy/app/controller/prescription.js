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
        SENT: 'sent',
        PRESCRIBED: 'prescribed',
        OUT: 'out'
    },
    
    DEFAULT_STOCK_CENTER_LOCATION_TAG: "Default Stock Center",
    DEFAULT_PHARMACY_LOCATION_TAG: "Default Pharmacy",
    DEFAULT_STOCK_LOCATION: "Unknown Location",
    
    DRUG_INVENTORY_MODEL:{
        UUID_INDEX: 6,
        BATCH_UUID_INDEX: 12
    },
    
    MONTHS_TO_EXPIRE: 2,
    STOCK_OUT_LIMIT: 80,
    
    TOP_BAR_HEIGHT: 65
};


Ext.define("RaxaEmr.Pharmacy.controller.prescription", {
    extend: 'Ext.app.Controller',

    
    views: ['Viewport', 'prescription', 'pharmacyTopbar', 'addFacility', 'goodsReceiptText', 'listOfDrugs', 'newdrugform', 'pharmacyDetails', 
    'reports', 'addPatient', 'stockIssue', 'stockIssueGrid', 'goodsReceiptGrid', 'goodsReceipt', 'goodsIssueText', 'goodsIssueGrid', 'goodsIssue',
    'allStockPanel', 'allStockGrid', 'allStockForm', 'allStock', 'addDrug', 'allStock', 'prescribedDrugs', 'patientsGridPanel', 'requisition',
    'requisitionText', 'requisitionGrid', 'DrugDetails', 'DrugDetailsText', 'DrugDetailsGrid', 'alertGrid', 'InventoryEditor'],
    
    stores: ['orderStore', 'Doctors', 'Identifiers', 'Locations', 'Patients', 'Persons', 'drugOrderPatient', 'drugOrderSearch', 'drugConcept', 'drugEncounter', 'allDrugs', 'Alerts', 'DrugInfos'],
    models: ['Address', 'Doctor', 'Identifier', 'Name', 'Patient', 'Person', 'drugOrderPatient', 'drugOrderSearch', 'drugOrder', 'drugEncounter', 'LocationTag', 'Location', 'PurchaseOrder', 'Alert', 'Provider', 'DrugInfo'],
    
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
                }
            },
            'prescription button[action=doneWithQueuedPatientPrescription]': {
                click: this.prescriptionFillPatient
            },
            'prescription button[action=printPrescribedDrugs]': {   //Action of Print button in Search Patient
                click: this.printPrescribedDrugs
            },
            'prescribedDrugs button[action=addDrugToPrescription]': {
                click: this.addDrug
            },
            'prescribedDrugs': {
                deleteDrug: this.deleteDrug

            },
            'patientsgridpanel': {
                click: function(x) {
                    this.patientSelect(x, "searchGrid", "drugOrderASearchGrid");
                }
            },
            'prescription #patientASearchGrid': {
                select: function(grid, record, row) {
                    this.patientSelect(record.data, "searchGrid", "drugOrderASearchGrid");
                }
            },
            'prescription #todayPatientGrid': {
                select: function(grid, record, row) {
                    this.patientSelect(record.data, "todayPatientPanel", "todayPatientsDrugOrders");
                }
            },
            'prescription #sevenDaysPatientGrid': {
                select: function(grid, record, row) {
                    this.patientSelect(record.data, "sevenDaysPatientPanel", "sevenDaysPatientsDrugOrders");
                }
            },
            'prescription #patientNameASearch': {
                specialkey: function(field, e) {
                    if(e.getKey() === KEY.ENTER) {
                        this.searchPatient('searchGrid', 'patientNameASearch', 'patientASearchGrid');
                    }
                }
            },
            'prescription #todayPatientNameSearch': {
                keyup: function() {
                    this.searchFilteredPatient("todayPatientPanel", 'todayPatientNameSearch', "todayPatientGrid");
                }
            },
            'prescription #sevenDaysPatientNameSearch': {
                keyup: function() {
                    this.searchFilteredPatient("sevenDaysPatientPanel", 'sevenDaysPatientNameSearch', "sevenDaysPatientGrid");
                }
            },
            "prescription": {
                // as the perscription view activates it attaches listners to the 3 fields and 2
                // girds of advanced search
                activate: function () {
                    this.getStartupUuids();
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
            "allStockForm button[action=cancelAllStockLocationPicker]": {
                click: this.showAllStock
            },
            'allStockForm #allStockLocationPicker':{
                select: this.filterAllStocksByLocation
            },
            "allStockPanel button[action=showAvailableStock]": {
                click: this.showAvailableStock
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
            "inventoryEditor button[action=cancelEditInventory]": {
                click: this.cancelEditInventory
            },
            "inventoryEditor button[action=updateInventory]": {
                click: this.updateInventory
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
                    Ext.getCmp('mainarea').getLayout().setActiveItem(RaxaEmr_Pharmacy_Controller_Vars.PHARM_PAGES.ALLSTOCK.value);
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
            },
            'alertGrid': {
                deleteAlert: this.deleteAlert
            }
        });
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
            name: "Registration Encounter",
            // defining the seach query according to the current date and period of time for prescription encounter
            //changing this to REGISTRATION encounter, until the OPD is complete to give prescriptions
            searchQuery: "?encounterType=" + localStorage.regUuidencountertype + "&startDate=" + Util.Datetime(enddate, backwardtime) + "&endDate=" + Util.Datetime(enddate,forwardtime)
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
            //changing this to REGISTRATION encounter type until OPD is ready 
            url: this.getPatientListUrl(store_preEncounter.getAt(0).getData().uuid, store_prefillEncounter.getAt(0).getData().uuid, localStorage.regUuidencountertype),
            headers: Util.getBasicAuthHeaders(),
            reader: {
                type: 'json',
                root: 'patients'
            }
        })
        // makes the GET call to get the list with patients with prescription encounter and not prescription fill
        Ext.getCmp(patientGridId).getStore().load();
        Ext.getCmp('pharmacyTopBar').clearButtonsUI();
        Ext.getCmp('patientsButton').setUI('raxa-orange-large');
    },
    // returns dynamically changed URL for getting patientList
    getPatientListUrl: function (reg_UUID, scr_UUID, encountertype) {
        return (HOST + '/ws/rest/v1/raxacore/patientlist' + '?inList=' + reg_UUID + '&notInList=' + scr_UUID + '&encounterType=' + encountertype);
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
        if(Ext.getCmp('familyName').getValue()!==""){
            var selectedPatient = {
                Name: Ext.getCmp('givenName').getValue()+Ext.getCmp('familyName').getValue(),
                Doctor: Ext.getCmp('doctor').getValue(),
                Dob: Ext.getCmp('dob').getValue(),
                Age: Ext.getCmp('age').getValue(),
                Gender:Ext.getCmp('sexRadioGroup').getChecked()[0].boxLabel.charAt(0),
                Length : Grid.length,
                DrugGrid:Grid
            };
        }
        else {
            var selectedPatient = {
                Name: Ext.getCmp('prescriptionPatientName').getValue(),
                Doctor: Ext.getCmp('doctor').getValue(),
                Dob: Ext.getCmp('dob').getValue(),
                Age: Ext.getCmp('prescriptionPatientAge').getValue(),
                Gender:Ext.getCmp('prescriptionPatientGender').getValue(),
                Length : Grid.length,
                DrugGrid:Grid
            }
        }
        localStorage.setItem('selectedPatient', JSON.stringify(selectedPatient));
        var printWindow = window.open('app/print.html', 'Fill Prescription', 'height=500,width=1100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes');
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
            drugGrid[i1].drugName=drugs.items[i1].data.drugName ;
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
        Ext.getStore('orderStore').add({
            drugname: '',
            dosage: '',
            duration: '',
            unitprice: '',
            itemprice: ''
        });
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

    /* this funtions makes a post call to create the patient with three parameter which will sent as person, identifiertype 
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
            this.sendPharmacyEncounter(personUuid, localStorage.prescriptionUuidencountertype);
        },this)
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
            if(drugs.items[i1].data.drugName != ""){
                k2++;
                var Url = HOST + '/ws/rest/v1/raxacore/drug/'
                Url = Url + drugs.items[i1].data.drugUuid;
                concept.push(Ext.create('RaxaEmr.Pharmacy.store.drugConcept'));
                // setting up the proxy for store with the above Url
                concept[k++].setProxy({
                    type: 'rest',
                    url: Url,
                    headers: Util.getBasicAuthHeaders(),
                    reader: {
                        type: 'json'
                    }
                })
                var startdate = new Date();
                // value of end date depending on the duration in days
                var enddate = new Date(startdate.getFullYear(), startdate.getMonth(), startdate.getDate() + drugs.items[i1].data.duration);
                // model for drug order is created here
                var newDosage = drugs.items[i1].data.dosage.toFixed(2);
                var newInstructions = drugs.items[i1].data.instructions;
                if(drugs.items[i1].data.takeInMorning){
                    newInstructions += "Take one dose in morning. "
                }
                if(drugs.items[i1].data.takeInDay){
                    newInstructions += "Take one dose during the day. "
                }
                if(drugs.items[i1].data.takeInEvening){
                    newInstructions += "Take one dose in the evening. "
                }
                if(drugs.items[i1].data.takeInNight){
                    newInstructions += "Take one dose in the night. "
                }
                order.push({
                    patient: uuid,
                    drug: drugs.items[i1].data.drugUuid,
                    instructions: newInstructions,
                    startDate: startdate,
                    autoExpireDate: enddate,
                    dose: newDosage,
                    quantity: drugs.items[i1].data.qty,
                    // type should be "drugorder" in order to post a drug order
                    type: 'drugorder'
                })
                // here it makes the get call for concept of related drug
                concept[i1].load({
                    scope: this,
                    callback: function(records, operation, success){
                        if(success){
                            // added a counter k which increment as a concept load successfully, after all the concept are loaded
                            // value of k should be equal to the no. of drug forms
                            k1++;
                            console.log(k1+" "+k+" "+k2);
                            if (k == drugs.items.length && k1 == k2) {
                                for (var j = 0; j < concept.length; j++) {
                                    order[j].concept = concept[j].getAt(0).getData().concept;
                                }
                                var time = this.ISODateString(new Date());
                                // model for posting the encounter for given drug orders
                                RaxaEmr.Pharmacy.model.drugEncounter.getFields()[5].persist = true;
                                var encounter = Ext.create('RaxaEmr.Pharmacy.model.drugEncounter', {
                                    patient: uuid,
                                    // this is the encounter for the prescription encounterType
                                    encounterType: typeOfEncounter,
                                    encounterDatetime: time,
                                    orders: order,
                                    provider: localStorage.loggedInUser
                                })
                                var encounterStore = Ext.create('RaxaEmr.Pharmacy.store.drugEncounter')
                                encounterStore.add(encounter)
                                // make post call for encounter
                                encounterStore.sync({
                                    scope: this,
                                    success: function(){
                                        Ext.Msg.alert('Successful')
                                        var l = Ext.getCmp('mainarea').getLayout();
                                        l.setActiveItem(0);
                                        var l1 = Ext.getCmp('addpatientarea').getLayout();
                                        l1.setActiveItem(0);
                                        var l2 = Ext.getCmp('addpatientgridarea').getLayout();
                                        l2.setActiveItem(0);
                                        Ext.getCmp('drugASearchGrid').getStore().removeAll();
                                        Ext.getCmp('prescriptionDate').setValue('');
                                        Ext.getStore('orderStore').removeAll();
                                        this.sendPrescriptionFill();
                                    }, 
                                    failure: function(){
                                        Ext.Msg.alert("Failure -- Please try again");
                                    }
                                });
                            }
                        }
                        else{
                            Ext.Msg.alert("Error: failed to read from server");
                        }
                    }
                });
            }
            else{
                Ext.Msg.alert('Error: enter a drug');
                return;
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
        l2.setActiveItem(1);
        Ext.getCmp('prescribedDrugs').setPosition(190,180);
        Ext.getCmp('prescribedDrugs').getStore().removeAll();
        //Ext.getCmp('prescribedDrugs').getStore().add(x);
        Ext.getStore('orderStore').add({
            drugName: x.data.drugname,
            qty: x.data.quantity,
            dosage: x.data.dosage,
            drugUuid: x.data.drugUuid,
            duration: Util.daysBetween(x.data.startDate, x.data.endDate)
        })[0];
        Ext.getCmp('prescriptionDate').setValue(x.getData().startDate.toLocaleDateString())
    },

    //function to be call when a patient is selected in the patient search results gird of advanced search
    //sets the fields realted to patient in main screen and then calls for function getDrugOrders()
    patientSelect: function (x, searchPanel, drugOrderGrid) {
        Ext.getCmp('prescriptionPatientName').setValue(x.display);
        //below its commented as the identifier are not sent in patient search results
        //Ext.getCmp('prescriptionPatientId').setValue(x.identifier)
        if (x.age != 0) {
            Ext.getCmp('prescriptionPatientAge').setValue(x.age);
        }
        else {
            Ext.getCmp('prescriptionPatientAge').setValue(null);
        }
        Ext.getCmp('prescriptionPatientGender').setValue(x.gender);
        localStorage.setItem('person', x.uuid);
        this.getDrugOrders(x.uuid, searchPanel, drugOrderGrid);
    },

    makeNewPrescriptionForSearchPatient: function() {
        //https://raxaemr.atlassian.net/browse/RAXAJSS-411
        //TODO: clean up by removing magic numbers
        var l1 = Ext.getCmp('addpatientarea').getLayout();
        l1.setActiveItem(0);
        var l1 = Ext.getCmp('addpatientgridarea').getLayout();
        l1.setActiveItem(1);
        Ext.getCmp('prescribedDrugs').setPosition(190,180);
        Ext.getStore('orderStore').removeAll();
        Ext.getStore('orderStore').add({
            drugName: '',
            quantity: ''
        });
    },

    //function for the get call for drugorder for related patient
    getDrugOrders: function (x, searchPanel, drugOrderGrid) {
        var Url = HOST + '/ws/rest/v1/order?patient=';
        Url = Url + x + '&&v=full';
        // setting up the proxy here because url is not fixed
        Ext.getCmp(drugOrderGrid).getStore().setProxy({
            type: 'rest',
            url: Url,
            headers: Util.getBasicAuthHeaders(),
            reader: {
                type: 'json',
                root: 'results'
            }
        })
        // make the GET call for patients with given uuid
        Ext.getCmp(drugOrderGrid).getStore().load();
        Ext.getCmp(drugOrderGrid).getStore().on('load', function () {
            this.makeNewPrescriptionForSearchPatient();
            if(Ext.getCmp(drugOrderGrid).getStore().count()>0){
                // show prescriptions grid(drugOrderASearchGrid) when drug orders are loaded
                Ext.getCmp(searchPanel).getLayout().setActiveItem(1)
            }
            else{
            }
        }, this)
    },
    
    searchFilteredPatient: function(searchPanel, nameField, searchGrid) {
        Ext.getCmp(searchPanel).getLayout().setActiveItem(0)
        // makes the Get call for the patient list
        Ext.getCmp(searchGrid).getStore().filterBy(function(record){
            if(record.data.display.toLowerCase().indexOf(Ext.getCmp(nameField).getValue().toLowerCase())!==-1){
                return true;
            }
            return false;
        });
    },

    //function that make the get call when enter is pressed within any of the 3 text fieds in advanced search
    searchPatient: function (searchPanel, nameField, searchGrid) {
        Ext.getCmp(searchPanel).getLayout().setActiveItem(0)
        if (Ext.getCmp(nameField).getValue() != "") {
            // setting up url with the query for given patient name
            var Url = HOST + '/ws/rest/v1/patient?q=' + Ext.getCmp(nameField).getValue() + "&v=full";
            // setting up the proxy here because url is not fixed
            Ext.getCmp(searchGrid).getStore().setProxy({
                type: 'rest',
                url: Url,
                headers: Util.getBasicAuthHeaders(),
                reader: {
                    type: 'json',
                    root: 'results'
                }
            })
            // makes the Get call for the patient list
            Ext.getCmp(searchGrid).getStore().load();
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
        var receiptLocationUuid = Ext.getCmp("receiptLocationPicker").lastSelection[0].data.uuid;
        var stockLocationUuid = localStorage.stockLocation;
        var receiptLocationString = Ext.getCmp("receiptLocationPicker").lastSelection[0].data.display.toString().split(" - ")[0];
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
                    location: receiptLocationUuid
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
            stockLocation: stockLocationUuid,
            dispenseLocation: receiptLocationUuid,
            drugPurchaseOrderDate: time,
            inventories: drugInventories
        });
        var purchaseOrderStore = Ext.create('RaxaEmr.Pharmacy.store.PurchaseOrders');
        purchaseOrderStore.add(purchaseOrder);
        // make post call for encounter
        if(purchaseOrderUuid!==null){
            purchaseOrderStore.getProxy().url = HOST + '/ws/rest/v1/raxacore/drugpurchaseorder/'+purchaseOrderUuid;
        }
        Ext.getCmp('submitReceiptButton').disable();
        purchaseOrderStore.sync({
            success: function(){
                purchaseOrderStore.getProxy().url = HOST + '/ws/rest/v1/raxacore/drugpurchaseorder';
                Ext.getStore('stockList').load();
                Ext.getCmp('allStockGrid').getView().refresh();
                Ext.getStore('batches').load();
                Ext.getStore('newReceipt').removeAll();
                Ext.Msg.alert('Successful');
                Ext.getCmp('submitReceiptButton').enable();
            },
            failure: function(){
                purchaseOrderStore.getProxy().url = HOST + '/ws/rest/v1/raxacore/drugpurchaseorder';                
                Ext.getCmp('submitReceiptButton').enable();
                Ext.Msg.alert('Error: unable to write to server');
            }
        });
    },


    //creates new requisition
    newRequisition: function() {
        Ext.getCmp('mainarea').getLayout().setActiveItem(RaxaEmr_Pharmacy_Controller_Vars.PHARM_PAGES.REQUISITION.value);
    },
    
    //creates new drug
    newDrug: function() {
        if(Ext.getCmp('addDrug').isHidden()){
            Ext.getCmp('addDrug').show();
            var x = Ext.getCmp('pharmacyTopBar').x + Ext.getCmp('pharmacyTopBar').width - Ext.getCmp('alertPanel').width;
            Ext.getCmp('newDrugButton').setText('Close');
            Ext.getCmp('newDrugButton').setUI('raxa-orange-small');

        }else{
            Ext.getCmp('addDrug').hide();
            Ext.getCmp('newDrugButton').setText('New Drug');
            Ext.getCmp('newDrugButton').setUI('default');
        }
    },
    
    submitNewDrug: function() {
        Ext.getCmp('addDrug').hide();
        Ext.getCmp('newDrugButton').setText('New Drug');
        Ext.getCmp('newDrugButton').setUI('default');
        //getting drug concept from OpenMRS
        Ext.Ajax.request({
            url: HOST + '/ws/rest/v1/concept?q='+Ext.getCmp('addDrugName').getValue()+"&v=full",
            method: 'GET',
            disableCaching: false,
            headers: Util.getBasicAuthHeaders(),
            success: function (response) {
                var jsonResponse = Ext.decode(response.responseText);
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
                        this.postNewDrug(jsonResponse.results[j].uuid);
                    }
                    j++;
                }
                if(!complete){
                    //we need to make the concept as we didn't find it
                    this.postConceptForNewDrug();
                }
            },
            scope: this
        });
    },

    postNewDrug: function(conceptUuid) {
        var newDrug = {
            concept: conceptUuid,
            name: Ext.getCmp('addDrugName').getValue(),
            dosageForm: Ext.getCmp('dosageFormPicker').getValue(),
            minimumDailyDose: Ext.getCmp('addDrugMinimumDose').getValue(),
            maximumDailyDose: Ext.getCmp('addDrugMaximumDose').getValue(),
            units: Ext.getCmp('addDrugUnits').getValue()
        };
        var newDrugParam = Ext.encode(newDrug);
        Ext.Ajax.request({
            url: HOST + '/ws/rest/v1/raxacore/drug',
            method: 'POST',
            params: newDrugParam,
            disableCaching: false,
            headers: Util.getBasicAuthHeaders(),
            success: function (response) {
                Ext.getStore('stockList').load();
                Ext.getCmp('allStockGrid').getView().refresh();
                Ext.getStore('batches').load();
                Ext.Msg.alert('Drug created successfully');
            },
            failure: function (response) {
                Ext.Msg.alert('Error: unable to write to server. Enter all fields.')
            }
        });
    },

    postConceptForNewDrug: function(){
        var newConcept = {
            names: [{name: Ext.getCmp('addDrugName').getValue(), locale: "en", conceptNameType: "FULLY_SPECIFIED"}],
            datatype: localStorage.drugConceptDataTypeUuid,
            conceptClass: localStorage.drugConceptClassUuid
        };
        var newConceptParam = Ext.encode(newConcept);
        Ext.Ajax.request({
            url: HOST + '/ws/rest/v1/concept',
            method: 'POST',
            params: newConceptParam,
            disableCaching: false,
            headers: Util.getBasicAuthHeaders(),
            success: function (response) {
                var jsonResponse = Ext.decode(response.responseText);
                this.postNewDrug(jsonResponse.uuid);
            }, scope: this
        })        
    },

    //these Uuids should go into Util with the other resources, however OpenMRS has a bug that doesnt allow
    //searching on conceptdatatype and conceptclass...so they will come into here for now.
    //TODO: move them into Util once OpenMRS allows searching on these
    getStartupUuids: function(){
        if(!localStorage.drugConceptClassUuid || !localStorage.drugConceptDataTypeUuid){
            Ext.Ajax.request({
                url: HOST + '/ws/rest/v1/conceptclass',
                method: 'GET',
                disableCaching: false,
                headers: Util.getBasicAuthHeaders(),
                success: function (response) {
                    var jsonResponse = Ext.decode(response.responseText);
                    for(var i=0; i<jsonResponse.results.length; i++){
                        if(jsonResponse.results[i].display === "Drug - Drug"){
                            localStorage.setItem('drugConceptClassUuid', jsonResponse.results[i].uuid);
                            Ext.Ajax.request({
                                url: HOST + '/ws/rest/v1/conceptdatatype',
                                method: 'GET',
                                disableCaching: false,
                                headers: Util.getBasicAuthHeaders(),
                                success: function(response) {
                                    var jsonResponse = Ext.decode(response.responseText);
                                    for(var j=0; j<jsonResponse.results.length; j++){
                                        if(jsonResponse.results[j].display === "N/A - Not associated with a datatype (e.g., term answers, sets)"){
                                            localStorage.setItem('drugConceptDataTypeUuid', jsonResponse.results[j].uuid);
                                        }
                                    }
                                }, scope: this
                            })
                        }
                    }
                }, scope: this
            });
        }
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
        var purchaseOrderStore = Ext.create('RaxaEmr.Pharmacy.store.PurchaseOrders');
        purchaseOrderStore.add(purchaseOrder);
        // make post call for encounter
        purchaseOrderStore.sync();
        purchaseOrderStore.on('write', function () {
            //sending alert that requisition has been made
            var alertParams = {
                name: "Requisition from "+dispenseLocationString+ " on "+time.toString().substr(0, 10),
                toLocation: Ext.getStore("stockLocations").getAt(stockLocationIndex).data.uuid,
                providerSent: Util.getLoggedInProviderUuid(),
                alertType: "newRequisition",
                defaultTask: "newIssue",
                time: Util.getCurrentTime()
            };
            Util.sendAlert(alertParams);
            Ext.getCmp('alertButton').setUI('raxa-orange-small');
            Ext.getStore('stockList').load();
            Ext.getCmp('allStockGrid').getView().refresh();
            Ext.getStore('fillRequisitions').load();
            Ext.Msg.alert('Successful');
        }, this);
    },
    
    
    /**
         * Fills a purchase order when a stock admin wants to make a new issue
         * Populates issue drug fields with drugs + quantites from the purchase order
         */
    populateIssueFromPurchaseOrder: function(combo, records){
        Ext.getCmp('issuedispenseLocationPicker').setValue(records[0].data.dispenseLocation.uuid);
        Ext.getCmp('issueStockLocationPicker').setValue(records[0].data.stockLocation.uuid);
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
        
    /**
         * checks whether the issue is valid -- returns with error message, or null if issue is valid
         */
    validateIssue: function(issues){
        console.log(issues);
        if(issues.items.length === 0){
            return "Please enter a drug";
        }
        Ext.getStore('stockList').clearFilter();
        for (var i=0; i<issues.items.length; i++){
            if (issues.items[i].data.drugName==="" || issues.items[i].data.batch==="" || issues.items[i].data.quantity<0 || issues.items[i].data.expiryDate===""){
                return "Blank fields not allowed";
            }
            if (Ext.getStore('allDrugs').find('text', issues.items[i].data.drugName)===-1){
                return "Drug "+issues.items[i].data.drugName+" not found";
            }
            var batchIndex = Ext.getStore('stockList').find('uuid', issues.items[i].data.batchUuid);
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
        var issuedispenseLocationUuid = Ext.getCmp("issuedispenseLocationPicker").value;
        var issueStockLocationUuid = Ext.getCmp("issueStockLocationPicker").value;
        var purchaseOrderUuid = Ext.getCmp('issuePurchaseOrderPicker').getValue();
        var issueStockLocationString = Ext.getCmp("issueStockLocationPicker").rawValue.split(" - ")[0];
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
                location: issuedispenseLocationUuid
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
            stockLocation: issueStockLocationUuid,
            dispenseLocation: issuedispenseLocationUuid,
            drugPurchaseOrderDate: time,
            inventories: drugInventories
        });
        var purchaseOrderStore = Ext.create('RaxaEmr.Pharmacy.store.PurchaseOrders');
        purchaseOrderStore.add(purchaseOrder);
        // make post call for encounter -- if we are updating a purchase order, set url, otherwise post
        if(purchaseOrderUuid!==null){
            purchaseOrderStore.getProxy().url = HOST + '/ws/rest/v1/raxacore/drugpurchaseorder/'+purchaseOrderUuid;
        }
        Ext.getCmp('submitIssueButton').disable();
        purchaseOrderStore.sync({
            success: function(){
                //sending alert that requisition has been made
                var alertParams = {
                    name: "Issue from "+issueStockLocationString+ " on "+time.toString().substr(0, 10),
                    toLocation: issueStockLocationUuid,
                    fromLocation: issuedispenseLocationUuid,
                    providerSent: Util.getLoggedInProviderUuid(),
                    alertType: "newIssue",
                    defaultTask: "newReceipt",
                    time: Util.getCurrentTime()
                };
                Util.sendAlert(alertParams);
                Ext.getCmp('alertButton').setUI('raxa-orange-small');
                purchaseOrderStore.getProxy().url = HOST + '/ws/rest/v1/raxacore/drugpurchaseorder';
                RaxaEmr.Pharmacy.model.DrugInventory.getFields()[RaxaEmr_Pharmacy_Controller_Vars.DRUG_INVENTORY_MODEL.BATCH_UUID_INDEX].persist = false;
                Ext.getCmp('submitIssueButton').enable();
                Ext.getStore('stockList').load();
                Ext.getCmp('allStockGrid').getView().refresh();
                Ext.getStore('stockIssues');
                Ext.Msg.alert('Successful');
            },
            failure: function() {
                purchaseOrderStore.getProxy().url = HOST + '/ws/rest/v1/raxacore/drugpurchaseorder';
                RaxaEmr.Pharmacy.model.DrugInventory.getFields()[RaxaEmr_Pharmacy_Controller_Vars.DRUG_INVENTORY_MODEL.BATCH_UUID_INDEX].persist = false;
                Ext.getCmp('submitIssueButton').enable();
                Ext.Msg.alert('Error: unable to write to server');                
            }
        });
        purchaseOrderStore.on('write', function () {
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
    
    //Called when all stock location has been cleared (no location selected for stock grid)
    showAllStock: function(){
        this.clearAllStockPanelButtonsUI();
        Ext.getStore('stockList').clearFilter();
    },
    
    filterAllStocksByLocation: function() {
        Ext.getStore('stockList').clearFilter();
        //if current location, filter by that
        if(Ext.getCmp('allStockLocationPicker').getValue()!==null){
            Ext.getStore('stockList').filter('locationUuid', Ext.getCmp('allStockLocationPicker').getValue());
        }
    },
    
    //Called when 'stock analysis' button is pressed
    showAvailableStock: function(){
        this.clearAllStockPanelButtonsUI();
        Ext.getCmp('availableStockButton').setUI('raxa-orange-small');
        Ext.getStore('stockList').clearFilter();
        //if current location, filter by that
        if(Ext.getCmp('allStockLocationPicker').getValue()!==null){
            Ext.getStore('stockList').filter('locationUuid', Ext.getCmp('allStockLocationPicker').getValue());
        }
        Ext.getStore('stockList').filter('status', 'available');
    },
    
    //Called when 'Expiring Stock' button is pressed
    showExpiringStock: function(){
        this.clearAllStockPanelButtonsUI();
        Ext.getCmp('expiringStockButton').setUI('raxa-orange-small');
        Ext.getStore('stockList').clearFilter();
        //if current location, filter by that
        if(Ext.getCmp('allStockLocationPicker').getValue()!==null){
            Ext.getStore('stockList').filter('locationUuid', Ext.getCmp('allStockLocationPicker').getValue());
        }
        Ext.getStore('stockList').filterBy(function(record, id){
            return(Util.monthsFromNow(record.data.expiryDate)<RaxaEmr_Pharmacy_Controller_Vars.MONTHS_TO_EXPIRE)
        });
        Ext.getStore('stockList').filter('status', RaxaEmr_Pharmacy_Controller_Vars.STOCK_STATUS.AVAILABLE);
    },
    
    showStockOut: function(){
        this.clearAllStockPanelButtonsUI();
        Ext.getCmp('lowStockButton').setUI('raxa-orange-small');
        Ext.getStore('stockList').clearFilter();
        //if current location, filter by that
        if(Ext.getCmp('allStockLocationPicker').getValue()!==null){
            Ext.getStore('stockList').filter('locationUuid', Ext.getCmp('allStockLocationPicker').getValue());
        }
        Ext.getStore('stockList').filterBy(function(record, id){
            return(record.data.quantity<RaxaEmr_Pharmacy_Controller_Vars.STOCK_OUT_LIMIT)
        });
        Ext.getStore('stockList').filter('status', RaxaEmr_Pharmacy_Controller_Vars.STOCK_STATUS.AVAILABLE);
    },
    
    showAllOrders: function(){
        this.clearAllStockPanelButtonsUI();
        Ext.getCmp('allOrdersButton').setUI('raxa-orange-small');
        Ext.getStore('stockList').clearFilter();
    },
    
    clearAllStockPanelButtonsUI: function(){
        Ext.getCmp('availableStockButton').setUI('default');
        Ext.getCmp('expiringStockButton').setUI('default');
        Ext.getCmp('lowStockButton').setUI('default');
        Ext.getCmp('allOrdersButton').setUI('default');
    },
    
    //reduces the batch quantity in back end
    decrementBatchForPrescription: function() {
        //if there is a batch, for each drug decrement
        var drugInventories = new Array();
        //var issues = Ext.getStore('newIssue').data;
        var drugs = Ext.getStore('orderStore').data;
        RaxaEmr.Pharmacy.model.DrugInventory.getFields()[RaxaEmr_Pharmacy_Controller_Vars.DRUG_INVENTORY_MODEL.BATCH_UUID_INDEX].persist = true;
        var prescriptionStockLocationString = Ext.getStore("Locations").find('uuid', localStorage.stockLocation)
        var prescriptionStockLocationUuid = localStorage.stockLocation;
        for (var i = 0; i < drugs.items.length; i++) {
            if(drugs.items[i].data.batchUuid!==null && drugs.items[i].data.batch!==null && drugs.items[i].data.batchUuid!==""){
                //getting index of drug in store
                var drugIndex = Ext.getStore('allDrugs').find('text', drugs.items[i].data.drugName);
                drugInventories.push({
                    status: RaxaEmr_Pharmacy_Controller_Vars.STOCK_STATUS.PRESCRIBED,
                    batch: drugs.items[i].data.batch,
                    batchUuid: drugs.items[i].data.batchUuid,
                    drug: Ext.getStore('allDrugs').getAt(drugIndex).data.uuid,
                    quantity: drugs.items[i].data.qty
                });
            }
        }
        var time = Util.getCurrentTime();
        // model for posting the encounter for given drug orders
        var purchaseOrder = Ext.create('RaxaEmr.Pharmacy.model.PurchaseOrder', {
            //Keep the name here -- back end depends on it. 
            //TODO: Would like to eventually see purchase order types
            //https://raxaemr.atlassian.net/browse/RAXAJSS-411
            name: "Prescription",
            description: "Prescription from "+prescriptionStockLocationString+ " on "+time.toString().substr(0, 10),
            received: "true",
            provider: Util.getLoggedInProviderUuid(),
            stockLocation: prescriptionStockLocationUuid,
            dispenseLocation: localStorage.pharmacyLocation,
            drugPurchaseOrderDate: time,
            inventories: drugInventories
        });
        var purchaseOrderStore = Ext.create('RaxaEmr.Pharmacy.store.PurchaseOrders');
        purchaseOrderStore.add(purchaseOrder);
        // make post call for encounter -- if we are updating a purchase order, set url, otherwise post
        purchaseOrderStore.sync();
        purchaseOrderStore.on('write', function () {
            RaxaEmr.Pharmacy.model.DrugInventory.getFields()[RaxaEmr_Pharmacy_Controller_Vars.DRUG_INVENTORY_MODEL.BATCH_UUID_INDEX].persist = false;
            Ext.getStore('stockList').load();
            Ext.getCmp('allStockGrid').getView().refresh();
            Ext.getStore('batches').load();
            console.log('Successful batch decrement');
        }, this);
    },
    
    sendPrescriptionFill: function() {
        var time = Util.getCurrentTime();
        //set persist false for orders (we have already sent them as a prescription encounter, dont want to send again)
        //https://raxaemr.atlassian.net/browse/RAXAJSS-411
        //TODO: make this index not a magic number
        RaxaEmr.Pharmacy.model.drugEncounter.getFields()[5].persist = false;
        // model for posting the encounter for given drug orders
        var encounter = Ext.create('RaxaEmr.Pharmacy.model.drugEncounter', {
            patient: localStorage.person,
            // this is the encounter for the prescription encounterType
            encounterType: localStorage.prescriptionfillUuidencountertype,
            encounterDatetime: time,
            provider: localStorage.loggedInUser
        })
        var encounterStore = Ext.create('RaxaEmr.Pharmacy.store.drugEncounter')
        encounterStore.add(encounter)
        //decrement batch for prescription
        this.decrementBatchForPrescription();
        // make post call for encounter
        encounterStore.sync();
        //https://raxaemr.atlassian.net/browse/RAXAJSS-411
        //TODO: make this index not a magic number
        RaxaEmr.Pharmacy.model.drugEncounter.getFields()[5].persist = true;
    },
    
    prescriptionFillPatient: function(){
        //checking to see if the item is '1' which means that new patient panel is active
        //so we are adding a new patient, and we want to save the patient
        if(Ext.getCmp('addpatientarea').items.indexOf(Ext.getCmp('addpatientarea').getLayout().activeItem)===1){
            this.savePerson();
        }
        else{
            this.sendPharmacyEncounter(localStorage.person,localStorage.prescriptionUuidencountertype)
        }
    },
    
    deleteAlert: function(evtData) {
        var store = this.getStore('alerts');
        var record = store.getAt(evtData.rowIndex);
        if(record) {
            store.remove(record);
            var seenAlert = {
                seen: "true"
            };
            Ext.Ajax.request({
                url: HOST + '/ws/rest/v1/raxacore/raxaalert/'+record.data.uuid,
                method: 'POST',
                params: Ext.encode(seenAlert),
                disableCaching: false,
                headers: Util.getBasicAuthHeaders(),
                success: function (response) {
                    console.log('Alert marked as seen');
                }
            });
        }
    },
    
    //hides inventory editor
    cancelEditInventory: function () {
        Ext.getCmp('inventoryEditor').hide();        
    },
    
    //updates inventory according to Inventory Editor fields
    updateInventory: function() {
        var inventory = {
            status: Ext.getCmp('inventoryEditorStatusPicker').getValue(),
            quantity: Ext.getCmp('inventoryEditorQuantity').getValue(),
            drug: Ext.getCmp('inventoryEditorDrugPicker').getValue()
        };
        if(Ext.getCmp('inventoryEditorLocationPicker').getValue()!==""){
            inventory.location=Ext.getCmp('inventoryEditorLocationPicker').getValue()
        }
        if(Ext.getCmp('inventoryEditorBatch').getValue()!==""){
            inventory.batch=Ext.getCmp('inventoryEditorBatch').getValue()
        }
        if(Ext.getCmp('inventoryEditorExpiryDate').getValue()!==""){
            inventory.expiryDate=Ext.getCmp('inventoryEditorExpiryDate').getValue()
        }
        if(Ext.getCmp('inventoryEditorRoomLocation').getValue()!==""){
            inventory.roomLocation=Ext.getCmp('inventoryEditorRoomLocation').getValue()
        }
        Ext.getCmp('updateInventoryButton').disable();
        //this call is made with an Ajax call, rather than a traditional model+store because the fields to be sent
        //are much different than the normal drug inventory fields.
        Ext.Ajax.request({
            url: HOST + '/ws/rest/v1/raxacore/druginventory/'+localStorage.getItem('currentInventory'),
            method: 'POST',
            params: Ext.encode(inventory),
            disableCaching: false,
            headers: Util.getBasicAuthHeaders(),
            success: function (response) {
                Ext.getCmp('inventoryEditor').hide();        
                Ext.getStore('stockList').load();
                Ext.getCmp('allStockGrid').getView().refresh();
                Ext.getStore('batches').load();
                Ext.getCmp('updateInventoryButton').enable();
                Ext.Msg.alert("Edit Successful");
            },
            failure: function (){
                Ext.getCmp('updateInventoryButton').enable();
                Ext.Msg.alert("Error: unable to write to server");
            }
        });
    },
    
    filterDrugs: function(comboBox) {
        Ext.getCmp(comboBox).getStore().filterBy(function(record){
            if(record.data.display.toLowerCase().indexOf(Ext.getCmp(comboBox).getValue().toLowerCase())!==-1){
                return true;
            }
            return false;
        });
    }

});