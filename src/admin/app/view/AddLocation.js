/** 
 * This panel will overlay when the new patient button is
 * pressed. This is a form that gets user name and shows
  */
Ext.define("RaxaEmr.Admin.view.AddLocation", {
    requires: ['Ext.field.Text', 'Ext.field.Number'],
    extend: 'Ext.form.Panel',
    xtype: 'addLocation',
    id: 'addLocation',
    config: {
        centered: true,
        modal: true,
        hideOnMaskTap: true,
        hidden: true,
        styleHtmlContent : true,
        // Set the width and height of the panel
        width: 500,
        height: 250,

        items: [{
            xtype: 'textfield',
            id: 'addLocationField',
            name: 'addLocationField',
            label: 'ADD LOCATION'
        },
        { 
            xtype: 'spacer' 
        },
        {
            xtype  : 'container',
            id: 'hospitalCheckedRadiButton',
            layout : {
                type  : 'hbox',
                align : 'strech'
            },
            items  : [
            {
                xtype: 'textfield',
                id: 'hospitalloc',
                name: 'hospitalLoc',
                label: 'HOSPITAL',
                labelWidth: 138,
                flex  : 1
            },
            {
                xtype : 'radiofield',
                label : 'Yes',
                id: 'hosChecked',
                value: 'Y',
                name  : 'hospital',
                flex  : 1
            },
            {
                xtype : 'radiofield',
                label : 'No',
                id : 'hosUnChecked',
                value: 'N',
                name  : 'hospital',
                flex  : 1
            },
            ]
        },
        {
            xtype : 'selectfield',
            name : 'parentLocation',
            label: 'Select The Parent Location',
            displayField : 'name',
            valueField : 'uuid',
            store: 'Locations',
            id: 'parentLocation',
            hidden: true
        },
        { 
            xtype: 'spacer' 
        },
        {
            xtype: 'textfield',
            label: 'First Three Lettre Identifier Prefix',
            name: 'identifier',
            id: 'identifier',
            hidden: true
        },
        { 
            xtype: 'spacer' 
        },
        {
            xtype: 'checkboxfield',
            id: 'pharmacy',
            name : 'pharmacy',
            label: 'Pharmacy',
            value: 'pharmacy'
        } ,
{
            xtype: 'checkboxfield',
            id: 'laboratory',
            name : 'laboratory',
            label: 'Laboratory',
            value: 'laboratory'  
        },
        {
            xtype: 'button',
            id: 'saveLocationButton',
            text: 'SaveButton',
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