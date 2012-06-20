describe("controller", function() {
    
    var store = null, ctlr = null, view = null;
	
    beforeEach(function(){
        if (!ctlr) {
            ctlr = Application.getController('controls');
        }
        if(!view)
        {
            view = Ext.create('Ext.Container', {
                items:[{
                    xtype: 'home'
                }, {
                    xtype: 'registrationpart1'
                }, {
                    xtype: 'registrationpart2'
                }, {
                    xtype: 'registrationconfirm'
                }, {
					xtype: 'registrationbmi'
				}, {
					xtype: 'searchpart1'
				}, {
					xtype: 'searchpart2'
				}, {
					xtype: 'searchconfirm'
				}
                ]
            });
			Ext.getCmp('heightIDcm').setValue(10);
        }
    });
    
    it("data in the form fields and response from ajax request loads in store",function(){
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"uuid\":\"ccac1561-d7a2-44f8-ae05-af6fb031bd37\",\"display\":\"REGISTRATION 15/06/2012\",\"encounterDatetime\":\"2012-06-15T12:01:05.000+0400\",\"patient\":{\"uuid\":\"5793225b-aed7-11e1-9102-963e738646cc\",\"display\":\"Mr. Horatio L Hornblower Esq.\",\"links\":[{\"uri\":\"NEED-TO-CONFIGURE/ws/rest/v1/person/5793225b-aed7-11e1-9102-963e738646cc\",\"rel\":\"self\"}]},\"location\":null,\"form\":{\"uuid\":\"57590a41-aed7-11e1-9102-963e738646cc\",\"display\":\"Basic Form - This form contains only the common/core elements needed for most forms\",\"links\":[{\"uri\":\"NEED-TO-CONFIGURE/ws/rest/v1/form/57590a41-aed7-11e1-9102-963e738646cc\",\"rel\":\"self\"}]},\"encounterType\":{\"uuid\":\"e7ebaec1-d6b9-4f9f-aba4-3313efd835c5\",\"display\":\"REGISTRATION - Encounter for Patient at Registration\",\"links\":[{\"uri\":\"NEED-TO-CONFIGURE/ws/rest/v1/encountertype/e7ebaec1-d6b9-4f9f-aba4-3313efd835c5\",\"rel\":\"self\"}]},\"provider\":null,\"obs\":[{\"uuid\":\"284f9acd-b671-4346-a93f-f091f9ddd1f1\",\"display\":\"WEIGHT (KG) = 21.0\",\"links\":[{\"uri\":\"NEED-TO-CONFIGURE/ws/rest/v1/obs/284f9acd-b671-4346-a93f-f091f9ddd1f1\",\"rel\":\"self\"}]},{\"uuid\":\"1a74e077-324a-4fac-be30-2817db92cca2\",\"display\":\"Registration Fee = 17.7\",\"links\":[{\"uri\":\"NEED-TO-CONFIGURE/ws/rest/v1/obs/1a74e077-324a-4fac-be30-2817db92cca2\",\"rel\":\"self\"}]},{\"uuid\":\"53397dbc-e302-4e09-b31b-aed448ed22fb\",\"display\":\"BODY MASS INDEX = 21.0\",\"links\":[{\"uri\":\"NEED-TO-CONFIGURE/ws/rest/v1/obs/53397dbc-e302-4e09-b31b-aed448ed22fb\",\"rel\":\"self\"}]},{\"uuid\":\"5b30ed6e-cd7e-4e7c-a280-5942c5d56ca7\",\"display\":\"HEIGHT (CM) = 100.0\",\"links\":[{\"uri\":\"NEED-TO-CONFIGURE/ws/rest/v1/obs/5b30ed6e-cd7e-4e7c-a280-5942c5d56ca7\",\"rel\":\"self\"}]}],\"orders\":[],\"voided\":false,\"links\":[{\"uri\":\"NEED-TO-CONFIGURE/ws/rest/v1/encounter/ccac1561-d7a2-44f8-ae05-af6fb031bd37\",\"rel\":\"self\"},{\"uri\":\"NEED-TO-CONFIGURE/ws/rest/v1/encounter/ccac1561-d7a2-44f8-ae05-af6fb031bd37?v=full\",\"rel\":\"full\"}]}",
                status: 201

            }
            request.success = 'true';
            request.callback(null, true, response);
        });
		store = ctlr.senddata();		
        expect(store.getAt(0).getData().patient.uuid).toEqual("5793225b-aed7-11e1-9102-963e738646cc");
        expect(store.getAt(0).getData().encounterType.uuid).toEqual("e7ebaec1-d6b9-4f9f-aba4-3313efd835c5");
        expect(store.getAt(0).getData().form.display).toEqual("Basic Form - This form contains only the common/core elements needed for most forms");
        expect(store.getProxy().getReader().jsonData.display).toEqual("REGISTRATION 15/06/2012");
        expect(store.getProxy().getReader().jsonData.patient.display).toEqual("Mr. Horatio L Hornblower Esq.");
        expect(store.getProxy().getReader().jsonData.obs[0].uuid).toEqual("284f9acd-b671-4346-a93f-f091f9ddd1f1"); 
    });
});