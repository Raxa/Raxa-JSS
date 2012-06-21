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
 *  This view is first page (Basic Details) of adding new provider
 */
Ext.define('Laboratory.view.SpecimenCollection8', {
    extend: 'Ext.container.Container',
    alias: 'widget.SpecimenCollection8',
    autoScroll: true,
    activeItem: 0,
    items: [{
        xtype: 'fieldcontainer',
        fieldLabel: 'Patient Name',
        layout: 'hbox',
        combineErrors: true,
        defaultType: 'textfield',
        labelAlign: 'right',
        labelPad: 20,
        labelWidth: 250,
        defaults: {
            hideLabel: 'true'
        },
        items: [{
            name: 'firstName',
            emptyText: 'Patient\'s First Name',
            flex: 1,
        }, {
            name: 'lastName',
            emptyText: 'Patient\'s Last Name',
            id: 'patientLastName',
            flex: 1,
            margins: '0 0 0 6',
        }]
    }, {
        xtype: 'radiogroup',
        fieldLabel: 'Sex',
        id: 'sexRadioGroup',
        labelAlign: 'right',
        labelPad: 20,
        labelWidth: 250,
        allowBlank: false,
        items: [{
            xtype: 'radiofield',
            name: 'sex',
            boxLabel: 'Male'
        }, {
            xtype: 'radiofield',
            name: 'sex',
            boxLabel: 'Female'
        }, {
            xtype: 'radiofield',
            name: 'sex',
            boxLabel: 'Other'
        }]
    }, {
        xtype: 'button',
        margin: '10 50 0 270',
        width: 60,
        text: 'Cancel',
    }, {
        xtype: 'button',
        margin: '10 0 0 0',
        width: 60,
        text: 'Save'

    }]

});
