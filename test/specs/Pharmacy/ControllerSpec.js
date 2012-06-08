describe("Controller", function () {
    var mainController = null;
    var mainView = null;
    var testView = null;
    beforeEach(function () {

        if (!mainController) {

            mainController = Application.getController("Drugs");
        }
        if (!mainView) {
            mainView = Ext.create('Ext.Container', {
                id: 'mainView',
                items: [{
                    xtype: 'drugDet'
                }]
            });
        }
        if (!testView) {
            testView = Ext.create('Ext.Container', {
                id: 'testView',
                items: [{
                    xtype: 'button',
                    id: 'testButton'
                }]
            });
        }

    });
    it("saves in localstorage", function () {
        var Form = Ext.getCmp('formPanel');
        Record = Ext.create('RaxaEmr.Pharmacy.model.Drug');
        Form.loadRecord(Record);
        var drug = Ext.create('RaxaEmr.Pharmacy.model.Drug');
        drug.set('drug', 'testdrug');
        drug.set('mimsReference', 'testdrug');
        drug.set('form', 'testdrug');
        drug.set('packSize', 'testdrug');
        drug.set('dispencingInstruct', 'testdrug');
        drug.set('sideTreatment', 'testdrug');
        drug.set('dosage', 'testdrug');
        mainController.launch(Form, drug.data)
        var find = Ext.getStore('drugStore').find('drug', 'testdrug', 0, false, false, true);
        expect(find).toBeGreaterThan(-1);

    });
});