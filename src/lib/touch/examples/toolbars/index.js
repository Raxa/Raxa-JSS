Ext.require([
    'Ext.SegmentedButton',
    'Ext.Container',
    'Ext.Toolbar',
    'Ext.Button'
]);

Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,

    onReady: function() {
        var dockedItems;

        if (Ext.os.deviceType != "Phone") {
            dockedItems = [
                {
                    xtype: 'toolbar',
                    docked: 'top',
                    scrollable: {
                        direction: 'horizontal',
                        indicators: false
                    },
                    items: [
                        { ui: 'back', text: 'Back' },
                        { text: 'Default' },
                        { ui: 'round', text: 'Round' },

                        { xtype: 'spacer' },

                        {
                            xtype: 'segmentedbutton',
                            items: [
                                { text: 'Option 1' },
                                { text: 'Option 2', pressed: true },
                                { text: 'Option 3' }
                            ]
                        },

                        { xtype: 'spacer' },

                        { ui: 'action', text: 'Action' },
                        { ui: 'forward', text: 'Forward' },
                        {
                            xtype: 'segmentedbutton',
                            allowMultiple: true,
                            items: [
                                { text: 'Toggle 1', pressed: true },
                                { text: 'Toggle 2', pressed: true },
                                { text: 'Toggle 3' }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    docked: 'top',
                    scrollable: {
                        direction: 'horizontal',
                        indicators: false
                    },
                    items: [
                        { iconMask: true, iconCls: 'action' },
                        { iconMask: true, ui: 'plain', iconCls: 'add' },
                        { iconMask: true, text: 'Test', iconCls: 'action' },
                        { iconMask: true, text: 'Test', ui: 'plain', iconCls: 'bookmarks' },
                        { iconMask: true, ui: 'round', iconCls: 'download' },
                        { iconMask: true, ui: 'action', iconCls: 'settings', badgeText: '2' },
                        { iconMask: true, ui: 'confirm-round', iconCls: 'compose' },
                        { iconMask: true, ui: 'decline', iconCls: 'delete' },
                        { iconMask: true, iconAlign: 'right', ui: 'round', text: 'Home', iconCls: 'home' },
                        { iconMask: true, ui: 'action-round', iconCls: 'locate' },
                        { xtype: 'segmentedbutton', items: [
                          { iconMask: true, iconCls: 'maps' },
                          { iconMask: true, iconCls: 'organize', text: 'Sort' },
                          { iconMask: true, iconCls: 'refresh' }
                        ]},
                        { iconMask: true, ui: 'back', iconCls: 'reply' },
                        // { iconMask: true, ui: 'decline-small', iconCls: 'search' },
                        // { iconMask: true, ui: 'decline-small', iconCls: 'star', text: 'Tag' },
                        { iconMask: true, iconCls: 'x-icon-mask trash' }
                    ]
                },
                {
                    xtype: 'toolbar',
                    docked: 'top',
                    scrollable: {
                        direction: 'horizontal',
                        indicators: false
                    },
                    defaults: {
                        disabled: true
                    },
                    items: [
                        { iconMask: true, iconCls: 'action' },
                        { iconMask: true, ui: 'plain', iconCls: 'add' },
                        { iconMask: true, text: 'Test', iconCls: 'action' },
                        { iconMask: true, text: 'Test', ui: 'plain', iconCls: 'bookmarks' },
                        { iconMask: true, ui: 'round', iconCls: 'download' },
                        { iconMask: true, ui: 'action', iconCls: 'settings', badgeText: '2' },
                        { iconMask: true, ui: 'confirm-round', iconCls: 'compose' },
                        { iconMask: true, ui: 'decline', iconCls: 'delete' },
                        { iconMask: true, iconAlign: 'right', ui: 'round', text: 'Home', iconCls: 'home' },
                        { iconMask: true, ui: 'action-round', iconCls: 'locate' },
                        { xtype: 'segmentedbutton', items: [
                          { iconMask: true, iconCls: 'maps' },
                          { iconMask: true, iconCls: 'organize', text: 'Sort' },
                          { iconMask: true, iconCls: 'refresh' }
                        ]},
                        { iconMask: true, ui: 'back', iconCls: 'reply' },
                        // { iconMask: true, ui: 'decline-small', iconCls: 'search' },
                        // { iconMask: true, ui: 'decline-small', iconCls: 'star', text: 'Tag' },
                        { iconMask: true, iconCls: 'x-icon-mask trash' }
                    ]
                },
                {
                    xtype: 'toolbar',
                    docked: 'bottom',
                    scrollable: {
                        direction: 'horizontal',
                        indicators: false
                    },
                    ui: 'light',
                    items: [
                        { ui: 'back', text: 'Back' },
                        { text: 'Default' },
                        { ui: 'round', text: 'Round' },

                        { xtype: 'spacer' },

                        {
                            xtype: 'segmentedbutton',
                            items: [
                                { text: 'Option 1' },
                                { text: 'Option 2', pressed: true },
                                { text: 'Option 3' }
                            ]
                        },

                        { xtype: 'spacer' },

                        { ui: 'action', text: 'Action' },
                        { ui: 'forward', text: 'Forward' },
                        {
                            xtype: 'segmentedbutton',
                            allowMultiple: true,
                            items: [
                                { text: 'Toggle 1', pressed: true },
                                { text: 'Toggle 2', pressed: true },
                                { text: 'Toggle 3' }
                            ]
                        }
                    ]
                }
            ];
        } else {
            dockedItems = [
                {
                    xtype: 'toolbar',
                    docked: 'top',
                    items: [
                        { ui: 'back', text: 'Back' },
                        { text: 'Default' },
                        { ui: 'round', text: 'Round' }
                    ]
                },
                {
                    xtype: 'toolbar',
                    docked: 'top',
                    items: [
                        {
                            xtype: 'segmentedbutton',
                            items: [
                                { text: 'Option 1' },
                                { text: 'Option 2', pressed: true },
                                { text: 'Option 3' }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    docked: 'top',
                    items: [
                        { ui: 'action', text: 'Action' },
                        { ui: 'forward', text: 'Forward' }
                    ]
                },
                {
                    xtype: 'toolbar',
                    docked: 'bottom',
                    ui: 'light',
                    items: [
                        {
                            xtype: 'segmentedbutton',
                            allowMultiple: true,
                            items: [
                                { text: 'Toggle 1', pressed: true },
                                { text: 'Toggle 2', pressed: true },
                                { text: 'Toggle 3' }
                            ]
                        }
                    ]
                }
            ];
        }

        Ext.create('Ext.Container', {
            id              : 'toolbartxt',
            html            : 'Pick a button, any button. <br /><small>By using SASS, all of the buttons on this screen can be restyled dynamically. The only images used are masks.</small>',
            fullscreen      : true,
            styleHtmlContent: true,
            items           : dockedItems
        });
    }
});
