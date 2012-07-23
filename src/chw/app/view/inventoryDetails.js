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
Ext.define('chw.view.inventoryDetails', {
    extend: 'Ext.Panel',
    requires: 'chw.view.userToolbar',
    alias: 'widget.inventoryDetails',
    id: 'inventoryDetails',
    config: {
        hidden: false,
        height: '100%',
        ui: 'neutral',
        scrollable: true,
        items: [{
            xtype: 'titlebar',
            itemId: 'pillTitleLabel',
            title: 'Inventory Details',
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
            xtype: 'label',
            itemId: 'pillImageLabel',
            html: '<center><img src="resources/circle.png"/></center>',
            height: '20%',
            width: '100%',
            padding: '10px'
        }, {
            xtype: 'container',
            padding: '10px',
            items: [{
                xtype: 'fieldset',
                title: 'About the drug',
                defaults: {
                    disabled: true
                },
                items: [{
                    xtype: 'textfield',
                    label: 'Description',
                    placeHolder: 'Description',
                    itemId: 'pillDescripLabel',
                    labelAlign: 'top'
                }, {
                    xtype: 'textfield',
                    label: 'Administration Notes',
                    placeHolder: 'Administration Notes',
                    itemId: 'pillNotesLabel',
                    labelAlign: 'top'
                }, {
                    xtype: 'textfield',
                    label: 'Amount left',
                    placeHolder: 'Amount left',
                    itemId: 'pillAmountLabel',
                    labelWidth: '35%'
                }, {
                    xtype: 'textfield',
                    label: 'Frequency',
                    placeHolder: 'Frequency',
                    itemId: 'pillFrequencyLabel',
                    labelWidth: '35%'
                }]
            }]
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
                iconCls: 'add',
                action: 'inventoryAdd',
                ui: 'confirm'
            }, {
                xtype: 'label',
                flex: '2'
            }, {
                xtype: 'button',
                iconMask: true,
                iconCls: 'delete1',
                action: 'inventoryReduce',
                ui: 'decline'
            }, {
                xtype: 'label',
                flex: '2'
            }]
        }]
    }
})