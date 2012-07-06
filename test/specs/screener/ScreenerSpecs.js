describe("Adds New Patient", function () {

    var store = null;
    var ctlr = null;
    var view = null;


    beforeEach(function () {
        if (!ctlr) {
            ctlr = App.getController('Application');
        }
        if (!view) {
            view = Ext.create('Screener.view.NewPatient');

            //mocking ajax call with Jasmine Spies
            Ext.getCmp("givenName").setValue('Raxa');
            Ext.getCmp("familyName").setValue('Jss');
            Ext.getCmp('ext-radiofield-1').check();
        }
        if (!store) {
            store = Ext.create('Screener.store.NewPersons');
        }
    });

    it("data in the form fields and responce from ajax request loads in store", function () {

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

    it("loads patientIdentifiersTypes in store", function () {
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

    it("loads patientIdentifiersTypes in store", function () {
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
    it("responce from ajax request loads in store", function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"uuid\":\"8896cd8c-e910-44df-96cd-37ce894fd6e3\",\"display\":\"Raxa Jss\",\"gender\":\"M\",\"age\":20,\"birthdate\":null,\"birthdateEstimated\":false,\"dead\":false,\"deathDate\":null,\"causeOfDeath\":null,\"preferredName\":{\"uuid\":\"31913fd2-2f83-48ab-83ad-12a587fe3744\",\"display\":\"Raxa Jss\",\"links\":[{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/8896cd8c-e910-44df-96cd-37ce894fd6e3/name/31913fd2-2f83-48ab-83ad-12a587fe3744\",\"rel\":\"self\"}]},\"preferredAddress\":{\"uuid\":\"675dd755-1a5c-41db-b9b0-548d80c4fab2\",\"display\":\"12\",\"links\":[{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/8896cd8c-e910-44df-96cd-37ce894fd6e3/address/675dd755-1a5c-41db-b9b0-548d80c4fab2\",\"rel\":\"self\"}]},\"attributes\":[],\"voided\":false,\"links\":[{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/8896cd8c-e910-44df-96cd-37ce894fd6e3\",\"rel\":\"self\"},{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/8896cd8c-e910-44df-96cd-37ce894fd6e3?v=full\",\"rel\":\"full\"}]}",
                status: 201

            }
            request.success = 'true';
            request.callback(null, true, response);
        })
        var patient = Ext.create('Screener.model.NewPatient', {
            person: "8896cd8c-e910-44df-96cd-37ce894fd6e3",
            identifiers: [{
                identifier: Util.getPatientIdentifier().toString(),
                identifierType: "8d79403a-c2cc-11de-8d13-0010c6dffd0f",
                location: "8d6c993e-c2cc-11de-8d13-0010c6dffd0f",
                preferred: true
            }]
        });
        store = Ext.create('Screener.store.Patients')
        store.add(patient);
        store.sync();
        expect(store.getAt(0).getData().person).toEqual("8896cd8c-e910-44df-96cd-37ce894fd6e3");
        expect(store.getAt(0).getData().identifiers[0].location).toEqual("8d6c993e-c2cc-11de-8d13-0010c6dffd0f");
    });
});

describe("pharmacy", function () {

    var ctlr = null;
    var view = null;


    beforeEach(function () {
        if (!ctlr) {
            ctlr = App.getController('Application');
        }
        if (!view) {
            view = Ext.create('Screener.view.PharmacyView');
        }
    });
    it("loads concept of given drug", function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"results\":[{\"uuid\":\"18666ae0-be9b-11e1-ab94-0fb973140af6\",\"display\":\"STAVUDINE LAMIVUDINE AND NEVIRAPINE\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/concept/18666ae0-be9b-11e1-ab94-0fb973140af6\",\"rel\":\"self\"}]}]}",
                status: 200
            }
            request.success = true;
            request.callback(null, true, response)
        })
        concept = Ext.create('Screener.store.drugConcept')
        concept.setProxy({
            type: 'rest',
            url: HOST + '/ws/rest/v1/concept?q=Triomune-30',
            headers: Util.getBasicAuthHeaders(),
            reader: {
                type: 'json',
                rootProperty: 'results'
            }
        })
        concept.load()
        expect(concept.getAt(0).getData().uuid).toEqual("18666ae0-be9b-11e1-ab94-0fb973140af6")
    });
    it("makes the post call", function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"uuid\":\"80dbc4ec-53c4-41ff-b784-3888c9005a6d\",\"display\":\"PRESCRIPTION 05/07/2012\",\"encounterDatetime\":\"2012-07-05T07:47:10.000+0400\",\"patient\":{\"uuid\":\"7bd18c77-4334-4bee-a65b-e29756c0d6e8\",\"display\":\"John Adams\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/person/7bd18c77-4334-4bee-a65b-e29756c0d6e8\",\"rel\":\"self\"}]},\"location\":null,\"form\":null,\"encounterType\":{\"uuid\":\"2e1df184-8cd5-4879-85b1-9d87e1ea5d77\",\"display\":\"PRESCRIPTION - Patient receives a drug prescription.\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/encountertype/2e1df184-8cd5-4879-85b1-9d87e1ea5d77\",\"rel\":\"self\"}]},\"provider\":null,\"obs\":[],\"orders\":[{\"uuid\":\"65bbb9ee-3e7c-4eb8-b5b1-57e36b263fc5\",\"display\":\"Triomune-30: 250.0 null\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/order/65bbb9ee-3e7c-4eb8-b5b1-57e36b263fc5\",\"rel\":\"self\"}],\"type\":\"drugorder\"}],\"voided\":false,\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/encounter/80dbc4ec-53c4-41ff-b784-3888c9005a6d\",\"rel\":\"self\"},{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/encounter/80dbc4ec-53c4-41ff-b784-3888c9005a6d?v=full\",\"rel\":\"full\"}],\"resourceVersion\":\"1.8\"}",
                status: 200
            }
            request.success = true;
            request.callback(null, true, response)
            expect(request.jsonData.encountertype).toEqual("2e1df184-8cd5-4879-85b1-9d87e1ea5d77")
            expect(request.jsonData.orders.concept).toEqual("18666ae0-be9b-11e1-ab94-0fb973140af6")
            expect(request.jsonData.orders.drug).toEqual("18a79728-be9b-11e1-ab94-0fb973140af6")
            expect(request.jsonData.orders.patient).toEqual("18bed512-be9b-11e1-ab94-0fb973140af6")
            expect(request.jsonData.orders.instructions).toEqual("after lunch")
        })
        var order = Ext.create('Screener.store.drugEncounter', {
            patient: "7bd18c77-4334-4bee-a65b-e29756c0d6e8",
            encounterType: "2e1df184-8cd5-4879-85b1-9d87e1ea5d77",
            encounterDatetime: "2012-07-05T07:47:10Z",
            orders: [{
                patient: "7bd18c77-4334-4bee-a65b-e29756c0d6e8",
                drug: "fcb49b42-c27e-11e1-9262-a5fbf9edb8d2",
                instructions: "after lunch",
                concept: "fc6f4854-c27e-11e1-9262-a5fbf9edb8d2"
            }]
        })
        orderstore = Ext.create('Screener.store.drugEncounter')
        orderstore.add(order)
        orderstore.sync()
    })
});

