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
Ext.define('mUserStories.view.vcScheduling', {
    extend: 'Ext.tab.Panel',
    config: {
        height: '100%',
        ui: 'neutral',
        items: [/*{
            xclass: 'mUserStories.view.titlebar'
        }, */{
            xtype: 'titlebar',
            title: 'Scheduling',
            id: 'title_sch',
            docked: 'top'/*,
            items: [{
                xtype: 'button',
                ui: 'back',
                text: 'Back',
                id: 'back_pdet',
                handler: {
                    tap: function () {
                        helper.doBack('list')
                    }
                }
            }]*/
        }, {
            xclass: 'mUserStories.view.vcToolbar'
        }, {
            xtype: 'formpanel',
            title: 'Enroll',
            items: [{
                xtype: 'fieldset',
                title: 'Enroll in Schedule',
                defaults: {
                    labelWidth: '35%'
                },
                items: [{
                    xtype: 'selectfield',
                    label: 'Type',
                    id: 'type_vcenr',
                    flex: 2,
                    required: true,
                    options: [{
                        text: '',
                        value: 'empty'
                    }, {
                        text: 'Regular checkup',
                        value: 'regular'
                    }, {
                        text: 'Prenatal care',
                        value: 'prenatal'
                    }, {
                        text: '',
                        value: ''
                    }, {
                        text: 'Other',
                        value: 'otherreport'
                    }]
                }, {
                    xtype: 'textfield',
                    label: 'First',
                    id: 'first_vcenr',
                    required: true
                }, {
                    xtype: 'textfield',
                    label: 'Last',
                    id: 'last_vcenr',
                    required: true
                }, {
                    // TODO: Generate necessary fields dynamically
                    xtype: 'textfield',
                    label: 'Details',
                    id: 'details_vcenr',
                    labelAlign: 'top'
                }]
            }]
        }, {
            xtype: 'formpanel',
            title: 'Create',
            items: [{
                xtype: 'fieldset',
                title: 'Create a Schedule',
                defaults: {
                    labelWidth: '35%'
                },
                items: [{
                    xtype: 'textfield',
                    label: 'Type',
                    id: 'type_vccrea',
                    required: true
                }, {
                    // TODO: is this the right logic?
                    xtype: 'textfield',
                    label: 'Frequency',
                    id: 'freq_vccrea',
                    required: true
                }]
            }]
        }]
    }
})