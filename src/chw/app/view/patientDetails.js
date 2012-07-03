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
Ext.define('mUserStories.view.patientDetails', {
    extend: 'Ext.tab.Panel',
    config: {
        height: '100%',
        ui: 'neutral',
        items: [{
            xtype: 'titlebar',
            docked: 'top',
            id: 'title_det',
            title: 'Mobile User Stories',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: 'Back',
                id: 'back_det'
            }]
        }, {
            xclass: 'mUserStories.view.userToolbar'
        }, {
            xtype: 'formpanel',
            title: 'Visit',
            items: [{
                xtype: 'fieldset',
                title: 'Visit Details',
                defaults: {
                    labelWidth: '35%',
                    labelAlign: 'top'
                },
                items: [{
                    xtype: 'textfield',
                    disabled: true,
                    label: 'Symptom Description',
                    id: 'info_vis',
                    placeHolder: 'Has had diarrhea for more than 2 days'
                }]
            }, { // maybe this should be a list not checklist?
                // how much detail is necessary?
                xtype: 'fieldset',
                title: 'Suggested Tasks',
                defaults: {
                    labelWidth: '80%'
                },
                items: [{
                    xtype: 'checkboxfield',
                    name: 'task1',
                    label: 'Oral Rehydration Salts'
                }, {
                    xtype: 'checkboxfield',
                    name: 'task2',
                    label: 'Rapid Diagnostic Test malaria'
                }, {
                    xtype: 'checkboxfield',
                    name: 'task3',
                    label: 'Check Vitamin A'
                }, {
                    xtype: 'checkboxfield',
                    name: 'task4',
                    label: 'Check albendazole'
                }, {
                    xtype: 'checkboxfield',
                    name: 'task5',
                    label: 'Blood sample for CBC'
                }]
            }]
        }, {
            xtype: 'formpanel',
            title: 'Records',
            items: [{
                xtype: 'fieldset',
                title: 'Immunization Records',
                defaults: {
                    labelWidth: '80%'
                },
                items: [{
                    xtype: 'checkboxfield',
                    name: 'im1',
                    label: 'Typhoid',
                    checked: true
                }, {
                    xtype: 'checkboxfield',
                    name: 'im2',
                    label: 'Hep A',
                    checked: true
                }, {
                    xtype: 'checkboxfield',
                    name: 'im3',
                    label: 'Polio'
                }]
            }, {
                xtype: 'fieldset',
                title: 'Other Records',
                defaults: {
                    labelWidth: '80%'
                },
                items: [{
                    xtype: 'checkboxfield',
                    name: 'other1',
                    label: 'Vitamin A'
                }, {
                    xtype: 'checkboxfield',
                    name: 'other2',
                    label: 'Albendazole'
                }]
            }]
        }, {
            xtype: 'formpanel',
            title: 'Results',
            items: [{
                xtype: 'fieldset',
                title: 'Laboratory Results',
                defaults: {
                    labelWidth: '35%',
                    disabled: true,
                    labelAlign: 'top'
                },
                items: [{
                    xtype: 'textfield',
                    label: 'Some results',
                    id: 'info_res'
                }]
            }]
        }, {
            xtype: 'formpanel',
            title: 'Info',
            items: [{
                xtype: 'fieldset',
                title: 'Basic Information',
                defaults: {
                    labelWidth: '35%',
                    disabled: true
                },
                items: [{
                    xtype: 'textfield',
                    label: 'First',
                    id: 'first_det'
                }, {
                    xtype: 'textfield',
                    label: 'Last',
                    id: 'last_det'
                }, {
                    xtype: 'textfield',
                    label: 'Address',
                    id: 'address_det'
                }, {
                    xtype: 'textfield',
                    label: 'Gender',
                    id: 'gender_det'
                }, {
                    xtype: 'textfield',
                    label: 'Birthday',
                    id: 'bday_det'
                }]
            }]
        }]
    }
})