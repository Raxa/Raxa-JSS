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
Ext.define('motechScheduleTracking.view.patientOptions', {
    extend: 'Ext.tab.Panel',
    config: {
        activeItem: 0,
        tabBar: {
            layout: {
                pack: 'center'
            }
        },
        items: [{
            title: 'Register',
            xtype: 'formpanel',
            id: 'registerForm',
            iconCls: 'refresh',
            scrollable : true,
            items: [{
                xtype: 'fieldset',
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
                },{
                    xtype: 'textfield',
                    name: 'first',
                    label: 'First Name',
                    placeHolder: 'Harry',
                    required: true,
                    clearIcon: true
                },{
                    xtype: 'textfield',
                    name: 'last',
                    label: 'Last Name',
                    placeHolder: 'Potter',
                    required: true,
                    clearIcon: true
                },{
                    xtype : 'container',
                    layout : {
                        type : 'hbox',
                        align: 'stretch',
                        padding : 0
                    },
                    items : [{
                        xtype: 'radiofield',
                        name: 'radiogroup',
                        value: 'female',
                        label: 'Female',
                        labelWidth : '70%',
                        flex : 1,
                        height : 50
                    },{
                        xtype : 'radiofield',
                        name : 'radiogroup',
                        value : 'male',
                        label : 'Male',
                        labelWidth : '70%',
                        flex : 1
                    }]
                },
               {
                    xtype: 'datepickerfield',
                    destroyPickerOnHide: true,
                    name: 'bday',
                    label: 'Birthday',
                    required: true,
                    value: new Date(),
                    picker: {
                        yearFrom: 1900
                    }
                },{
                    xtype: 'textfield',
                    name: 'phone_reg',
                    label: 'Phone Number',
                    placeHolder: '1234567890',
                    required: true,
                    clearIcon: true
                },{
                    xtype : 'container',
                    layout : {
                        type : 'hbox',
                        align: 'stretch',
                        padding : 0
                    },
                    items : [{
                        xtype: 'radiofield',
                        name: 'radiogroupy',
                        value: 'yes',
                        label: 'In demo',
                        labelWidth : '70%',
                        flex : 1,
                        height : 50
                    },{
                        xtype : 'radiofield',
                        name : 'radiogroupy',
                        value : 'no',
                        label : 'Not in demo',
                        labelWidth : '70%',
                        flex : 1
                    }]
                },{
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        pack: 'center',
                        align: 'middle'
                    },
                    items: [{
                        xtype: 'container',
                        layout: 'hbox',
                        padding: '10px',
                        width: "100%",
                        items: [{
                            xtype: 'label',
                            flex: '4'
                        },{
                            xtype: 'button',
                            text: 'Okay',
                            ui: 'aqua',
                            id: 'registerOkay',
                            flex: '3'
                        },{
                            xtype: 'label',
                            flex: '1'
                        },{
                            xtype: 'button',
                            text: 'Cancel',
                            ui: 'aqua',
                            id: 'registerCancel',
                            flex: '3'
                        },{
                            xtype: 'label',
                            flex: '4'
                        }]
                    }]
                }]
            }]
        },{
            title: 'Enroll',
            id: 'enrollForm',
            xtype: 'formpanel',
            items: [{
                xtype: 'fieldset',
                defaults: {
                    labelWidth: '35%'
                    },
                items: [{
                    xtype: 'textfield',
                    name: 'mid_enr',
                    label: 'MoTeCH ID',
                    placeHolder: '2468',
                    required: true,
                    clearIcon: true
                },{
                    xtype: 'textfield',
                    name: 'phone_enr',
                    label: 'Phone Number',
                    placeHolder: '1234567890',
                    required: true,
                    clearIcon: true
                },{
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        pack: 'center',
                        align: 'middle'
                    },
                    items: [{
                        xtype: 'container',
                        layout: 'hbox',
                        padding: '10px',
                        width: "100%",
                        items: [{
                            xtype: 'label',
                            flex: '4'
                        },{
                            xtype: 'button',
                            text: 'Okay',
                            ui: 'aqua',
                            id: 'enrollOkay',
                            flex: '3'
                        },{
                            xtype: 'label',
                            flex: '1'
                        },{
                            xtype: 'button',
                            text: 'Cancel',
                            ui: 'aqua',
                            id: 'enrollCancel',
                            flex: '3'
                        },{
                            xtype: 'label',
                            flex: '4'
                        }]
                    }]
                }]
            }]
        },{
            title: 'Encounter',
            id: 'encounterForm',
            xtype: 'formpanel',
            items: [{
                xtype: 'fieldset',
                defaults: {
                    labelWidth: '35%'   
                },
                items: [{
                    xtype: 'textfield',
                    name: 'mid_enc',
                    label: 'MoTeCH ID',
                    placeHolder: '2468',
                    required: true,
                    clearIcon: true
                },{
                    xtype: 'datepickerfield',
                    destroyPickerOnHide: true,
                    name: 'date',
                    label: 'Date',
                    required: true,
                    value: new Date(),
                    picker: {
                        yearFrom: 2000
                    }
                },{
                    xtype: 'selectfield',
                    name: 'concept',
                    label: 'Concept',
                    required: true,
                    options: [{
                        text: '',
                        value: 'empty'
                    },{
                        text: 'Demo Concept #1',
                        value: 'democoncept1'
                    },{
                        text: 'Demo Concept #2',
                        value: 'democoncept2'
                    },{
                        text: 'Demo Concept #3',
                        value: 'democoncept3'
                    },{
                        text: 'Demo Concept #4',
                        value: 'democoncept4'
                    }]
                },{
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        pack: 'center',
                        align: 'middle'
                    },
                    items: [{
                        xtype: 'container',
                        layout: 'hbox',
                        padding: '10px',
                        width: "100%",
                        items: [{
                            xtype: 'label',
                            flex: '4'
                        },{
                            xtype: 'button',
                            text: 'Okay',
                            ui: 'aqua',
                            id: 'encounterOkay',
                            flex: '3'
                        },{
                            xtype: 'label',
                            flex: '1'
                        },{
                            xtype: 'button',
                            text: 'Cancel',
                            ui: 'aqua',
                            id: 'encounterCancel',
                            flex: '3'
                        },{
                            xtype: 'label',
                            flex: '4'
                        }]
                    }]
                }]
            }]
        }]
    }
})