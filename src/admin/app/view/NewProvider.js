/**
 * This panel will overlay when the new patient button is
 * pressed. This is a form that gets user name and shows
  */
Ext.define("RaxaEmr.Admin.view.NewProvider", {
    requires: ['Ext.field.Text', 'Ext.field.Number'],
    extend: 'Ext.form.Panel',
    xtype: 'newProvider',
    store: 'NewPersons',
    id: 'newProviderId',
    config: {
        centered: true,
        modal: true,
        hideOnMaskTap: true,
        hidden: true,
        // Set the width and height of the panel
        width: 500,
        height: 410,

        items: [{
            xtype: 'textfield',
            id: 'givenName',
            name: 'givenname',
            dataIndex : 'givenName',
            label: Ext.i18n.appBundle.getMsg('RaxaEmrAdmin.view.NewProvider.giv_name')
        }, {
            xtype: 'textfield',
            id: 'familyName',
            name: 'familyname',
            dataIndex : 'familyName',
            label: Ext.i18n.appBundle.getMsg('RaxaEmrAdmin.view.NewProvider.fam_name')
        },
        {
            xtype: 'textfield',
            id: 'userName',
            name: 'userName',
            label: Ext.i18n.appBundle.getMsg('RaxaEmrAdmin.view.NewProvider.user_name')
        },
        {
            xtype: 'textfield',
            id: 'password',
            name: 'password',
            inputType: 'password',
            label: Ext.i18n.appBundle.getMsg('RaxaEmrAdmin.view.NewProvider.psswrd')
        },
        {
            xtype: 'textfield',
            id: 'confirmPassword',
            name: 'confirmPassword',
            inputType: 'password',
            label: Ext.i18n.appBundle.getMsg('RaxaEmrAdmin.view.NewProvider.Confirmpsswrd')
        },
        {
            xtype : 'selectfield',
            name : 'location',
            label: Ext.i18n.appBundle.getMsg('RaxaEmrAdmin.view.NewProvider.loc'),
            displayField : 'name',
            valueField : 'uuid',
            store: 'Locations',
            id: 'selectLocation'
        },
        {
            xtype  : 'container',
            id: 'isOutPatient',
            label: Ext.i18n.appBundle.getMsg('RaxaEmrAdmin.view.NewProvider.isOutPatientDoc'),
            layout : {
                type  : 'hbox',
                align : 'strech'
            },
            items  : [
            {
                xtype: 'textfield',
                id: 'IsOutPatientDoctor',
                name: 'IsOutPatientDoctor',
                label: 'IsOutPatientDoctor',
                flex : 1,
                labelWidth: 150
            },
            {
                xtype : 'radiofield',
                label : 'true',
                value: 'true',
                name  : 'boolChoice',
                labelWidth: 70,
                flex  : 1
            },
            {
                xtype : 'radiofield',
                label : 'False',
                value: 'false',
                name  : 'boolChoice',
                labelWidth: 70,
                flex  : 1
            }
            ]
        },
        {
            xtype  : 'container',
            id: 'sexRadioGroup',
            layout : {
                type  : 'hbox',
                align : 'strech'
            },
            dataIndex : 'gender',
            items  : [
            {
                xtype : 'radiofield',
                label : Ext.i18n.appBundle.getMsg('RaxaEmrAdmin.view.NewProvider.male'),
                value: 'M',
                name  : 'choice',
                labelWidth: 70,
                flex  : 1
            },
            {
                xtype : 'radiofield',
                label : Ext.i18n.appBundle.getMsg('RaxaEmrAdmin.view.NewProvider.female'),
                value: 'F',
                name  : 'choice',
                labelWidth: 90,
                flex  : 1
            },
            {
                xtype : 'radiofield',
                label : Ext.i18n.appBundle.getMsg('RaxaEmrAdmin.view.NewProvider.other'),
                value: 'O',
                name  : 'choice',
                labelWidth: 70,
                flex  : 1
            }
            ]
        },{
            xtype: 'button',
            id: 'saveProviderButton',
            text: Ext.i18n.appBundle.getMsg('RaxaEmrAdmin.view.NewProvider.save_p'),
            ui: 'action'
        }],
        onChange: function () {
            Ext.Msg.alert("Please enter the date format");
        }
    },
    saveForm: function () {
        return this.getValues();
    }
});