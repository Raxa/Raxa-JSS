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
Ext.define('chw.view.addIllness', {
    extend: 'Ext.Panel',
    alias: 'widget.addIllness',
    requires: 'chw.view.userToolbar',
    config: {
        height: '100%',
        ui: 'neutral',
        scrollable: true,
        items: [{
            xtype: 'titlebar',
            title: 'Add Illness',
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: 'Back',
                action: 'goback'
            }]
        }, {
            xclass: 'chw.view.userToolbar'
        }, {
            xtype: 'container',
            padding: '10px',
            items: [{
                xtype: 'fieldset',
                defaults: {
                    labelWidth: '35%'
                },
                items: [{
                    xtype: 'selectfield',
                    label: 'Type',
                    required: true,
                    itemId: 'illnessNameField',
                    store: 'illnesses',
                    displayField: 'illnessName'
                }, {
                    xtype: 'datepickerfield',
                    destroyPickerOnHide: true,
                    itemId: 'illnessStartDate',
                    label: 'Start',
                    required: true,
                    value: new Date(),
                    picker: {
                        yearFrom: 1900
                    }
                }, {
                    xtype: 'datepickerfield',
                    destroyPickerOnHide: true,
                    itemId: 'illnessEndDate',
                    label: 'End',
                    value: new Date(),
                    picker: {
                        yearFrom: 1900
                    }
                }, {
                    xtype: 'textareafield',
                    itemId: 'illnessTreatmentField',
                    label: 'Treatment',
                    labelAlign: 'top'
                }, {
                    xtype: 'textareafield',
                    itemId: 'illnessNotesField',
                    label: 'Notes',
                    labelAlign: 'top'
                }]
            }, {
                xclass: 'chw.view.okCancel'
            }]
        }]
    }
})