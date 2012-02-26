Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,

    onReady: function() {

        var tapHandler = function(button, event) {
            var txt = "User tapped the '" + button.text + "' button.";
            Ext.getCmp('toolbartxt').update(txt);
        };

        var buttonsGroup1 = [{
            text: 'Back',
            ui: 'back',
            handler: tapHandler
        }, {
            text: 'Default',
            handler: tapHandler
        }, {
            text: 'Round',
            ui: 'round',
            handler: tapHandler
        }];

        var buttonsGroup2 = [{
            xtype: 'segmentedbutton',
            items: [{
                text: 'Option 1',
                handler: tapHandler
            }, {
                text: 'Option 2',
                pressed : true,
                handler: tapHandler
            }, {
                text: 'Option 3',
                handler: tapHandler
            }]
        }];

        var toolbar_icons = {
            xtype: 'toolbar',
            dock: 'top',
            scroll: 'horizontal',
            items: [
                { iconMask: true, iconCls: 'action' },
                { iconMask: true, ui: 'plain', iconCls: 'add' },
                { iconMask: true, text: 'Test', iconCls: 'attachment' },
                { iconMask: true, text: 'Test', ui: 'plain', iconCls: 'bookmarks' },
                { iconMask: true, ui: 'round', iconCls: 'bolt' },
                { iconMask: true, ui: 'action', iconCls: 'chat', badgeText: '2' },
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
                { iconMask: true, ui: 'decline-small', iconCls: 'search' },
                { iconMask: true, ui: 'decline-small', iconCls: 'tag', text: 'Tag' },
                { iconMask: true, iconCls: 'x-icon-mask trash' }
            ]
        }

        var disabled_toolbar_icons = Ext.apply({}, toolbar_icons, {
            defaults: {
                disabled: true
            }
        });

        var buttonsGroup3 = [{
            text: 'Action',
            ui: 'action',
            handler: tapHandler
        }, {
            text: 'Forward',
            ui: 'forward',
            handler: tapHandler
        }];

        var buttonsGroup4 = [{
            xtype: 'segmentedbutton',
            allowMultiple: true,
            items: [{
                text: 'Toggle 1',
                pressed : true
            }, {
                text: 'Toggle 2',
                pressed : true
            }, {
                text: 'Toggle 3'
            }],
            listeners : {
                toggle : function(container, button, active){
                    var txt = "User toggled the '" + button.text + "' button: " + (active ? 'on' : 'off');
                    Ext.getCmp('toolbartxt').update(txt);
                }
            }
        }];

        var buttonsGroup5 = [{
            text: 'VCard',
            icon: 'vcard.png'
        }, {
            icon: 'vcard.png'
        }, {
            text: 'VCard',
            icon: 'vcard.png',
            iconAlign: 'right'
        }, {
            text: 'VCard',
            icon: 'vcard.png',
            iconAlign: 'bottom'
        }, {
            text: 'VCard',
            icon: 'vcard.png',
            iconAlign: 'top'
        }, {
            text: 'Refresh',
            iconMask: true,
            iconCls: 'refresh'
        }, {
            iconCls: 'refresh',
            iconMask: true
        }, {
            text: 'Refresh',
            iconCls: 'refresh',
            iconAlign: 'right',
            iconMask: true
        }, {
            text: 'Refresh',
            iconCls: 'refresh',
            iconAlign: 'bottom',
            iconMask: true
        }, {
            text: 'Refresh',
            iconCls: 'refresh',
            iconAlign: 'top',
            iconMask: true
        }];

        var buttonsGroup6 = [{
            text: 'Test',
            ui: 'plain'
        }, {
            text: 'VCard',
            ui: 'plain',
            icon: 'vcard.png'
        }, {
            text: 'VCard',
            ui: 'plain',
            icon: 'vcard.png',
            iconAlign: 'right'
        }, {
            text: 'VCard',
            ui: 'plain',
            icon: 'vcard.png',
            iconAlign: 'bottom'
        }, {
            text: 'Test',
            ui: 'plain',
            icon: 'vcard.png',
            iconAlign: 'top'
        }];


        if (!Ext.is.Phone) {
            buttonsGroup1.push({xtype: 'spacer'});
            buttonsGroup2.push({xtype: 'spacer'});

            var dockedItems = [{
                xtype: 'toolbar',
                // dock this toolbar at the top
                dock: 'top',
                items: buttonsGroup1.concat(buttonsGroup2).concat(buttonsGroup3).concat(buttonsGroup4)
            }, {
                xtype: 'toolbar',
                // dock this toolbar at the bottom
                ui: 'light',
                dock: 'bottom',
                items: buttonsGroup1.concat(buttonsGroup2).concat(buttonsGroup3).concat(buttonsGroup4)
            }];
            new Ext.Panel({
                id: 'toolbartxt',
                fullscreen: true,
                // styleHtmlContent: true,
                dockedItems: dockedItems,
                defaults: {
                    scroll: 'vertical',
                    xtype: 'panel',
                    layout: 'hbox',
                    pack: 'justify',
                    align: 'center',
                    defaults: {
                        xtype: 'button',
                        ui: 'confirm'
                    }
                },
                items: [{
                    dockedItems: [
                        toolbar_icons, disabled_toolbar_icons
                    ],
                    items: buttonsGroup5.concat(buttonsGroup6)
                }]
            });
        // Phone has far less screen real-estate
        } else {
            var dockedItems = [{
                xtype: 'toolbar',
                ui: 'light',
                items: buttonsGroup1,
                dock: 'top'
            }, {
                xtype: 'toolbar',
                ui: 'dark',
                items: buttonsGroup2,
                dock: 'top'
            }, {
                xtype: 'toolbar',
                ui: 'dark',
                items: buttonsGroup3,
                dock: 'top'
            }, {
                xtype: 'toolbar',
                ui: 'light',
                items: buttonsGroup4,
                dock: 'bottom'
            }];
        }

        new Ext.Panel({
            id: 'toolbartxt',
            html: 'Pick a button, any button. <br /><small>By using SASS, all of the buttons on this screen can be restyled dynamically. The only images used are masks.</small>',
            fullscreen: true,
            styleHtmlContent: true,
            dockedItems: dockedItems
        });
    }
});
