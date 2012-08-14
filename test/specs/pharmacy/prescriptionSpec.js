describe("prescription", function () {

    var ctlr = null,
    view = null;

    beforeEach(function () {
        if (!ctlr) {
            ctlr = Application.getController('prescription');
        }
        if (!view) {
            view = Ext.create('Ext.Container', {
                items: [{
                    xtype: 'prescription'
                }]
            });

            //below statement set the fields in advanced search of prescription screen
            Ext.getCmp("patientNameASearch").setValue('john')
        }
    });
    it("data in the form fields used in Url and responce from ajax request loads in store of the patient search grid", function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"results\":[{\"uuid\":\"fcd0f543-c27e-11e1-9262-a5fbf9edb8d2\",\"display\":\"Mr. John D Patient\",\"gender\":\"M\",\"age\":37,\"birthdate\":\"1975-01-01T00:00:00.000+0300\",\"birthdateEstimated\":false,\"dead\":false,\"deathDate\":null,\"causeOfDeath\":null}]}",
                status: 201

            }
            request.success = 'true';
            request.callback(null, true, response);
            expect(request.url.substring(0,69)).toEqual("http://raxajss.jelastic.servint.net/ws/rest/v1/patient?q=john&&v=full")
            expect(request.method).toEqual("GET")
        })
        // function used in controller to searcb patients
        ctlr.searchPatient();
       
        //checks whether the drug order are load in the store of patient search grid
        expect(Ext.getCmp('patientASearchGrid').getStore().getAt(0).getData().age).toEqual(37);
        expect(Ext.getCmp('patientASearchGrid').getStore().getAt(0).getData().display).toEqual("Mr. John D Patient");
        expect(Ext.getCmp('patientASearchGrid').getStore().getAt(0).getData().gender).toEqual("M");
        expect(Ext.getCmp('patientASearchGrid').getStore().getAt(0).getData().uuid).toEqual("fcd0f543-c27e-11e1-9262-a5fbf9edb8d2");
    });
    it("uuid of patient used in Url and responce from ajax request loads in store of the drug order search grid", function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"results\":[{\"uuid\":\"1ec31b05-5423-448c-831d-7092fe498a06\",\"display\":\"STAVUDINE LAMIVUDINE AND NEVIRAPINE\",\"orderType\":{\"uuid\":\"131168f4-15f5-102d-96e4-000c29c2a5d7\"},\"concept\":{\"uuid\":\"fc6f4854-c27e-11e1-9262-a5fbf9edb8d2\",\"display\":\"STAVUDINE LAMIVUDINE AND NEVIRAPINE\"},\"instructions\":\"-\",\"startDate\":\"2012-06-30T14:29:27.000+0400\",\"autoExpireDate\":\"2012-07-07T00:00:00.000+0400\",\"dose\":250.0,\"units\":null,\"frequency\":\"ond\",\"quantity\":1,\"drug\":{\"uuid\":\"fcb49b42-c27e-11e1-9262-a5fbf9edb8d2\",\"display\":\"Triomune-30 - \",\"name\": \"Triomune-30\",},\"type\":\"drugorder\",\"resourceVersion\":\"1.8\"}]}",
                status: 201

            }
            request.success = 'true';
            request.callback(null, true, response);
            expect(request.url.substring(0,105)).toEqual("http://raxajss.jelastic.servint.net/ws/rest/v1/order?patient=fcd0f543-c27e-11e1-9262-a5fbf9edb8d2&&v=full")
			
        })
        //function used in controller when user click on a patient and makeing get call for drug order
        ctlr.patientSelect({
            age: 37,
            display: "Mr. John D Patient",
            gender: "M",
            uuid: "fcd0f543-c27e-11e1-9262-a5fbf9edb8d2"
        });
        //checks whether the drug order are load in the store of drug order grid
        expect(Ext.getCmp('drugOrderASearchGrid').getStore().getAt(0).getData().dosage).toEqual("250");
        expect(Ext.getCmp('drugOrderASearchGrid').getStore().getAt(0).getData().drugname).toEqual("Triomune-30");
        expect(Ext.getCmp('drugOrderASearchGrid').getStore().getAt(0).getData().frequency).toEqual("ond");
        expect(Ext.getCmp('drugOrderASearchGrid').getStore().getAt(0).getData().quantity).toEqual(1);
        
        //checks whether the patient 
        expect(Ext.getCmp('prescriptionPatientName').getValue()).toEqual("Mr. John D Patient")
        expect(Ext.getCmp('prescriptionPatientAge').getValue()).toEqual('37')
        expect(Ext.getCmp('prescriptionPatientGender').getValue()).toEqual("M")
    });
    it("todays patient list grid store should load", function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"uuid\":\"6a37868d-b6e2-4f3f-a6c2-edb62bc4d9d6\",\"name\":null,\"description\":null,\"searchQuery\":\"?limit\u003d25\u0026startDate\u003d2012-7-9\u0026start\u003d0\u0026page\u003d1\u0026endDate\u003d2012-7-9\u0026_dc\u003d1341814872902\u0026encounterType\u003d2e2f8f17-b209-4689-b7cf-2135af2a7973\",\"patients\":[{\"uuid\":\"7238bcc8-cd20-434d-9935-54b8111ce72b\",\"display\":\"piyush dane\",\"gender\":\"M\",\"age\":19,\"encounters\":[{\"uuid\":\"3a6e20fe-0dce-403e-8026-d2df9a4ec227\",\"display\":\"PRESCRIPTION - 2012-07-09 00:00:00.0\",\"encounterType\":\"2e2f8f17-b209-4689-b7cf-2135af2a7973\",\"encounterDatetime\":\"2012-07-09T00:00:00.000+0000\",\"provider\":\"9a5f309b-7361-42e4-aeab-5db2ffb795c5\",\"obs\":[]}]}],\"resourceVersion\":\"1.0\"}",
                status: 201

            }
            request.success = 'true';
            request.callback(null, true, response);
            expect(request.method).toEqual("GET")
        })
        // function used in controller to searcb patients
        ctlr.getTodayPatients();
       
        //checks whether the patient are load in the store ofh grid
        expect(Ext.getCmp('todayPatientGrid').getStore().getAt(0).getData().age).toEqual(19);
        expect(Ext.getCmp('todayPatientGrid').getStore().getAt(0).getData().display).toEqual("piyush dane");
        expect(Ext.getCmp('todayPatientGrid').getStore().getAt(0).getData().gender).toEqual("M");
        expect(Ext.getCmp('todayPatientGrid').getStore().getAt(0).getData().uuid).toEqual("7238bcc8-cd20-434d-9935-54b8111ce72b");
        expect(Ext.getCmp('todayPatientGrid').getStore().getAt(0).getData().encounters[0].uuid).toEqual("3a6e20fe-0dce-403e-8026-d2df9a4ec227");
    });
    it("1 week patient list grid store should load", function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"uuid\":\"6a37868d-b6e2-4f3f-a6c2-edb62bc4d9d6\",\"name\":null,\"description\":null,\"searchQuery\":\"?limit\u003d25\u0026startDate\u003d2012-7-9\u0026start\u003d0\u0026page\u003d1\u0026endDate\u003d2012-7-9\u0026_dc\u003d1341814872902\u0026encounterType\u003d2e2f8f17-b209-4689-b7cf-2135af2a7973\",\"patients\":[{\"uuid\":\"7238bcc8-cd20-434d-9935-54b8111ce72b\",\"display\":\"piyush dane\",\"gender\":\"M\",\"age\":19,\"encounters\":[{\"uuid\":\"3a6e20fe-0dce-403e-8026-d2df9a4ec227\",\"display\":\"PRESCRIPTION - 2012-07-09 00:00:00.0\",\"encounterType\":\"2e2f8f17-b209-4689-b7cf-2135af2a7973\",\"encounterDatetime\":\"2012-07-09T00:00:00.000+0000\",\"provider\":\"9a5f309b-7361-42e4-aeab-5db2ffb795c5\",\"obs\":[]}]}],\"resourceVersion\":\"1.0\"}",
                status: 201

            }
            request.success = 'true';
            request.callback(null, true, response);
            expect(request.method).toEqual("GET")
        })
        // function used in controller to get patients list
        ctlr.getSevenDaysPatients();
       
        //checks whether the patients are load in the store of grid
        expect(Ext.getCmp('sevenDaysPatientGrid').getStore().getAt(0).getData().age).toEqual(19);
        expect(Ext.getCmp('sevenDaysPatientGrid').getStore().getAt(0).getData().display).toEqual("piyush dane");
        expect(Ext.getCmp('sevenDaysPatientGrid').getStore().getAt(0).getData().gender).toEqual("M");
        expect(Ext.getCmp('sevenDaysPatientGrid').getStore().getAt(0).getData().uuid).toEqual("7238bcc8-cd20-434d-9935-54b8111ce72b");
        expect(Ext.getCmp('sevenDaysPatientGrid').getStore().getAt(0).getData().encounters[0].uuid).toEqual("3a6e20fe-0dce-403e-8026-d2df9a4ec227");
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
        concept = Ext.create('RaxaEmr.Pharmacy.store.drugConcept')
        concept.setProxy({
            type: 'rest',
            url: HOST + '/ws/rest/v1/concept?q=Triomune-30',
            headers: Util.getBasicAuthHeaders(),
            reader: {
                type: 'json',
                root: 'results'
            }
        })
        concept.load()
        expect(concept.getAt(0).getData().uuid).toEqual("18666ae0-be9b-11e1-ab94-0fb973140af6")
    });
    it("makes the post call", function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"uuid\":\"503bb47f-8e06-458c-b492-31ed17631892\",\"display\":\"STAVUDINE LAMIVUDINE AND NEVIRAPINE\",\"orderType\":{\"uuid\":\"131168f4-15f5-102d-96e4-000c29c2a5d7\",\"display\":\"Drug Order - An order for a medication to be given to the patient\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/ordertype/131168f4-15f5-102d-96e4-000c29c2a5d7\",\"rel\":\"self\"}]},\"patient\":{\"uuid\":\"18bed512-be9b-11e1-ab94-0fb973140af6\",\"display\":\"Mr. John D Patient\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/person/18bed512-be9b-11e1-ab94-0fb973140af6\",\"rel\":\"self\"}]},\"concept\":{\"uuid\":\"18666ae0-be9b-11e1-ab94-0fb973140af6\",\"display\":\"STAVUDINE LAMIVUDINE AND NEVIRAPINE\",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/concept/18666ae0-be9b-11e1-ab94-0fb973140af6\",\"rel\":\"self\"}]},,\"startDate\":\"2012-06-28T11:03:18.000+0400\",\"autoExpireDate\":\"2012-07-05T00:00:00.000+0400\",\"encounter\":null,\"orderer\":null,\"accessionNumber\":null,\"discontinuedBy\":null,\"discontinuedDate\":null,\"discontinuedReason\":null,\"discontinuedReasonNonCoded\":null,\"dose\":250.0,\"units\":null,\"frequency\":\"ond\",\"prn\":false,\"complex\":false,\"quantity\":1,\"drug\":{\"uuid\":\"18a79728-be9b-11e1-ab94-0fb973140af6\",\"display\":\"Triomune-30 - \",\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/drug/18a79728-be9b-11e1-ab94-0fb973140af6\",\"rel\":\"self\"}]},\"links\":[{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/order/503bb47f-8e06-458c-b492-31ed17631892\",\"rel\":\"self\"},{\"uri\":\"http://raxajss.jelastic.servint.net/ws/rest/v1/order/503bb47f-8e06-458c-b492-31ed17631892?v=full\",\"rel\":\"full\"}],\"type\":\"drugorder\",\"resourceVersion\":\"1.8\"}",
                status: 200
            }
            request.success = true;
            request.callback(null, true, response)
            expect(request.jsonData.concept).toEqual("18666ae0-be9b-11e1-ab94-0fb973140af6")
            expect(request.jsonData.drug).toEqual("18a79728-be9b-11e1-ab94-0fb973140af6")
            expect(request.jsonData.patient).toEqual("18bed512-be9b-11e1-ab94-0fb973140af6")
            expect(request.jsonData.instructions).toEqual("after lunch")
        })
        var order = Ext.create('RaxaEmr.Pharmacy.model.drugOrder', {
            patient: '18bed512-be9b-11e1-ab94-0fb973140af6',
            drug: '18a79728-be9b-11e1-ab94-0fb973140af6',
            concept: '18666ae0-be9b-11e1-ab94-0fb973140af6',
        })
        orderstore = Ext.create('Screener.store.drugOrder')
        orderstore.add(order)
        orderstore.sync()
    })
	
})