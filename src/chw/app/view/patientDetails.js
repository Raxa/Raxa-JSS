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
            title: 'Patient Details',
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'back',
                action: 'goback',
                text: 'Back'
            }]
        }, {
            xclass: 'chw.view.userToolbar'
        }, {
            title: 'Basic',
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
                    title: 'Basic details',
                    defaults: {
                        labelWidth: '35%',
                        disabled: true
                    },
                    items: [{
                        xtype: 'textfield',
                        label: 'First',
                        placeHolder: 'First',
                        itemId: 'firstNameLabel'
                    }, {
                        xtype: 'textfield',
                        label: 'Last',
                        placeHolder: 'Last',
                        itemId: 'familyNameLabel'
                    }, {
                        xtype: 'textfield',
                        label: 'Gender',
                        placeHolder: 'Gender',
                        itemId: 'patientGenderLabel'
                    }, {
                        xtype: 'textfield',
                        label: 'Age',
                        placeHolder: 'Age',
                        itemId: 'patientAgeLabel'
                    }]
                }]
            }]
        }, {
            title: 'History',
            cls: 'demo-list',
            items: [{
                title: 'Family Members',
                xtype: 'list',
                ui: 'round',
                pinHeaders: false,
                id: 'familyMemberslist',
                width: '100%',
                height: '100%',
                centered: true,
                indexBar: true,
                itemTpl: [
                    '<div>{illnessName}</div>'
                ].join('')
//                onItemDisclosure: function (record) {
//                    helper.listDisclose('illness',record)
//                }
            }]
        }]
    }
})