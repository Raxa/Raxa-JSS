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
 *  This view is tree list view of Location 
 */
Ext.define('Laboratory.view.SpecimenCollection6', {
    extend: 'Ext.container.Container',
    alias: 'widget.SpecimenCollection6',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },

    items: [{
        xtype: 'treepanel',
        height: 370,
        width: 180,
        title: 'Location Tree',
        columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'string',
            text: 'List'
        }],
        viewConfig: {

        }
    }, {
        xtype: 'container'
    }, {
        xtype: 'displayfield',
        value: 'Patient',
        fieldLabel: '',
        x: 210,
        y: 60
    }, {
        xtype: 'displayfield',
        value: 'Patient',
        fieldLabel: '',
        x: 210,
        y: 60
    }, {
        xtype: 'displayfield',
        name: '',
        value: 'PatientID',
        fieldLabel: 'Name',
        x: 410,
        y: 60
    }, {
        xtype: 'displayfield',
        name: '',
        value: 'ProviderID',
        fieldLabel: 'Name',
        x: 410,
        y: 90
    }, {
        xtype: 'displayfield',
        value: 'Provider',
        fieldLabel: '',
        x: 210,
        y: 90
    }, {
        xtype: 'displayfield',
        value: 'Location',
        fieldLabel: '',
        x: 210,
        y: 120
    }, {
        xtype: 'button',
        height: 20,
        text: 'Find Patient',
        x: 280,
        y: 60,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.SPECIMEN_COLLECTION_SEARCH_LAB_ORDER.value);
        }
    }, {
        xtype: 'button',
        height: 20,
        text: 'Find Location',
        x: 280,
        y: 120,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.SPECIMEN_COLLECTION_FILTER_LOCATION.value);
        }
    }, {
        xtype: 'button',
        height: 20,
        text: 'Find Provider',
        x: 280,
        y: 90,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.SPECIMEN_COLLECTION_SEARCH_PROVIDER.value);
        }
    }]

});
