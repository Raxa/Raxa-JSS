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
Ext.define('Laboratory.view.ResultEntry3', {
    extend: 'Ext.container.Container',
    alias: 'widget.ResultEntry3',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },

    items: [{
        xtype: 'gridpanel',
        title: 'Search Result',
        columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'string',
            text: 'SpecimenId'
        }, {
            xtype: 'gridcolumn',
            text: 'Investigation'
        }, {
            xtype: 'datecolumn',
            text: 'Date'
        }, {
            xtype: 'gridcolumn',
            text: 'Provider'
        }, {
            xtype: 'gridcolumn',
            text: 'Patient'
        }],
        viewConfig: {

        }
    }, {
        xtype: 'button',
        text: 'Continue',
        x: 250,
        y: 170,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.RESULT_ENTRY_INVESTIGATION_DETAILS.value);
        }
    }, {
        xtype: 'button',
        text: 'Cancel',
        x: 140,
        y: 170,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.RESULT_ENTRY_SPECIMEN_HOME.value);
        }
    }]

});
