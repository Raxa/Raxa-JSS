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
Ext.define('mUserStories.view.addAppointment', {
    extend: 'Ext.Panel',
    config: {
        height: '100%',
        ui: 'neutral',
        scrollable: true,
        items: [{
            xtype: 'titlebar',
            title: 'Add Appointment',
            id: 'title_add_appt',
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: 'Back',
                id: 'back_add_appt',
                listeners: {
                    tap: function () {
                        helper.doBack('add')
                    }
                }
            }]
        }, /*{
            xclass: 'mUserStories.view.titlebar'
        },*/ {
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
                    name: 'first_appt',
                    placeHolder: 'Harry',
                    clearIcon: true,
                    required: true
                }, {
                    xtype: 'textfield',
                    label: 'Last',
                    name: 'last_appt',
                    placeHolder: 'Last',
                    clearIcon: true,
                    required: true
                }, {
                    xtype: 'selectfield',
                    label: 'Type',
                    id: 'type_appt',
                    flex: 2,
                    required: true,
                    options: [{
                        text: '',
                        value: 'empty'
                    }, {
                        text: 'Emergency',
                        value: 'emergency'
                    }, {
                        text: 'Illness',
                        value: 'illness'
                    }, {
                        text: 'Regular',
                        vale: 'regular'
                    }, {
                        text: 'Other',
                        value: 'otherreport'
                    }]
                }, {
                    xtype: 'datepickerfield',
                    destroyPickerOnHide: true,
                    name: 'date_appt',
                    id: 'date_appt',
                    label: 'Date',
                    required: true,
                    value: new Date(),
                    picker: {
                        yearFrom: 1900
                    }
                }, {
                    xclass: 'mUserStories.view.okCancel'
                }]
            }]
        }]
    }
})