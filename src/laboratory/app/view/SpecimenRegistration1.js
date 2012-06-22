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
 *  This view shows list of lab orders for a patient 
 */
Ext.define('Laboratory.view.SpecimenRegistration1', {
    extend: 'Ext.container.Container',
    alias: 'widget.SpecimenRegistration1',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },
    items: [{
        xtype: 'gridpanel',
        height: 400,
        width: 210,
        autoScroll: true,
        title: 'Lab Orders waiting results',
        columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'string',
            text: ''
        }],
        viewConfig: {

        },
        features: [{
            ftype: 'grouping'
        }]
    }, {
        xtype: 'displayfield',
        fieldLabel: 'Lab Order No.',
        x: 230,
        y: -1
    }, {
        xtype: 'displayfield',
        fieldLabel: 'Patient',
        labelAlign: 'top',
        x: 240,
        y: 40
    }, {
        xtype: 'displayfield',
        fieldLabel: 'Provider',
        labelAlign: 'top',
        x: 440,
        y: 40
    }, {
        xtype: 'displayfield',
        width: 70,
        fieldLabel: 'Name',
        x: 240,
        y: 70
    }, {
        xtype: 'displayfield',
        fieldLabel: 'Name',
        x: 440,
        y: 70
    }, {
        xtype: 'displayfield',
        fieldLabel: 'DOB',
        x: 240,
        y: 100
    }, {
        xtype: 'displayfield',
        fieldLabel: 'Location',
        x: 440,
        y: 100
    }, {
        xtype: 'displayfield',
        fieldLabel: 'Patient ID',
        x: 240,
        y: 130
    }, {
        xtype: 'panel',
        height: 150,
        width: 450,
        autoScroll: true,
        title: '',
        x: 230,
        y: 170,
        items: [{
            xtype: 'gridpanel',
            autoScroll: true,
            title: 'Lab order',
            columnLines: true,
            columns: [{
                xtype: 'gridcolumn',
                dataIndex: 'string',
                text: 'Specimen Type'
            }, {
                xtype: 'gridcolumn',
                text: 'Specimen Role'
            }, {
                xtype: 'gridcolumn',
                text: 'Client specimen Id'
            }, {
                xtype: 'datecolumn',
                text: 'Lab Speciment Id'
            }, {
                xtype: 'gridcolumn',
                text: 'Reject Reason'
            }],
            viewConfig: {

            }
        }]
    }, {
        xtype: 'button',
        text: 'Reset',
        x: 500,
        y: 360
    }, {
        xtype: 'button',
        text: 'Save',
        x: 570,
        y: 360
    }, {
        xtype: 'button',
        text: 'Print',
        x: 430,
        y: 360
    }, {
        xtype: 'button',
        text: 'Create',
        x: 240,
        y: 360
    }]

});
