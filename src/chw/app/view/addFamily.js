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
Ext.define('chw.view.addFamily', {
    extend: 'Ext.Panel',
    requires: 'chw.view.userToolbar',
    alias: 'widget.addFamily',
    config: {
        height: '100%',
        ui: 'neutral',
        items: [{
            xtype: 'titlebar',
            title: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.newFamily'),
            docked: 'top',
            items: [{
                xtype: 'button',
                action: 'goback',
                ui: 'back',
                text: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.back')
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
                    id:'familyName',
                    label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.family'),
                    placeHolder: 'Goel',
                    required: true,
                    clearIcon: true
                }, {
                    xtype: 'textfield',
                    id:'address',
                    label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.address'),
                    placeHolder: 'Goel House',
                    required: true,
                    clearIcon: true
                }, {
                    xtype: 'textfield',
                    id:'description',
                    label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.description'),
                    placeHolder: 'Near Temple',
                    clearIcon: true
                }, {
                    xtype: 'textfield',
                    id: 'familyImage',
                    label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.familyImage'),
                    placeHolder: 'family.png',
                    required: true,
                    clearIcon: true
                }]
            }, {
                xtype: 'button',
                text: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.selectImage')
            }, {
                xclass: 'chw.view.okCancel'
            }]
        }]
    }
})