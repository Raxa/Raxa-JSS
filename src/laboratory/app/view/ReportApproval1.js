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
 *  This view is first page of Report Approval 
 */
Ext.define('Laboratory.view.ReportApproval1', {
    extend: 'Ext.container.Container',
    alias: 'widget.ReportApproval1',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },

    items: [{
        xtype: 'gridpanel',
        height: 358,
        width: 193,
        title: 'Investigations Awaiting',
        columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'string',
            text: 'String'
        }],
        viewConfig: {

        }
    }, {
        xtype: 'button',
        text: 'Search',
        x: 460,
        y: 330,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.REPORT_APPROVAL_SEARCH_LAB_ORDER.value);
        }

    }]


});
