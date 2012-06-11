/*Ext.define('demoVersion2.view.optionsPanel', {
    extend: 'Ext.tab.Panel',
    requires : [
    'Ext.form.Panel',
    'Ext.form.FieldSet',
    'Ext.field.Number',
    'Ext.field.Spinner',
    'Ext.field.Password',
    'Ext.field.Email',
    'Ext.field.Url',
    'Ext.field.DatePicker',
    'Ext.field.Select',
    'Ext.field.Hidden',
    'Ext.field.Radio',
    'Ext.field.Slider',
    'Ext.field.Toggle',
    'Ext.field.Search'
    ],
    config : {
        activeTab : 0,
        layout : {
            animation : {
                type : 'slide',
                duration : 250
            }
        },
        tabBar : {
            layout : {
                pack : 'center',
                align : 'center'
            },
            docked : 'bottom',
            scrollable : false
        },
        defaults : {
            scrollable : true
        },
        items : [
        {
            iconCls : 'bookmarks',
            title : 'Select',
            cls : 'tab1',
            layout : {
                align : 'center',
                pack : 'center'
            },
            items : [
            {
            xtype:'container',
                        
                            items:[{
                                    xclass : 'demoVersion2.view.patientOptions'
                            }]
                        
            },
                    
            ]
        },
        {
            iconCls : 'arrow_down',
            title : 'Download',
            cls : 'card dark',
            html : '',
            items : [
                    
        ]
        },
        {
            iconCls : 'arrow_up',
            title : 'Upload',
            cls : 'card',
            html : '',
            items : [
                    
        ]
        },
        {
            iconCls : 'settings',
            title : 'Settings',
            cls : 'card dark',
            html : '',
            items : [
                    
        ]
        },
        {
            iconCls : 'delete',
            title : 'Logout',
            cls : 'card',
            html : '',
            items : [
                    
        ]
        }
        ]
    }
})*/

/*Ext.define('demoVersion2.view.optionsPanel', {
    extend : 'Ext.Container',
    requires : [
        
    ],
    config : {
        cls : 'card',
        html : 'Welcome to MoTeCH mForms 0.80. Please select your options.'
        
    },
    items : [
        {
            xtype : 'toolbar',
            docked : 'top',
            scrollable : {
                direction : 'horizontal',
                indicators : false
            },
            items : [
                
            ]
        },
        {
            xtype : 'toolbar',
            docked : 'bottom'
        }
    ]
})*/

Ext.define('demoVersion2.view.optionsPanel', {
    extend : 'Ext.Container',
    requires : [
        
    ],
    config : {
        fullscreen : true,
        type : 'dark',
        sortable : true ,
        items : [
            {
                xtype : 'container',
                title : 'Tab 1',
                layout : 'fit',
                items : [
                    {
                        xtype : 'fieldset',
                        title : 'Favorite color',
                        defaults : {
                            // xtype : 'radio'
                        },
                        items : [
                            {
                                name : 'color',
                                label : 'red'
                            }
                        ]
                    }
                ]
            }
        ]
    }
})
