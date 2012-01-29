Ext.require([
    'Ext.form.Panel',
    'Ext.form.FieldSet',
    'Ext.field.Text',
    'Ext.field.Password',
    'Ext.field.Email',
    'Ext.field.Url',
    'Ext.field.Checkbox',
    'Ext.field.Spinner',
    'Ext.field.Select',
    'Ext.field.Hidden',
    'Ext.field.TextArea',
    'Ext.field.Slider',
    'Ext.field.Toggle',
    'Ext.field.Radio',
    'Ext.Button',

    'Ext.data.Store'
]);

Ext.define('User', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'name', type: 'string'},
            {name: 'password', type: 'password'},
            {name: 'disabled', type: 'string'},
            {name: 'email', type: 'string'},
            {name: 'url', type: 'string'},
            {name: 'date', type: 'date'},
            {name: 'number', type: 'integer'},
            {name: 'height', type: 'integer'},
            {name: 'enable', type: 'integer'},
            {name: 'spinner', type: 'integer'},
            {name: 'single_slider'},
            {name: 'multiple_slider'},
            {name: 'rank', type: 'string'},
            {name: 'enable', type: 'boolean'},
            {name: 'cool', type: 'boolean'},
            {name: 'color', type: 'string'},
            {name: 'team', type: 'string'},
            {name: 'secret', type: 'boolean'}
        ]
    }
});

