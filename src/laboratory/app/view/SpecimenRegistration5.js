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
 *  This view shows result of search on provider
 */
Ext.define('Laboratory.view.SpecimenRegistration5', {
    extend: 'Ext.container.Container',
    alias: 'widget.SpecimenRegistration5',
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
            text: 'First Name'
        }, {
            xtype: 'gridcolumn',
            text: 'Last Name'
        }, {
            xtype: 'gridcolumn',
            text: 'Location'
        }],
        viewConfig: {

        }
    }, {
        xtype: 'button',
        text: 'Add new Provider',
        x: 0,
        y: 150,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.SPECIMEN_REGISTRATION_ADD_PROVIDER_1.value);

        },
    }, {
        xtype: 'button',
        text: 'Continue',
        x: 100,
        y: 150,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.SPECIMEN_REGISTRATION_PATIENT_DETAILS.value);

        },

    }]

});
