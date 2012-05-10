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
        localStorage.setItem("privileges", "RaxaEmrView screener, RaxaEmrView registration")
        mainController.loginSuccess();
        expect(Ext.getCmp('modulesPanel')).toBeDefined();
    });

    it("stores privilege URLs for particular user in localStorage", function () {
        var userInfo = {
            responseText: "{\"results\":[{\"links\":[{\"uri\":\"http://test.com\"}]}]}"
        };
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"privileges\":[{\"name\":\"RaxaEmrView screener\",\"description\":\"screener\"}," +
                		"{\"name\":\"RaxaEmrView registration\",\"description\":\"registration\"}]}"
            };
            request.success.call(request.scope, response);
        });
        Ext.getCmp('userName').setValue("testUser");
        mainController.storeUserPrivileges(userInfo);
        var expected = [{
            name: "RaxaEmrView screener",
            description: "screener"
        },{
        	name: "RaxaEmrView registration",
        	description: "registration"
        }];
        var actual = Ext.decode(localStorage.getItem("privileges"));
        expect(actual).toEqual(expected);
    });

    it("only adds modules to the app grid the user is allowed to view", function() {
    	localStorage.setItem("privileges", "RaxaEmrView screener, RaxaEmrView registration");
        mainController.loginSuccess();
        expect(Ext.getCmp('screener')).toBeDefined();
        expect(Ext.getCmp('registration')).toBeDefined();
        expect(Ext.getCmp('registrationextjs4')).not.toBeDefined();
    });
    
});