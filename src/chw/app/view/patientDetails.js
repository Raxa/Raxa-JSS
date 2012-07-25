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
Ext.define('chw.view.patientDetails', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.patientDetails',
    requires: 'chw.view.userToolbar',
    config: {
        height: '100%',
        ui: 'neutral',
        items: [{
            xtype: 'titlebar',
            title: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.patientDetails'),
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'back',
                action: 'goback',
                text: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.back')
            }]
        }, {
            xclass: 'chw.view.userToolbar'
        }, {
            title: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.basic'),
            xtype: 'container',
            height: '100%',
            width: '100%',
            scrollable: true,
            layout: 'vbox',
            items: [{
                xtype: 'label',
                html: '<center><img src="resources/user.png"/></center>',
                height: '20%',
                width: '100%',
                padding: '10px'
            }, {
                xtype: 'container',
                padding: '10px',
                items: [{
                    xtype: 'fieldset',
                    title: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.basicDetails'),
                    defaults: {
                        labelWidth: '35%',
                        disabled: true
                    },
                    items: [{
                        xtype: 'textfield',
                        label: 'Patient Id',
                        itemId: 'patientIdLabel'
                            
                    }, {
                        xtype: 'textfield',
                        label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.name'),
                        placeHolder: 'First',
                        itemId: 'firstNameLabel'
                    }, {
                        xtype: 'textfield',
                        label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.surname'),
                        placeHolder: 'Last',
                        itemId: 'familyNameLabel'
                    }, {
                        xtype: 'textfield',
                        label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.gender'),
                        placeHolder: 'Gender',
                        itemId: 'patientGenderLabel'
                    }, {
                        //TODO: Change from Age to Bday
                        xtype: 'textfield',
                        label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.age'),
                        placeHolder: 'Age',
                        itemId: 'patientAgeLabel'
                    }]
                }]
            }]
        }, {
            title: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.history'),
            cls: 'demo-list',
            items: [{
                title: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.members'),
                xtype: 'list',
                ui: 'round',
                pinHeaders: false,
                id: 'patientIllnessList',
                width: '100%',
                height: '80%',
                centered: true,
                /*itemTpl: [
                    '<div>{illnessDetails}</div>'
                ].join('')*/
                itemTpl: [
                    '<div style="float:left;width:32px;height:32px"><img src="{illnessDetails.illnessImage}" height="80%" width="80%"/></div>',
                    '<div style="float:left;width:50%">',
                        '<div class="list-item-title"">{illnessDetails.illnessName}</div>',
                    '</div>',
                    // '<div style="float:left;width:32px;height:32px">',
                    '<div>',
                        '<div class="list-item-title" style="font-size:10px;">',
                        '{illnessStartDate}-<br>{illnessEndDate}</div>',
                    '</div>'
                ].join(''),
                onItemDisclosure: function (record) {
                    helper.listDisclose('patientIllness',record)
                }
            }, {
                xtype: 'container',
                docked: 'bottom',
                padding: '0px 60px 20px 60px',
                items: [{
                    xtype: 'button',
                    text: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.newIllness'),
                    action: 'illnessAdd'
                }]
            }]
        }]
    }
})