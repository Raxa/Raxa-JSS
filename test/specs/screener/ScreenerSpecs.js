describe("Adds New Patient", function() {
    
    var store = null;
    var ctlr = null;
    var view = null;
    

    beforeEach(function(){
        if (!ctlr) {
            ctlr = App.getController('Application');
        }
        if(!view)
        {
            view = Ext.create('Screener.view.NewPatient');
                
            //mocking ajax call with Jasmine Spies
            Ext.getCmp("givenName").setValue('Raxa');
            Ext.getCmp("familyName").setValue('Jss');
            Ext.getCmp('ext-radiofield-1').check();
        }
        if(!store)
        {
            store = Ext.create('Screener.store.NewPersons');
        }
    });
    
    it("data in the form fields and responce from ajax request loads in store",function(){
        
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"uuid\": \"a1b066a7-53de-4d35-914f-765b3c782855\",\"display\":\"Raxa Jss\",\"gender\":\"M\",\"age\":null,\"birthdate\":null,\"birthdateEstimated\":false,\"dead\":false,\"deathDate\":null,\"causeOfDeath\":null,\"preferredName\":{\"uuid\":\"c9ad4ece-9b3b-4b4c-aad0-ad1b80624cb4\",\"display\":\"Raxa Jss\",\"links\":[{\"uri\":\"NEED-TO-CONFIGURE/ws/rest/v1/person/a1b066a7-53de-4d35-914f-765b3c782855/name/c9ad4ece-9b3b-4b4c-aad0-ad1b80624cb4\",\"rel\":\"self\"}]},\"preferredAddress\":null,\"attributes\":[],\"voided\": false,\"links\":[{\"uri\":\"NEED-TO-CONFIGURE/ws/rest/v1/person/a1b066a7-53de-4d35-914f-765b3c782855\",\"rel\":\"self\"},{\"uri\":\"NEED-TO-CONFIGURE/ws/rest/v1/person/a1b066a7-53de-4d35-914f-765b3c782855?v=full\",\"rel\":\"full\"}]}",
                status: 201
        }
            request.success = 'true';
            request.callback(null, true, response);
        })
        store = ctlr.savePerson();
        expect(store.getAt(0).getData().uuid).toEqual("a1b066a7-53de-4d35-914f-765b3c782855");
        
    });
	
    it("loads patientIdentifiersTypes in store",function(){
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"results\":[{\"uuid\":\"8d79403a-c2cc-11de-8d13-0010c6dffd0f\",\"display\":\"Old Identification Number - Number given out prior to the OpenMRS system (No check digit)\",\"links\":[{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/patientidentifiertype/8d79403a-c2cc-11de-8d13-0010c6dffd0f\",\"rel\":\"self\"}]},{\"uuid\":\"8d793bee-c2cc-11de-8d13-0010c6dffd0f\",\"display\":\"OpenMRS Identification Number - Unique number used in OpenMRS\",\"links\":[{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/patientidentifiertype/8d793bee-c2cc-11de-8d13-0010c6dffd0f\",\"rel\":\"self\"}]}]}",
                status: 200
            }
            request.success = 'true';
            request.callback(null, true, response)
        })
        store = Ext.create('Screener.store.IdentifierType');
        store.load();
        expect(store.getAt(0).getData().uuid).toEqual("8d79403a-c2cc-11de-8d13-0010c6dffd0f")
    });
    
    it("loads patientIdentifiersTypes in store",function(){
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"results\":[{\"uuid\":\"8d6c993e-c2cc-11de-8d13-0010c6dffd0f\",\"display\":\"Unknown Location - \",\"links\":[{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v2/location/8d6c993e-c2cc-11de-8d13-0010c6dffd0f\",\"rel\":\"self\"}]}]}",
                status: 200
            }
            request.success = 'true';
            request.callback(null, true, response)
        })
        store = Ext.create('Screener.store.Location');
        store.load();
        expect(store.getAt(0).getData().uuid).toEqual("8d6c993e-c2cc-11de-8d13-0010c6dffd0f")
    });
    it("responce from ajax request loads in store",function(){
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"uuid\":\"8896cd8c-e910-44df-96cd-37ce894fd6e3\",\"display\":\"Raxa Jss\",\"gender\":\"M\",\"age\":20,\"birthdate\":null,\"birthdateEstimated\":false,\"dead\":false,\"deathDate\":null,\"causeOfDeath\":null,\"preferredName\":{\"uuid\":\"31913fd2-2f83-48ab-83ad-12a587fe3744\",\"display\":\"Raxa Jss\",\"links\":[{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/8896cd8c-e910-44df-96cd-37ce894fd6e3/name/31913fd2-2f83-48ab-83ad-12a587fe3744\",\"rel\":\"self\"}]},\"preferredAddress\":{\"uuid\":\"675dd755-1a5c-41db-b9b0-548d80c4fab2\",\"display\":\"12\",\"links\":[{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/8896cd8c-e910-44df-96cd-37ce894fd6e3/address/675dd755-1a5c-41db-b9b0-548d80c4fab2\",\"rel\":\"self\"}]},\"attributes\":[],\"voided\":false,\"links\":[{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/8896cd8c-e910-44df-96cd-37ce894fd6e3\",\"rel\":\"self\"},{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/8896cd8c-e910-44df-96cd-37ce894fd6e3?v=full\",\"rel\":\"full\"}]}",
                status: 201

            }
            request.success = 'true';
            request.callback(null, true, response);
        })
        var patient = Ext.create('Screener.model.NewPatient',{
            person : "8896cd8c-e910-44df-96cd-37ce894fd6e3",
            identifiers : [{
                identifier : Util.getPatientIdentifier().toString(),
                identifierType : "8d79403a-c2cc-11de-8d13-0010c6dffd0f",
                location : "8d6c993e-c2cc-11de-8d13-0010c6dffd0f",
                preferred : true
            }]
        });
        store = Ext.create('Screener.store.Patients')
        store.add(patient);
        store.sync();
        expect(store.getAt(0).getData().person).toEqual("8896cd8c-e910-44df-96cd-37ce894fd6e3");
        expect(store.getAt(0).getData().identifiers[0].location).toEqual("8d6c993e-c2cc-11de-8d13-0010c6dffd0f");
    });
});

