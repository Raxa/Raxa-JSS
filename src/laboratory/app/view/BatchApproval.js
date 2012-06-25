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
 *  This view is used for Batch Approval of the tests conducted in laboratory
 */
Ext.define('Laboratory.view.BatchApproval', {
    extend: 'Ext.container.Container',
    alias: 'widget.BatchApproval',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },

    items: [{
        xtype: 'gridpanel',
        height: 380,
        width: 180,
        title: 'Tests',
        columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'string',

        }],
        viewConfig: {

        }
    }, {
        xtype: 'displayfield',
        value: 'The list below shows "    " for last " "  days',
        fieldLabel: '',
        x: 200,
        y: 10
    }, {
        xtype: 'container'
    }, {
        xtype: 'combobox',
        width: 140,
        fieldLabel: 'List Last',
        labelWidth: 60,
        x: 200,
        y: 40
    }, {
        xtype: 'combobox',
        width: 60,
        fieldLabel: '',
        x: 350,
        y: 40
    }, {
        xtype: 'combobox',
        width: 170,
        fieldLabel: 'Items/Page',
        labelWidth: 70,
        x: 430,
        y: 40
    }, {
        xtype: 'container',
        height: 260,
        width: 590,
        layout: {
            type: 'absolute'
        },
        x: 190,
        y: 80,
        items: [{
            xtype: 'combobox',
            width: 86,
            fieldLabel: ''
        }, {
            xtype: 'button',
            text: 'Execute',
            x: 100,
            y: 0
        }, {
            xtype: 'gridpanel',
            height: 150,
            width: 600,
            title: '',
            x: 0,
            y: 30,
            columns: [{
                xtype: 'gridcolumn',
                dataIndex: 'string',
                text: 'SpecimentId'
            }, {
                xtype: 'actioncolumn',
                width: 47,
                altText: '',
                items: [{

                }]
            }, {
                xtype: 'datecolumn',
                width: 86,
                text: 'Date-Time'
            }, {
                xtype: 'gridcolumn',
                width: 50,
                text: 'Value'
            }, {
                xtype: 'gridcolumn',
                width: 75,
                text: 'Range'
            }, {
                xtype: 'gridcolumn',
                width: 83,
                text: 'Flag'
            }, {
                xtype: 'gridcolumn',
                text: 'Status'
            }],

        }]
    }, {
        xtype: 'button',
        text: 'Save',
        x: 590,
        y: 340
    }, {
        xtype: 'button',
        text: 'Reset',
        x: 520,
        y: 340
    }]

});
