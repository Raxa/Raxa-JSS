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
Ext.define('Laboratory.view.ResultEntry4', {
    extend: 'Ext.container.Container',
    alias: 'widget.ResultEntry4',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },

    items: [{
        xtype: 'gridpanel',
        height: 373,
        width: 189,
        title: 'Investigation Waiting',
        columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'string',
            text: ''
        }],
        viewConfig: {

        }
    }, {
        xtype: 'gridpanel',
        height: 220,
        width: 450,
        title: '',
        x: 220,
        y: 50,
        columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'string',
            text: 'Investigation'
        }, {
            xtype: 'gridcolumn',
            text: 'Specimen Id'
        }, {
            xtype: 'datecolumn',
            text: 'Date'
        }, {
            xtype: 'gridcolumn',
            text: 'Urgent'
        }],
        viewConfig: {

        }
    }, {
        xtype: 'button',
        text: 'Continue',
        x: 570,
        y: 330,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.RESULT_ENTRY_ADD_ENTRY.value);
        }
    }]

});
