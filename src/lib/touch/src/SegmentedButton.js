/**
 * SegmentedButton is a container for a group of {@link Ext.Button}s. Generally a SegmentedButton would be
 * a child of a {@link Ext.Toolbar} and would be used to switch between different views.
 *
 * # Useful Properties:
 *
 * - {@link #allowMultiple}
 *
 * # Example usage:
 *
 *     var segmentedButton = new Ext.SegmentedButton({
 *         allowMultiple: true,
 *         items: [
 *             {
 *                 text: 'Option 1'
 *             },
 *             {
 *                 text   : 'Option 2',
 *                 pressed: true,
 *                 handler: tappedFn
 *             },
 *             {
 *                 text: 'Option 3'
 *             }
 *         ],
 *         listeners: {
 *             toggle: function(container, button, pressed){
 *                 console.log("User toggled the '" + button.text + "' button: " + (pressed ? 'on' : 'off'));
 *             }
 *         }
 *     });
 *
 */
Ext.define('Ext.SegmentedButton', {
    extend: 'Ext.Container',
    xtype : 'segmentedbutton',
    requires: ['Ext.Button'],

    config: {
        // @inherited
        baseCls: Ext.baseCSSPrefix + 'segmentedbutton',

        /**
         * @cfg {String} pressedCls
         * CSS class when a button is in pressed state.
         * @accessor
         */
        pressedCls: Ext.baseCSSPrefix + 'button-pressed',

        /**
         * @cfg {Boolean} allowMultiple
         * Allow multiple pressed buttons.
         * @accessor
         */
        allowMultiple: false,

        /**
         * @cfg {Boolean} allowDepress
         * Allow toggling the pressed state of each button.
         * Defaults to true when `allowMultiple` is true.
         * @accessor
         */
        allowDepress: null,

        /**
         * @cfg {Array} pressedButtons
         * The pressed buttons for this segmented button.
         * @accessor
         */
        pressedButtons: null,

        // @inherit
        layout: {
            type : 'hbox',
            align: 'stretch'
        },

        // @inherited
        defaultType: 'button'
    },

    /**
     * @event toggle
     * Fires when any child button's pressed state has changed.
     * @param {Ext.SegmentedButton} this
     * @param {Ext.Button} button The toggled button
     * @param {Boolean} isPressed Boolean to indicate if the button was pressed or not
     */

    initialize: function() {
        var me = this;

        me.on({
            delegate: '> button',
            scope   : me,

            release: 'onButtonRelease'
        });

        me.onAfter({
            delegate: '> button',
            scope   : me,

            hiddenchange: 'onButtonHiddenChange'
        });
    },

    updateAllowMultiple: function() {
        if (!this.initialized && !this.getInitialConfig().hasOwnProperty('allowDepress')) {
            this.setAllowDepress(true);
        }
    },

    /**
     * We override initItems so we can check for the pressed config.
     */
    applyItems: function() {
        var me = this,
            pressedButtons = [],
            ln, i, item, items;

        //call the parent first so the items get converted into a MixedCollection
        me.callParent(arguments);

        items = this.getItems();
        ln = items.length;

        for (i = 0; i < ln; i++) {
            item = items.items[i];
            if (item.getInitialConfig('pressed')) {
                pressedButtons.push(items.items[i]);
            }
        }

        me.updateFirstAndLastCls(items);

        me.setPressedButtons(pressedButtons);
    },

    /**
     * Button sets a timeout of 10ms to remove the {@link #pressedCls} on the release event.
     * We don't want this to happen, so lets return false and cancel the event.
     * @private
     */
    onButtonRelease: function(button) {
        var me             = this,
            pressedButtons = me.getPressedButtons(),
            buttons        = [],
            alreadyPressed;

        if (!me.getDisabled() && !button.getDisabled()) {
            //if we allow for multiple pressed buttons, use the existing pressed buttons
            if (me.getAllowMultiple()) {
                buttons = pressedButtons.concat(buttons);
            }

            alreadyPressed = (buttons.indexOf(button) !== -1) || (pressedButtons.indexOf(button) !== -1);

            //if we allow for depressing buttons, and the new pressed button is currently pressed, remove it
            if (alreadyPressed && me.getAllowDepress()) {
                Ext.Array.remove(buttons, button);
            } else if (!alreadyPressed || !me.getAllowDepress()) {
                buttons.push(button);
            }

            me.setPressedButtons(buttons);

            me.fireEvent('toggle', me, button, me.isPressed(button));
        }

        return false;
    },

    // @private
    onButtonHiddenChange: function() {
        this.updateFirstAndLastCls(this.getItems());
    },

    // @private
    updateFirstAndLastCls: function(items) {
        var ln = items.length,
        item, i;

        //add a first cls to the first non-hidden button
        for (i = 0; i < ln; i++) {
            item = items.items[i];
            if (!item.isHidden()) {
                item.addCls(Ext.baseCSSPrefix + 'first');
                break;
            }
        }

        //add a last cls to the last non-hidden button
        for (i = ln - 1; i >= 0; i--) {
            item = items.items[i];
            if (!item.isHidden()) {
                item.addCls(Ext.baseCSSPrefix + 'last');
                break;
            }
        }
    },

    /**
     * @private
     */
    applyPressedButtons: function(newButtons, oldButtons) {
        var me    = this,
            array = [],
            button, ln, i;

        if (Ext.isArray(newButtons)) {
            ln = newButtons.length;
            for (i = 0; i< ln; i++) {
                button = me.getComponent(newButtons[i]);
                if (button && array.indexOf(button) === -1) {
                    array.push(button);
                }
            }
        } else {
            button = me.getComponent(newButtons);
            if (button && array.indexOf(button) === -1) {
                array.push(button);
            }
        }

        return array;
    },

    /**
     * Updates the pressed buttons.
     * @private
     */
    updatePressedButtons: function(newButtons, oldButtons) {
        var me    = this,
            items = me.getItems(),
            item, button, ln, i;

        //loop through existing items and remove the pressed cls from them
        ln = items.length;
        for (i = 0; i < ln; i++) {
            item = items.items[i];
            item.removeCls(me.getPressedCls());
        }

        //loop through the new pressed buttons and add the pressed cls to them
        ln = newButtons.length;
        for (i = 0; i < ln; i++) {
            button = newButtons[i];
            button.addCls(me.getPressedCls());
        }
    },

    /**
     * Returns true if a specified {@link Ext.Button} is pressed
     * @param {Ext.Button} button The button to check if pressed
     * @return {Boolean} pressed
     */
    isPressed: function(button) {
        var pressedButtons = this.getPressedButtons();
        return pressedButtons.indexOf(button) != -1;
    },

    /**
     *
     */
    doSetDisabled: function(disabled) {
        var me = this;

        me.items.each(function(item) {
            item.setDisabled(disabled);
        }, me);

        me.callParent(arguments);
    }
}, function() {
    //<deprecated product=touch since=2.0>
    var me = this;

    /**
     * Activates a button.
     * @param {Number/String/Ext.Button} button. The button to activate.
     * @param {Boolean} pressed if defined, sets the pressed state of the button,
     * otherwise the pressed state is toggled.
     * @param {Boolean} suppressEvents true to suppress toggle events during the action.
     * If allowMultiple is true, then setPressed will toggle the button state.
     * @method setPressed
     * @deprecated 2.0.0
     */
    Ext.deprecateClassMethod(me, 'setPressed', me.prototype.setPressedButtons, '[Ext.SegmentedButton] setPressed is now deprecated, please use setPressedButtons instead');

    /**
     * Gets the currently pressed button(s).
     * @method getPressed
     * @deprecated 2.0.0
     */
    Ext.deprecateClassMethod(me,
        'getPressed',
        me.prototype.getPressedButtons,
        '[Ext.SegmentedButton] getPressed is now deprecated. Please use getPressedButtons instead.'
    );

    //</deprecated>
});
