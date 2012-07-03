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
Ext.define('mUserStories.view.addReminder',{
    extend:'Ext.Panel',
    config:{
        height:'100%',
        ui:'neutral',
        scrollable:true,
        items:[{
            xtype:'titlebar',
            docked:'top',
            title:'Add Reminder',
            items:[{
                xtype:'button',
                ui:'back',
                text:'Back',
                id:'back_add_rem'
            }]
        },{
            xclass:'mUserStories.view.userToolbar'
        },{
            xtype:'container',
            padding:'10px',
            items:[{
                xtype:'fieldset',
                defaults:{
                    labelWidth:'35%'
                },
                items:[{
                    xtype:'textfield',
                    label:'First',
                    name:'first_rem',
                    placeHolder:'Harry',
                    clearIcon:true,
                    required:true
                },{
                    xtype:'textfield',
                    label:'Last',
                    name:'last_rem',
                    placeHolder:'Last',
                    clearIcon:true,
                    required:true
                },{
                    xtype:'selectfield',
                    label:'Type',
                    id:'type_rem',
                    flex:2,
                    required:true,
                    options:[{
                        text:'',
                        value:'empty'
                    },{
                        text:'Reminder #1',
                        value:'reminder1'
                    },{
                        text:'Reminder #2',
                        value:'reminder2'
                    },{
                        text:'Reminder #3',
                        value:'reminder3'
                    },{
                        text:'Other',
                        value:'otherreminder'
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
                            id: 'ok_rem',
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
                            id: 'cancel_rem',
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
        }]
    }
})