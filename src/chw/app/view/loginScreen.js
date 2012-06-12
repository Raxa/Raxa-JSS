// Creates Login Screen

/*Ext.define('demoVersion2.view.loginScreen', {
    extend: 'Ext.Container',
    requires: 'Ext.form.Panel',
    config: {
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'MoTeCH mForms 0.80'
            },
            {   
                xtype: 'formpanel',
                id: 'formpanel',
                height: 340,
                width: 319,
                centered: true,
                items: [
                    
                    {
                        xtype: 'textfield',
                        label: 'Username',
                        id: 'username'
                    },
                    {
                        xtype: 'passwordfield',
                        label: 'Password',
                        id: 'password'
                    },
                    {
                        xtype: 'label',
                        html: '<br>'
                    },
                    {
                        xtype: 'button',
                        text: 'Start',
                        id: 'startButton',
                        ui: 'decline-round'
                    }
                ]
            }
        ]
    }

});*/

Ext.define('demoVersion2.view.loginScreen', {
    extend: 'Ext.Panel',

    config: {
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'MoTeCH mForms 0.80'
            },
            {
                xtype: 'formpanel'
            },
            
            {
                xtype: 'container',
                centered: true,
                width: '100%',
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
                                html : '<strong>Login Please</strong><br>'
                            }
                        ]
                    },{
                        xtype: 'fieldset',
                        // title: ' ',
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'Username',
                                id : 'username',
                                flex: 2
                            },
                            {
                                xtype: 'passwordfield',
                                label: 'Password',
                                id : 'password',
                                flex: 2
                            },
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
                                        xtype: 'label',
                                        flex : '4'
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'Okay',
                                        ui: 'aqua',
                                        id : 'loginOkay',
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
                                        id : 'loginCancel',
                                        flex : '3'
                                    },
                                    {
                                        xtype: 'label',
                                        flex : '4'
                                    }
                                ]
                            }
                        ]
                    }
                    
                    
                ]
            }
            
            
        ]
    }

});