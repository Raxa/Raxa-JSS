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
Ext.define('mUserStories.view.addOptions',{
    extend:'Ext.tab.Panel',
    config:{
        height:'100%',
        ui:'neutral',
        items:[{
            xtype:'titlebar',
            docked:'top',
            title:'Add',
            items:[{
                xtype:'button',
                ui:'back',
                text:'Back',
                id:'back_add'
            }]
        },{
            xclass:'mUserStories.view.userToolbar'
        },{
            xtype:'formpanel',
            id: 'reg_form',
            title:'Register',
            items:[{
                xtype:'fieldset',
                defaults:{
                    labelWidth:'35%'
                },
                items:[{
                    xtype:'textfield',
                    label:'First',
                    name:'first_reg',
                    id:'first_reg',
                    placeHolder:'Harry',
                    required:true,
                    clearIcon:true
                },{
                    xtype:'textfield',
                    label:'Last',
                    name:'last_reg',
                    id:'last_reg',
                    placeHolder:'Potter',
                    required:true,
                    clearIcon:true
                },{
                    xtype:'textfield',
                    label:'Phone',
                    name:'phone_reg',
                    id:'phone_reg',
                    placeHolder:'1234567890',
                    required:true,
                    clearIcon:true
                },{
                    xtype:'textfield',
                    label:'Village',
                    name:'village_reg',
                    id:'village_reg',
                    placeHolder:'Village',
                    required:true,
                    clearIcon:true
                },{
                    xtype : 'container',
                    id:'gender_cont',
                    layout : {
                        type : 'hbox',
                        align: 'stretch',
                        padding : 0
                    },
                    items : [{
                        xtype: 'radiofield',
                        name: 'radiogroup',
                        value: 'Female',
                        label: 'Female',
                        labelWidth : '70%',
                        flex : 1
                    },{
                        xtype : 'radiofield',
                        name : 'radiogroup',
                        value : 'Male',
                        label : 'Male',
                        labelWidth : '70%',
                        flex : 1
                    }]
                },{
                    xtype: 'datepickerfield',
                    destroyPickerOnHide: true,
                    name: 'bday',
                    id: 'bday',
                    label: 'Birthday',
                    required: true,
                    value: new Date(),
                    picker: {
                        yearFrom: 1900
                    }
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
                            flex: '3'
                        },{
                            xtype: 'button',
                            text: 'Okay',
                            id: 'ok_reg',
                            flex: '3',
                            ui:'confirm-round'
                        },{
                            xtype: 'label',
                            flex: '1'
                        },{
                            xtype: 'button',
                            text: 'Cancel',
                            id: 'cancel_reg',
                            flex: '3',
                            ui:'decline-round'
                        },{
                            xtype: 'label',
                            flex: '3'
                        }]
                    }]
                }]
            }]
        },{
            xtype:'formpanel',
            title:'Reminder',
            items:[{
                xtype:'fieldset',
                defaults:{
                    labelWidth:'35%'
                },
                items:[{
                    xtype:'textfield',
                    label:'ID',
                    name:'id_rem',
                    placeHolder:'314',
                    clearIcon:true,
                    required:true
                },{
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
                            flex: '3'
                        },{
                            xtype: 'button',
                            text: 'Okay',
                            id: 'ok_rem',
                            flex: '3',
                            ui:'confirm-round'
                        },{
                            xtype: 'label',
                            flex: '1'
                        },{
                            xtype: 'button',
                            text: 'Cancel',
                            id: 'cancel_rem',
                            flex: '3',
                            ui:'decline-round'
                        },{
                            xtype: 'label',
                            flex: '3'
                        }]
                    }]
                }]
            }]
        },{
            xtype:'formpanel',
            title:'Appointment',
            items:[{
                xtype:'fieldset',
                defaults:{
                    labelWidth:'35%'
                },
                items:[{
                    xtype:'textfield',
                    label:'ID',
                    name:'id_app',
                    placeHolder:'314',
                    clearIcon:true,
                    required:true
                },{
                    xtype:'textfield',
                    label:'First',
                    name:'first_app',
                    placeHolder:'Harry',
                    clearIcon:true,
                    required:true
                },{
                    xtype:'textfield',
                    label:'Last',
                    name:'last_app',
                    placeHolder:'Last',
                    clearIcon:true,
                    required:true
                },{
                    xtype: 'datepickerfield',
                    destroyPickerOnHide: true,
                    name: 'date_app',
                    id: 'date_app',
                    label: 'Date',
                    required: true,
                    value: new Date(),
                    picker: {
                        yearFrom: 1900
                    }
                }]
            }]
        }]
    }
})