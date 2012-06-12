/**
 * Copyright 2012, Raxa
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
Ext.define('demoVersion2.view.patientOptions', {
    extend: 'Ext.tab.Panel',
    requires: ['Ext.form.Panel', 'Ext.form.FieldSet', 'Ext.field.Number', 'Ext.field.Spinner', 'Ext.field.Password', 'Ext.field.Email', 'Ext.field.Url', 'Ext.field.DatePicker', 'Ext.field.Select', 'Ext.field.Hidden', 'Ext.field.Radio', 'Ext.field.Slider', 'Ext.field.Toggle', 'Ext.field.Search', 'Ext.MessageBox'],
    config: {
        //layout : 'fit',
        activeItem: 0,
        tabBar: {
            // ui : 'neutral',
            layout: {
                pack: 'center'
            }
        },
        items: [{
            title: 'Register',
            xtype: 'formpanel',
            id: 'registerForm',
            iconCls: 'refresh',
            items: [{
                xtype: 'fieldset',
                // title : 'Patient Info',
                instructions: 'Only numbers for MoTeCH ID and Phone Number. ',
                defaults: {
                    labelWidth: '35%'
                },
                items: [{
                    xtype: 'textfield',
                    name: 'mid_reg',
                    label: 'MoTeCH ID',
                    placeHolder: '2468',
                    required: true,
                    clearIcon: true
                }, {
                    xtype: 'textfield',
                    name: 'first',
                    label: 'First Name',
                    placeHolder: 'Harry',
                    required: true,
                    clearIcon: true
                }, {
                    xtype: 'textfield',
                    name: 'last',
                    label: 'Last Name',
                    placeHolder: 'Potter',
                    required: true,
                    clearIcon: true
                }, {
                    xtype: 'selectfield',
                    name: 'gender',
                    label: 'Gender',
                    required: true,
                    options: [{
                        text: '',
                        value: 'empty'
                    }, {
                        text: 'Male',
                        value: 'male'
                    }, {
                        text: 'Female',
                        value: 'female'
                    }]
                }, {
                    xtype: 'datepickerfield',
                    destroyPickerOnHide: true,
                    name: 'bday',
                    label: 'Birthday',
                    required: true,
                    value: new Date(),
                    picker: {
                        yearFrom: 1900
                    }
                }, {
                    xtype: 'textfield',
                    name: 'phone_reg',
                    label: 'Phone Number',
                    placeHolder: '1234567890',
                    required: true,
                    clearIcon: true

                }, {
                    xtype: 'selectfield',
                    name: 'indemo',
                    label: 'In demo?',
                    required: true,
                    options: [{
                        text: '',
                        value: 'empty'
                    }, {
                        text: 'Yes',
                        value: 'yes'
                    }, {
                        text: 'No',
                        value: 'no'
                    }]
                }, {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        pack: 'center',
                        align: 'middle'
                    },
                    items: [{
                        xtype: 'container',
                        // centered: true,
                        layout: 'hbox',
                        /*layout : {
                                          pack : 'justify',
                                          align : 'center'
                                        },*/
                        // ui: 'aqua',
                        padding: '10px',
                        width: "100%",
                        items: [{
                            xtype: 'label',
                            flex: '4'
                        }, {
                            xtype: 'button',
                            text: 'Okay',
                            ui: 'aqua',
                            id: 'registerOkay',
                            flex: '3'
                        }, {
                            xtype: 'label',
                            flex: '1'
                        }, {
                            xtype: 'button',
                            text: 'Cancel',
                            ui: 'aqua',
                            id: 'registerCancel',
                            flex: '3'
                        }, {
                            xtype: 'label',
                            flex: '4'
                        }]
                    }]
                }]
            }, ]
        }, {
            title: 'Enroll',
            id: 'enrollForm',
            xtype: 'formpanel',
            items: [{
                xtype: 'fieldset',
                defaults: {
                    labelWidth: '35%'
                    // labelAlign : 'top'
                },
                items: [{
                    xtype: 'textfield',
                    name: 'mid_enr',
                    label: 'MoTeCH ID',
                    placeHolder: '2468',
                    required: true,
                    clearIcon: true
                }, {
                    xtype: 'textfield',
                    name: 'phone_enr',
                    label: 'Phone Number',
                    placeHolder: '1234567890',
                    required: true,
                    clearIcon: true

                }, {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        pack: 'center',
                        align: 'middle'
                    },
                    items: [{
                        xtype: 'container',
                        // centered: true,
                        layout: 'hbox',
                        /*layout : {
                                          pack : 'justify',
                                          align : 'center'
                                        },*/
                        // ui: 'aqua',
                        padding: '10px',
                        width: "100%",
                        items: [{
                            xtype: 'label',
                            flex: '4'
                        }, {
                            xtype: 'button',
                            text: 'Okay',
                            ui: 'aqua',
                            id: 'enrollOkay',
                            flex: '3',
                            handler: function () {
                                // Ext.Msg.confirm('','Are you sure?')
                                console.log('hi')
                            }
                            /*handler : function () {
                                                    console.log('hi');
                                                    Ext.Msg.confirm('Confirmation', 'Are you sure?')
                                                }*/
                        }, {
                            xtype: 'label',
                            flex: '1'
                        }, {
                            xtype: 'button',
                            text: 'Cancel',
                            ui: 'aqua',
                            id: 'enrollCancel',
                            flex: '3'
                        }, {
                            xtype: 'label',
                            flex: '4'
                        }]
                    }]
                }]
            }]
        }, {
            title: 'Encounter',
            id: 'encounterForm',
            xtype: 'formpanel',
            items: [{
                xtype: 'fieldset',
                defaults: {
                    labelWidth: '35%'
                    // labelAlign : 'top'
                },
                items: [{
                    xtype: 'textfield',
                    name: 'mid_enc',
                    label: 'MoTeCH ID',
                    placeHolder: '2468',
                    required: true,
                    clearIcon: true
                }, {
                    xtype: 'datepickerfield',
                    destroyPickerOnHide: true,
                    name: 'date',
                    label: 'Date',
                    required: true,
                    value: new Date(),
                    picker: {
                        yearFrom: 2000
                    }
                }, {
                    xtype: 'selectfield',
                    name: 'concept',
                    label: 'Concept',
                    required: true,
                    options: [{
                        text: '',
                        value: 'empty'
                    }, {
                        text: 'Demo Concept #1',
                        value: 'democoncept1'
                    }, {
                        text: 'Demo Concept #2',
                        value: 'democoncept2'
                    }, {
                        text: 'Demo Concept #3',
                        value: 'democoncept3'
                    }, {
                        text: 'Demo Concept #4',
                        value: 'democoncept4'
                    }, ]
                }, {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        pack: 'center',
                        align: 'middle'
                    },
                    items: [{
                        xtype: 'container',
                        // centered: true,
                        layout: 'hbox',
                        /*layout : {
                                          pack : 'justify',
                                          align : 'center'
                                        },*/
                        // ui: 'aqua',
                        padding: '10px',
                        width: "100%",
                        items: [{
                            xtype: 'label',
                            flex: '4'
                        }, {
                            xtype: 'button',
                            text: 'Okay',
                            ui: 'aqua',
                            id: 'encounterOkay',
                            flex: '3'
                        }, {
                            xtype: 'label',
                            flex: '1'
                        }, {
                            xtype: 'button',
                            text: 'Cancel',
                            ui: 'aqua',
                            id: 'encounterCancel',
                            flex: '3'
                        }, {
                            xtype: 'label',
                            flex: '4'
                        }]
                    }]
                }]
            }]
        }, ]
    }
})