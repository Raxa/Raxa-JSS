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
 * This script defines the view Viewport of the registration module
 */
Ext.define('Registration.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: {
        align: 'stretch',
        pack: 'center',
        type: 'hbox'
    },
    initComponent: function () {
        this.items = {
            dockedItems: [{
                xtype: 'toolbar',
                height: 40,
                dock: 'top',
                items: [{
                    xtype: 'image',
                    height: 35,
                    width: 40,
                    src: '../resources/img/iconWhite.png'
                }, {
                    xtype: 'tbfill'
                },{
                    xtype: 'button',
                    height: 35,
                    width: 200,
                    text: 'Registration Home Page',
                    handler: function () {
                        var l = Ext.getCmp('mainRegArea').getLayout();
                        l.setActiveItem(REG_PAGES.HOME.home);
                    }
                }, {
                    xtype: 'tbtext',
                    text: Ext.i18n.appBundle.getMsg('RaxaEmrReg.view.viewport.tbtext') + localStorage.getItem('username')
                }, {
                    xtype: 'tbseparator'
                }, {
                    xtype: 'button',
                    width: 60,
                    text: 'Log Out',
                    handler: function() {
                        Ext.Msg.confirm("Log Out", "Are you sure?", function(btn){
                            if(btn =='yes'){
                                Util.logoutUser();
                                location.reload();
                            }
                        });
                    }
                }]
            }],
            width: 960,
            id: 'mainRegArea',
            activeItem: REG_PAGES.HOME.value,
            layout: {
                type: 'card'
            },
            margin: '2 0 2 0',
            region: 'center',
            items: [{
                xtype: REG_PAGES.HOME.name
            }, {
                xtype: REG_PAGES.REG_1.name
            }, {
                xtype: REG_PAGES.REG_CONFIRM.name
            }, {
                xtype: REG_PAGES.ILLNESS_DETAILS.name
            }, {
                xtype: REG_PAGES.REG_BMI.name
            }, {
                xtype: REG_PAGES.SEARCH_1.name
            }, {
                xtype: REG_PAGES.SEARCH_2.name
            }, {
                xtype: REG_PAGES.SEARCH_CONFIRM.name
            }]
        };
        this.callParent();
    }
});
