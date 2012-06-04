Ext.define('RaxaEmr.Pharmacy.view.DrugDetails', {
    extend: 'Ext.form.Panel',
    alias: 'widget.drugDet',
    config: {
        name: 'loginForm',
        store: Ext.create('RaxaEmr.Pharmacy.store.Drugs', {
            storeId: 'drugStore'
        }),
        title: 'ADD/MODIFY DRUGS',
        id: 'formPanel',
        width: '300',
        hideMode: 'offsets',
        layout: {
            align: 'center',
            pack: 'center',
            type: 'vbox'
        },
        items: [{
            xtype: 'combobox',
            name: 'drug',
            id: 'drugId',
            queryMode: 'local',
            emptyText: 'Drug Name [ATC CODE]',
            width: '200',
            displayField: 'drug',
            store: Ext.getStore('drugStore'),
            handleMouseEvents: true,
            listeners: {
                'render': function (cmp, exstore) {
                    var Form = this.up('form').getForm();
                    cmp.getEl().on('click', function (view, record) {
                        Ext.getStore('drugStore').load(function (records, operation, success) {});
                        Record = Ext.create('RaxaEmr.Pharmacy.model.Drug');
                        Form.loadRecord(Record);
                    });
                },
                select: function () {
                    find = Ext.getStore('drugStore').find('drug', Ext.getCmp('drugId').getValue(), 0, false, false, true);
                    if (find != -1) {
                        var Record = Ext.getStore('drugStore').getAt(find);
                        this.up('form').getForm().loadRecord(Record);
                    }
                }
            }
        }, {
            xtype: 'textfield',
            name: 'mimsReference',
            emptyText: 'MIMS reference',
            width: '200'
        }, {
            xtype: 'combobox',
            name: 'form',
            store: Ext.getStore('drugStore'),
            queryMode: 'remote',
            emptyText: 'Form',
            displayField: 'form',
            width: '200'
        }, {
            xtype: 'textfield',
            name: 'packSize',
            emptyText: 'Pack Size',
            width: '200'
        }, {
            xtype: 'textfield',
            name: 'dispencingInstruct',
            emptyText: 'Dispencing Instruction',
            width: '200'
        }, {
            xtype: 'combobox',
            name: 'sideTreatment',
            displayField: 'sideTreatment',
            store: Ext.getStore('drugStore'),
            queryMode: 'local',
            emptyText: 'Side Treatement',
            width: '200'
        }, {
            xtype: 'textfield',
            name: 'dosage',
            emptyText: 'Standard Dosage',
            width: '200'
        }],
        buttons: [{
            text: 'ADD/MODIFY Drugs',
            action: 'addModify',
            id: 'addModify'
        }, ]
    }
})