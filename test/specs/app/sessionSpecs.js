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
        mainController.loginSuccess();
        expect(Ext.getCmp('modulesPanel')).toBeDefined();
    });

    it("stores privilege URLs for particular user in localStorage", function () {
        var userInfo = {
            responseText: "{\"results\":[{\"links\":[{\"uri\":\"http://test.com\"}]}]}"
        };
        spyOn(Ext.Ajax, 'request').andCallFake(function (request) {
            var response = {
                responseText: "{\"privileges\":[{\"name\":\"test Privilege\",\"description\":\"test.com/privilege\"}]}"
            };
            window.loginSuccess = function () {};
            request.success.call(request.scope, response);
        });
        Ext.getCmp('userName').setValue("testUser");
        mainController.getPrivilegesHelper(userInfo);
        var expected = {
            name: "test Privilege",
            description: "test.com/privilege"
        }
        var actual = Ext.decode(localStorage.getItem("privileges"))[0];
        expect(actual).toEqual(expected);
    });

});