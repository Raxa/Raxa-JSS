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
 *  This view is first page of Report Delivery and contains the list of Lab Orders 
 */
Ext.define('Laboratory.view.ResultEntry5', {
    extend: 'Ext.container.Container',
    alias: 'widget.ResultEntry5',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },

    items: [{
        xtype: 'displayfield',
        value: '2012xxxxxxxxx',
        fieldLabel: 'Specimen Id',
        x: 360,
        y: 30
    }, {
        xtype: 'combobox',
        fieldLabel: 'Prepared by',
        labelAlign: 'top',
        x: 360,
        y: 80
    }, {
        xtype: 'combobox',
        fieldLabel: 'Tested by',
        labelAlign: 'top',
        x: 360,
        y: 200
    }, {
        xtype: 'datefield',
        fieldLabel: 'Prepared Date time',
        labelAlign: 'top',
        x: 360,
        y: 140
    }, {
        xtype: 'timefield',
        width: 100,
        fieldLabel: '',
        x: 520,
        y: 160
    }, {
        xtype: 'gridpanel',
        height: 270,
        width: 340,
        title: '',
        x: 340,
        y: 260,
        columns: [{
            xtype: 'gridcolumn',
            width: 79,
            dataIndex: 'string',
            text: 'Test'
        }, {
            xtype: 'gridcolumn',
            width: 79,
            text: 'Result'
        }, {
            xtype: 'gridcolumn',
            text: 'Flag'
        }, {
            xtype: 'actioncolumn',
            items: [{

            }]
        }],
        viewConfig: {

        }
    }, {
        xtype: 'gridpanel',
        height: 271,
        width: 337,
        title: '',
        columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'string',
            text: 'Client Specimen Id'
        }, {
            xtype: 'gridcolumn',
            text: 'Lab Specimen Id'
        }, {
            xtype: 'datecolumn',
            width: 58,
            text: 'Date'
        }, {
            xtype: 'gridcolumn',
            text: 'Urgent'
        }]
    }, {
        xtype: 'button',
        text: 'Done',
        x: 250,
        y: 280,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.RESULT_ENTRY_HOME.value);
        }
    }, {
        xtype: 'button',
        text: 'Cancel',
        x: 430,
        y: 540,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.RESULT_ENTRY_HOME.value);
        }
    }, {
        xtype: 'button',
        text: 'Save',
        x: 570,
        y: 540,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.RESULT_ENTRY_HOME.value);
        }

    }]

});
