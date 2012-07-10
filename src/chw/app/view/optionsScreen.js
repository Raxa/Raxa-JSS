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
Ext.define('motechScheduleTracking.view.optionsScreen', {
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
                    html: '<strong>Options</strong><br>'
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
                    width: '100%',
                    items: [{
                        xtype: 'button',
                        flex: '3',
                        icon: '../lib/touch/resources/themes/images/default/pictos/team.png',
                        id: 'selectStudy'
                    }, {
                        xype: 'label',
                        flex: '1'
                    }, {
                        xtype: 'button',
                        flex: '3',
                        icon: '../lib/touch/resources/themes/images/default/pictos/folder_black.png',
                        id: 'selectForms'
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    width: '100%',
                    items: [{
                        xytpe: 'label',
                        flex: '3',
                        html: '<center>Select Study</center><br>'
                    }, {
                        xype: 'label',
                        flex: '1'
                    }, {
                        xytpe: 'label',
                        flex: '3',
                        html: '<center>Select Forms</center><br>'
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    width: '100%',
                    items: [{
                        xtype: 'button',
                        flex: '3',
                        icon: '../lib/touch/resources/themes/images/default/pictos/doc_down.png',
                        id: 'downloadButton'
                    }, {
                        xype: 'label',
                        flex: '1'
                    }, {
                        xtype: 'button',
                        flex: '3',
                        icon: '../lib/touch/resources/themes/images/default/pictos/doc_up.png',
                        id: 'uploadButton'
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    width: '100%',
                    items: [{
                        xytpe: 'label',
                        flex: '3',
                        html: '<center>Download</center><br>'
                    }, {
                        xype: 'label',
                        flex: '1'
                    }, {
                        xytpe: 'label',
                        flex: '3',
                        html: '<center>Upload</center><br>'
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    width: "100%",
                    items: [{
                        xtype: 'button',
                        icon: '../lib/touch/resources/themes/images/default/pictos/settings.png',
                        flex: '3',
                        id: 'settingsButton'
                    }, {
                        xype: 'label',
                        flex: '1'
                    }, {
                        xtype: 'button',
                        icon: '../lib/touch/resources/themes/images/default/pictos/delete_black1.png',
                        flex: '3',
                        id: 'logoutButton'
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    width: "100%",
                    items: [{
                        xtype: 'label',
                        html: '<center>Settings</center><br>',
                        flex: '3'
                    }, {
                        xype: 'label',
                        flex: '1'
                    }, {
                        xtype: 'label',
                        html: '<center>Logout</center><br>',
                        flex: '3'
                    }]
                }]
            }]
        }]
    }

});