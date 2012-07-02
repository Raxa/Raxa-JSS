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
 *  This view allows user to search provider
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
        width: 150,
        fieldLabel: 'Enter the Provider Registration Number',
        labelAlign: 'top',
        x: 10,
        y: 30
    }, {
        xtype: 'textfield',
        width: 100,
        fieldLabel: 'Provider\'s Name',
        labelAlign: 'top',
        emptyText: 'First Name',
        x: 10,
        y: 160
    }, {
        xtype: 'textfield',
        width: 100,
        fieldLabel: '',
        hideEmptyLabel: true,
        emptyText: 'Last Name',
        x: 120,
        y: 180
    }, {
        xtype: 'button',
        height: 20,
        width: 50,
        text: 'Find',
        x: 10,
        y: 100,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.LAB_ORDER_PROVIDER_SEARCH_RESULT.value);
        }        
        
    }, {
        xtype: 'button',
        height: 20,
        width: 50,
        text: 'Find',
        x: 10,
        y: 210,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.LAB_ORDER_PROVIDER_SEARCH_RESULT.value);
        }        
    }, {
        xtype: 'image',
        height: 30,
        width: 30,
        src: '../resources/img/OR.png',
        x: 50,
        y: 130
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
        y: 90,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.LAB_ORDER_FILTER_LOCATION.value);
        }                  
    }, {
        xtype: 'button',
        text: 'Find Provider',
        x: 280,
        y: 60,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.LAB_ORDER_SEARCH_PROVIDER.value);
        }        
    }, {
        xtype: 'button',
        text: 'Find Patient',
        x: 280,
        y: 30,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.LAB_ORDER_SEARCH_PATIENT.value);
        }                
    }]
});
