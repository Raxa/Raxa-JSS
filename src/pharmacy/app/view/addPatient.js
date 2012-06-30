Ext.define('RaxaEmr.Pharmacy.view.addPatient', {
    extend: 'Ext.form.Panel',
    alias: 'widget.addPatient',
    id: 'addPatient',
    height: 195,
    width: 868,
    layout: {
        type: 'absolute'
    },
    bodyPadding: 10,
    title: 'Add a new Patient',
    items: [{
        xtype: 'datefield',
        id: 'dob',
        width: 260,
        fieldLabel: 'Date',
        x: 10,
        y: 30
    }, {
        xtype: 'textfield',
        id: 'givenName',
        width: 330,
        fieldLabel: 'Given Name',
        x: 10,
        y: 60
    }, {
        xtype: 'textfield',
        id: 'familyName',
        width: 330,
        fieldLabel: 'Family Name',
        x: 10,
        y: 90
    }, {
        xtype: 'numberfield',
        id: 'age',
        width: 240,
        fieldLabel: 'Age',
        x: 10,
        y: 120
    }, {
        xtype: 'radiogroup',
        id: 'sexRadioGroup',
        width: 330,
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
        }]
    }, {
        xtype: 'textfield',
        fieldLabel: 'Village',
        id: 'village',
        x: 480,
        y: 30
    }, {
        xtype: 'textfield',
        fieldLabel: 'Block',
        id: 'block',
        x: 480,
        y: 60
    }, {
        xtype: 'textfield',
        fieldLabel: 'District',
        id: 'District',
        x: 480,
        y: 90
    }, {
        xtype: 'combobox',
        width: 260,
        fieldLabel: 'Doctor Name',
        store: Ext.create('RaxaEmr.Pharmacy.store.Doctors'),
        displayField: 'display',
        x: 480,
        y: 120

    }, {
        xtype: 'button',
        text: 'ADD',
        width: 120,
        x: 480,
        y: 150,
        action: 'submit'
    }]
});