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
 *  This view allows user to search patient
 */
Ext.define('Laboratory.view.LabOrderCreation4', {
    extend: 'Ext.container.Container',
    alias: 'widget.LabOrderCreation4',
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
        y: 30
    }, {
        xtype: 'textfield',
        width: 110,
        fieldLabel: 'Patient\'s Name',
        labelAlign: 'top',
        labelWidth: 50,
        emptyText: 'First Name',
        x: 20,
        y: 120
    }, {
        xtype: 'textfield',
        width: 210,
        fieldLabel: '',
        hideEmptyLabel: false,
        emptyText: 'Last Name',
        x: 40,
        y: 140
    }, {
        xtype: 'button',
        height: 20,
        width: 50,
        text: 'Find',
        x: 10,
        y: 60
    }, {
        xtype: 'button',
        height: 20,
        width: 50,
        text: 'Find',
        x: 20,
        y: 170
    }, {
        xtype: 'image',
        height: 40,
        width: 40,
        src: '../resources/img/OR.png',
        x: 100,
        y: 70
    }, {
        xtype: 'displayfield',
        value: 'Patient',
        fieldLabel: '',
        x: 200,
        y: 30
    }, {
        xtype: 'displayfield',
        value: 'Provider ID',
        fieldLabel: 'Name',
        x: 410,
        y: 60
    }, {
        xtype: 'displayfield',
        value: 'Patient ID',
        fieldLabel: 'Name',
        x: 410,
        y: 30
    }, {
        xtype: 'displayfield',
        value: 'Location',
        fieldLabel: '',
        x: 200,
        y: 90
    }, {
        xtype: 'displayfield',
        value: 'Provider',
        fieldLabel: '',
        x: 200,
        y: 60
    }, {
        xtype: 'button',
        text: 'Find Location',
        x: 280,
        y: 90
    }, {
        xtype: 'button',
        text: 'Find Provider',
        x: 280,
        y: 60
    }, {
        xtype: 'button',
        text: 'Find Patient',
        x: 280,
        y: 30
    }, {
        xtype: 'button',
        text: 'Continue',
        x: 440,
        y: 160
    }, {
        xtype: 'button',
        text: 'Cancel',
        x: 280,
        y: 160
    }]

});
