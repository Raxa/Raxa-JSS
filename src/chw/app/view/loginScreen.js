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
                }]
            }, {
                xtype: 'fieldset',
                items: [{
                    xtype: 'textfield',
                    label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.username'),
                    itemId: 'usernameIID'
                }, {
                    xtype: 'passwordfield',
                    label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.password'),
                    itemId: 'passwordIID'
                }]
            }, {
                xclass: 'chw.view.okCancel'
            },{
                xtype:'spacer',
                flex:'1',
                docked:'bottom'
            },{
                xtype: 'container',
                docked:'bottom',
                layout: {
                    type: 'hbox'
                },
                items: [{
                    xtype: 'label',
                    flex: 1
                },{
                    xtype: 'selectfield',
                    label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.language'),
                    action: 'langfield',
                    flex: 0,
                    options: [{
                        text:'',
                        value:'empty'
                    },{
                        text: '\u0939\u093f\u0902\u0926\u0940',
                        value: 'hi-IN'
                    },{
                        text: 'English',
                        value: 'en-US'
                    }]
                },{
                    xtype: 'label',
                    flex: 1
                }]
                
            }]
        }]
    }
});