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
    extend: 'Ext.Panel',
    requires: 'chw.view.userToolbar',
    config: {
        height: '100%',
        ui: 'neutral',
        items: [{
            xtype: 'titlebar',
            title: 'Add Patient',
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: 'Back',
                listeners: {
                    tap: function () {
                        helper.doBack()
                    }
                }
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
                    xtype: 'textfield',
                    label: 'First',
                    placeHolder: 'Vikram',
                    required: true,
                    clearIcon: true
                }, {
                    xtype: 'textfield',
                    label: 'First',
                    placeHolder: 'Vikram',
                    required: true,
                    clearIcon: true
                }, {
                    xtype: 'textfield',
                    label: 'Last',
                    placeHolder: 'Rathore',
                    required: true,
                    clearIcon: true
                }, {
                    xtype: 'textfield',
                    label: 'First',
                    placeHolder: 'Vikram',
                    required: true,
                    clearIcon: true
                }, {
                    xtype: 'textfield',
                    label: 'First',
                    placeHolder: 'Vikram',
                    required: true,
                    clearIcon: true
                }]
            }, {
                xtype: 'button',
                text: 'Select picture'
            }, {
                xclass: 'chw.view.okCancel'
            }]
        }]
    }
})