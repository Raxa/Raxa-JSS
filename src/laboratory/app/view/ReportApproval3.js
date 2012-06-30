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
 *  This view shows result of search on lab order, patient or provider
 */
Ext.define('Laboratory.view.ReportApproval3', {
    extend: 'Ext.container.Container',
    alias: 'widget.ReportApproval3',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },

    items: [{
        xtype: 'button',
        text: 'Continue',
        x: 350,
        y: 210,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.REPORT_APPROVAL_LAB_ORDER_SEARCH_RESULT.value);
        }
    }, {
        xtype: 'button',
        text: 'Back',
        x: 190,
        y: 210,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.REPORT_APPROVAL_PAGE.value);
        }
    }, {
        xtype: 'gridpanel',
        title: 'Search Result',
        columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'string',
            text: 'SpecimenId'
        }, {
            xtype: 'gridcolumn',
            text: 'Status'
        }, {
            xtype: 'datecolumn',
            text: 'Date'
        }, {
            xtype: 'gridcolumn',
            text: 'Provider Name'
        }, {
            xtype: 'gridcolumn',
            text: 'Patient Id'
        }, {
            xtype: 'gridcolumn',
            text: 'Patient Id'
        }],
        viewConfig: {

        }
    }]

});
