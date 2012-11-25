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
	it("saves encounter of registration of a patient on the server", function() {
		spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"uuid\":\"04e12695-4e25-406c-9044-342d5337280a\",\"display\":\"REGISTRATION 28/06/2012\",\"encounterDatetime\":\"2012-06-28T11:54:52.000+0400\",\"patient\":{\"uuid\":\"0f86b6a5-6dbe-46bc-ba30-4b0b234c460e\",\"display\":\"sdf xcv\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/person/0f86b6a5-6dbe-46bc-ba30-4b0b234c460e\",\"rel\":\"self\"}]},\"location\":null,\"form\":null,\"encounterType\":{\"uuid\":\"677c2593-a2ea-4029-a5ba-e261482c2077\",\"display\":\"REGISTRATION - New registration\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/encountertype/677c2593-a2ea-4029-a5ba-e261482c2077\",\"rel\":\"self\"}]},\"provider\":{\"uuid\":\"13f2c8b2-c6a4-497f-af28-6a3f88e5cae3\",\"display\":\"User Who Is Admin\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/person/13f2c8b2-c6a4-497f-af28-6a3f88e5cae3\",\"rel\":\"self\"}]},\"obs\":[],\"orders\":[],\"voided\":false,\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/encounter/04e12695-4e25-406c-9044-342d5337280a\",\"rel\":\"self\"},{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/encounter/04e12695-4e25-406c-9044-342d5337280a?v=full\",\"rel\":\"full\"}],\"resourceVersion\":\"1.8\"}",
                status: 201

            }
            request.success = 'true';
            request.callback(null, true, response);
            expect(request.jsonData.patient).toEqual("0f86b6a5-6dbe-46bc-ba30-4b0b234c460e");
        })
        var encounter = Ext.create('Screener.model.encounterpost', {
            patient: "0f86b6a5-6dbe-46bc-ba30-4b0b234c460e",
            encounterDatetime: "2012-06-28T11:54:52.000+0400",
            encounterType: "677c2593-a2ea-4029-a5ba-e261482c2077",
            location: "Registration Desk:Screener",
            provider: "13f2c8b2-c6a4-497f-af28-6a3f88e5cae3",
        });
        store = Ext.create('Screener.store.encounterpost')
        store.add(encounter);
        store.sync();
        console.log(store)
        expect(store.getAt(0).getData().patient).toEqual("0f86b6a5-6dbe-46bc-ba30-4b0b234c460e");
        expect(store.getAt(0).getData().provider).toEqual("13f2c8b2-c6a4-497f-af28-6a3f88e5cae3");
    });
    it("saves encounter of waiting patient on the server", function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"uuid\":\"d9ec83e6-be4b-4622-8ee4-da64b7d8f54b\",\"display\":\"SCREENER 30/06/2012\",\"encounterDatetime\":\"2012-06-30T12:10:38.000+0400\",\"patient\":{\"uuid\":\"fcd0f543-c27e-11e1-9262-a5fbf9edb8d2\",\"display\":\"Mr. John D Patient\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/person/fcd0f543-c27e-11e1-9262-a5fbf9edb8d2\",\"rel\":\"self\"}]},\"location\":{\"uuid\":\"b0831208-7c15-4f08-80b9-35b83ad833c6\",\"display\":\"Waiting Patient: Screener - patients assigned to a doctor\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v2/location/b0831208-7c15-4f08-80b9-35b83ad833c6\",\"rel\":\"self\"}]},\"form\":null,\"encounterType\":{\"uuid\":\"88929d98-a0f6-4874-b185-a11322ea7e95\",\"display\":\"SCREENER - encountered when patient screened\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/encountertype/88929d98-a0f6-4874-b185-a11322ea7e95\",\"rel\":\"self\"}]},\"provider\":{\"uuid\":\"fcd0f2cc-c27e-11e1-9262-a5fbf9edb8d2\",\"display\":\"Super User\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/person/fcd0f2cc-c27e-11e1-9262-a5fbf9edb8d2\",\"rel\":\"self\"}]},\"obs\":[],\"orders\":[],\"voided\":false,\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/encounter/d9ec83e6-be4b-4622-8ee4-da64b7d8f54b\",\"rel\":\"self\"},{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/encounter/d9ec83e6-be4b-4622-8ee4-da64b7d8f54b?v=full\",\"rel\":\"full\"}],\"resourceVersion\":\"1.8\"}",
                status: 201

            }
            request.success = 'true';
            request.callback(null, true, response);
            expect(request.jsonData.patient).toEqual("fcd0f543-c27e-11e1-9262-a5fbf9edb8d2");
        })
        var encounter = Ext.create('Screener.model.encounterpost', {
            patient: "fcd0f543-c27e-11e1-9262-a5fbf9edb8d2",
            encounterDatetime: "2012-06-30T11:54:52.000+0400",
            encounterType: "88929d98-a0f6-4874-b185-a11322ea7e95",
            location: "SCREENER - encountered when patient screened",
            provider: "fcd0f2cc-c27e-11e1-9262-a5fbf9edb8d2",
        });
        store = Ext.create('Screener.store.encounterpost')

        store.add(encounter);
        store.sync();
        expect(store.getAt(0).getData().patient).toEqual("fcd0f543-c27e-11e1-9262-a5fbf9edb8d2");
        expect(store.getAt(0).getData().provider).toEqual("fcd0f2cc-c27e-11e1-9262-a5fbf9edb8d2");
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


    it("returns values to the store on an ajax call", function () {
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

    it("Posts Regisration and Screener Lists", function () {

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
        var k = 0;
        Lists = ctrl.createList(list_regEncounter, list_scrEncounter, k);
        expect(Lists[0].getData().getAt(0).getData().uuid).toEqual('02b2235a-c209-4000-b4b0-25e0223eaa80');
        expect(Lists[1].getData().getAt(0).getData().uuid).toEqual('02b2235a-c209-4000-b4b0-25e0223eaa80');
    });


    xit(" Gets patient List", function () {

        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"patients\":[{\"uuid\":\"969ba9a4-f53d-451f-ab97-0fa8b3e94523\",\"display\":\"Alpha d Beta\",\"gender\":\"M\",\"age\":null,\"encounters\":[{\"uuid\":\"a70e09b5-634b-4f8c-922f-7f9e511fe56b\",\"display\":\"REGISTRATION - 2012-07-05 15:14:00.0\",\"encounterType\":\"3d1c19eb-f228-4605-906f-ed80f4a0f63f\",\"encounterDatetime\":\"2012-07-05T15:14:00.000+0530\",\"provider\":\"68fc795e-50bd-424a-8e4e-7ca426c04953\",\"obs\":[]}]}]}",
                status: 201
            }
            request.success = 'true';
            request.callback(null, true, response);
        })
        patientList = ctrl.finalPatientList(Lists[0], Lists[1]);
        expect(patientList.getData().getAt(0).getData().display).toEqual("Alpha d Beta");
        var link = patientList.getProxy().getUrl();
        var inList = link.indexOf(Lists[0].getData().getAt(0).getData().uuid);
        var notInList = link.indexOf(Lists[1].getData().getAt(0).getData().uuid);
        expect(inList).toNotEqual(-1);
        expect(notInList).toNotEqual(-1);
    });
    if (!mainList) {
        mainList = Ext.create('Screener.store.Patients');
    }
    expect(mainList).toBeTruthy();
    waitsFor(

        function () {
            return !mainList.isLoading();
        }, "store load not completed (timeout)", timeOut);


    it(" reading from Patients store & comparing with REST result ", function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"results\":[" + "{\"uuid\": \"b0763e6d-95e7-11e1-beba-4dc2e8449b3e\",\"display\": \"Mr. Alpha d Gamma\"," + "\"links\":[{\"uri\": \"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/b0763e6d-95e7-11e1-beba-4dc2e8449b3e\",\"rel\": \"self\"}]}," + "{\"uuid\": \"3c0a2629-faa4-41f2-b573-a5afac346a54\",\"display\": \"Mr Beta k Delta\"," + "\"links\":[{\"uri\": \"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/3c0a2629-faa4-41f2-b573-a5afac346a54\",\"rel\": \"self\"}]}," + "{\"uuid\": \"5838ff26-cd81-4885-ac1b-83969e55eb6b\",\"display\": \"Mrs. Epsilon c Tau\"," + "\"links\":[{\"uri\": \"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/5838ff26-cd81-4885-ac1b-83969e55eb6b\",\"rel\": \"self\"}]}]}",
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

    it("correct number of assigned patients displayed & correct uuid sent for deletion", function () {
        // if some error getdata() of undefined appears try assigning a patient to first doctor in the list
        Ext.create('Screener.view.DoctorSummary')
        Ext.create('Screener.view.PatientView')
        var list = Ext.getCmp('doctorList')
        var pList = Ext.getCmp('assignedPatientList')
        runs(function () {
            var dStore = Ext.create('Screener.store.Doctors')
            var store = ctrl.countPatients();
            Ext.getCmp('doctorList').setStore(store)
            var pStore = null;
            pStore = ctrl.getAssignedPatientList(list, 0, null)
            this.currentPatientIndex = ctrl.expandAssignedPatient(pList, 0, null, null)
        });
        waits(5000);
        runs(function () {
            expect(pStore.getData().getCount()).toEqual(Ext.getCmp('doctorList').getStore().getData().items[0].data.numpatients)
            spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
                if (request.method == 'DELETE') {
                    expect(request.url).toEqual(HOST + '/ws/rest/v1/encounter/' + pStore.getData().items[0].getData().encuuid + '?!purge');
                }
            })
            Ext.getCmp('assignedPatientList').setStore(pStore)
            Ext.getCmp('assignedPatientList').getStore().on("load", function () {
                var uuid = ctrl.removePatient()
            })
        });
    });
});

