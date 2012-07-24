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
Ext.define('chw.view.loginScreen', {
    extend: 'Ext.Panel',
    requires: ['chw.view.okCancel'],
    alias: 'widget.LoginScreen',
    config: {
        items: [{
            xtype: 'titlebar',
            title: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.chw'),
            // title: 'सामुदायिक स्वास्थ्य कार्यकर्ता',
            docked: 'top'
        }, {
            xtype: 'container',
            centered: true,
            width: '100%',
            padding: '30px',
            items: [{
                xtype: 'container',
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'middle'
                },
                padding: '30px',
                items: [{
                    xtype: 'label',
                    html: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.label')
                    // html: 'कृपया लॉगिन'
                    
                }]
            }, {
                xtype: 'fieldset',
                items: [{
                    xtype: 'textfield',
//                    label: 'Username',
                    label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.username'),
                    itemId: 'usernameIID'
                }, {
                    xtype: 'passwordfield',
                    label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.password'),
                    // label: 'पासवर्ड',
                    itemId: 'passwordIID'
                }]
            }, {
                xclass: 'chw.view.okCancel'
            }]
        }]
    }
});