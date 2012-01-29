Ext.define('Kitchensink.view.Toolbars', {
    extend: 'Ext.Container',

    requires: [
        'Ext.SegmentedButton'
    ],

    config: {
        cls : 'card',
        html: 'Pick a button, any button. <br /><small>By using SASS, all of the buttons on this screen can be restyled dynamically. The only images used are masks.</small>',

        items: Ext.os.deviceType.toLowerCase() != "phone" ? [
            {
                xtype : 'toolbar',
                ui    : 'light',
                docked: 'top',
                scrollable: {
                    direction: 'horizontal',
                    indicators: false
                },
                items: [
                    {
                        text: 'Back',
                        ui  : 'back'
                    },
                    {
                        text     : 'Default',
                        badgeText: '2'
                    },
                    {
                        text: 'Round',
                        ui  : 'round'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype       : 'segmentedbutton',
                        allowDepress: true,
                        items: [
                            {
                                text   : 'Option 1',
                                pressed: true
                            }, {
                                text: 'Option 2'
                            }, {
                                text: 'Option 3'
                            }
                        ]
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        text: 'Action',
                        ui  : 'action'
                    },
                    {
                        text: 'Forward',
                        ui  : 'forward'
                    }
                ]
            }
        ] : [
            {
                xtype : 'toolbar',
                ui    : 'light',
                docked: 'top',
                scrollable: {
                    direction: 'horizontal',
                    indicators: false
                },
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        text: 'Back',
                        ui  : 'back'
                    },
                    {
                        text     : 'Default',
                        badgeText: '2'
                    },
                    {
                        text: 'Round',
                        ui  : 'round'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            },
            {
                xtype : 'toolbar',
                ui    : 'dark',
                docked: 'bottom',
                scrollable: {
                    direction: 'horizontal',
                    indicators: false
                },
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype       : 'segmentedbutton',
                        allowDepress: true,
                        items: [
                            {
                                text   : 'Option 1',
                                pressed: true
                            }, {
                                text: 'Option 2'
                            }, {
                                text: 'Option 3'
                            }
                        ]
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            }
        ]
    },

    // @private
    constructor: function() {
        this.on({
            scope   : this,
            delegate: 'button',

            tap: 'tapHandler'
        });

        this.callParent(arguments);
    },

    /**
     * Called when any button in these view is tapped
     */
    tapHandler: function(button) {
        this.setHtml("User tapped the '" + button.getText() + "' button.");
    }
});
