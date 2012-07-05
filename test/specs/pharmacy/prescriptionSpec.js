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
})