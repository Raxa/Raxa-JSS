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
 *  This view is first page of Paper Entry which lists all the pending Lab Orders 
 */
Ext.define('Laboratory.view.PaperEntry1', {
    extend: 'Ext.container.Container',
    alias: 'widget.PaperEntry1',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute',
    },

    items: [{
        xtype: 'gridpanel',
        id: 'labOrderListPaperEntry',
        title: 'List of Lab Orders',
        maxWidth: 200,
        height: 400,
        store: Ext.create('Laboratory.store.LabOrderSearch'),
        columns: [{
            xtype: 'gridcolumn',
            text: 'Order List',
            dataIndex: 'orderlist',
            width: 200,
        }]
    }, {
        xtype: 'button',
        margin: '10 50 0 270',
        width: 60,
        text: 'Search',
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.PAPER_ENTRY_SEARCH.value);
        }
    }]

});
