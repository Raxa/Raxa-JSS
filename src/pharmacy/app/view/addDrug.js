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
                xtype: 'combobox',
                fieldLabel: 'Route'
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
            ui: 'raxa-orange-small',
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
