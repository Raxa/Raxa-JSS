
/**
 * @class Ext.SegmentedButton
 * @extends Ext.Container
 * <p>SegmentedButton is a container for a group of {@link Ext.Button}s. Generally a SegmentedButton would be 
 * a child of a {@link Ext.Toolbar} and would be used to switch between different views.</p>
 * 
 * <h2>Useful Properties</h2>
 * <ul class="list">
 *   <li>{@link #allowMultiple}</li>
 * </ul>
 * 
 * <h2>Screenshot:</h2>
 *
 * {@img Ext.SegmentedButton/screenshot.png Ext.SegmentedButton screenshot}
 * 
 * <h2>Example usage:</h2>
 * <pre><code>
var segmentedButton = new Ext.SegmentedButton({
    allowMultiple: true,
    items: [
        {
            text: 'Option 1'
        },
        {
            text   : 'Option 2',
            pressed: true,
            handler: tappedFn
        },
        {
            text: 'Option 3'
        }
    ],
    listeners: {
        toggle: function(container, button, pressed){
            console.log("User toggled the '" + button.text + "' button: " + (pressed ? 'on' : 'off'));
        }
    }
});</code></pre>
 * @constructor
 * @param {Object} config The config object
 * @xtype buttons
 */
Ext.SegmentedButton = Ext.extend(Ext.Container, {
    defaultType: 'button',
    componentCls: 'x-segmentedbutton',
    pressedCls: 'x-button-pressed',

    /**
     * @cfg {Boolean} allowMultiple
     * Allow multiple pressed buttons (defaults to false).
     */
    allowMultiple: false,

    /**
     * @cfg {Boolean} allowDepress
     * Allow to depress a pressed button. (defaults to true when allowMultiple is true)
     */
    
    // @private
    initComponent : function() {
        this.layout = Ext.apply({}, this.layout || {}, {
            type: 'hbox',
            align: 'stretch'
        });
        
        Ext.SegmentedButton.superclass.initComponent.call(this);
        
        if (this.allowDepress === undefined) {
            this.allowDepress = this.allowMultiple;
        }
        
        this.addEvents(
            /**
             * @event toggle
             * Fires when any child button's pressed state has changed.
             * @param {Ext.SegmentedButton} this
             * @param {Ext.Button} button The button whose state has changed  
             * @param {Boolean} pressed The new button state.
             */
            'toggle'
        );
    },

    // @private
    initEvents : function() {
        Ext.SegmentedButton.superclass.initEvents.call(this);

        this.mon(this.el, {
            tap: this.onTap,
            capture: true,
            scope: this
        });
    },

    // @private
    afterLayout : function(layout) {
        var me = this;
        
        Ext.SegmentedButton.superclass.afterLayout.call(me, layout);

        if (!me.initialized) {
            me.items.each(function(item, index) {
                me.setPressed(item, !!item.pressed, true); 
            });
            if (me.allowMultiple) {
                me.pressedButtons = me.getPressedButtons();
            }
            me.initialized = true;
        }
    },

    // @private
    onTap : function(e, t) {
        if (!this.disabled && (t = e.getTarget('.x-button'))) {
            this.setPressed(t.id, this.allowDepress ? undefined : true);
        }
    },
    
    /**
     * Gets the pressed button(s)
     * @returns {Array/Button} The pressed button or an array of pressed buttons (if allowMultiple is true)
     */
    getPressed : function() {
        return this.allowMultiple ? this.getPressedButtons() : this.pressedButton;
    },

    /**
     * Activates a button
     * @param {Number/String/Button} position/id/button. The button to activate.
     * @param {Boolean} pressed if defined, sets the pressed state of the button,
     *  otherwise the pressed state is toggled
     * @param {Boolean} suppressEvents true to suppress toggle events during the action.
     * If allowMultiple is true, then setPressed will toggle the button state.
     */
    setPressed : function(btn, pressed, suppressEvents) {
        var me = this;
        
        btn = me.getComponent(btn);
        if (!btn || !btn.isButton || btn.disabled) {
            if (!me.allowMultiple && me.pressedButton) {
                me.setPressed(me.pressedButton, false);
            }
            return;
        }
        
        if (!Ext.isBoolean(pressed)) {
            pressed = !btn.pressed;
        }
        
        if (pressed) {
            if (!me.allowMultiple) {
                if (me.pressedButton && me.pressedButton !== btn) {
                    me.pressedButton.el.removeCls(me.pressedCls);
                    me.pressedButton.pressed = false;
                    if (suppressEvents !== true) {
                        me.fireEvent('toggle', me, me.pressedButton, false);
                    }               
                }
                me.pressedButton = btn;
            }

            btn.el.addCls(me.pressedCls);
            btn.pressed = true;
            btn.preventCancel = true;
            if (me.initialized && suppressEvents !== true) {
                me.fireEvent('toggle', me, btn, true);
            }
        }
        else if (!pressed) {
            if (!me.allowMultiple && btn === me.pressedButton) {
                me.pressedButton = null;
            }
            
            if (btn.pressed) {
                btn.el.removeCls(me.pressedCls);
                btn.pressed = false;
                if (suppressEvents !== true) {
                    me.fireEvent('toggle', me, btn, false);
                }
            }
        }
        
        if (me.allowMultiple && me.initialized) {
            me.pressedButtons = me.getPressedButtons();
        }
    },
    
    // @private
    getPressedButtons : function(toggleEvents) {
        var pressed = this.items.filterBy(function(item) {
            return item.isButton && !item.disabled && item.pressed;
        });
        return pressed.items;
    },

    /**
     * Disables all buttons
     */
    disable : function() {
        this.items.each(function(item) {
            item.disable();
        });

        Ext.SegmentedButton.superclass.disable.apply(this, arguments);
    },

    /**
     * Enables all buttons
     */
    enable : function() {
        this.items.each(function(item) {
            item.enable();
        }, this);

        Ext.SegmentedButton.superclass.enable.apply(this, arguments);
    }
});

Ext.reg('segmentedbutton', Ext.SegmentedButton);