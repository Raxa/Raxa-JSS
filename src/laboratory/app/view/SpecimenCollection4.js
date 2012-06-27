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
 *  This view provides option to search on patient 
 */
Ext.define('Laboratory.view.SpecimenCollection4', {
    extend: 'Ext.container.Container',
    alias: 'widget.SpecimenCollection4',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },

    items: [{
        xtype: 'textfield',
        width: 240,
        blankText: '',
        emptyText: 'Enter the Patient Registration Number',
        x: 10,
        y: 60
    }, {
        xtype: 'textfield',
        width: 140,
        fieldLabel: 'Patient\'s Name',
        labelAlign: 'top',
        labelWidth: 50,
        emptyText: 'First Name',
        x: 10,
        y: 160
    }, {
        xtype: 'textfield',
        width: 240,
        fieldLabel: '',
        hideEmptyLabel: false,
        emptyText: 'Last Name',
        x: 60,
        y: 180
    }, {
        xtype: 'button',
        height: 20,
        width: 50,
        text: 'Find',
        x: 260,
        y: 60
    }, {
        xtype: 'image',
        height: 40,
        width: 40,
        src: '../resources/img/OR.png',
        x: 100,
        y: 100
    }, {
        xtype: 'container'
    }, {
        xtype: 'button',
        text: 'Continue',
        x: 490,
        y: 190
    }, {
        xtype: 'button',
        text: 'Cancel',
        x: 300,
        y: 190
    }, {
        xtype: 'displayfield',
        value: 'Patient',
        fieldLabel: '',
        x: 210,
        y: 60
    }, {
        xtype: 'displayfield',
        value: 'Patient',
        fieldLabel: '',
        x: 210,
        y: 60
    }, {
        xtype: 'displayfield',
        name: '',
        value: 'PatientID',
        fieldLabel: 'Name',
        x: 410,
        y: 60
    }, {
        xtype: 'displayfield',
        name: '',
        value: 'ProviderID',
        fieldLabel: 'Name',
        x: 410,
        y: 90
    }, {
        xtype: 'displayfield',
        value: 'Provider',
        fieldLabel: '',
        x: 210,
        y: 90
    }, {
        xtype: 'displayfield',
        value: 'Location',
        fieldLabel: '',
        x: 210,
        y: 120
    }, {
        xtype: 'button',
        height: 20,
        text: 'MyButton',
        x: 280,
        y: 60
    }, {
        xtype: 'button',
        height: 20,
        text: 'Find Patient',
        x: 280,
        y: 60
    }, {
        xtype: 'button',
        height: 20,
        text: 'Find Location',
        x: 280,
        y: 120
    }, {
        xtype: 'button',
        height: 20,
        text: 'Find Provider',
        x: 280,
        y: 90
    }

    ]

});
