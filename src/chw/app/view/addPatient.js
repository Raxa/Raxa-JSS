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
Ext.define('mUserStories.view.addPatient', {
    extend: 'Ext.Panel',
    config: {
        height: '100%',
        ui: 'neutral',
        scrollable: true,
        items: [{
            xtype: 'titlebar',
            docked: 'top',
            title: 'Add Person',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: 'Back',
                id: 'back_add_reg'
            }]
        }, {
            xclass: 'mUserStories.view.userToolbar'
        }, {
            xtype: 'container',
            padding: '10px',
            items: [{
                xtype: 'fieldset',
                defaults: {
                    labelWidth: '35%'
                },
                items: [{
                    xtype: 'textfield',
                    label: 'First',
                    name: 'first_reg',
                    id: 'first_reg',
                    placeHolder: 'Harry',
                    required: true,
                    clearIcon: true
                }, {
                    xtype: 'textfield',
                    label: 'Last',
                    name: 'last_reg',
                    id: 'last_reg',
                    placeHolder: 'Potter',
                    required: true,
                    clearIcon: true
                }, {
                    xtype: 'textfield',
                    label: 'Phone',
                    name: 'phone_reg',
                    id: 'phone_reg',
                    placeHolder: '1234567890',
                    required: true,
                    clearIcon: true
                }, {
                    xtype: 'textfield',
                    label: 'Village',
                    name: 'village_reg',
                    id: 'village_reg',
                    placeHolder: 'Village',
                    required: true,
                    clearIcon: true
                }, {
                    xtype: 'container',
                    id: 'gender_cont',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        padding: 0
                    },
                    items: [{
                        xtype: 'radiofield',
                        name: 'radiogroup',
                        value: 'Female',
                        label: 'Female',
                        labelWidth: '70%',
                        flex: 1
                    }, {
                        xtype: 'radiofield',
                        name: 'radiogroup',
                        value: 'Male',
                        label: 'Male',
                        labelWidth: '70%',
                        flex: 1
                    }]
                }, {
                    xtype: 'datepickerfield',
                    destroyPickerOnHide: true,
                    name: 'bday',
                    id: 'bday',
                    label: 'Birthday',
                    required: true,
                    value: new Date(),
                    picker: {
                        yearFrom: 1900
                    }
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    padding: '10px',
                    width: "100%",
                    items: [{
                        xtype: 'label',
                        flex: '2'
                    }, {
                        xtype: 'button',
                        iconMask: true,
                        iconCls: 'check2',
                        id: 'ok_reg',
                        ui: 'confirm'
                    }, {
                        xtype: 'label',
                        flex: '2'
                    }, {
                        xtype: 'button',
                        iconMask: true,
                        iconCls: 'delete1',
                        id: 'cancel_reg',
                        ui: 'decline'
                    }, {
                        xtype: 'label',
                        flex: '2'
                    }]
                }]
            }]
        }]
    }
})