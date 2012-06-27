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
 *  This view shows result of search on Patient in tabular form
 */
Ext.define('Laboratory.view.LabOrderCreation5', {
    extend: 'Ext.container.Container',
    alias: 'widget.LabOrderCreation5',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },

    items: [{
        xtype: 'gridpanel',
        height: 200,
        width: 700,
        title: 'Search Result for " "',
        columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'string',
            text: 'First Name'
        }, {
            xtype: 'gridcolumn',
            text: 'Last Name'
        }, {
            xtype: 'gridcolumn',
            width: 40,
            text: 'Sex'
        }, {
            xtype: 'datecolumn',
            text: 'DOB'
        }, {
            xtype: 'gridcolumn',
            text: 'Patient Id'
        }, {
            xtype: 'gridcolumn',
            text: 'Husband / Father\'s Name'
        }, {
            xtype: 'gridcolumn',
            text: 'Village'
        }, {
            xtype: 'gridcolumn',
            text: 'Panchayat'
        }, {
            xtype: 'gridcolumn',
            text: 'Town'
        }],
        viewConfig: {

        }
    }, {
        xtype: 'button',
        height: 20,
        text: 'Add New Patient',
        x: 0,
        y: 230
    }]

});
