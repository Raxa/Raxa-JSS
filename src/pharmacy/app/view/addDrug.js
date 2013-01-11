Ext.define('RaxaEmr.Pharmacy.view.addDrug', {
    extend: 'Ext.form.Panel',
    alias: 'widget.addDrug',
    id: 'addDrug',
    hidden: true,
    centered: true,
    floating: true,
    title: 'Add Drug',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners:{
        'show': function() {
            this.mon(Ext.getBody(), 'mousedown', this.checkCloseClick, this);
        }
    },
    checkCloseClick: function (event) {
        var cx = event.getX(), cy = event.getY(),
        box = this.getBox();
        if (cx < box.x || cx > box.x + box.width || cy < box.y || cy > box.y + box.height) {
            this.hide();
            this.mun(Ext.getBody(), 'click', this.checkCloseClick, this);
        }
    },
    items: [
    {
        layout: 'hbox',
        border: false,
        items:[{
            layout: 'vbox',
            border: false,
            margin: '20 20 20 20',
            items:[
            {
                xtype: 'textfield',
                fieldLabel: 'Drug Name',
                id: 'addDrugName'
            },
            {
                xtype: 'combobox',
                fieldLabel: 'Dosage Form',
                id: 'dosageFormPicker',
                //inline store for a simple store
                store: new Ext.data.SimpleStore({
                    fields: ['dosageForm', 'uuid'],
                    data: [
                        ['Tablet', localStorage.tabletUuidconcept],
                        ['Ointment', localStorage.ointmentUuidconcept],
                        ['Syrup', localStorage.syrupUuidconcept],
                        ['Solution for Injection', localStorage.solutionForInjectionUuidconcept]
                    ]
                }),
                displayField: 'dosageForm',
                valueField: 'uuid'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Dose Strength',
                id: 'addDrugDoseStrength'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Manufacturer',
                id: 'addDrugManufacturer'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Supplier',
                id: 'addDrugSupplier'
            }
            ]
        },

        {
            layout: 'vbox',
            border: false,
            margin: '20 20 20 20',
            items:[{
                xtype: 'textfield',
                fieldLabel: 'Units',
                id: 'addDrugUnits'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Minimum Dose',
                id: 'addDrugMinimumDose'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Maximum Dose',
                id: 'addDrugMaximumDose'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Purchase Price',
                id: 'addDrugPrice'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Sale Price',
                id: 'addDrugCost'
            }
            ]
        }]
    },
    {
        layout: {
            type: 'hbox',
            pack: 'end'
        },
        
        border: false,
        items:[{
            xtype: 'button',
            text: 'Cancel',
            action: 'cancelNewDrug',
            margin: '0 20 20 20'
        },
        {
            xtype: 'button',
            text: 'Submit',
            action: 'submitNewDrug',
            margin: '0 20 20 0'
        }
        ]
    }
    ]
});
