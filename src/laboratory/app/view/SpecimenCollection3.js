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
 *  This view shows result of search on lab order
 */
Ext.define('Laboratory.view.SpecimenCollection3', {
    extend: 'Ext.container.Container',
    alias: 'widget.SpecimenCollection3',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },

    items: [{
        xtype: 'gridcolumn',
        width: 128,
        dataIndex: 'string',
        text: 'Lab Order Number'
    }, {
        xtype: 'gridcolumn',
        text: 'Investigation'
    }, {
        xtype: 'datecolumn',
        text: 'MyDateColumn1'
    }, {
        xtype: 'gridcolumn',
        text: 'Provider First'
    }, {
        xtype: 'gridcolumn',
        text: 'Provider Last'
    }, {
        xtype: 'gridcolumn',
        text: 'Patient First'
    }, {
        xtype: 'gridcolumn',
        text: 'Provider Last'
    }]

});
