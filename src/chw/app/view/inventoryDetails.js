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
    config: {
        height: '100%',
        ui: 'neutral',
        items: [{
            xtype: 'titlebar',
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
            itemId: 'pillTitleLabel',
            xtype: 'container',
            height: '100%',
            width: '100%',
            scrollable: true,
            layout: 'vbox',
            items: [{
                xtype: 'label',
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
                        labelAlign: 'top',
                        disabled: true
                    },
                    items: [{
                        xtype: 'textfield',
                        label: 'Description',
                        placeHolder: 'Description',
                        itemId: 'pillDescripLabel'
                    }, {
                        xtype: 'textfield',
                        label: 'Amount left',
                        placeHolder: 'Amount left',
                        itemId: 'pillAmountLabel'
                    }, {
                        xtype: 'textfield',
                        label: 'Frequency',
                        placeHolder: 'Frequency',
                        itemId: 'pillFrequencyLabel'
                    }, {
                        xtype: 'textfield',
                        label: 'Administration Notes',
                        placeHolder: 'Administration Notes',
                        itemId: 'pillNotesLabel'
                    }]
                }]
            }]
        }]
    }
})