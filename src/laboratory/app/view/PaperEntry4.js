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
 *  This view allows modifying/entering lab order
 */
Ext.define('Laboratory.view.PaperEntry4', {
    extend: 'Ext.container.Container',
    alias: 'widget.PaperEntry4',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },

    items: [{
        xtype: 'laborderlistgrid',
        id: 'labOrderListPaperEntry4',
        title: 'List of Lab Orders',
        action: 'showLabPanel',
        width: 200,
        height: 400,
        store: Ext.create('Laboratory.store.LabOrderSearch'),
        listeners: {
            click: {
                element: 'el', //bind to the underlying el property on the panel   
                
                //Based on selected laborder, function sets the name of the patient to which belongs in the 
                //view and sets the url of proxy of store attached to result grid after GETing the uuid of 
                //concept (attached to selected laborder)                 
                fn: function () {
                    var l = Ext.getCmp('mainLabArea').getLayout();
                    l.setActiveItem(LAB_PAGES.PAPER_ENTRY_ENTER_DATA.value);
                    var grid = Ext.getCmp('labOrderListPaperEntry4');
                    var pos = grid.getSelectionModel().selected.length;
                    selectedLabOrderId = grid.getSelectionModel().lastSelected.data.labOrderId;
                    selectedPatientDisplay = grid.getSelectionModel().lastSelected.data.PatientDisplay;
                    selectedPatientUuid = grid.getSelectionModel().lastSelected.data.PatientUUID;
                    selectedLabOrderIdUuid = grid.getSelectionModel().lastSelected.data.LabOrderUuid;

                    //Sets the LabOrderId and Patient's Name in the view
                    Ext.getCmp('LabOrderNoPaperEntry4Panel').setValue(selectedLabOrderId);
                    Ext.getCmp('patientDisplayPaperEntry4Panel').setValue(selectedPatientDisplay);

                    var resultGrid = Ext.getCmp('results');

                    //This Ajax call gets the uuid of LabSpecimen concept which is used to set the proxy of concept store
                    Ext.Ajax.request({
                        url: LAB_HOST + '/ws/rest/v1/order/' + selectedLabOrderIdUuid + '?v=full',
                        method: 'GET',
                        disableCaching: false,
                        headers: {
                            "Accept": "application/json",
                            "Authorization": "Basic " + window.btoa(LAB_USERNAME + ":" + LAB_PASSWORD),
                            "Content-Type": "application/json"
                        },
                        failure: function (response) {
                            console.log('GET on laborder failed with response status: ' + response.status);
                        },
                        success: function (response) {
                            var JSONResult = JSON.parse(response.responseText);
                            conceptUuid = JSONResult.concept.uuid;
                            // This is to change the proxy by getting corresponding concept uuid from order
                            resultGrid.store.getProxy().url = LAB_HOME + '/ws/rest/v1/concept/' + conceptUuid + '?v=full';
                            resultGrid.store.load();
                        }
                    });       
                }  
            } 
        } 
        }, {
        xtype: 'displayfield',
        id: 'LabOrderNoPaperEntry4Panel',
        fieldLabel: 'Lab Order No.',
        x: 230,
        y: 0
    }, {
        xtype: 'displayfield',
        fieldLabel: '<b>Patient</b>',
        labelAlign: 'top',
        x: 240,
        y: 40,
    }, {
        xtype: 'displayfield',
        fieldLabel: '<b>Provider</b>',
        labelAlign: 'top',
        x: 440,
        y: 40
    }, {
        xtype: 'displayfield',
        id: 'patientDisplayPaperEntry4Panel',
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
        xtype: 'button',
        width: 60,
        action: 'submitPaperEntry',
        id: 'submitPaperEntry4',
        text: 'Submit',
        x: 600,
        y: 600
    }, {
        xtype: 'panel',
        width: 450,
        autoScroll: true,

        x: 230,
        y: 170,
        items: [{
            xtype: 'gridpanel',

            id: 'results',
            autoScroll: true,
            columnLines: true,
            store: Ext.create('Laboratory.store.concept'),
            columns: [{
                xtype: 'gridcolumn',
                dataIndex: 'string',
                text: 'Test',
                dataIndex: 'Test',
                width: 200
            }, {
                xtype: 'gridcolumn',
                text: 'Result',
                id: 'resultsColumn',
                dataIndex: 'Result',
                editor: 'textfield',
            }, {
                xtype: 'gridcolumn',
                width: 49,
                text: 'Units',
                dataIndex: 'Units',
                editor: 'textfield',
            }, {
                xtype: 'gridcolumn',
                width: 31,
                text: 'Flag',
                dataIndex: 'Flag',
                editor: {
                    xtype: 'combobox',
                    allowBlank: false,
                    editable: false,
                    store: new Ext.data.Store({
                        fields: ['value'],
                        data: [{
                            value: 'A'
                        }, {
                            value: '>'
                        }, {
                            value: 'H'
                        }, {
                            value: 'HH'
                        }, {
                            value: 'AC'
                        }, {
                            value: '<'
                        }, {
                            value: 'L'
                        }, {
                            value: 'LL'
                        }, {
                            value: 'QCF'
                        }, {
                            value: 'AA'
                        }]
                    }),
                    displayField: 'value',
                    forceSelection: true
                }
            }, {
                xtype: 'actioncolumn',
                altText: 'Notes',
                items: [{

                }]
            }],
            plugins: [{
                ptype: 'cellediting',
                clicksToEdit: 1
            }],
            features: [{
                ftype: 'grouping'
            }]
        }]
    }]
});
