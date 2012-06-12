Ext.define('demoVersion2.view.optionsScreen', {
    extend: 'Ext.Panel',

    config: {
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'MoTeCH mForms 0.80'
            },
            {
                xtype: 'container',
                centered: true,
                width: '100%',
                // height : "100%",
                padding: '30px',
                items: [
                    {
                        xtype: 'container',
                        layout : {
                            type : 'vbox',
                            pack : 'center',
                            align : 'middle'
                        },
                        padding: '30px',
                        items : [
                            {
                                xtype : 'label',
                                html : '<strong>Options</strong><br>'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        //height : "100%",
                        layout : {
                            type : 'vbox',
                            pack : 'center',
                            align : 'middle'
                        },
                        items : [
                            {
                                xtype : 'container',
                                layout : 'hbox',
                                width : '100%',
                                // flex : '1',
                                // height : "80",
                                // padding : "0",
                                items : [
                                    {
                                        xtype : 'button',
                                        //text : 'text',
                                        flex: '3',
                                        icon : '../lib/touch/resources/themes/images/default/pictos/team.png', 
                                        //height : 100,
                                        //width : 100,
                                        // padding : '0'
                                        id : 'selectStudy'
                                    },
                                    {
                                        xype : 'label',
                                        flex: '1'
                                    },
                                    {
                                        xtype : 'button',
                                        // text : 'text',
                                        flex: '3',
                                        icon: '../lib/touch/resources/themes/images/default/pictos/folder_black.png',
                                        id : 'selectForms'
                                    }
                                ]
                            },
                            {
                                xtype : 'container',
                                layout : 'hbox',
                                width : '100%',
                                // flex : '1',
                                // height : "80",
                                // padding : "0",
                                items : [
                                    {
                                        xytpe : 'label',
                                        flex : '3',
                                        html : '<center>Select Study</center><br>'
                                    },
                                    {
                                        xype : 'label',
                                        flex: '1'
                                    },
                                    {
                                        xytpe : 'label',
                                        flex : '3',
                                        html : '<center>Select Forms</center><br>'
                                    }
                                ]
                            },
                            {
                                xtype : 'container',
                                layout : 'hbox',
                                width : '100%',
                                // flex : '1',
                                // height : "80",
                                // padding : "0",
                                items : [
                                    {
                                        xtype : 'button',
                                        // text : 'text',
                                        flex: '3',
                                        icon : '../lib/touch/resources/themes/images/default/pictos/doc_down.png', 
                                        // height : 100,
                                        // width : 100,
                                        // padding : '0'
                                        id : 'downloadButton'
                                    },
                                    {
                                        xype : 'label',
                                        flex: '1'
                                    },
                                    {
                                        xtype : 'button',
                                        // text : 'text',
                                        flex: '3',
                                        icon: '../lib/touch/resources/themes/images/default/pictos/doc_up.png',
                                        id : 'uploadButton'
                                    }
                                ]
                            },
                            {
                                xtype : 'container',
                                layout : 'hbox',
                                width : '100%',
                                // flex : '1',
                                // height : "80",
                                // padding : "0",
                                items : [
                                    {
                                        xytpe : 'label',
                                        flex : '3',
                                        html : '<center>Download</center><br>'
                                    },
                                    {
                                        xype : 'label',
                                        flex: '1'
                                    },
                                    {
                                        xytpe : 'label',
                                        flex : '3',
                                        html : '<center>Upload</center><br>'
                                    }
                                ]
                            },
                            {
                                xtype : 'container',
                                layout : 'hbox',
                                // flex : '1',
                                //height : "20%",
                                width : "100%",
                                items : [
                                    {
                                        xtype : 'button',
                                        // text : 'text',
                                        icon : '../lib/touch/resources/themes/images/default/pictos/settings.png', 
                                        flex: '3',
                                        id : 'settingsButton'
                                    },
                                    {
                                        xype : 'label',
                                        flex: '1'
                                    },
                                    {
                                        xtype : 'button',
                                        // text : 'text',
                                        icon : '../lib/touch/resources/themes/images/default/pictos/delete_black1.png', 
                                        flex: '3',
                                        id : 'logoutButton'
                                    }
                                ]
                            },
                            {
                                xtype : 'container',
                                layout : 'hbox',
                                // flex : '1',
                                //height : "20%",
                                width : "100%",
                                items : [
                                    {
                                        xtype : 'label',
                                        html : '<center>Settings</center><br>',
                                        flex: '3'
                                    },
                                    {
                                        xype : 'label',
                                        flex: '1'
                                    },
                                    {
                                        xtype : 'label',
                                        html : '<center>Logout</center><br>',
                                        flex: '3'
                                    },
                                ]
                            }
                            
                        ]
                    },
                    /*{
                        xtype: 'container',
                        // flex : '1',
                        // height : "20%",
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
                                layout : {
                                  pack : 'justify',
                                  align : 'center'
                                },
                                // ui: 'aqua',
                                padding: '10px',
                                width : "100%",
                                items: [
                                    {
                                        xtype: 'label',
                                        flex : '4'
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'Okay',
                                        ui: 'aqua',
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
                                        flex : '3'
                                    },
                                    {
                                        xtype: 'label',
                                        flex : '4'
                                    }
                                ]
                            }
                        ]
                    }*/
                    
                    
                ]
            }
            
            
        ]
    }

});