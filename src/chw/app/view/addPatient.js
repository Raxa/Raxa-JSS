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
Ext.define('chw.view.addPatient', {
    extend: 'Ext.form.Panel',
    alias: 'widget.AddPatient',
    requires: 'chw.view.userToolbar',
    config: {
        height: '100%',
        ui: 'neutral',
        items: [{
            xtype: 'titlebar',
            title: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.newPatient'),
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.back'),
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
                    xtype:'textfield',
                    hidden:true,
                    required:true,
                    itemId: 'familyId',
                    disabled: true
                },{
                    xtype: 'textfield',
                    label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.family'),
                    disabled: true,
                    required: true,
                    itemId: 'familyField',
                    // TODO: how do you randomly generate this?
                    options: [{
                        text: '',
                        value: 'empty'
                    }]
                }, {
                    xtype: 'textfield',
                    label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.name'),
                    itemId: 'firstName',
                    placeHolder: 'Vikram',
                    required: true,
                    clearIcon: true
                }, {
                    xtype: 'textfield',
                    label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.surname'),
                    itemId: 'lastName',
                    placeHolder: 'Rathore',
                    required: true,
                    clearIcon: true
                }, {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        padding: 0
                    },
                    items: [{
                        xtype: 'radiofield',
                        name: 'radiogroup',
                        value: 'Female',
                        label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.female'),
                        labelWidth: '70%',
                        flex: 1
                    }, {
                        xtype: 'radiofield',
                        name: 'radiogroup',
                        value: 'Male',
                        label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.male'),
                        labelWidth: '70%',
                        flex: 1
                    }]
                }, {
                    // Also include option for current age?
                    xtype: 'datepickerfield',
                    destroyPickerOnHide: true,
                    name: 'bday',
                    itemId: 'bday',
                    label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.bday'),
                    required: true,
                    value: new Date(),
                    picker: {
                        yearFrom: 1900
                    }
                }, {
                    xtype: 'textfield',
                    label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.age'),
                    itemId: 'patientAge',
                    placeHolder: '32',
                    required: true,
                    clearIcon: true
                }, {
                    xtype: 'textfield',
                    label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.selectImage'),
                    itemId: 'imageField',
                    placeHolder: 'blank_avatar.png',
                    required: true,
                    clearIcon: true
                }]
            }, {
                xclass: 'chw.view.okCancel'
            }]
        }]
    },
    saveForm: function () {
        return this.getValues();
    }
})