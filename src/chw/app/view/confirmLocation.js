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
Ext.define('mUserStories.view.confirmLocation',{
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
                items:[{
                    xtype:'label',
                    id:'welcome_label'
                }]
            },{
                xtype:'fieldset',
                id:'locationForm',
                items:[{
                    xtype:'selectfield',
                    label:'Location',
                    id:'location',
                    flex:2,
                    required:true,
                    options:[{
                        text:'',
                        value:'empty'
                    },{
                        text:'Location #1',
                        value:'location1'
                    },{
                        text:'Location #2',
                        value:'location2'
                    },{
                        text:'Location #3',
                        value:'location3'
                    },{
                        text:'Other',
                        value:'otherlocation'
                    }]
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
                        text: 'Okay',
                        id: 'ok_loc',
                        flex: '3',
                        ui:'confirm-round'
                    },{
                        xtype: 'label',
                        flex: '1'
                    },{
                        xtype: 'button',
                        text: 'Cancel',
                        id: 'cancel_loc',
                        flex: '3',
                        ui:'decline-round'
                    },{
                        xtype: 'label',
                        flex: '2'
                    }]
                }]
            }]
        }
    ]}
});