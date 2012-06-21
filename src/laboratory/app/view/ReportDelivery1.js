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
Ext.define('Laboratory.view.ReportDelivery1', {
    extend: 'Ext.container.Container',
    alias: 'widget.ReportDelivery1',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },

    items: [{
        xtype: 'gridpanel',
        height: 343,
        width: 275,
        title: 'Lab Orders waiting results',
        columns: [{
            xtype: 'gridcolumn',
            width: 273,
            dataIndex: 'string',
            text: 'Details'
        }],
        viewConfig: {

        }
    }, {
        xtype: 'button',
        margin: '10 50 0 270',
        width: 60,
        text: 'Search',
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.REPORT_DELIVERY_SEARCH.value);
        }
    }]

});
