Ext.define('RaxaEmr.Pharmacy.view.addFacility', {
    extend: 'Ext.window.Window',
    alias : 'widget.addfacility',
    layout: 'fit',
    autoShow: true,
    resizable: false,
    width: 500,
    modal: true,
    initComponent: function() {
        this.items = [
        {
            xtype: 'form',
            id: 'addFacility',
            layout: {
                type: 'absolute'
            },
            bodyPadding: 10,
            title: 'Add new facility',
            items: [{
                xtype: 'fieldset',
                title: '',
                items: [{
                    xtype: 'combobox',
                    fieldLabel: 'Facility',
                    anchor: '100%',
                    store: new Ext.data.SimpleStore({
                        fields: ['facility'],
                        data: [
                        ['Pharmacy'],
                        ['Lab'],
                        ['OPD']              ]
                    })
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Facilty Name',
                    anchor: '100%'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Address',
                    anchor: '100%'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'City',
                    anchor: '100%'
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Contact No.',
                    spinDownEnabled: false,
                    spinUpEnabled: false,
                    allowDecimals: false,
                    anchor: '100%',
                    hideTrigger: true
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Person Incharge',
                    anchor: '100%'
                }]
            },{
                xtype: 'button',
                height: 22,
                width: 50,
                text: 'Reset',
                x: 190,
                y: 200
            },{
                xtype: 'button',
                width: 61,
                text: 'Save',
                x: 250,
                y: 200
            },{
                xtype: 'button',
                width: 50,
                text: 'Cancel',
                x: 130,
                y: 200,
                scope: this,
                handler: this.close
            }]    
        }];
        this.callParent(arguments);
    }
});