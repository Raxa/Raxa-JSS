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
Ext.define('chw.view.familyDetails1', {
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
            xtype: 'container',
            scrollable: true,
            title: 'Summary',
            layout:{
                type:'vbox'
            },
            items: [
            {
                xtype: 'label',
                itemId: 'familyDescripLabel'
            }, {
                xtype: 'container',
                layout: {
                    pack: 'center',
                    type: 'hbox'
                },
                scrollable: false,
                items: [{
                    xtype: 'image',
                    height: 201,
                    src: 'resources/home.png',
                    flex: 1
                }, {
                    xtype: 'container',
                    margin: 5,
                    flex: 1,
                    items: [{
                        xtype: 'container',
                        layout: {
                            type: 'hbox'
                        },
                        items: [{
                            xtype: 'label',
                            html: '<div style="font-size:13px;"><b>Family</b>:</div>',
                            flex: 1
                        }, {
                            xtype: 'label',
                            itemId: 'familyNameLabel',
                            html: '<div style="font-size:13px;">Patel</div>',
                            flex: 1
                        }]
                    }, {
                        xtype: 'container',
                        layout: {
                            type: 'hbox'
                        },
                        items: [{
                            xtype: 'label',
                            html: '<div style="font-size:13px;"><b>Address</b>:</div>',
                            flex: 1
                        }, {
                            xtype: 'label',
                            itemId: 'familyAddressLabel',
                            html: '<div style="font-size:13px;">Hogwarts</div>',
                            flex: 1
                        }]
                    }, {
                        xtype: 'container',
                        layout: {
                            type: 'hbox'
                        },
                        items: [{
                            xtype: 'label',
                            html: '<div style="font-size:13px;"><b>Members</b>:</div>',
                            flex: 1
                        }, {
                            xtype: 'label',
                            itemId: 'familyMemberNumber',
                            html: '<div style="font-size:13px;">4</div>',
                            flex: 1
                        }]
                    }, {
                        xtype: 'container',
                        layout: {
                            type: 'hbox'
                        },
                        items: [{
                            xtype: 'label',
                            html: '<div style="font-size:13px;"><b>Children</b>:</div>',
                            flex: 1
                        }, {
                            xtype: 'label',
                            itemId: 'familyChildrenNumber',
                            html: '<div style="font-size:13px;">2</div>',
                            flex: 1
                        }]
                    }, {
                        xtype: 'container',
                        layout: {
                            type: 'hbox'
                        },
                        items: [{
                            xtype: 'label',
                            html: '<div style="font-size:13px;"><b>Last Visit</b>:</div>',
                            flex: 1
                        }, {
                            xtype: 'label',
                            itemId: 'lastVisit',
                            html: '<div style="font-size:13px;">10/7/12</div>',
                            flex: 1
                        }
                        ]
                    }
                    ]
                }
                ]
            },{ 
                xtype: 'list',
                id: 'familyMembersList',
                scrollable:false,
                width:'100%',
//                flex: 1,
//                minHeight: '15%',
                centered: true,
                itemTpl: [
                '<div>{firstName} {familyName}</div>'
                ]   
            },
            {
//                xtype:'container',
//                layout: {
//                    type: 'fit'
//                },
//                items: [{
                    xtype: 'button',
                    docked: 'bottom',
                    width:'10',
                    ui: 'action-round',
                    text: 'Start Visit'
//                    flex:1
//                }]
                
            }

            ]
        }, {
            xtype: 'container',
            layout: {
                type: 'fit'
            },
            title: 'Map',
            items: [{
                xtype: 'map',
                height: '100%'
            }]
        }, {
            xclass: 'chw.view.userToolbar'
        }]
    }

});
