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
 * This script defines the view SearchPart2 of the registration module
 */
Ext.define('Registration.view.SearchPart2', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.searchpart2',
    border: 0,
    autoScroll: true,
    padding: 10,
    layout: {
        type: 'auto'
    },
    initComponent: function () {
        this.items = {
            border: 0,
            items: [{
                xtype: 'panel',
                autoScroll: true,
                border: 0,
                bodyPadding: 10,
                items: [{
                    xtype: 'fieldset',
                    padding: 10,
                    title: 'Search Results of Patient',
                    fieldDefaults: {
                        msgTarget: 'side'
                    },
                    items: [{
                        xtype: 'gridpanel',
                        selType: 'rowmodel',
                        id: 'patientGrid',
                        align: 'centre',
                        margin: '10 0 0 10',
                        forceFit: true,
                        store: 'search',
                        hideHeaders: false,
                        columns: [{
                            xtype: 'rownumberer',
                            text: 'Sr. No',
                            dataIndex: 'id'
                        }, {
                            xtype: 'gridcolumn',
                            text: 'First Name',
                            dataIndex: 'givenName'
                        }, {
                            xtype: 'gridcolumn',
                            text: 'Last Name',
                            dataIndex: 'familyName'
                        }, {
                            xtype: 'gridcolumn',
                            text: 'Sex',
                            dataIndex: 'gender'
                        }, {
                            xtype: 'gridcolumn',
                            text: 'DOB',
                            renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                            dataIndex: 'birthdate'
                        }, {
                            xtype: 'gridcolumn',
                            text: 'Patient Id'
                        }, {
                            xtype: 'gridcolumn',
                            text: 'Husband/Father\'s Name',
                            forceFit: true
                        }, {
                            xtype: 'gridcolumn',
                            text: 'Village',
                            dataIndex: 'cityVillage'
                        }, {
                            xtype: 'gridcolumn',
                            text: 'Town'
                        }],
                        viewConfig: {
                            autoScroll: true,
                            emptyText: 'No Data Available',
                            stripeRows: false
                        }
                    }, {
                        xtype: 'button',
                        margin: '10 50 0 270',
                        width: 120,
                        text: 'View Details',
                        action: 'viewDetails'
                    }, {
                        xtype: 'button',
                        margin: '10 0 0 0',
                        width: 120,
                        text: 'Modify Search',
                        action: 'modifySearch'
                    }]
                }]
            }]
        };
        this.callParent();
    }
});