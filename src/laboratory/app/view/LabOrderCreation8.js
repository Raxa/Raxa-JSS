/**
 * Copyright 2012, Raxa
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 * 
 *  This view is second page of adding new provider.
 */
Ext.define('Laboratory.view.LabOrderCreation8', {
    extend: 'Ext.container.Container',
    alias: 'widget.LabOrderCreation8',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },

    items: [{
        xtype: 'fieldcontainer',
        fieldLabel: 'Provider Type',
        layout: 'hbox',
        defaultType: 'textfield',
        labelAlign: 'right',
        labelPad: 20,
        labelWidth: 250,
        anchor: '95%',
        defaults: {
            hideLabel: 'true'
        },
        items: [{
            xtype: 'combo',
            name: 'provider_type',
            label: 'Provider Type',
            layout: 'hbox',
            store: new Ext.data.SimpleStore({
                fields: ['provider_type'],
                data: [
                    ['Surgeon'],
                    ['CHW'],
                    ['Nurse']
                ]
            }),
            displayField: 'provider_type'
        }]

    }, {
        xtype: 'button',
        margin: '10 50 0 270',
        width: 60,
        text: 'Cancel',
        x: 80,
        y: 50,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.HOME.value);
        }

    }, {
        xtype: 'button',
        margin: '10 0 0 0',
        width: 60,
        x: 100,
        y: 50,
        text: 'Save',
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.LAB_ORDER_ADD_PROVIDER_3.value);
        }
    }]
});
