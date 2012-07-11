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
Ext.define('mUserStories.view.addReminder', {
    extend: 'Ext.Panel',
    config: {
        height: '100%',
        ui: 'neutral',
        scrollable: true,
        items: [/*{
            xclass: 'mUserStories.view.titlebar'
        },*/{
            xtype: 'titlebar',
            title: 'Add Reminder',
            id: 'title_add_rem',
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: 'Back',
                id: 'back_add_rem',
                listeners: {
                    tap: function () {
                        helper.doBack('add')
                    }
                }
            }]
        }, {
            xclass: 'mUserStories.view.userToolbar'
        }, {
            xtype: 'container',
            padding: '10px',
            items: [{
                xtype: 'fieldset',
                defaults: {
                    labelWidth: '35%'
                },
                items: [{
                    xtype: 'textfield',
                    label: 'First',
                    name: 'first_rem',
                    placeHolder: 'Harry',
                    clearIcon: true,
                    required: true
                }, {
                    xtype: 'textfield',
                    label: 'Last',
                    name: 'last_rem',
                    placeHolder: 'Last',
                    clearIcon: true,
                    required: true
                }, {
                    xtype: 'selectfield',
                    label: 'Type',
                    id: 'type_rem',
                    flex: 2,
                    required: true,
                    options: [{
                        text: '',
                        value: 'empty'
                    }, {
                        text: 'Reminder #1',
                        value: 'reminder1'
                    }, {
                        text: 'Reminder #2',
                        value: 'reminder2'
                    }, {
                        text: 'Reminder #3',
                        value: 'reminder3'
                    }, {
                        text: 'Other',
                        value: 'otherreminder'
                    }]
                }, {
                    xclass: 'mUserStories.view.okCancel'
                }]
            }]
        }]
    }
})