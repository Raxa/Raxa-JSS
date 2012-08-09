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
 *  This view contains final view to enter details of a Lab order
 */
Ext.define('Laboratory.view.LabOrderCreation11', {
    extend: 'Ext.container.Container',
    alias: 'widget.LabOrderCreation11',
    autoScroll: true,
    activeItem: 0,
    layout: {
        type: 'absolute'
    },
    items: [{
        xtype: 'checkboxfield',
        fieldLabel: '',
        boxLabel: 'JSS Lab',
        x: 10,
        y: 30
    }, {
        xtype: 'checkboxfield',
        fieldLabel: '',
        boxLabel: 'Other Lab',
        x: 10,
        y: 50
    }, {
        xtype: 'displayfield',
        value: 'Add Investigation',
        fieldLabel: '',
        x: 10,
        y: 10
    }, {
        xtype: 'combobox',
        fieldLabel: 'Section',
        labelWidth: 50,
        width: 200,
        displayField: 'Section',
        store: Ext.create('Laboratory.store.LabPanelSection'),

        columns: [{
            xtype: 'gridcolumn',
            width: 200
        }],
        x: 0,
        y: 80
    }, {
        xtype: 'gridpanel',
        id: 'PanelListLabOrderCreation11',
        width: 170,
        store: Ext.create('Laboratory.store.LabPanelSection'),
        title: '',
        x: 10,
        y: 140,
        columns: [{
            xtype: 'gridcolumn',
            width: 150,
            dataIndex: 'Section',
            text: 'Investigation'
        }],
        viewConfig: {

        },
        listeners: {
            click: {
                element: 'el', //bind to the underlying el property on the panel
                fn: function () {
                    var grid = Ext.getCmp('PanelListLabOrderCreation11');
                    var pos = grid.getSelectionModel().selected.length;
                    selectedLabPanel = grid.getSelectionModel().lastSelected.data.Section;
                    selectedLabPanelUuid = grid.getSelectionModel().lastSelected.data.PanelUuid;

                    Ext.getCmp('LabOrderCreationContainer').add({
                        xtype: 'splitter',

                    }, {
                        xtype: 'gridpanel',
                        autoScroll: true,
                        title: selectedLabPanel,
                        columnLines: true,
                        columns: [{
                            xtype: 'gridcolumn',
                            dataIndex: 'Specimen',
                            text: 'Specimen Type',
                            width: 175,
                        }, {
                            xtype: 'gridcolumn',
                            text: 'Specimen Role'
                        }, {
                            xtype: 'gridcolumn',
                            text: 'Client specimen Id'
                        }, {
                            xtype: 'datecolumn',
                            text: 'Lab Speciment Id'
                        }],
                        viewConfig: {

                        },
                        store: new Ext.data.Store({
                            fields: [{
                                name: 'Specimen',
                                type: 'string',
                            }, {
                                name: 'SpecimenUuid',
                                type: 'string'
                            }, {
                                name: 'LabPanel',
                                type: 'string'
                            }, {
                                name: 'LabPanelUuid',
                                type: 'string'
                            }],
                            autoLoad: true,
                            data: [{
                                Specimen: grid.getSelectionModel().selected.items[0].raw.analysisSpecimenTypeConcept.display,
                                SpecimenUuid: grid.getSelectionModel().selected.items[0].data.PanelUuid,
                                LabPanel: selectedLabPanel,
                                LabPanelUuid: selectedLabPanelUuid,
                            }]
                        }),
                        displayField: 'value',
                        forceSelection: true,
                        closable: true,
                        dockedItems: [{
                            xtype: 'toolbar',
                            dock: 'top',
                            defaults: {
                                minWidth: 50
                            },
                            items: [{
                                xtype: 'component',
                                flex: 1
                            }, {
                                xtype: 'button',
                                text: 'Comment'
                            }, ]
                        }]


                    });

                }
            }
        }
    }, {
        xtype: 'displayfield',
        fieldLabel: 'Lab Order No.',
        x: 230,
    }, {
        xtype: 'displayfield',
        fieldLabel: '<b>Patient</b>',
        labelAlign: 'top',
        x: 240,
        y: 40
    }, {
        xtype: 'displayfield',
        fieldLabel: '<b>Provider</b>',
        labelAlign: 'top',
        x: 440,
        y: 40
    }, {
        xtype: 'displayfield',
        id: 'PatientNameLabOrderCreation11',
        labelWidth: 50,
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
        xtype: 'container',
        id: 'LabOrderCreationContainer',
        height: 300,
        width: 500,
        autoScroll: true,
        title: '',
        x: 230,
        y: 170,
    }, {
        xtype: 'button',
        text: 'Reset',
        x: 500,
        y: 500
    }, {
        xtype: 'button',
        text: 'Save',
        x: 570,
        y: 500,
        action: 'postLabOrder',
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.HOME.value);
        }
    }, {
        xtype: 'button',
        text: 'Print',
        x: 430,
        y: 500,
    }, {
        xtype: 'button',
        text: 'Cancel',
        x: 240,
        y: 500,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.HOME.value);
        }
    }]
});
