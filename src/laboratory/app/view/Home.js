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
 *  This view (also Landing Page of Lab Module) lists all the options available to the user. 
 */
Ext.define('Laboratory.view.Home', {
    extend: 'Ext.container.Container',
    alias: 'widget.Home',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },


    items: [{
        xtype: 'splitter'
    }, {
        xtype: 'button',
        height: 40,
        width: 200,
        text: 'Specimen Collection',
        x: 20,
        y: 30
    }, {
        xtype: 'button',
        height: 40,
        width: 200,
        text: 'Queue Status',
        x: 240,
        y: 280
    }, {
        xtype: 'button',
        height: 40,
        width: 200,
        text: 'Anonymous Identification',
        x: 240,
        y: 230
    }, {
        xtype: 'button',
        height: 40,
        width: 200,
        text: 'Paper Entry',
        x: 240,
        y: 180,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.PAPER_ENTRY_LIST.value);
        }
    }, {
        xtype: 'button',
        height: 40,
        width: 200,
        text: 'Report Delivery/ Print Lab Report',
        x: 240,
        y: 130
    }, {
        xtype: 'button',
        height: 40,
        width: 200,
        text: 'Print Lab Order',
        x: 240,
        y: 80
    }, {
        xtype: 'button',
        height: 40,
        width: 200,
        text: 'Create  Lab Order',
        x: 240,
        y: 30
    }, {
        xtype: 'button',
        height: 40,
        width: 200,
        text: 'Repprts',
        x: 20,
        y: 280
    }, {
        xtype: 'button',
        height: 40,
        width: 200,
        text: 'Report Approval',
        x: 20,
        y: 230
    }, {
        xtype: 'button',
        height: 40,
        width: 200,
        text: 'Batch Approval',
        x: 20,
        y: 180,
        handler: function () {
            var l = Ext.getCmp('mainLabArea').getLayout();
            l.setActiveItem(LAB_PAGES.BATCH_APPROVAL.value);
        }
    }, {
        xtype: 'button',
        height: 40,
        width: 200,
        text: 'Result Entry',
        x: 20,
        y: 130
    }, {
        xtype: 'button',
        height: 40,
        width: 200,
        text: 'Specimen Registration',
        x: 20,
        y: 80
    }, {
        layout: 'vbox',
        xtype: 'button',
        height: 70,
        width: 80,
        text: 'Screener',
        x: 550,
        y: 110
    }, {
        layout: 'vbox',
        xtype: 'button',
        height: 70,
        width: 80,
        text: 'In patient',
        x: 550,
        y: 30
    }, {
        xtype: 'button',
        height: 70,
        width: 80,
        text: 'Laboratory',
        x: 550,
        y: 270
    }, {
        xtype: 'button',
        height: 70,
        width: 80,
        text: 'OPD',
        x: 550,
        y: 190
    }]

});
