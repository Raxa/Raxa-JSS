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
 *  This view displays various search options to search on lab orders & patient
 */
Ext.define('Laboratory.view.LabOrderCreation2', {
    extend: 'Ext.container.Container',
    alias: 'widget.LabOrderCreation2',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },

    items: [{
        xtype: 'combobox',
        fieldLabel: 'Search Lab',
        x: 10,
        y: 30,
        labelWidth: 50,
        width: 200,
    }, {
        xtype: 'textfield',
        width: 175,
        fieldLabel: '',
        emptyText: 'Enter the Lab order no.',
        x: 10,
        y: 110
    }, {
        xtype: 'textfield',
        width: 175,
        blankText: '',
        emptyText: 'Enter the Patient Registration Number',
        x: 10,
        y: 190
    }, {
        xtype: 'textfield',
        width: 175,
        fieldLabel: 'Provider\'s Name',
        hideEmptyLabel: false,
        labelAlign: 'top',
        blankText: '',
        emptyText: 'Enter Provider\'s Name',
        x: 10,
        y: 310
    }, {
        xtype: 'textfield',
        id: 'patientFirstNameLabOrderCreation11',
        width: 100,
        fieldLabel: 'Patient\'s Name',
        labelAlign: 'top',
        //      labelWidth: 30,
        emptyText: 'First Name',
        x: 10,
        y: 260
    }, {
        xtype: 'textfield',
        width: 100,
        fieldLabel: '',
        hideEmptyLabel: true,
        emptyText: 'Last Name',
        x: 120,
        y: 280
    }, {
        xtype: 'button',
        id: 'patientLastNameLabOrderCreation11',
        height: 20,
        width: 50,
        text: 'Find',
        x: 200,
        y: 110,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.LAB_ORDER_PATIENT_SEARCH_RESULT.value);
        }

    }, {
        xtype: 'button',
        height: 20,
        width: 50,
        text: 'Find',
        x: 200,
        y: 190,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.LAB_ORDER_PATIENT_SEARCH_RESULT.value);
        }

    }, {
        xtype: 'button',
        height: 20,
        width: 50,
        text: 'Find',
        action: 'searchPatient',
        x: 10,
        y: 420,
        handler: function () {}
    }, {
        xtype: 'datefield',
        width: 100,
        fieldLabel: 'Lab orders from',
        labelAlign: 'top',
        x: 10,
        y: 360
    }, {
        xtype: 'datefield',
        width: 100,
        fieldLabel: 'to',
        hideEmptyLabel: false,
        labelWidth: 20,
        x: 130,
        y: 380
    }, {
        xtype: 'image',
        height: 40,
        width: 40,
        src: '../resources/img/OR.png',
        x: 100,
        y: 60
    }, {
        xtype: 'image',
        height: 40,
        width: 40,
        src: '../resources/img/OR.png',
        x: 100,
        y: 60
    }, {
        xtype: 'image',
        height: 40,
        width: 40,
        src: '../resources/img/OR.png',
        x: 100,
        y: 140
    }, {
        xtype: 'image',
        height: 40,
        width: 40,
        src: '../resources/img/OR.png',
        x: 100,
        y: 220
    }]

});
