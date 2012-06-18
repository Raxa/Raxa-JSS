Ext.define('RaxaEmr.Pharmacy.controller.Drugs', {
    extend: 'Ext.app.Controller',
    views: ['DrugDetails','dispense'],
    init: function () {
        this.control({
            'addDrug button[action=addModify]': {
                click: this.updateUser
            }
        });
        Ext.create('Ext.Container', {
            id: 'mainView',
            fullscreen: true,
            layout: 'card',
            items: [{
                xclass: 'RaxaEmr.Pharmacy.view.Viewport'
            }]
        });
    },

    updateUser: function (button) {
        var Form = Ext.getCmp('formPanel');
        Values = Form.getValues();
        this.launch(Form, Values);
        window.location.reload();
    },

    launch: function (Form, Values) {
        find = Ext.getStore('drugStore').find('drug', Values.drug, 0, false, false, true);
        if (find != -1) {
            var Record = Ext.getStore('drugStore').getAt(find);
            Record.set(Values);
        } else {
            var Record = Form.getRecord();
            Record.set(Values);
            Ext.getStore('drugStore').insert('id', Record);
        }
        Form._record = null;
        Ext.getStore('drugStore').sync();
    }
});