describe("PatientList", function () {
    var mainList = null;
    var timeOut = 8000;
    beforeEach(function () {
        if (!mainList) {
            mainList = Ext.create('Screener.store.Patients');
        }
        expect(mainList).toBeTruthy();
        waitsFor(
            function () {
                return !mainList.isLoading();
            }, "store load not completed (timeout)", timeOut);
    });

    it(" reading from Patients store & comparing with REST result ", function () {

        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"results\":["
                +"{\"uuid\": \"b0763e6d-95e7-11e1-beba-4dc2e8449b3e\",\"display\": \"Mr. Alpha d Gamma\","
                +"\"links\":[{\"uri\": \"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/b0763e6d-95e7-11e1-beba-4dc2e8449b3e\",\"rel\": \"self\"}]},"
                +"{\"uuid\": \"3c0a2629-faa4-41f2-b573-a5afac346a54\",\"display\": \"Mr Beta k Delta\","
                +"\"links\":[{\"uri\": \"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/3c0a2629-faa4-41f2-b573-a5afac346a54\",\"rel\": \"self\"}]},"
                +"{\"uuid\": \"5838ff26-cd81-4885-ac1b-83969e55eb6b\",\"display\": \"Mrs. Epsilon c Tau\","
                +"\"links\":[{\"uri\": \"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/5838ff26-cd81-4885-ac1b-83969e55eb6b\",\"rel\": \"self\"}]}]}",
                status: 200
            };
            request.success = 'true';
            // this callback is loading response(defined above) in store instead of loading a actual reponse from server
            // Callback method takes options, success and reponse as inputs
            request.callback(null, true, response);
        });

        mainList = Ext.create('Screener.store.Patients');
        expect(mainList.getData().getAt(0).getData().display).toEqual("Mr. Alpha d Gamma");
        expect(mainList.getData().getAt(1).getData().display).toEqual("Mr Beta k Delta");
        expect(mainList.getData().getAt(2).getData().display).toEqual("Mrs. Epsilon c Tau");
        expect(mainList.getData().getAt(0).getData().uuid).toEqual("b0763e6d-95e7-11e1-beba-4dc2e8449b3e");
        expect(mainList.getData().getAt(1).getData().links[0].uri).toEqual("http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/3c0a2629-faa4-41f2-b573-a5afac346a54");
        expect(mainList.getData().getAt(2).getData().links[0].rel).toEqual("self");
    });
});

describe("DoctorList", function () {
    var store = null;
    var timeout = 4000;
    beforeEach(function () {
        Util.saveBasicAuthHeader("admin","Hello123");
        if (!store) {
            store = Ext.create('Screener.store.DoctorList');
        }
        expect(store).toBeTruthy()
        waitsFor(
            function () {
                return !store.isLoading();
            }, "store load not completed (timeout)", timeout)
    });
  
    it("reading from DoctorList store & comparing with REST result", function () {
        console.log(store);
		expect(store.getCount()).toBeGreaterThan(0);
        expect(store.getData().getAt(0).getData().uuid).not.toEqual(null);
    });
});
