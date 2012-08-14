describe("controller", function () {
    var store = null,
        ctlr = null,
        view = null;
    beforeEach(function () {
        if (!ctlr) {
            ctlr = Application.getController('Search');
        }
        if (!view) {
            view = Ext.create('Ext.Container', {
                items: [{
                    xtype: REG_PAGES.HOME.name
                }, {
                    xtype: REG_PAGES.REG_1.name
                }, {
                    xtype: REG_PAGES.REG_2.name
                }, {
                    xtype: REG_PAGES.REG_CONFIRM.name
                }, {
                    xtype: REG_PAGES.REG_BMI.name
                }, {
                    xtype: REG_PAGES.SEARCH_1.name
                }, {
                    xtype: REG_PAGES.SEARCH_2.name
                }, {
                    xtype: REG_PAGES.SEARCH_CONFIRM.name
                }]
            });

            //mocking ajax call with Jasmine Spies
            Ext.getCmp('PatientIdentifierSearch').setValue('788925822');
            Ext.getCmp('patientFirstNameSearch').setValue('piyush');
            Ext.getCmp('patientLastNameSearch').setValue('dane');


        }
    });
    it("loads patient list after rest call", function () {
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"results\":[{\"uuid\":\"3eb21e80-babf-4990-88af-5927ec242abe\",\"display\":\"piyush dane\",\"gender\":\"M\",\"age\":20,\"birthdate\":\"1992-01-01T00:00:00.000+0200\",\"birthdateEstimated\":true,\"dead\":false,\"deathDate\":null,\"causeOfDeath\":null,\"preferredName\":{\"display\":\"piyush dane\",\"uuid\":\"b7eee870-faf6-4067-b67a-8f6daff16278\",\"givenName\":\"piyush\",\"middleName\":null,\"familyName\":\"dane\",\"familyName2\":null,\"voided\":false,\"links\":[{\"uri\":\"http://raxaemr.jelastic.tsukaeru.net/ws/rest/v1/person/3eb21e80-babf-4990-88af-5927ec242abe/name/b7eee870-faf6-4067-b67a-8f6daff16278\",\"rel\":\"self\"},{\"uri\":\"http://raxaemr.jelastic.tsukaeru.net/ws/rest/v1/person/3eb21e80-babf-4990-88af-5927ec242abe/name/b7eee870-faf6-4067-b67a-8f6daff16278?v=full\",\"rel\":\"full\"}],\"resourceVersion\":\"1.8\"},\"preferredAddress\":{\"display\":\"jnkn\",\"uuid\":\"5b159d84-a6e3-43b2-9a8d-fde671876b28\",\"preferred\":true,\"address1\":\"jnkn\",\"address2\":\"nkj\",\"cityVillage\":\"nkj\",\"stateProvince\":null,\"country\":null,\"postalCode\":\"110116\",\"countyDistrict\":null,\"address3\":null,\"address4\":null,\"address5\":null,\"address6\":null,\"startDate\":null,\"endDate\":null,\"latitude\":null,\"longitude\":null,\"voided\":false,\"links\":[{\"uri\":\"http://raxaemr.jelastic.tsukaeru.net/ws/rest/v1/person/3eb21e80-babf-4990-88af-5927ec242abe/address/5b159d84-a6e3-43b2-9a8d-fde671876b28\",\"rel\":\"self\"},{\"uri\":\"http://raxaemr.jelastic.tsukaeru.net/ws/rest/v1/person/3eb21e80-babf-4990-88af-5927ec242abe/address/5b159d84-a6e3-43b2-9a8d-fde671876b28?v=full\",\"rel\":\"full\"}],\"resourceVersion\":\"1.8\"},\"names\":[{\"display\":\"piyush dane\",\"uuid\":\"b7eee870-faf6-4067-b67a-8f6daff16278\",\"givenName\":\"piyush\",\"middleName\":null,\"familyName\":\"dane\",\"familyName2\":null,\"voided\":false,\"links\":[{\"uri\":\"http://raxaemr.jelastic.tsukaeru.net/ws/rest/v1/person/3eb21e80-babf-4990-88af-5927ec242abe/name/b7eee870-faf6-4067-b67a-8f6daff16278\",\"rel\":\"self\"},{\"uri\":\"http://raxaemr.jelastic.tsukaeru.net/ws/rest/v1/person/3eb21e80-babf-4990-88af-5927ec242abe/name/b7eee870-faf6-4067-b67a-8f6daff16278?v=full\",\"rel\":\"full\"}],\"resourceVersion\":\"1.8\"}],\"addresses\":[{\"display\":\"jnkn\",\"uuid\":\"5b159d84-a6e3-43b2-9a8d-fde671876b28\",\"preferred\":true,\"address1\":\"jnkn\",\"address2\":\"nkj\",\"cityVillage\":\"nkj\",\"stateProvince\":null,\"country\":null,\"postalCode\":\"110116\",\"countyDistrict\":null,\"address3\":null,\"address4\":null,\"address5\":null,\"address6\":null,\"startDate\":null,\"endDate\":null,\"latitude\":null,\"longitude\":null,\"voided\":false,\"links\":[{\"uri\":\"http://raxaemr.jelastic.tsukaeru.net/ws/rest/v1/person/3eb21e80-babf-4990-88af-5927ec242abe/address/5b159d84-a6e3-43b2-9a8d-fde671876b28\",\"rel\":\"self\"},{\"uri\":\"http://raxaemr.jelastic.tsukaeru.net/ws/rest/v1/person/3eb21e80-babf-4990-88af-5927ec242abe/address/5b159d84-a6e3-43b2-9a8d-fde671876b28?v=full\",\"rel\":\"full\"}],\"resourceVersion\":\"1.8\"}],\"attributes\":[],\"voided\":false,\"auditInfo\":{\"creator\":{\"uuid\":\"4e9354fe-aed8-11e1-9102-963e738646cc\",\"display\":\"admin - Super User\",\"links\":[{\"uri\":\"http://raxaemr.jelastic.tsukaeru.net/ws/rest/v1/user/4e9354fe-aed8-11e1-9102-963e738646cc\",\"rel\":\"self\"}]},\"dateCreated\":\"2012-06-14T14:31:47.000+0400\",\"changedBy\":{\"uuid\":\"4e9354fe-aed8-11e1-9102-963e738646cc\",\"display\":\"admin - Super User\",\"links\":[{\"uri\":\"http://raxaemr.jelastic.tsukaeru.net/ws/rest/v1/user/4e9354fe-aed8-11e1-9102-963e738646cc\",\"rel\":\"self\"}]},\"dateChanged\":\"2012-06-14T14:31:47.000+0400\"},\"links\":[{\"uri\":\"http://raxaemr.jelastic.tsukaeru.net/ws/rest/v1/person/3eb21e80-babf-4990-88af-5927ec242abe\",\"rel\":\"self\"}],\"resourceVersion\":\"1.8\"}]}",
                status: 200
            }
            request.success = 'true';
            request.callback(null, true, response)
            console.log(request)
        })
        var store = ctlr.search();
        console.log(store);
        expect(store.getAt(0).getData().uuid).toEqual('3eb21e80-babf-4990-88af-5927ec242abe')
        expect(store.getAt(0).getData().givenName).toEqual('piyush')
        expect(store.getAt(0).getData().familyName).toEqual('dane')
        expect(store.getAt(0).getData().age).toEqual(20)
        expect(store.getAt(0).getData().gender).toEqual("M")
    });
});