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
Ext.define('chw.view.familyDetails', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.familyDetails',
    requires: 'chw.view.userToolbar',
    config: {
        height: '100%',
        ui: 'neutral',
        items: [{
            xtype: 'titlebar',
            itemId: 'familyTitle',
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: 'Back',
                listeners: {
                    tap: function () {
                        helper.doBack()
                    }
                }
            }]
        }, {
            title: 'Summary',
            xtype: 'container',
            height: '100%',
            width: '100%',
            scrollable: true,
            layout: 'vbox',
            items: [{
                xtype: 'label',
                itemId: 'familyDescripLabel'
            }, {
                xtype: 'container',
                layout: {
                    pack: 'center',
                    type: 'hbox',
                    height: '30%',
                    width: '100%',
                    docked: 'top'
                }, 
                scrollable: false,
                items: [{
                    xtype: 'image',
                    height: '100%',
                    width: '30%',
                    src: 'resources/home.png'
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [{
                        xtype: 'container'
                    }]
                }]
            }, {
                xtype: 'container',
                height: '50%',
                scrollable: true,
                items: [{
                    xtype: 'list',
                    id: 'familyMembersList',
                    // scrollable: false,
                    width: '100%',
                    itemTpl: ['<div>{firstName} {familyName}</div>']
                }]
            }, {
                xtype: 'container',
                height: '20%',
                items: [{
                    xtype: 'button',
                    centered: true,
                    width: '80%',
                    ui: 'action-round',
                    text: 'Start Visit'
                }]
            }]
        }, {
            title: 'Map',
            xtype: 'container',
            layout: 'fit',
            items: [{
                xtype: 'map',
                height: '100%'
            }]
        }]
    }
})
	