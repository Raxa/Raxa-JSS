demos.TouchImpl = Ext.extend(Ext.Panel, {
    initComponent : function() {
        this.logger = new Ext.Panel({
            id: 'logger',
            scroll: 'vertical',
            styleHtmlContent: true,
            dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                title: 'Event Log',
                ui: 'light'
            }],
            html: '<span>Try using gestures on the area to the right to see how events are fired.</span>'
        });

        this.info = new Ext.Component({
            xtype: 'component',
            styleHtmlContent: true,
            scroll: 'vertical',
            html: '<p>Sencha Touch comes with a multitude of touch events available on components. Included touch events that can be used are:</p><ul><li>touchstart</li><li>touchmove</li><li>touchend</li><li>touchdown</li><li>scrollstart</li><li>scroll</li><li>scrollend</li><li>tap</li><li>tapstart</li><li>tapcancel</li><li>doubletap</li><li>taphold</li><li>swipe</li><li>pinch</li><li>pinchstart</li><li>pinchend</li></ul>'
        });

        this.touchPad = new demos.TouchImpl.TouchPad({
            listeners: {
                log: this.onLog,
                scope: this
            }
        });

        if (!Ext.is.Phone) {
            this.layout = 'fit';
            this.logger.flex = 1;
            this.info.flex = 1.5;

            this.dockedItems = [{
                dock: 'left',
                width: 250,
                id: 'touchinfopanel',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [this.info, this.logger]
            }];
            this.items = [this.touchPad];
        }
        else {
            this.layout = 'card';
            this.logger.flex = 1;
            this.touchPad.flex = 1;

            this.infoCard = new Ext.Container({
                scroll: 'vertical',
                items: [{
                    xtype: 'button',
                    ui: 'confirm',
                    text: 'Console',
                    style: 'margin: 10px;',
                    handler: this.onConsoleButtonTap,
                    scope: this
                }, {
                    xtype: 'component',
                    styleHtmlContent: true,
                    html: '<p>Sencha Touch comes with a multitude of touch events available on components. Included touch events that can be used are:</p><ul><li>touchstart</li><li>touchmove</li><li>touchend</li><li>scrollstart</li><li>scroll</li><li>scrollend</li><li>singletap</li><li>tap</li><li>doubletap</li><li>taphold</li><li>swipe</li><li>pinch</li></ul>'
                }]
            });

            this.touchCard = new Ext.Container({
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [this.touchPad, this.logger]
            });

            this.items = [this.infoCard, this.touchCard];
        }

        demos.TouchImpl.superclass.initComponent.call(this);
    },

    onConsoleButtonTap : function() {
        this.setActiveItem(this.touchCard, 'slide');
    },

    onLog : function(type, e) {
        var loggerEl = this.logger.body;
        if (!this.started) {
            loggerEl.select('span').remove();
            this.started = true;
        }

        switch (type) {
            default:
                loggerEl.first().insertFirst({
                    tag: 'p',
                    html: type,
                    style: 'margin: 0'
                });
                loggerEl.select('p:nth-child(50)').remove();
            break;
        }
    }
});

demos.TouchImpl.TouchPad = Ext.extend(Ext.Component, {
    id: 'touchpad',
    html: 'Touch here!',

    initComponent : function() {
        this.addEvents('log');
        demos.TouchImpl.TouchPad.superclass.initComponent.call(this);
    },

    afterRender: function() {
        demos.TouchImpl.TouchPad.superclass.afterRender.call(this);

        this.mon(this.el, {
            touchstart: this.handleEvent,
            touchend: this.handleEvent,
            touchmove: this.handleEvent,
            touchdown: this.handleEvent,
            dragstart: this.handleEvent,
            drag: this.handleEvent,
            dragend: this.handleEvent,
            singletap: this.handleEvent,
            tap: this.handleEvent,
            doubletap: this.handleEvent,
            taphold: this.handleEvent,
            tapcancel: this.handleEvent,
            swipe: this.handleEvent,
            pinch: this.handleEvent,
            pinchstart: this.handleEvent,
            pinchend: this.handleEvent,
            scope: this
        });
    },

    handleEvent: function(e) {
        this.fireEvent('log', e.type, e);
    }
});

demos.Touch = new demos.TouchImpl();