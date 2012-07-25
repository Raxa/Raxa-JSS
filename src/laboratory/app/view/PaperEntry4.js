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
        width: 200,
        height: 400,
        store: Ext.create('Laboratory.store.LabOrderSearch'),
    }, {
        xtype: 'displayfield',
        id: 'LabOrderNoPaperEntry4Panel',
        fieldLabel: 'Lab Order No.',
        x: 230,
        y: -1
    }, {
        xtype: 'displayfield',
        fieldLabel: 'Patient',
        labelAlign: 'top',
        x: 240,
        y: 40,
    }, {
        xtype: 'displayfield',
        fieldLabel: 'Provider',
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
                        data: [
			{
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
