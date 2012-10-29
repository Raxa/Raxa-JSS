ADDPATIENTSECONDCOLUMNXPOSITION = 400;

Ext.define('RaxaEmr.Pharmacy.view.addPatient', {
    extend: 'Ext.form.Panel',
    alias: 'widget.addPatient',
    id: 'addPatient',
    layout: {
        type: 'absolute'
    },
    bodyPadding: 10,
    items: [{
        xtype: 'datefield',
        id: 'dob',
        format: 'd/m/Y',
        width: 260,
        fieldLabel: 'Date',
        x: 10,
        y: 30
    }, {
        xtype: 'textfield',
        id: 'givenName',
        width: 330,
        allowBlank: false,
        fieldLabel: 'Given Name',
        x: 10,
        y: 60
    }, {
        xtype: 'textfield',
        id: 'familyName',
        width: 330,
        allowBlank: false,
        fieldLabel: 'Family Name',
        x: 10,
        y: 90
    }, {
        xtype: 'numberfield',
        id: 'age',
        width: 240,
        fieldLabel: 'Age',
        x: 10,
        y: 120,
        minValue: 0,
        hideTrigger: true
    }, {
        xtype: 'radiogroup',
        id: 'sexRadioGroup',
        width: 330,
        allowBlank: false,
        fieldLabel: 'Gender',
        x: 10,
        y: 150,
        items: [{
            xtype: 'radiofield',
            boxLabel: 'Male',
            name: 'sex',
            checked: true
        }, {
            xtype: 'radiofield',
            boxLabel: 'Female',
            name: 'sex'
        },{
            xtype: 'radiofield',
            boxLabel: 'Other',
            name: 'sex'
        }]
    }, {
        xtype: 'textfield',
        fieldLabel: 'Village',
        id: 'village',
        allowBlank: false,
        x: ADDPATIENTSECONDCOLUMNXPOSITION,
        y: 30
    }, {
        xtype: 'textfield',
        fieldLabel: 'Block',
        id: 'block',
        allowBlank: false,
        x: ADDPATIENTSECONDCOLUMNXPOSITION,
        y: 60
    }, {
        xtype: 'textfield',
        fieldLabel: 'District',
        id: 'District',
        allowBlank: false,
        x: ADDPATIENTSECONDCOLUMNXPOSITION,
        y: 90
    }, {
        xtype: 'combobox',
        width: 260,
        id: 'doctor',
        fieldLabel: 'Doctor Name',
        store: Ext.create('RaxaEmr.Pharmacy.store.Doctors'),
        displayField: 'display',
        allowBlank: false,
        x: ADDPATIENTSECONDCOLUMNXPOSITION,
        y: 120
    }]
});
