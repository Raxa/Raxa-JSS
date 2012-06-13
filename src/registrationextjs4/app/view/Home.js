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
 * This script defines the view Home of the registration module
 */
Ext.define('Registration.view.Home', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.home',
    border: 0,
    padding: 10,
    autoScroll: true,
    layout: {
        type: 'fit'
    },
    initComponent: function () {
        this.items = {
            border: 0,
            layout: {
                type: 'fit'
            },
            items: [{
                xtype: 'form',
                border: 0,
                layout: {
                    align: 'center',
                    pack: 'center',
                    type: 'vbox'
                },
                bodyPadding: 10,
                items: [{
                    xtype: 'image',
                    height: 130,
                    margin: '0 0 20 0',
                    width: 130,
                    src: '../resources/img/logo.png'
                }, {
                    xtype: 'combobox',
                    typeAhead: true,
                    triggerAction: 'all',
                    selectOnTab: true,
                    store: [
                        ['vikas', 'vikas'],
                        ['anshu', 'anshu'],
                        ['nathan', 'nathan'],
                        ['mohit', 'mohit'],
                        ['daniel', 'daniel'],
                        ['akash', 'akash'],
                        ['ankit', 'ankit'],
                        ['suraj', 'suraj'],
                        ['subodh', 'subodh'],
                        ['ashwini', 'ashwini']
                    ],
                    lazyRender: true,
                    listClass: 'x-combo-list-small',
                    fieldLabel: 'Search Patient',
                    labelAlign: 'top',
                    width: 300,
                    hideTrigger: true
                }, {
                    xtype: 'button',
                    height: 35,
                    margin: '10 0 13 0',
                    width: 300,
                    text: 'Register New Patient',
                    handler: function () {
                        var l = Ext.getCmp('mainRegArea').getLayout();
                        l.setActiveItem(REG_PAGES.REG_1.value); //Going to Registration Part-1 Page
                    }
                }, {
                    xtype: 'button',
                    height: 35,
                    width: 300,
                    text: 'Emergency'
                }]
            }]
        };
        this.callParent();
    }
});