describe("DoctorList", function () {
    var store = null;
    var timeout = 10000;
    beforeEach(function () {
        Util.saveBasicAuthHeader("admin", "Hello123");
        if (!store) {
            store = Ext.create('Screener.store.Doctors');
        }
        expect(store).toBeTruthy()
        waitsFor(

        function () {
            return !store.isLoading();
        }, "load never completed", timeout)
    });

    it("reading from Doctors store & comparing with REST result", function () {
        expect(store.getCount()).toBeGreaterThan(0);
        expect(store.getData().getAt(0).getData().uuid).not.toEqual(null);
    });

    it("returns values to the store on a ajax call", function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"results\":[{\"uuid\":\"testuuid1\",\"display\":\"testdoc1\"}," + "{\"uuid\":\"testuuid2\",\"display\":\"testdoc2\"}]}",
                status: 200
            };
            request.callback(null, true, response)
        });
        store = Ext.create('Screener.store.Doctors');
        expect(store.getData().getAt(0).getData().uuid).toEqual("testuuid1");
        expect(store.getData().getAt(0).getData().display).toEqual("testdoc1");
        expect(store.getData().getAt(1).getData().uuid).toEqual("testuuid2");
        expect(store.getData().getAt(1).getData().display).toEqual("testdoc2");
    })
});



