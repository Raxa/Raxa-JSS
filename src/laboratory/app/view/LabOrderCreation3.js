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
 *  This view shows search result in tabular form
 */
Ext.define('Laboratory.view.LabOrderCreation3', {
    extend: 'Ext.container.Container',
    alias: 'widget.LabOrderCreation3',
    autoScroll: true,
    activeItem: 0,

    items: [{
        xtype: 'gridpanel',
        id: 'patientSearchCreateLabOrder',
        autoScroll: true,
        title: 'Lab order search result',
        store: Ext.create('Laboratory.store.LabPatientSearch'),
        columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'FirstName',
            text: 'First Name',
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'LastName',
            text: 'Last Name'
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'Sex',
            text: 'Sex'
        }, {
            xtype: 'datecolumn',
            dataIndex: 'DOB',
            text: 'DOB'
        }, /*{
            xtype: 'gridcolumn',
            dataIndex: 'RelativeName',
            text: 'Husband\'s / Father\'s Name'
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'Village',
            text: 'Village'
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'Panchayat',
            text: 'Panchayat'
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'Town',
            text: 'Town'
        }*/],
    }, {
        xtype: 'button',
        text: 'Continue',
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.LAB_ORDER_PATIENT_DETAILS.value);
        }
    }]
});
