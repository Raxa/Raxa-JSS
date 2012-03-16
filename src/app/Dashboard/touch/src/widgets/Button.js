/**
 * @class Ext.Button
 * @extends Ext.Component
 *
 * <p>A simple class to display different styles of buttons.</p>
 *
 * <h2>Useful Properties</h2>
 * <ul class="list">
 *   <li>{@link #ui} (defines the style of the button)</li>
 * </ul>
 *
 * <h2>Useful Methods</h2>
 * <ul class="list">
 *   <li>{@link #handler} (method to be called when the button is tapped)</li>
 * </ul>
 *
 * <h2>Screenshot:</h2>
 *
 * {@img Ext.Button/screenshot.png Ext.Button screenshot}
 *
 * <h2>Example code:</h2>
<pre><code>
// an array of buttons (using xtypes) to be included in the panel below
var buttons = [
    {
        text: 'Normal'
    },
    {
        ui  : 'round',
        text: 'Round'
    },
    {
        ui  : 'small',
        text: 'Small'
    }
];

var panel = new Ext.Panel({
    layout: {
        type : 'vbox',
        pack : 'center',
        align: 'stretch'
    },
    defaults: {
        layout: {
            type: 'hbox'
        },
        flex: 1,
        defaults: {
            xtype: 'button',
            cls  : 'demobtn',
            flex : 1
        }
    },
    items: [
        {
            items: buttons // buttons array defined above
        },
        {
            items: [
                new Ext.Button({
                    ui  : 'decline',
                    text: 'Drastic'
                }),
                {
                    ui  : 'decline-round',
                    text: 'Round'
                },
                {
                    ui  : 'decline-small',
                    text: 'Small'
                }
            ]
        },
        {
            items: [
                {
                    ui  : 'confirm',
                    text: 'Confirm'
                },
                {
                    ui  : 'confirm-round',
                    text: 'Round'
                },
                {
                    ui  : 'confirm-small',
                    text: 'Small'
                }
            ]
        }
    ]
});
</code></pre>
 */

/**
 * @constructor
 * Create a new button
 * @param {Object} config The config object
 * @xtype button
 */
