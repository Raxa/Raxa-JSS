/**
 * This screen shows a drug order form 
 * with a button to add additional medications and a submit button.The left side shows patient
 * list
 */

Ext.define("Screener.view.VitalsForm", {
    xtype: 'vitalsForm',
    id: 'vitalsForm',
    extend: 'Ext.form.Panel',
    config: {
        styleHtmlContent: false,
        autoscroll: true,
        layout: 'vbox',
        items: [{
            xtype: 'titlebar',
            docked: 'top',
            title: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.VitalsForm.vitals')
        },
        {
            // Need a separate panel here, so I can show/hide/disable
            xtype: 'panel',
            layout: 'vbox',
            id: 'vitalsInput',
            items: [{
                xtype: 'panel',
                layout: 'hbox',
                items: [{
                    // Fieldset for inputting vitals
                    xtype: 'fieldset',
                    width: '500px', // TODO: layout should fit screen
                    id: 'vitalsFields',
                    items: [{
                        // Systolic Blood Pressure    
                        xtype: 'sliderfieldextended',
                        label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.VitalsForm.sysbp'),
                        labelAlign: 'top',
                        maxValue: Util.getValidationBounds(resourceUuid.systolicbloodpressure , "max"),
                        minValue: Util.getValidationBounds(resourceUuid.systolicbloodpressure , "min"),
                        value: 0,
                        stepValue: 1,
                        name: 'systolicBloodPressureField'
                    },
                    {
                        // Diastolic Blood Pressure
                        xtype: 'sliderfieldextended',
                        label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.VitalsForm.diasbp'),
                        labelAlign: 'top',
                        maxValue: Util.getValidationBounds(resourceUuid.diastolicbloodpressure , "max"),
                        minValue: Util.getValidationBounds(resourceUuid.diastolicbloodpressure , "min"),
                        value: 0,
                        stepValue: 1,
                        name: 'diastolicBloodPressureField'
                    },
                    {
                        // Temperature
                        xtype: 'sliderfieldextended',
                        label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.VitalsForm.temp'),
                        labelAlign: 'top',
                        id: 'tempSliderExt',
                        maxValue: Util.getValidationBounds(resourceUuid.temperature , "max"),
                        minValue: Util.getValidationBounds(resourceUuid.temperature , "min"),
                        value: 25,
                        stepValue: 0.1,
                        name: 'temperatureField'
                    },
                    {
                        // Repiratory Rate
                        xtype: 'sliderfieldextended',
                        label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.VitalsForm.resp_rate'),
                        labelAlign: 'top',
                        maxValue: (Util.getValidationBounds(resourceUuid.respiratoryRate , "max")),
                        minValue: Util.getValidationBounds(resourceUuid.respiratoryRate , "min"), 
                        value: 0,
                        stepValue: 1,
                        name: 'respiratoryRateField'
                    },
                    {
                        // Pulse
                        xtype: 'sliderfieldextended',
                        label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.VitalsForm.pul_rate'),
                        labelAlign: 'top',
                        maxValue: Util.getValidationBounds(resourceUuid.pulse , "max"),
                        minValue: Util.getValidationBounds(resourceUuid.pulse , "min"), 
                        stepValue: 1,
                        name: 'pulseField'
                    },
                    {
                        // Oxygen Saturation
                        xtype: 'sliderfieldextended',
                        label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.VitalsForm.oxy_sat'),
                        labelAlign: 'top',
                        maxValue: Util.getValidationBounds(resourceUuid.bloodoxygensaturation , "max"),
                        minValue: Util.getValidationBounds(resourceUuid.bloodoxygensaturation , "min"), 
                        stepValue: 1,
                        name: 'bloodOxygenSaturationField'
                    }]
                }]
            },
            {
                // Submit Button
                xtype: 'button',
                ui: 'confirm',
                id: 'submitVitalsButton',
                height: '40px',
                text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.VitalsForm.submit'),
                width: '100px'
            }]
        }]
    }
});

