describe("Session", function () {

    var mainController = null;
    var mainView = null;
    beforeEach(function () {
        if (!mainController) {

            mainController = testApp.getController('Session');
        }

        //creating blank main view for testing
        if (!mainView) {
            mainView = Ext.create('Ext.Container', {
                id: 'mainView',
                fullscreen: true,
                layout: 'card',
                items: [{
                    xclass: 'RaxaEmr.view.Login'
                }, {
                    xclass: 'RaxaEmr.view.AppGrid'
                }]
            });
        }

    });

    it("adds modules to the dashboard at login", function () {
        localStorage.setItem("privileges", "RaxaEmrView screener, RaxaEmrView registration");
        mainController.loginSuccess();
        expect(Ext.getCmp('modulesPanel')).toBeDefined();
    });

    it("stores privilege URLs for particular user in localStorage", function () {
        var userInfo = {
            responseText: "{\"results\":[{\"links\":[{\"uri\":\"http://test.com\"}]}]}"
        };
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"privileges\":[{\"name\":\"RaxaEmrView screener\",\"description\":\"screener\"}," + "{\"name\":\"RaxaEmrView registration\",\"description\":\"registration\"}]}"
            };
            request.success.call(request.scope, response);
        });
        Ext.getCmp('userName').setValue("testUser");
        mainController.storeUserPrivileges(userInfo);
        var expected = [{
            name: "RaxaEmrView screener",
            description: "screener"
        }, {
            name: "RaxaEmrView registration",
            description: "registration"
        }];
        var actual = Ext.decode(localStorage.getItem("privileges"));
        expect(actual).toEqual(expected);
    });

    it("only adds modules to the app grid the user is allowed to view", function () {
        localStorage.setItem("privileges", "RaxaEmrView screener, RaxaEmrView registration");
        mainController.loginSuccess();
        expect(Ext.getCmp('screener')).toBeDefined();
        expect(Ext.getCmp('registration')).toBeDefined();
        expect(Ext.getCmp('registrationextjs4')).not.toBeDefined();
    });

    it(" shows connection error when timeout in getUserPrivilege", function () {
        var testName = "testUser";
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var expected = Util.getTimeoutLimit();
            expect(Ext.Ajax.getTimeout()).toEqual(expected);
        });
        mainController.getUserPrivileges(testName);
    }); // this test checks the value of timeout is same as defined in getUserPrivileges
    
	it(" shows connection error when timeout in storeUserPrivilege", function () {
        var userInfo = {
            responseText: "{\"results\":[{\"links\":[{\"uri\":\"http://test.com\"}]}]}"
        };
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var expected = Util.getTimeoutLimit();
            expect(Ext.Ajax.getTimeout()).toEqual(expected);
        });
        mainController.storeUserPrivileges(userInfo);
    }); // this test checks the value of timeout is same as defined in storeUserPrivileges
    
	it("has the same text on the userName label in the UI and in the i18n properties file", function () {
        var displayed = Ext.getCmp('userName').getLabel();
        var expected = Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.label');
        expect(displayed).toEqual(expected);
    }); // this test checks the label of userName is same that in properties file
});
