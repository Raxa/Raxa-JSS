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
 *  This view allows to add specimen 
 */
Ext.define('Laboratory.view.SpecimenRegistration12', {
    extend: 'Ext.container.Container',
    alias: 'widget.SpecimenRegistration12',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },
    items: [{
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
                text: 'Client Specimen Id'
            }, {
                xtype: 'datecolumn',
                text: 'Lab Specimen Id'
            }, {
                xtype: 'gridcolumn',
                text: 'Reject Reason'
            }],
            viewConfig: {

            }
        }]
    }, {
        xtype: 'button',
        height: 20,
        text: 'Reset',
        x: 420,
        y: 330
    }, {
        xtype: 'button',
        height: 20,
        text: 'Save',
        x: 560,
        y: 330,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.SPECIMEN_REGISTRATION_REPORT_STATUS.value);
        }

    }, {
        xtype: 'container',
        height: 440,
        width: 220,
        layout: {
            type: 'absolute'
        },
        anchor: 'Add',
        items: [{
            xtype: 'checkboxgroup',
            width: 220,
            fieldLabel: 'Add Investigations',
            labelAlign: 'top',
            x: 10,
            y: 30,
            items: [{
                xtype: 'checkboxfield',
                boxLabel: 'JSS Lab'
            }, {
                xtype: 'checkboxfield',
                boxLabel: 'Other Lab'
            }]
        }, {
            xtype: 'combobox',
            fieldLabel: '',
            emptyText: 'Section',
            x: 10,
            y: 110
        }, {
            xtype: 'textfield',
            fieldLabel: 'Investigation',
            labelAlign: 'top',
            x: 10,
            y: 170
        }]
    }, {
        xtype: 'button',
        text: 'Cancel',
        x: 240,
        y: 330,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.SPECIMEN_REGISTRATION_HOME.value);
        }

    }]

});