Ext.Button = Ext.extend(Ext.Component, {
    /**
     * @cfg {String/Object} autoEvent If provided, a handler function is automatically created that fires
     * the given event in the configured {@link #scope}.
     */

    initComponent: function(){
        this.addEvents(
            /**
             * @event tap
             * Fires when the button is tapped.
             * @param {Ext.Button} this
             * @param {Ext.EventObject} e
             */
            'tap',

            /**
             * @event beforetap
             * Fires when the button is tapped but before we call the handler or fire the tap event.
             * Return false in a handler to prevent this.
             * @param {Ext.Button} this
             * @param {Ext.EventObject} e
             */
            'beforetap'
        );
        Ext.Button.superclass.initComponent.call(this);

        this.createAutoHandler();
    },

    /**
     * @cfg {String} iconCls
     * A css class which sets a background image to be used as the icon for this button
     */

    /**
     * @cfg {String} text The button text to be used as innerHTML (html tags are accepted)
     */

    /**
     * @cfg {String} icon The path to an image to display in the button (the image will be set as the background-image
     * CSS property of the button by default, so if you want a mixed icon/text button, set cls:'x-btn-text-icon')
     */

    /**
     * @cfg {String} iconAlign The alignment of the buttons icon if one has been defined. Valid options
     * are 'top', 'right', 'bottom', 'left' (defaults to 'left').
     */
    iconAlign: 'left',

    /**
     * @cfg {Function} handler A function called when the button is clicked (can be used instead of click event).
     * The handler is passed the following parameters:<div class="mdetail-params"><ul>
     * <li><code>b</code> : Button<div class="sub-desc">This Button.</div></li>
     * <li><code>e</code> : EventObject<div class="sub-desc">The click event.</div></li>
     * </ul></div>
     */

    /**
     * @cfg {Object} scope The scope (<tt><b>this</b></tt> reference) in which the
     * <code>{@link #handler}</code> and <code>{@link #toggleHandler}</code> is
     * executed. Defaults to this Button.
     */

    /**
     * @cfg {Boolean} hidden True to start hidden (defaults to false)
     */

    /**
     * @cfg {Boolean} disabled True to start disabled (defaults to false)
     */

    /**
     * @cfg {String} baseCls Base CSS class
     * Defaults to <tt>'x-button'</tt>
     */
    baseCls: 'x-button',

    /**
     * @cfg {String} pressedCls CSS class when the button is in pressed state
     * Defaults to <tt>'x-button-pressed'</tt>
     */
    pressedCls: 'x-button-pressed',

    /**
     * @cfg {String} badgeText The text to be used for a small badge on the button.
     * Defaults to <tt>''</tt>
     */
    badgeText: '',

    /**
     * @cfg {String} badgeCls CSS class for badge
     * Defaults to <tt>'x-badge'</tt>
     */
    badgeCls: 'x-badge',

    hasBadgeCls: 'x-hasbadge',

    labelCls: 'x-button-label',

    /**
     * @cfg {String} ui
     * Determines the UI look and feel of the button. Valid options are 'normal', 'back', 'round', 'action', 'forward',
     * 'decline', 'confirm' and 'small'. The 'round' and 'small' UIs can also be appended to the other options - for
     * example 'confirm-small', 'action-round', 'forward-small' etc
     * Defaults to 'normal'.
     */
    ui: 'normal',

    isButton: true,

    /**
     * @cfg {String} cls
     * A CSS class string to apply to the button's main element.
     */

    /**
     * @cfg {Number} pressedDelay
     * The amount of delay between the tapstart and the moment we add the pressedCls.
     * Settings this to true defaults to 100ms
     */
    pressedDelay: 0,

    /**
     * @cfg {String} iconMaskCls
     * CSS class to be added to the iconEl when the iconMask config is set to true.
     * Defaults to 'x-icon-mask'
     */
    iconMaskCls: 'x-icon-mask',

    /**
     * @cfg {Boolean} iconMask
     * Whether or not to mask the icon with the iconMaskCls configuration. Defaults to false.
     */
    iconMask: false,

    // @private
    afterRender : function(ct, position) {
        var me = this;

        Ext.Button.superclass.afterRender.call(me, ct, position);

        var text = me.text,
            icon = me.icon,
            iconCls = me.iconCls,
            badgeText = me.badgeText;

        me.text = me.icon = me.iconCls = me.badgeText = null;

        me.setText(text);
        me.setIcon(icon);
        me.setIconClass(iconCls);

        if (me.iconMask && me.iconEl) {
            me.iconEl.addCls(me.iconMaskCls);
        }
        me.setBadge(badgeText);
    },

    // @private
    initEvents : function() {
        var me = this;

        Ext.Button.superclass.initEvents.call(me);

        me.mon(me.el, {
            scope: me,

            tap      : me.onPress,
            tapstart : me.onTapStart,
            tapcancel: me.onTapCancel
        });
    },

    // @private
    onTapStart : function() {
        var me = this;
        if (!me.disabled) {
            if (me.pressedDelay) {
                me.pressedTimeout = setTimeout(function() {
                    me.el.addCls(me.pressedCls);
                }, Ext.isNumber(me.pressedDelay) ? me.pressedDelay : 100);
            }
            else {
                me.el.addCls(me.pressedCls);
            }
        }
    },

    // @private
    onTapCancel : function() {
        var me = this;
        if (me.pressedTimeout) {
            clearTimeout(me.pressedTimeout);
            delete me.pressedTimeout;
        }
        me.el.removeCls(me.pressedCls);
    },

    /**
     * Assigns this Button's click handler
     * @param {Function} handler The function to call when the button is clicked
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the handler function is executed.
     * Defaults to this Button.
     * @return {Ext.Button} this
     */
    setHandler : function(handler, scope) {
        this.handler = handler;
        this.scope = scope;
        return this;
    },

    /**
     * Sets this Button's text
     * @param {String} text The button text. If you pass null or undefined the text will be removed.
     * @return {Ext.Button} this
     */
    setText: function(text) {
        var me = this;

        if (me.rendered) {
            if (!me.textEl && text) {
                me.textEl = me.el.createChild({
                    tag: 'span',
                    html: text,
                    cls: this.labelCls
                });
            }
            else if (me.textEl && text != me.text) {
                if (text) {
                    me.textEl.setHTML(text);
                }
                else {
                    me.textEl.remove();
                    me.textEl = null;
                }
            }
        }
        me.text = text;
        return me;
    },

    /**
     * Sets the background image (inline style) of the button.  This method also changes
     * the value of the {@link icon} config internally.
     * @param {String} icon The path to an image to display in the button. If you pass null or undefined the icon will be removed.
     * @return {Ext.Button} this
     */
    setIcon: function(icon) {
        var me = this;

        if (me.rendered) {
            if (!me.iconEl && icon) {
                me.iconEl = me.el.createChild({
                    tag: 'img',
                    src: Ext.BLANK_IMAGE_URL,
                    style: 'background-image: ' + (icon ? 'url(' + icon + ')' : '')
                });

                me.setIconAlign(me.iconAlign);
            }
            else if (me.iconEl && icon != me.icon) {
                if (icon) {
                    me.iconEl.setStyle('background-image', icon ? 'url(' + icon + ')' : '');
                    me.setIconAlign(me.iconAlign);
                }
                else {
                    me.setIconAlign(false);
                    me.iconEl.remove();
                    me.iconEl = null;
                }
            }
        }
        me.icon = icon;
        return me;
    },

    /**
     * Sets the CSS class that provides a background image to use as the button's icon.  This method also changes
     * the value of the {@link iconCls} config internally.
     * @param {String} cls The CSS class providing the icon image. If you pass null or undefined the iconCls will be removed.
     * @return {Ext.Button} this
     */
    setIconClass: function(cls) {
        var me = this;

        if (me.rendered) {
            if (!me.iconEl && cls) {
                me.iconEl = me.el.createChild({
                    tag: 'img',
                    src: Ext.BLANK_IMAGE_URL,
                    cls: cls
                });

                me.setIconAlign(me.iconAlign);
            }
            else if (me.iconEl && cls != me.iconCls) {
                if (cls) {
                    if (me.iconCls) {
                        me.iconEl.removeCls(me.iconCls);
                    }
                    me.iconEl.addCls(cls);
                    me.setIconAlign(me.iconAlign);
                }
                else {
                    me.setIconAlign(false);
                    me.iconEl.remove();
                    me.iconEl = null;
                }
            }
        }
        me.iconCls = cls;
        return me;
    },

    /**
     * Adds a CSS class to the button that changes the align of the button's icon (if one has been defined).  If no icon or iconClass has
     * been defined, it will only set the value of the {@link iconAlign} internal config.
     * @param {String} alignment The alignment you would like to align the button. Valid options are 'top', 'bottom', 'left', 'right'.
     *                           If you pass false, it will remove the current iconAlign. If you pass nothing or an invalid alignment,
     *                           it will default to the last used/default iconAlign.
     * @return {Ext.Button} this
     */
    setIconAlign: function(alignment) {
        var me         = this,
            alignments = ['top', 'right', 'bottom', 'left'],
            alignment  = ((alignments.indexOf(alignment) == -1 || !alignment) && alignment !== false) ? me.iconAlign : alignment,
            i;

        if (me.rendered && me.iconEl) {
            me.el.removeCls('x-iconalign-' + me.iconAlign);

            if (alignment) me.el.addCls('x-iconalign-' + alignment);
        }
        me.iconAlign = (alignment === false) ? me.iconAlign : alignment;
        return me;
    },

    /**
     * Creates a badge overlay on the button for displaying notifications.
     * @param {String} text The text going into the badge. If you pass null or undefined the badge will be removed.
     * @return {Ext.Button} this
     */
    setBadge : function(text) {
        var me = this;

        if (me.rendered) {
            if (!me.badgeEl && text) {
                me.badgeEl = me.el.createChild({
                    tag: 'span',
                    cls: me.badgeCls,
                    html: text
                });
                me.el.addCls(me.hasBadgeCls);
            }
            else if (me.badgeEl && text != me.badgeText) {
                if (text) {
                    me.badgeEl.setHTML(text);
                    me.el.addCls(me.hasBadgeCls);
                }
                else {
                    me.badgeEl.remove();
                    me.badgeEl = null;
                    me.el.removeCls(me.hasBadgeCls);
                }
            }
        }
        me.badgeText = text;
        return me;
    },

    /**
     * Gets the text for this Button
     * @return {String} The button text
     */
    getText : function() {
        return this.text;
    },

    /**
     * Gets the text for this Button's badge
     * @return {String} The button text
     */
    getBadgeText : function() {
        return this.badgeText;
    },

    // @private
    onDisable : function() {
        this.onDisableChange(true);
    },

    // @private
    onEnable : function() {
        this.onDisableChange(false);
    },

    // @private
    onDisableChange : function(disabled) {
        var me = this;
        if (me.el) {
            me.el[disabled ? 'addCls' : 'removeCls'](me.disabledCls);
            me.el.dom.disabled = disabled;
        }
        me.disabled = disabled;
    },

    // @private
    onPress : function(e) {
        var me = this;
        if (!me.disabled && this.fireEvent('beforetap') !== false) {
            setTimeout(function() {
                if (!me.preventCancel) {
                    me.onTapCancel();
                }
                me.callHandler(e);
                me.fireEvent('tap', me, e);
            }, 10);
        }
    },

    // @private
    callHandler: function(e) {
        var me = this;
        if (me.handler) {
            me.handler.call(me.scope || me, me, e);
        }
    },

    /**
     * @private
     * If {@link #autoEvent} is set, this creates a handler function that automatically fires that configured
     * event. This is called by initComponent and should never need to be called again.
     */
    createAutoHandler: function() {
        var me = this,
            autoEvent = me.autoEvent;

        if (autoEvent) {
            if (typeof autoEvent == 'string') {
                autoEvent = {
                    name: autoEvent,
                    scope: me.scope || me
                };
            }

            me.addEvents(autoEvent.name);

            me.setHandler(function() {
                autoEvent.scope.fireEvent(autoEvent.name, autoEvent.scope, me);
            }, autoEvent.scope);
        }
    }
});

Ext.reg('button', Ext.Button);