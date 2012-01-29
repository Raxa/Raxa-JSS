Ext.define('Ext.app.Application.Touch', {
    override: 'Ext.app.Application',

    constructor: function(config) {
        Ext.apply(config || {}, {
            autoCreateViewport: false,
            onReady: Ext.Function.bind(this.onReady, this)
        });

        this.callOverridden([config]);

        Ext.setup(config);
    },

    onReady: function() {
        var controllers = this.controllers,
            ln = controllers.length,
            i, controller;

        this.controllers = Ext.create('Ext.util.MixedCollection');

        for (i = 0; i < ln; i++) {
            controller = this.getController(controllers[i]);
        }
        this.onBeforeLaunch.call(this);
    }
});

Ext.application({
    name: 'Boxdata',
    launch: function() {
        new Ext.Container({
            fullscreen: true,
            cls: 'outer-container',
            layout: 'fit',
            items: [{
                xtype: 'container',
                cls: 'inner-container',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'container',
                    cls: 'left-container',
                    layout: 'fit',
                    flex: 1,
                    items: [{
                        docked: 'top',
                        xtype: 'container',
                        cls: 'css-height',
                        layout: {
                            type: 'hbox',
                            align: 'middle'
                        },
                        items: [{
                            xtype: 'button',
                            ui: 'back',
                            text: 'Back'
                        }, {
                            xtype: 'button',
                            cls: 'margin-button',
                            text: 'Margin Button'
                        }, {
                            xtype: 'button',
                            text: 'Standard'
                        }]
                    }, {
                        xtype: 'button',
                        text: 'Fitted Button',
                        cls: 'fitted-button'
                    }]
                }, {
                    xtype: 'container',
                    cls: 'right-container',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [{
                        docked: 'bottom',
                        xtype: 'container',
                        cls: 'auto-height',
                        layout: {
                            type: 'hbox',
                            align: 'middle'
                        },
                        items: [{
                            xtype: 'button',
                            ui: 'back',
                            text: 'Back'
                        }, {
                            xtype: 'button',
                            cls: 'margin-button',
                            text: 'Margin Button'
                        }, {
                            xtype: 'button',
                            text: 'Standard'
                        }]
                    }, {
                        xtype: 'button',
                        text: 'Flexed Button',
                        flex: 1
                    }, {
                        xtype: 'button',
                        text: 'Flexed Button',
                        flex: 2
                    }]
                }]
            }]
        });
    }
});