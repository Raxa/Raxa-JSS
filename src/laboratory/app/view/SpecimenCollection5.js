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
 *  This view shows search result on provider
 */
Ext.define('Laboratory.view.SpecimenCollection5', {
    extend: 'Ext.container.Container',
    alias: 'widget.SpecimenCollection5',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },

    items: [{
        xtype: 'gridpanel',
        height: 250,
        width: 550,
        autoScroll: true,
        title: 'Lab order search result',
        columns: [{
            xtype: 'gridcolumn',
            width: 130,
            dataIndex: 'string',
            text: 'First Name'
        }, {
            xtype: 'gridcolumn',
            text: 'Last Name'
        }, {
            xtype: 'gridcolumn',
            text: 'Sex'
        }, {
            xtype: 'datecolumn',
            text: 'DOB'
        }, {
            xtype: 'gridcolumn',
            text: 'Husband\'s / Father\'s Name'
        }, {
            xtype: 'gridcolumn',
            text: 'Village'
        }, {
            xtype: 'gridcolumn',
            text: 'Panchayat'
        }, {
            xtype: 'gridcolumn',
            text: 'Town'
        }]
    },
    {
        xtype: 'button',
        height: 20,
        text: 'Find Provider',
        x: 80,
        y: 300
    }]

});
