Ext.define('demoVersion2.view.settingsScreen', {
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
                                html : 'Settings<br>'
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
                                xtype : 'button',
                                text : 'Connection',
                                id : 'settingsConnection',
                                width : '100%'
                            },
                            {
                                xtype : 'button',
                                text : 'Cancel',
                                id : 'settingsCancel',
                                width : '100%',
                                ui : 'decline'
                            }
                        ]
                    }
                ]
            }
        ]
    }
    
})