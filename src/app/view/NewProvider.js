Ext.define("RaxaEmr.view.NewProvider", {
    requires: ['Ext.field.Text', 'Ext.field.Number'],
    extend: 'Ext.form.Panel',
    xtype: 'newProvider',
    id: 'newProviderId',
    config: {
        centered: true,
        modal: true,
        hideOnMaskTap: true,
        hidden: true,
        // Set the width and height of the panel
        width: 500,
        height: 510,
        masked: {
            xtype: 'loadmask',
            message: 'Creating Provider'
        },
        items: [{
            xtype: 'textfield',
            itemId: 'givenName',
            name: 'givenname',
            dataIndex : 'givenName',
            label: 'Given Name'
        }, {
            xtype: 'textfield',
            itemId: 'familyName',
            name: 'familyname',
            dataIndex : 'familyName',
            label: 'Family Name'
        },
        {
            xtype: 'textfield',
            itemId: 'userName',
            name: 'userName',
            label: "Username"
        },
        {
            xtype: 'textfield',
            itemId: 'password',
            name: 'password',
            inputType: 'password',
            label: 'Password'
        },
        {
            xtype: 'textfield',
            itemId: 'confirmPassword',
            name: 'confirmPassword',
            inputType: 'password',
            label: 'Confirm password'
        },
        {
            xtype : 'selectfield',
            name : 'location',
            label: 'Location',
            displayField : 'name',
            valueField : 'uuid',
            store: 'Locations',
            itemId: 'selectLocation'
        },
        {
            xtype: 'textfield',
            itemId: 'email',
            name: 'email',
            label: "Email"
        },{
            xtype: 'textfield',
            itemId: 'phone',
            name: 'phone',
            label: "Phone"
        },{
            xtype  : 'container',
            itemId: 'sexRadioGroup',
            layout : {
                type  : 'hbox',
                align : 'strech'
            },
            dataIndex : 'gender',
            items  : [
            {
                xtype : 'radiofield',
                label : 'Male',
                value: 'M',
                name  : 'choice',
                labelWidth: 70,
            },
            {
                xtype : 'radiofield',
                label : 'Female',
                value: 'F',
                name  : 'choice',
                labelWidth: 90,
            },
            {
                xtype : 'radiofield',
                label : 'Other',
                value: 'O',
                name  : 'choice',
                labelWidth: 70,
            }
            ]
        },{
            xtype: 'button',
            itemId: 'saveProviderButton',
            text: 'Create Account',
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