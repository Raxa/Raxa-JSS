// Enum for Pharmacy Module Page Numbers
var PHARM_PAGES = {
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
    GOODRECEIPT: {
        value: 6,
        name: "goodReceipt"
    }
};

var STOCKCENTERLOCATIONTAG = "Stock Centers";
var PHARMACYLOCATIONTAG = "Pharmacies";

Ext.define("RaxaEmr.Pharmacy.controller.prescription", {
    extend: 'Ext.app.Controller',

    
    views: ['Viewport', 'prescription', 'pharmacyTopbar', 'addFacility', 'goodsReceipt', 'listOfDrugs', 'newdrugform', 'pharmacyDetails', 
    'reports', 'addPatient', 'stockIssue', 'stockIssueGrid', 'goodReceiptGrid', 'goodReceipt', 'goodIssueText', 'goodIssuePop', 'goodIssue',
    'allStockPanel', 'allStockGrid', 'allStockForm', 'allStock', 'addDrug', 'allStock', 'prescribedDrugs', 'patientsGridPanel', 'requisition',
    'requisitionText', 'requisitionGrid'],
    
    stores: ['orderStore', 'Doctors', 'Identifiers', 'Locations', 'Patients', 'Persons', 'drugOrderPatient', 'drugOrderSearch', 'drugConcept', 'drugEncounter', 'allDrugs'],
    models: ['Address', 'Doctor', 'Identifier', 'Name', 'Patient', 'Person', 'drugOrderPatient', 'drugOrderSearch', 'drugOrder', 'drugEncounter', 'LocationTag', 'Location'],
    
    init: function () {
        this.control({
            'prescription [action=addPatient]': {
                click: this.displayForm
            },
            "prescription button[action=done2]": {
                click: this.savePerson
            },
            'prescription button[action=fillPrescription]': {
                click: this.fillPrescription
            },
		'prescription button[action=printPrescribedDrugs]': {   //Action of Print button in Search Patient
                click: this.printPrescribedDrugs
            },
            'prescribedDrugs': {
                render: this.onEditorRender,
                edit: this.afterDrugEdit,
                drugEdit: this.onDrugEdit,
                drugDelete: this.onDrugDelete

            },
            'prescribedDrugs button': {
                click: this.addDrug
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
            'requisitionGrid': {
                requisitionDelete: this.onRequisitionDelete
            },
            'requisitionGrid button[action=addRequisition]': {
                click: this.addRequisition
            },
            'requisition button[action=cancelRequisition]': {
                click: this.cancelRequisition
            },
            'requisition button[action=submitRequisition]': {
                click: this.submitRequisition
            }
        })
    },
    
    onEditorRender: function () {
        // cache a reference to the moviesEditor and rowEditor
        this.drugsEditor = Ext.ComponentQuery.query('prescribedDrugs')[0];
        this.rowEditor = this.drugsEditor.rowEditor;
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
      printPrescribedDrugs: function()
	{
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
	readGrid:function(){
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
        this.rowEditor.startEdit(newDrug, this.drugsEditor.columns[0]);
    },
    
    displayForm: function () {
        var l = Ext.getCmp('addpatientarea').getLayout();
        l.setActiveItem(1);
        var l1 = Ext.getCmp('addpatientgridarea').getLayout();
        l1.setActiveItem(1);
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
    printing:function(selectedPatient)
    {
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
            this.sendPharmacyEncounter(personUuid);
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

    
    sendPharmacyEncounter: function(uuid) {
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
                            encounterType: localStorage.pharmacyUuidencountertype,
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
                        //Note- if we want add a TIMEOUT it shown added somewhere here
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
                        encounterType: localStorage.pharmacyUuidencountertype,
                        encounterDatetime: time,
                        orders: order
                    })
                    var encounterStore = Ext.create('RaxaEmr.Pharmacy.store.drugEncounter')
                    encounterStore.add(encounter)
                    // make post call for encounter
                    encounterStore.sync()
                    encounterStore.on('write', function () {
                        Ext.Msg.alert('successfull')
                    //Note- if we want add a TIMEOUT it shown added somewhere here
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
            // show prescriptions grid(drugOrderASearchGrid) when drug orders are loaded
            Ext.getCmp('searchGrid').getLayout().setActiveItem(1)
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
        console.log('hi');
    },
    
    //creates new stock issue
    newIssue: function(){
        Ext.getCmp('mainarea').getLayout().setActiveItem(PHARM_PAGES.GOODSDETAILS.value);
    },
    
    //creates new receipt
    newReceipt: function() {
        Ext.getCmp('mainarea').getLayout().setActiveItem(PHARM_PAGES.GOODRECEIPT.value);
    },
    
    //creates new requisition
    newRequisition: function() {
        Ext.getCmp('mainarea').getLayout().setActiveItem(PHARM_PAGES.REQUISITION.value);
        localStorage.setItem("currentLocationFilter", STOCKCENTERLOCATIONTAG);
        Ext.getStore('Locations').filter(this.filterLocations);
    },
    
    //helper function to filter locations list by the currnent locationFilter
    filterLocations: function(record){
        return record.hasTag(localStorage.getItem("currentLocationFilter"));
    },

    //creates new drug
    newDrug: function() {
        console.log('hi');
    },
    
    //creates new drug group
    newDrugGroup: function() {
        console.log('hi');
    },
    
    //deletes current row of requisition grid
    onRequisitionDelete: function (evtData) {
        var store = this.getStore('PurchaseOrders');
        var record = store.getAt(evtData.rowIndex);
        if(record) {
            store.remove(record);
        }
    },
    
    //adds new row to requisition grid
    addRequisition: function(){
        // add blank item to store -- will automatically add new row to grid
        Ext.getStore('RequisitionItems').add({
            drugname: '',
            quantity: ''
        })[0];
    },
    
    //cancels new requisition form, goes back to stock overview page
    cancelRequisition: function(){
        Ext.getCmp('mainarea').getLayout().setActiveItem(PHARM_PAGES.ALLSTOCK.value);
    },
    
    submitRequisition: function(){
        var drugInventories = new Array();
        var k = 0,k1 = 0,k2 = 0;
        var requisitions = Ext.getStore('PurchaseOrders').data;
        if(requisitions.items.length == 0){
            RaxaEmr.Pharmacy.model.PurchaseOrder.inventories.persist = false;
        }
        for (var i = 0; i < requisitions.items.length; i++) {
            // value of Url for get call is made here using name of drug
            if(requisitions.items[i].data.drugname != ""){
                //getting index of drug in store
                //var drugIndex = //Ext.getStore('allDrugs').find('name', requisitions.items[i].data.drugName);
                var startdate = Util.Datetime(new Date(), Util.getUTCGMTdiff());
                // model for drug inventory is created here
                drugInventories.push({
                    status: 'ordered',
                    //get uuid of drug
                    drug: requisitions.items[i].data.drugName,//Ext.getStore('allDrugs').getAt(drugIndex).uuid,
                    quantity: requisitions.items[i].data.qty
                //location: 
                // type should be "drugorder" in order to post a drug order
                });
                //console.log(drugInventories);
            }
        }
        var time = Util.Datetime(new Date(), Util.getUTCGMTdiff());
        var locationIndex = Ext.getStore("Locations").find("display", "JSS Stock Center - Holds all incoming stock for JSS/outlying pharmacies");
        // model for posting the encounter for given drug orders
        var purchaseOrder = Ext.create('RaxaEmr.Pharmacy.model.PurchaseOrder', {
            name: "Pharmacy Requisition from "+localStorage.getItem("username"),
            description: "Pharmacy Requisition from "+localStorage.getItem("username"),
            received: "false",
            provider: Util.getLoggedInProviderUuid(),
            location: Ext.getStore("Locations").getAt(locationIndex).data.uuid,
            drugPurchaseOrderDate: time,
            inventories: drugInventories
        });
        var purchaseOrderStore = Ext.create('RaxaEmr.Pharmacy.store.PurchaseOrders');
        purchaseOrderStore.add(purchaseOrder);
        // make post call for encounter
        purchaseOrderStore.sync();
        purchaseOrderStore.on('write', function () {
            Ext.Msg.alert('successful');
        //Note- if we want add a TIMEOUT it shown added somewhere here
        }, this);
    }
});