describe("Session", function () {

    var mainController = null;
    beforeEach(function () {
        if (!mainController) {
            mainController = testApp.getController('Session');
        }
        //creating blank main view for testing
        Ext.create('Ext.Container', {
            id: 'mainView',
            fullscreen: true,
            layout: 'card',
            items: [{
                xclass: 'RaxaEmr.view.Login'
            }, {
                xclass: 'RaxaEmr.view.Dashboard'
            }]
        });

    });

    it("adds modules to the dashboard at login", function () {
        mainController.doLogin();
        expect(Ext.getCmp('modulesPanel')).toBeDefined();
    });

});