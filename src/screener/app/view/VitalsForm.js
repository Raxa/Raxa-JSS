/**
 * This screen shows a drug order form 
 * with a button to add additional medications and a submit button.The left side shows patient
 * list
 */
//TODO: 
//Min and Max value validation filed of numberfield is not been working , 
//this is sencha bug , might be fixed in next version of sencha , so applied manually validations.
//Borders on numberfield is also not been working for styling , seems a sencha bug too . 
Ext.define("Screener.view.VitalsForm", {
    xtype: 'vitalsForm',
    requires:['Screener.view.VitalViewListener'],
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
                    // TODO: For all inputs, get bounds from OpenMRS concept dictionary
                    items: [{
                        layout: 'hbox',
                        items: [{
                            xtype: 'vitalsListenerForm',
                            label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.VitalsForm.sysbp'),
                            labelWidth: '150px',
                            height: '50px',
                            flex : 3,
                            minValue: 0,
                            name: 'sistolicBloodPressureField',
                            maxValue: 250
                        },
                        {
                            xtype: 'label',
                            html : 'mmHg',
                            border: '0 0 0 1',
                            style:'border-style : solid; border-color: #ddd',
                            flex:2
                        }
                        ]
                    },
                    {
                        layout: 'hbox',
                        items: [{
                            // Diastolic Blood Pressure
                            xtype: 'vitalsListenerForm',
                            label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.VitalsForm.diasbp'),
                            labelWidth: '150px',
                            minValue: 0,
                            maxValue: 150,
                            stepValue: 1,
                            name: 'diastolicBloodPressureField',
                            height: '50px',
                            flex:3
                        },{
                                         
                            html : 'mmHg',
                            flex:2,
                            border: '0 0 0 1',
                            style:'border-style : solid; border-color: #ddd'
                        }]
                    },
                    {
                        layout: 'hbox',
                        items: [{
                            // Temperature
                            xtype: 'vitalsListenerForm',
                            label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.VitalsForm.temp'),
                            labelWidth: '150px',
                            id: 'tempSliderExt',
                            minValue: 25,   // TODO: Fix visual error in Slider. bar starts at far right and cant slide (this is a Sencha bug)
                            maxValue: 43,
                            stepValue: 0.1,
                            name: 'temperatureField',
                            height: '50px',
                            flex: '3'
                        },
                        {
                            layout : {
                                type  : 'hbox',
                                align : 'strech'
                            },
                            flex:2,
                            border: '0 0 0 1',
                            style:'border-style : solid; border-color: #ddd',
                            items  : [
                            {
                                xtype : 'radiofield',
                                label : 'C',
                                value: 'C',
                                name  : 'choice',
                                style: 'bgcolor:white;border-color:white'
                            },
                            {
                                xtype : 'radiofield',
                                label : 'F',
                                value: 'F',
                                name  : 'choice'
                            }
                            ]
                        }
                        ]
                    },
                    {
                        layout: 'hbox',
                        items: [{
                            // Repiratory Rate
                            xtype: 'vitalsListenerForm',
                            label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.VitalsForm.resp_rate'),
                            labelWidth: '150px',
                            minValue: 0,
                            maxValue: 200,
                            stepValue: 1,
                            name: 'respiratoryRateField',
                            height: '50px',
                            flex: '3'
                        },{
                            html : 'breaths/min',
                            flex:2,
                            border: '0 0 0 1',
                            style:'border-style : solid; border-color: #ddd'
                        }]
                    },
                    {
                        layout: 'hbox',
                        items: [{
                            // Pulse
                            xtype: 'vitalsListenerForm',
                            label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.VitalsForm.pul_rate'),
                            labelWidth: '150px',
                            minValue: 0,
                            maxValue: 230,
                            stepValue: 1,
                            name: 'pulseField',
                            height: '50px',
                            flex: '3'
                        },{
                            html : 'beats/min',
                            flex:2,
                            border: '0 0 0 1',
                            style:'border-style : solid; border-color: #ddd'
                        }]
                    },
                    {
                        layout: 'hbox',
                        items: [{
                            // Oxygen Saturation
                            xtype: 'vitalsListenerForm',
                            label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.VitalsForm.oxy_sat'),
                            labelWidth: '150px',
                            minValue: 0,
                            maxValue: 100,
                            stepValue: 1,
                            name: 'bloodOxygenSaturationField',
                            height: '50px',
                            flex: '3'
                        },{
                            html : 'unit',
                            flex:2,
                            border: '0 0 0 1',
                            style:'border-style : solid; border-color: #ddd'
                        }]
                    }
                
                    ]
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

