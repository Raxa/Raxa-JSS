Ext.define('Settings.view.General', {
    extend: 'Ext.container.Container',
    
    config: {
        defaults: {
            xtype: 'list',
            ui: 'grouped',
            defaults: {
                disclosure: true
            }
        },
        items: [
            {
                itemTpl:'<div>{title}</div><span>{label}</span>',
                 
                items: [
                    {title: 'About', disclosure: true},
                    {
                        title: 'Usage',
                        label: '1:42',
                        disclosure: true,
                        items: [
                            {
                                tpl: '<div>{title}</div><span>{label}</span>'                                
                            },
                            {
                                xtype: 'disclosure'
                            }
                        ]
                    }
                ]
            },
            {
                items: [
                    {title: 'Sounds'}
                ]
            },
            {
                items: [
                    {title: 'Network'},
                    {
                        title: 'Bluetooth',
                        labelTpl: [
                            '<h3 class="title">{title}</h3>',
                            '<span class="info">{bluetoothStatus}</span>'
                        ]
                    }
                ]
            },
            {
                items: [
                    {
                        title: 'iPad Cover Lock / Unlock',
                        disclosure: false,
                        items: [
                            {
                                xtype: 'image',
                                src: 'asf'
                            },
                            {
                                xtype: 'iteminner',
                                data: {
                                    title: 'asdfsadf',
                                    label: 'sfsfd'
                                }
                            }
                            {
                                xtype: 'toggle'
                            }
                        ]
                    }
                ]
            }
        ]
    }
});