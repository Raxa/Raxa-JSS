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
 *  This view shows details of Lab order and allow user to set type of Report Delivery
 */
Ext.define('Laboratory.view.ReportDelivery4', {
    extend: 'Ext.container.Container',
    alias: 'widget.ReportDelivery4',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },

    items: [{
        xtype: 'gridpanel',
        height: 400,
        width: 210,
        autoScroll: true,
        title: 'Lab Orders waiting results',
        columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'string',
            text: ''
        }],
        features: [{
            ftype: 'grouping'
        }]
    }, {
        xtype: 'displayfield',
        fieldLabel: 'Lab Order No.',
        x: 230,
        y: -1
    }, {
        xtype: 'displayfield',
        fieldLabel: 'Patient',
        labelAlign: 'top',
        x: 240,
        y: 40
    }, {
        xtype: 'displayfield',
        fieldLabel: 'Provider',
        labelAlign: 'top',
        x: 440,
        y: 40
    }, {
        xtype: 'displayfield',
        width: 70,
        fieldLabel: 'Name',
        x: 240,
        y: 70
    }, {
        xtype: 'displayfield',
        fieldLabel: 'Name',
        x: 440,
        y: 70
    }, {
        xtype: 'displayfield',
        fieldLabel: 'DOB',
        x: 240,
        y: 100
    }, {
        xtype: 'displayfield',
        fieldLabel: 'Location',
        x: 440,
        y: 100
    }, {
        xtype: 'displayfield',
        fieldLabel: 'Patient ID',
        x: 240,
        y: 130
    }, {
        xtype: 'datefield',
        width: 110,
        fieldLabel: 'Set Delivery  Date',
        labelAlign: 'top',
        x: 230,
        y: 190
    }, {
        xtype: 'timefield',
        width: 90,
        fieldLabel: 'Time',
        labelAlign: 'top',
        x: 350,
        y: 190
    }, {
        xtype: 'combobox',
        width: 250,
        fieldLabel: 'Types of Delivery',
        labelWidth: 120,
        name: 'types_of_delivery',
        x: 450,
        y: 210,
        store: new Ext.data.SimpleStore({
            fields: ['types_of_delivery'],
            data: [
                ['HLZ7 Electronic Delivery'],
                ['Report given to Patient'],
                ['Report given to Hospital'],
                ['Report given to Hospital Staff'],
                ['Given to Courier'],
                ['Phone/Fax Delivery'],
                ['Other']
            ]
        }),
        displayField: 'types_of_delivery'
    }, {
        xtype: 'button',
        height: 20,
        width: 70,
        text: 'Save',
        x: 600,
        y: 300
    }, {
        xtype: 'button',
        width: 70,
        text: 'Print',
        x: 600,
        y: 140,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.REPORT_DELIVERY_INVESTIGATION_TABLE.value);
        }
    }]
});