describe("PatientSummary", function () {
    var store = null;
    var timeout = 10000;
    beforeEach(function () {
        Util.saveBasicAuthHeader("admin", "Hello123");
        if (!store) {
            store = Ext.create('Screener.store.PatientSummary');
        }
        expect(store).toBeTruthy()
        waitsFor(

            function () {
                return !store.isLoading();
            }, "load never completed", timeout)
    });
  
    it("reading from Doctors store & comparing with REST result", function () {
        expect(store.getCount()).toBeGreaterThan(-1);
        expect(store.getData().getAt(0).getData().uuid).not.toEqual(null);
    });
    
    it("returns values to the store on a ajax call", function (){                

it("returns value to the PatientSummary store on an ajax call", function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"results\":[{\"uuid\": \"1\",\"display\": \"OPD 1/1/1\",\"encounterDatetime\": \"2009-09-28T19:03:12.000+0400\",\"patient\":{\"uuid\":\"2\",\"display\": \"ABC\",\"links\":[{\"uri\": \"restcallurl/person/2\",\"rel\": \"self\"}]},\"location\": null,\"form\": null,\"encounterType\":{\"uuid\": \"2\",\"display\": \"OPD - Test\",\"links\":[{\"uri\": \"restcallurl/encountertype/2\",\"rel\": \"self\"}]},\"provider\": null,\"obs\":[],\"orders\":[],\"voided\": false,\"links\":[{\"uri\": \"restcallurl/encounter/1\",\"rel\": \"self\"},{\"uri\": \"restcallurl/encounter/1?v=full\",\"rel\": \"full\"}],\"resourceVersion\": \"1.8\"}]}",
                status: 200
            }
            request.success = 'true';
            request.callback(null, true, response)
        });
        store = Ext.create('Screener.store.PatientSummary');
        store.load({
            callback: function (records, operation, success) {
                expect(store.getData().getAt(0).raw.encounterDatetime).toEqual("2009-09-28T19:03:12.000+0400");
            }
        });
    });
    });
});
