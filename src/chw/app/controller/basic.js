/**
 * Copyright 2012, Raxa
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
Ext.define('chw.controller.basic', {
    extend: 'Ext.app.Controller',
    config: {
        control: {
            "button[action=cancelButton]": {
                tap: function () {
                    this.doOption(false)
                }
            },
            "button[action=okButton]": {
                tap: function () {
                    this.doOption(true)
                }
            }
        }
    },
    launch: function () {
        Ext.create('Ext.Container', {
            id: 'viewPort',
            fullscreen: true,
            layout: 'card',
            activeItem: 0,
            items: [{
                xclass: 'chw.view.loginScreen'
            }, {
                xclass: 'chw.view.familyList'
            }, {
                xclass: 'chw.view.diseaseList'
            }, {
                xclass: 'chw.view.familyDetails'
            }, {
                xclass: 'chw.view.patientDetails'
            }, {
                xclass: 'chw.view.visitDetails'
            }, {
                xclass: 'chw.view.inventoryList'
            }, {
                xclass: 'chw.view.inventoryDetails'
            }]
        })
    },
    doExit: function () {
        USER.name = '';
        USER.uuid = '';
        Ext.getCmp('viewPort').setActiveItem(PAGES.loginScreen)
    },
    doList: function (arg) {
        if (arg==='familyList') {
            
            var fstore = Ext.getStore('families');
            if (!fstore) {
                Ext.create('chw.store.families')
            }
            fstore.load();
            Ext.getCmp('familyLists').setStore(fstore)
            
            var istore = Ext.getStore('illnesses');
            if (!istore) {
                Ext.create('chw.store.illnesses')
            }
            istore.load();
            Ext.getCmp('illnessNames').setStore(istore)
        }
    },
    doOption: function (arg) {
        if (arg) {
            var active = Ext.getCmp('viewPort').getActiveItem();
            if (active.getActiveItem()===PAGES.loginScreen) {
                this.doList('familyList');
                Ext.getCmp('viewPort').setActiveItem(PAGES.familyList)
            }
        }
    }
})
