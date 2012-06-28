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
 *  This view allows to add new provider (basic page) 
 */
Ext.define('Laboratory.view.SpecimenRegistration6', {
    extend: 'Ext.container.Container',
    alias: 'widget.SpecimenRegistration6',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },
    items: [{
        xtype: 'textfield',
        fieldLabel: 'Provider\'s Name',
        labelWidth: 120,
        emptyText: 'First Name'
    }, {
        xtype: 'textfield',
        fieldLabel: '',
        emptyText: 'Last Name',
        x: 290,
        y: 0
    }, {
        xtype: 'radiogroup',
        width: 400,
        fieldLabel: 'Sex',
        x: 0,
        y: 40,
        items: [{
            xtype: 'radiofield',
            boxLabel: 'Male'
        }, {
            xtype: 'radiofield',
            boxLabel: 'Female'
        }, {
            xtype: 'radiofield',
            boxLabel: 'Others'
        }]
    }, {
        xtype: 'button',
        text: 'Save',
        x: 280,
        y: 90,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.SPECIMEN_REGISTRATION_ADD_PROVIDER_2.value);
        }
    }, {
        xtype: 'button',
        text: 'Cancel',
        x: 200,
        y: 90,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.SPECIMEN_COLLECTION_HOME.value);
        }
    }]

});