Ext.define('Ranks', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'rank', type: 'string'},
            {name: 'title', type: 'string'}
        ]
    }
});

Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function() {
        var form;
        var ranksStore = Ext.create('Ext.data.Store', {
            data: [
                { rank: 'master', title: 'Master'},
                { rank: 'padawan', title: 'Student'},
                { rank: 'teacher', title: 'Instructor'},
                { rank: 'aid', title: 'Assistant'}
            ],
            model: 'Ranks',
            autoLoad: true,
            autoDestroy: true
        });

        var formBase = {
            url: 'postUser.php',
            standardSubmit: false,
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Personal Info',
                    instructions: 'Please enter the information above.',
                    defaults: {
                        required: true,
                        labelAlign: 'left',
                        labelWidth: '40%'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'name',
                            label: 'Name',
                            clearIcon: true,
                            autoCapitalize: false
                        },
                        {
                            xtype: 'passwordfield',
                            name: 'password',
                            label: 'Password',
                            clearIcon: false
                        },
                        {
                            xtype: 'textfield',
                            name: 'disabled',
                            label: 'Disabled',
                            disabled: true,
                            clearIcon: true
                        },
                        {
                            xtype: 'emailfield',
                            name: 'email',
                            label: 'Email',
                            placeHolder: 'you@sencha.com',
                            clearIcon: true
                        },
                        {
                            xtype: 'urlfield',
                            name: 'url',
                            label: 'Url',
                            placeHolder: 'http://sencha.com',
                            clearIcon: true
                        },
                        {
                            xtype: 'checkboxfield',
                            name: 'cool',
                            label: 'Cool',
                            value: true
                        },
                        {
                            xtype: 'spinnerfield',
                            name: 'spinner',
                            label: 'Spinner'
                        },
                        {
                            xtype: 'selectfield',
                            name: 'rank',
                            label: 'Rank',
                            valueField: 'rank',
                            displayField: 'title',
                            store: ranksStore
                        },
                        {
                            xtype: 'datepickerfield',
                            name: 'date',
                            label: 'Start Date',
                            value: new Date(),
                            picker: {
                                yearFrom: 1980
                            }
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'secret',
                            value: 'false'
                        },
                        {
                            xtype: 'textareafield',
                            name: 'bio',
                            label: 'Bio',
                            maxLength: 60,
                            maxRows: 10
                        },
                        {
                            xtype: 'sliderfield',
                            name: 'height',
                            label: 'Height'
                        },
                        {
                            xtype: 'togglefield',
                            name: 'enable',
                            label: 'Security Mode'
                        },
                        {
                            xtype: 'radiofield',
                            name: 'team',
                            label: 'Red Team',
                            value: 'redteam'
                        },
                        {
                            xtype: 'radiofield',
                            name: 'team',
                            label: 'Blue Team',
                            value: 'blueteam'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Favorite color',
                    defaults: { xtype: 'radiofield' },
                    items: [
                        { name: 'color', label: 'Red', value: 'red' },
                        { name: 'color', label: 'Green', checked: true, value: 'green'}
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'HTML5',
                    items: [
                        {
                            xtype: 'numberfield',
                            name: 'number',
                            label: 'Number'
                        },
                        {
                            xtype: 'emailfield',
                            name: 'email2',
                            label: 'Email',
                            clearIcon: true
                        },
                        {
                            xtype: 'urlfield',
                            name: 'url2',
                            label: 'URL',
                            clearIcon: true
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Single Select',
                    items: [
                        {
                            xtype: 'selectfield',
                            name: 'options',
                            options: [
                                {text: 'This is just a big select with text that is overflowing', value: '1'},
                                {text: 'Another item', value: '2'}
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Single Text',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'single_text',
                            clearIcon: true
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Single Toggle',
                    items: [
                        {
                            xtype: 'togglefield',
                            name: 'single_toggle',
                            value: 1
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Single Slider',
                    items: [
                        {
                            xtype: 'sliderfield',
                            name: 'single_slider',
                            value: 60
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Multiple Slider Thumbs',
                    items: [
                        {
                            xtype: 'sliderfield',
                            name: 'multiple_slider',
                            values: [40, 90]
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    docked: 'bottom',
                    items: [
                        {
                            text: 'Load Model',
                            ui: 'round',
                            handler: function() {
                                if (!formBase.user) {
                                    var date = new Date();
                                    date.setMonth(4);
                                    date.setYear(1989);
                                    date.setDate(1);

                                    formBase.user = Ext.ModelMgr.create({
                                        'name': 'Akura',
                                        'password': 'secret',
                                        'email': 'saru@sencha.com',
                                        'disabled': 'disabled',
                                        'url': 'http://sencha.com',
                                        'single_slider': 10,
                                        'multiple_slider': [20, 40],
                                        'number': 20,
                                        'height': 20,
                                        'spinner': 5,
                                        'enable': 1,
                                        'cool': true,
                                        'date': date,
                                        'team': 'redteam',
                                        'color': 'blue',
                                        'rank': 'padawan',
                                        'secret': true,
                                        'bio': 'Learned the hard way !'
                                    }, 'User');
                                }

                                form.loadModel(formBase.user);
                            }
                        },
                        {xtype: 'spacer'},
                        {
                            text: 'Reset',
                            handler: function() {
                                form.reset();
                            }
                        },
                        {
                            text: 'Save',
                            ui: 'confirm',
                            handler: function() {
                                if (formBase.user) {
                                    form.updateRecord(formBase.user, true);
                                }
                                form.submit({
                                    waitMsg: {message: 'Submitting', cls: 'demos-loading'}
                                });
                            }
                        }
                    ]
                }
            ],

            listeners: {
                submit: function(form, result) {
                    console.log('success', Ext.toArray(arguments));
                },
                exception: function(form, result) {
                    console.log('failure', Ext.toArray(arguments));
                }
            }
        };

        if (Ext.os.deviceType == 'Phone') {
            Ext.apply(formBase, {
                xtype: 'formpanel',
                autoRender: true
            });

            form = Ext.Viewport.add(formBase);
        } else {
            Ext.apply(formBase, {
                autoRender: true,
                modal: true,
                hideOnMaskTap: false,
                height: 505,
                width: 480,
                centered: true,
                fullscreen: true
            });

            form = Ext.create('Ext.form.Panel', formBase);
            form.show();
        }
    }
});
