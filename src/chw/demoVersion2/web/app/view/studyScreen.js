Ext.define('demoVersion2.view.studyScreen', {
    extend : 'Ext.Panel',
    config : {
        items : [
            {
                xtype : 'titlebar',
                docked : 'top',
                title : 'MoTeCH mForms 0.80'
            },
            {
                xtype : 'container',
                centered : true,
                width : '100%',
                padding : '30px',
                items : [
                    {
                        xtype : 'container',
                        layout : {
                            type : 'vbox',
                            pack : 'center',
                            align : 'middle'
                        },
                        padding : '30px',
                        items : [
                            {
                                xtype : 'label',
                                html : 'Select Study <br>'
                            }
                        ]
                    },
                    {
                        xtype : 'container',
                        layout : {
                            type : 'vbox',
                            pack : 'center',
                            align : 'middle'
                        },
                        items : [
                            {
                                xtype : 'fieldset',
                                defaults : {
                                    labelWidth : '35%'
                                },
                                items : [
                                    {
                                        xtype : 'selectfield',
                                        name : 'study',
                                        label : 'Study',
                                        required : true,
                                        options : [
                                            {
                                                text : 'DemoGroup',
                                                value : 'demogroup'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        layout : {
                                            type : 'vbox',
                                            pack : 'center',
                                            align : 'middle'
                                        },
                                        items :[
                                            {
                                                xtype: 'container',
                                                // centered: true,
                                                layout: 'hbox',
                                                /*layout : {
                                                  pack : 'justify',
                                                  align : 'center'
                                                },*/
                                                // ui: 'aqua',
                                                padding: '10px',
                                                width : "100%",
                                                items: [
                                                    
                                                    {
                                                        xtype: 'button',
                                                        text: 'Okay',
                                                        ui: 'aqua',
                                                        id : 'studyOkay',
                                                        flex : '3'
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        flex : '1'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        text: 'Cancel',
                                                        ui: 'aqua',
                                                        id : 'studyCancel',
                                                        flex : '3'
                                                    },
                                                    
                                                ]
                                            }
                                        ]
                                    }
                                ]
                                
                            },
                            
                        ]
                    }
                ]
            }
        ]
    }
    
})