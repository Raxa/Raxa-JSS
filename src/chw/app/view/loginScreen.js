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
Ext.define('mUserStories.view.loginScreen',{
    extend:'Ext.Panel',
    config:{
        items:[{
            xtype:'titlebar',
            docked:'top',
            title:'Mobile User Stories'
        },{
            xtype:'container',
            centered:true,
            width:'100%',
            padding:'30px',
            items:[{
                xtype:'container',
                layout:{
                    type:'vbox',
                    pack:'center',
                    align:'middle'
                },
                padding:'30px',
                items: [{
                    xtype:'label',
                    html:'Login Please<br>'
                }]
            },{
                xtype:'fieldset',
                id:'loginForm',
                items:[{
                    xtype:'textfield',
                    label:'Username',
                    id:'username',
                    flex:2
                },{
                    xtype:'passwordfield',
                    label:'Password',
                    id:'password',
                    flex:2
                }]
            },{
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
                    items: [{
                        xtype: 'label',
                        flex: '2'
                    },{
                        xtype: 'button',
                        // text: 'Okay',
                        id: 'ok_login',
                        // flex: '1',
                        ui:'confirm-round',
                        icon:'resources/rsz_check2.png',
                        width:'45px',
                        height:'45px',
                        padding:'0px 0px 0px 3px'
                    },{
                        xtype: 'label',
                        flex: '2'
                    },{
                        xtype: 'button',
                        // text: 'Cancel',
                        id: 'cancel_login',
                        ui:'decline-round',
                        icon:'resources/rsz_delete1.png',
                        width:'45px',
                        height:'45px',
                        padding:'0px 0px 0px 3px'
                    },{
                        xtype: 'label',
                        flex: '2'
                    }]
                }]
            }]
        }]
    }
});