describe("PatientList", function () {
    var regList = null;
    var scrList = null;
    var mainList = null;
    var ctrl = null;
    var d = new Date();


    beforeEach(function () {
        if (!ctrl) {
            ctrl = App.getController('Application');
        }
        if (!regList) {
            regList = Ext.create('Screener.store.PostLists');
        }
        if (!scrList) {
            scrList = Ext.create('Screener.store.PostLists');
        }


    });

    it("Posts Reg List", function () {

        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"uuid\":\"02b2235a-c209-4000-b4b0-25e0223eaa80\",\"name\":\"Registration Encounter\",\"description\":\"Patients encountered RegistrationstartDate=2012-07-05T09:54:44Z&endDate=2012-07-06T09:54:44Z\"}",
                status: 201
            }
            request.success = 'true';
            request.callback(null, true, response);
        })
        var list_regEncounter = Ext.create('Screener.model.PostList', {
            name: "Testing Registration Encounter",
            description: "Patients encountered RegistrationstartDate=2012-07-05T09:54:44Z&endDate=2012-07-06T09:54:44Z",
            searchQuery: "?encounterType=3d1c19eb-f228-4605-906f-ed80f4a0f63f&startDate=2012-07-05T09:54:44Z&endDate=2012-07-06T09:54:44Z"
        });
        var list_scrEncounter = Ext.create('Screener.model.PostList', {
            name: "Testing Registration Encounter",
            description: "Patients encountered ScreenerstartDate=2012-07-05T09:54:44Z&endDate=2012-07-06T09:54:44Z",
            searchQuery: "?encounterType=f9591030-b8cb-4b30-9cc3-3f059494594e&startDate=2012-07-05T09:54:44Z&endDate=2012-07-06T09:54:44Z"
        });
        regList = ctrl.createRegList(d, list_regEncounter, list_scrEncounter);
        expect(regList.getData().getAt(0).getData().uuid).toEqual('02b2235a-c209-4000-b4b0-25e0223eaa80');
    });

    it("Posts Scr List", function () {

        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"uuid\":\"472899a9-e388-4fe5-ad97-d1c7b6de61c5\",\"name\":\"Screener Encounter\",\"description\":\"Patients encountered ScreenerstartDate=2012-07-05T09:54:44Z&endDate=2012-07-06T09:54:44Z\"}",
                status: 201
            }
            request.callback(null, true, response);
        })
        var list_scrEncounter = Ext.create('Screener.model.PostList', {
            name: "Testing Registration Encounter",
            description: "Patients encountered ScreenerstartDate=2012-07-05T09:54:44Z&endDate=2012-07-06T09:54:44Z",
            searchQuery: "?encounterType=f9591030-b8cb-4b30-9cc3-3f059494594e&startDate=2012-07-05T09:54:44Z&endDate=2012-07-06T09:54:44Z"
        });
        scrList = ctrl.createScrList(d, regList, list_scrEncounter);
        expect(scrList.getData().getAt(0).getData().uuid).toEqual('472899a9-e388-4fe5-ad97-d1c7b6de61c5');
    });


    it(" Gets patient List", function () {

        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"patients\":[{\"uuid\":\"969ba9a4-f53d-451f-ab97-0fa8b3e94523\",\"display\":\"Alpha d Beta\",\"gender\":\"M\",\"age\":null,\"encounters\":[{\"uuid\":\"a70e09b5-634b-4f8c-922f-7f9e511fe56b\",\"display\":\"REGISTRATION - 2012-07-05 15:14:00.0\",\"encounterType\":\"3d1c19eb-f228-4605-906f-ed80f4a0f63f\",\"encounterDatetime\":\"2012-07-05T15:14:00.000+0530\",\"provider\":\"68fc795e-50bd-424a-8e4e-7ca426c04953\",\"obs\":[]}]}]}",
                status: 201
            }
            request.success = 'true';
            request.callback(null, true, response);
        })

        patientList = ctrl.finalPatientList(regList, scrList);
        expect(patientList.getData().getAt(0).getData().display).toEqual("Alpha d Beta");
        var link = patientList.getProxy().getUrl();
        var inList = link.indexOf(regList.getData().getAt(0).getData().uuid);
        var notInList = link.indexOf(scrList.getData().getAt(0).getData().uuid);
        expect(inList).toNotEqual(-1);
        expect(notInList).toNotEqual(-1);
    });
});
