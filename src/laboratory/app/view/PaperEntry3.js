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
 *  This view shows search result on Lab Order
 */
Ext.define('Laboratory.view.PaperEntry3', {
    extend: 'Ext.container.Container',
    alias: 'widget.PaperEntry3',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },

    items: [{
        xtype: 'gridpanel',
        autoScroll: true,
        title: 'Search Result Grid Panel',
        columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'string',
            text: 'Lab Order Number'
        }, {
            xtype: 'datecolumn',
            dataIndex: 'date',
            text: 'Date'
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'string',
            text: 'Provider'
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'string',
            text: 'Patient Name'
        }],
        viewConfig: {

        }
    }, {
        xtype: 'button',
        height: 20,
        width: 50,
        text: 'Add Entry',
        x: 10,
        y: 420,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.PAPER_ENTRY_ENTER_DATA.value);
        }
    }, ]

});
