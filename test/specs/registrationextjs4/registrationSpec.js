describe("controller", function () {

    var store = null,
        ctlr = null,
        view = null;

    beforeEach(function () {
        if (!ctlr) {
            ctlr = Application.getController('Main');
        }
        if (!view) {
            view = Ext.create('Ext.Container', {
                items: [{
                    xtype: 'home'
                }, {
                    xtype: 'registrationpart1'
                }, {
                    xtype: 'registrationpart2'
                }, {
                    xtype: 'confirmationScreen'
                }]
            });

            //below statement set the fields in Registration form which will be used by the function: submit() in controller 
            Ext.getCmp("patientFirstName").setValue('Raxa');
            Ext.getCmp('patientLastName').setValue('Jss');
            Ext.getCmp('patientAge').setValue(20);
            Ext.getCmp('block').setValue('12');
            Ext.getCmp('street').setValue('Hauz Khas Village');
            Ext.getCmp('town').setValue('Delhi');
            Ext.getCmp('pincode').setValue('110016');
        }
    });
    it("data in the form fields and responce from ajax request loads in store", function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"uuid\":\"8896cd8c-e910-44df-96cd-37ce894fd6e3\",\"display\":\"Raxa Jss\",\"gender\":\"M\",\"age\":20,\"birthdate\":null,\"birthdateEstimated\":false,\"dead\":false,\"deathDate\":null,\"causeOfDeath\":null,\"preferredName\":{\"uuid\":\"31913fd2-2f83-48ab-83ad-12a587fe3744\",\"display\":\"Raxa Jss\",\"links\":[{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/8896cd8c-e910-44df-96cd-37ce894fd6e3/name/31913fd2-2f83-48ab-83ad-12a587fe3744\",\"rel\":\"self\"}]},\"preferredAddress\":{\"uuid\":\"675dd755-1a5c-41db-b9b0-548d80c4fab2\",\"display\":\"12\",\"links\":[{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/8896cd8c-e910-44df-96cd-37ce894fd6e3/address/675dd755-1a5c-41db-b9b0-548d80c4fab2\",\"rel\":\"self\"}]},\"attributes\":[],\"voided\":false,\"links\":[{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/8896cd8c-e910-44df-96cd-37ce894fd6e3\",\"rel\":\"self\"},{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/8896cd8c-e910-44df-96cd-37ce894fd6e3?v=full\",\"rel\":\"full\"}]}",
                status: 201

            };
            request.success = 'true';
            request.callback(null, true, response);
            expect(request.jsonData.gender).toEqual("M");
            expect(request.jsonData.age).toEqual(20);
            expect(request.jsonData.names[0].givenName).toEqual("Raxa");
            expect(request.jsonData.names[0].familyName).toEqual("Jss");

        });
        store = ctlr.submit();
        expect(store.getAt(0).getData().gender).toEqual("M");
        expect(store.getAt(0).getData().age).toEqual(20);
        expect(store.getAt(0).getData().names[0].givenName).toEqual("Raxa");
        expect(store.getAt(0).getData().names[0].familyName).toEqual("Jss");
        expect(store.getAt(0).getData().addresses[0].address1).toEqual("12");
        expect(store.getAt(0).getData().addresses[0].address2).toEqual("Hauz Khas Village");
        expect(store.getAt(0).getData().addresses[0].cityVillage).toEqual("Delhi");
        expect(store.getAt(0).getData().addresses[0].postalCode).toEqual("110016");


        expect(store.getAt(0).getData().uuid).toEqual("8896cd8c-e910-44df-96cd-37ce894fd6e3");
        expect(store.getProxy().getReader().jsonData.display).toEqual("Raxa Jss");
        expect(store.getProxy().getReader().jsonData.gender).toEqual("M");
        expect(store.getProxy().getReader().jsonData.age).toEqual(20);
    });
    it("loads patientIdentifiersTypes in store", function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"results\":[{\"uuid\":\"8d79403a-c2cc-11de-8d13-0010c6dffd0f\",\"display\":\"Old Identification Number - Number given out prior to the OpenMRS system (No check digit)\",\"links\":[{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/patientidentifiertype/8d79403a-c2cc-11de-8d13-0010c6dffd0f\",\"rel\":\"self\"}]},{\"uuid\":\"8d793bee-c2cc-11de-8d13-0010c6dffd0f\",\"display\":\"OpenMRS Identification Number - Unique number used in OpenMRS\",\"links\":[{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/patientidentifiertype/8d793bee-c2cc-11de-8d13-0010c6dffd0f\",\"rel\":\"self\"}]}]}",
                status: 200
            };
            request.success = 'true';
            request.callback(null, true, response);
        });
        store = Ext.create('Registration.store.identifiersType');
        store.load();
        expect(store.getAt(0).getData().uuid).toEqual("8d79403a-c2cc-11de-8d13-0010c6dffd0f");
    });
    it("loads patientIdentifiersTypes in store", function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"results\":[{\"uuid\":\"8d6c993e-c2cc-11de-8d13-0010c6dffd0f\",\"display\":\"Unknown Location - \",\"links\":[{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v2/location/8d6c993e-c2cc-11de-8d13-0010c6dffd0f\",\"rel\":\"self\"}]}]}",
                status: 200
            };
            request.success = 'true';
            request.callback(null, true, response);
        });
        store = Ext.create('Registration.store.location');
        store.load();
        expect(store.getAt(0).getData().uuid).toEqual("8d6c993e-c2cc-11de-8d13-0010c6dffd0f");
    });
    it("responce from ajax request loads in store", function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"uuid\":\"8896cd8c-e910-44df-96cd-37ce894fd6e3\",\"display\":\"Raxa Jss\",\"gender\":\"M\",\"age\":20,\"birthdate\":null,\"birthdateEstimated\":false,\"dead\":false,\"deathDate\":null,\"causeOfDeath\":null,\"preferredName\":{\"uuid\":\"31913fd2-2f83-48ab-83ad-12a587fe3744\",\"display\":\"Raxa Jss\",\"links\":[{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/8896cd8c-e910-44df-96cd-37ce894fd6e3/name/31913fd2-2f83-48ab-83ad-12a587fe3744\",\"rel\":\"self\"}]},\"preferredAddress\":{\"uuid\":\"675dd755-1a5c-41db-b9b0-548d80c4fab2\",\"display\":\"12\",\"links\":[{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/8896cd8c-e910-44df-96cd-37ce894fd6e3/address/675dd755-1a5c-41db-b9b0-548d80c4fab2\",\"rel\":\"self\"}]},\"attributes\":[],\"voided\":false,\"links\":[{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/8896cd8c-e910-44df-96cd-37ce894fd6e3\",\"rel\":\"self\"},{\"uri\":\"http://raxaemr.jelastic.dogado.eu/ws/rest/v1/person/8896cd8c-e910-44df-96cd-37ce894fd6e3?v=full\",\"rel\":\"full\"}]}",
                status: 201

            };
            request.success = 'true';
            request.callback(null, true, response);
            expect(request.jsonData.person).toEqual("8896cd8c-e910-44df-96cd-37ce894fd6e3");
        });
        store = ctlr.makePatient("8896cd8c-e910-44df-96cd-37ce894fd6e3", "8d79403a-c2cc-11de-8d13-0010c6dffd0f", "8d6c993e-c2cc-11de-8d13-0010c6dffd0f");//call the makePatient() function of control to get the patient store
        expect(store.getProxy().getReader().jsonData.uuid).toEqual("8896cd8c-e910-44df-96cd-37ce894fd6e3");
        expect(store.getProxy().getReader().jsonData.display).toEqual("Raxa Jss");
        expect(store.getProxy().getReader().jsonData.gender).toEqual("M");
        expect(store.getProxy().getReader().jsonData.age).toEqual(20);
    });
});
