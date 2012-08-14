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
Ext.define('Laboratory.view.SpecimenRegistration3', {
    extend: 'Ext.container.Container',
    alias: 'widget.SpecimenRegistration3',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },
    items: [{
        xtype: 'gridpanel',
        autoScroll: true,
        title: 'Lab order search result',
        columns: [{
            xtype: 'gridcolumn',
            width: 128,
            dataIndex: 'string',
            text: 'Lab Order no.'
        }, {
            xtype: 'gridcolumn',
            text: 'Investigation'
        }, {
            xtype: 'datecolumn',
            text: 'Lab Order Creation Table'
        }, {
            xtype: 'gridcolumn',
            width: 146,
            text: 'Provider\'s First'
        }, {
            xtype: 'gridcolumn',
            text: 'Provider\'s Last'
        }, {
            xtype: 'gridcolumn',
            text: 'Patient \'s First'
        }, {
            xtype: 'gridcolumn',
            text: 'Patient Last'
        }],
        viewConfig: {

        }
    }, {
        xtype: 'button',
        text: 'Cancel',
        x: 190,
        y: 270,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.SPECIMEN_REGISTRATION_HOME.value);
        }

    }, {
        xtype: 'button',
        text: 'Continue',
        x: 350,
        y: 270,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.SPECIMEN_REGISTRATION_PATIENT_DETAILS.value);
        }




    }]

});
