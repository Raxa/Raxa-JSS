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
    extend: 'Ext.Container',
    requires: 'chw.view.userToolbar',
    config: {
        height: '100%',
        ui: 'neutral',
        items: [{
            xtype: 'titlebar',
            title: 'Family Name',
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: 'Back',
                id: 'back_add',
                listeners: {
                    tap: function () {
                        helper.doBack()
                    }
                }
            }]
        }, {
            xclass: 'chw.view.userToolbar'
        },{
            xtype: 'label',
            html: '<i><p style="text-align: center;">Description</p></i>'
        },{
            xtype: 'container',
            layout: {
                pack: 'center',
                type: 'hbox'
            },
            scrollable: false,
            items: [
            {
                xtype: 'image',
                height: 201,
                src: 'somesrc',
                flex: 1
            },
            {
                xtype: 'container',
                margin: 5,
                flex: 1,
                items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox'
                    },
                    items: [
                    {
                        xtype: 'label',
                        html: '<div style="font-size:13px;"><b>Village</b>:</div>',
                        flex: 1
                    },
                    {
                        xtype: 'label',
                        html: '<div style="font-size:13px;">Hogwarts</div>',
                        flex: 1
                    }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox'
                    },
                    items: [
                    {
                        xtype: 'label',
                        html: '<div style="font-size:13px;"><b>Members</b>:</div>',
                        flex: 1
                    },
                    {
                        xtype: 'label',
                        html: '<div style="font-size:13px;">4</div>',
                        flex: 1
                    }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox'
                    },
                    items: [
                    {
                        xtype: 'label',
                        html: '<div style="font-size:13px;"><b>Children</b>:</div>',
                        flex: 1
                    },
                    {
                        xtype: 'label',
                        html: '<div style="font-size:13px;">2</div>',
                        flex: 1
                    }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox'
                    },
                    items: [
                    {
                        xtype: 'label',
                        html: '<div style="font-size:13px;"><b>Last Visit</b>:</div>',
                        flex: 1
                    },
                    {
                        xtype: 'label',
                        html: '<div style="font-size:13px;">10/7/12</div>',
                        flex: 1
                    }
                    ]
                }
                ]
            }
            ]
        },{
            xtype: 'container',
            items: [
            {
                xtype: 'list',
                itemTpl: [
                '<div>List Item {string}</div>'
                ]
            }
            ]
        },
        {
            xtype: 'button',
            ui: 'action-round',
            text: 'Start Visit'
        }]
    }
});