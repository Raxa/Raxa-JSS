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
Ext.define('chw.view.visitDetails', {
    extend: 'Ext.Panel',
    requires: 'chw.view.userToolbar',
    alias: 'widget.visitDetails',
    id: 'visitDetailsPanel',
    config: {
        height: '100%',
        ui: 'neutral',
        scrollable: true,
        items: [{
            xtype: 'titlebar',
            title: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.visitDetails'),
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.back'),
                action:'goback'
            }]
        }, {
            xclass: 'chw.view.userToolbar'
        }, {
            xtype: 'label',
            itemId: 'illnessImageLabel',
            html: '<center><img src="resources/diarrhea.png" width="100px"/></center>',
            height: '20%',
            width: '100%',
            padding: '10px'
        }, {
            xtype: 'container',
            padding: '10px 20px 0px 20px',
            items: [{
                xtype: 'fieldset',
                defaults: {
                    labelWidth: '35%',
                    disabled: true
                },
                items: [{
                    xtype: 'textfield',
                    disabled: true,
                    label: 'Visit Type',
                    placeHolder: 'Diarrhea check up',
                    labelAlign: 'top'
                }]
            }]
        }, {
            xtype: 'container',
            itemId: 'visitChecklist',
            padding: '10px',
            height: '80%',
            width: '100%',
            items: []
        }]
    }
})