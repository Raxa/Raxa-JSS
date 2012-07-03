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
 *  This view is third and last form (contact information) for adding provider  
 */
Ext.define('Laboratory.view.LabOrderCreation9', {
    extend: 'Ext.container.Container',
    alias: 'widget.LabOrderCreation9',
    autoScroll: true,
    activeItem: 0,

    items: [{
        xtype: 'textfield',
        fieldLabel: 'Block/House/Door No.',
        labelWidth: 210
    }, {
        xtype: 'textfield',
        fieldLabel: 'Street/Area/Locality/Mohala/Road ',
        labelWidth: 210
    }, {
        xtype: 'textfield',
        fieldLabel: 'Town/Village/City ',
        labelWidth: 210
    }, {
        xtype: 'textfield',
        fieldLabel: 'Post Office',
        labelWidth: 210
    }, {
        xtype: 'textfield',
        fieldLabel: 'Pincode',
        labelWidth: 210
    }, {
        xtype: 'textareafield',
        fieldLabel: 'Tehsil/Taluka/Thana',
        labelWidth: 210
    }, {
        xtype: 'textfield',
        fieldLabel: 'Primary',
        labelWidth: 210
    }, {
        xtype: 'textfield',
        fieldLabel: 'Secondary',
        labelWidth: 210
    }, {
        xtype: 'button',
        text: 'Cancel',
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.HOME.value);
        } 
    }, {
        xtype: 'button',
        text: 'Done',
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.HOME.value);
        }        
    }]
    });
