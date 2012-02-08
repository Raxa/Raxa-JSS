Ext.define('RaxaEmr.view.Login', {
    extend: 'Ext.Carousel',
    config: {
        fullscreen: true,
        items: [
        {
            xtype: 'fieldset',
            title: 'PATIENT PROFILE INFORMATION',
            align: 'center',
            layout: 'vbox',
            items: [{
                cls: 'halo',
            
                items: [{
                    layout: 'hbox',
                    items: [
                    {
                        styleHtmlContent: true
                    },
                    {
                        xtype:'textfield',
                        label: 'First Name',
                        cls: 'textFieldBckg',
                        labelAlign: 'top',
                        required: true,
                        clearIcon: true,
                        labelWidth:'35%',
                        flex: 1,
                        labelCls: 'textFieldLabelBckg'
                    },
                    {
                        xtype: 'spacer',
                        width: '50px'
                    },
                    {
                        xtype:'textfield',
                        label: 'Last Name',
                        cls: 'textFieldBckg',
                        labelAlign: 'top',
                        required: true,
                        clearIcon: true,
                        labelWidth:'35%',
                        flex: 1,
                        labelCls: 'textFieldLabelBckg'
                    }
                    ]
                },
                {
                    xtype: 'spacer',
                    height: '30px'
                },
                {
                    layout: 'hbox',
                    items: [
                    {
                        xtype:'textfield',
                        label: 'Father/Husband First Name',
                        labelAlign: 'top',
                        required: true,
                        clearIcon: true,
                        labelWidth:'35%',
                        flex: 1,
                        cls: 'textFieldBckg',
                        labelCls: 'textFieldLabelBckg'
                    },
                    {
                        xtype: 'spacer',
                        width: '50px'
                    },
                    {
                        xtype:'textfield',
                        label: 'Last Name',
                        cls: 'textFieldBckg',
                        labelAlign: 'top',
                        required: true,
                        clearIcon: true,
                        labelWidth:'35%',
                        flex: 1,
                        labelCls: 'textFieldLabelBckg'
                    }
                    ]
                            
                },
                {
                    xtype: 'spacer',
                    height: '30px'
                },
                {
                    html: '<div class="labels">Sex</div>'
                },
                {
                    layout: 'hbox',               
                    items: [
                    {
                        xtype: 'radiofield',
                        name : 'color',
                        value: 'male',
                        label: 'Male',
                        labelWidth: '100px',
                        checked: true
                        
                    },
                    {
                        xtype: 'radiofield',
                        name : 'color',
                        value: 'female',
                        labelWidth: '100px',
                        label: 'Female'
                    },
                    {
                        xtype: 'radiofield',
                        name : 'color',
                        value: 'others',
                        label: 'Others',
                        labelWidth: '100px'
                    }
                    ]
                },
                {
                    xtype: 'spacer',
                    height: '30px'
                },
                {
                    html: '<div class="labels"><span style="color:red">*</span>Age Information</div>'
                },
                {
                    xtype: 'panel',
                    id: 'agePanel',
                    flex: 1,
                    
                    items: [
                    {
                        html: '<div class="note">Note: If Date Of Birth (DOB) is not available enter age as on 1st January 2011</div>'
                    }
                    ,
                    {
                        layout: 'hbox',
                        items: [
                        {
                            xtype: 'datepickerfield',
                            label: 'Date Of Birth',
                            labelAlign: 'top',
                            styleHtmlContent: true,
                            cls: 'textFieldBckg',
                            labelCls: 'textFieldLabelBckg',
                            height: '80px'
                        },
                        {
                            xtype: 'spacer',
                            width: '50px'
                        },
                        {
                            xtype: 'spacer',
                            width: '2px',
                            style: 'background-color:#aaa'
                        },
                        {
                            layout: 'vbox',
                            
                            items: [
                            {
                                html: '<div class="labels">Age as on 1st January 2011</div>'
                            }
                            ,
                            {
                                layout: 'hbox',
                            
                                items: [
                                {
                                    xtype:'textfield',
                                    label: 'Years',
                                    labelAlign: 'right',
                                    clearIcon: true,
                                    labelWidth:'35%',
                                    flex: 1,
                                    cls: 'textFieldBckg',
                                    labelCls: 'textFieldLabelBckg'
                                },
                                {
                                    xtype: 'spacer',
                                    width: '50px'
                                },
                                {
                                    xtype:'textfield',
                                    label: 'Months',
                                    cls: 'textFieldBckg',
                                    labelAlign: 'right',
                                    clearIcon: true,
                                    labelWidth:'35%',
                                    flex: 1,
                                    labelCls: 'textFieldLabelBckg'
                                }
                                ]
                            
                            }
                            ]
                        },
                        {
                            xtype: 'spacer',
                            height: '30px',
                            flex: 1
                        }
                        ]
                    }
                    ]
                }
                ]
            }
            ]
        },
        {
            html: '<div class="logoText">Jan Swasthya Sahyog</div>'

        }
        //        {
        //            xtype: 'fieldset',
        //            title: 'Please login',
        //            align: 'center',
        //            centered: true,
        //            style: 'width: 50%;',
        //            labelWidth: '35%',
        //            items: [
        //            {
        //                xtype: 'textfield',
        //                label: 'Username',
        //                clearIcon: true
        //            },
        //            {
        //                xtype: 'passwordfield',
        //                label: 'Password',
        //                clearIcon: true
        //            }
        //            ]
        //        },
        //        {
        //            xtype: 'button',
        //            text: 'SIGN IN',
        //            centered: true,
        //            style: 'margin-top: 180px;'
        //        }
        ]
      
    }
});