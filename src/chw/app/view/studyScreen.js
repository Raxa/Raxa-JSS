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
Ext.define('motechScheduleTracking.view.studyScreen', {
    extend: 'Ext.Panel',
    config: {
        items: [{
            xtype: 'titlebar',
            docked: 'top',
            title: 'MoTeCH mForms 0.80'
        }, {
            xtype: 'container',
            centered: true,
            width: '100%',
            padding: '30px',
            items: [{
                xtype: 'container',
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'middle'
                },
                padding: '30px',
                items: [{
                    xtype: 'label',
                    html: 'Select Study <br>'
                }]
            }, {
                xtype: 'container',
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'middle'
                },
                items: [{
                    xtype: 'fieldset',
                    defaults: {
                        labelWidth: '35%'
                    },
                    items: [{
                        xtype: 'selectfield',
                        name: 'study',
                        label: 'Study',
                        required: true,
                        options: [{
                            text: 'DemoGroup',
                            value: 'demogroup'
                        }]
                    }, {
                        xtype: 'container',
                        layout: {
                            type: 'vbox',
                            pack: 'center',
                            align: 'middle'
                        },
                        items: [{
                            xtype: 'container',
                            layout: 'hbox',
                            padding: '10px',
                            width: "100%",
                            items: [

                            {
                                xtype: 'button',
                                text: 'Okay',
                                ui: 'aqua',
                                id: 'studyOkay',
                                flex: '3'
                            }, {
                                xtype: 'label',
                                flex: '1'
                            }, {
                                xtype: 'button',
                                text: 'Cancel',
                                ui: 'aqua',
                                id: 'studyCancel',
                                flex: '3'
                            },

                            ]
                        }]
                    }]

                },

                ]
            }]
        }]
    }

})