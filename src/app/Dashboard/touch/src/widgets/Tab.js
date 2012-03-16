/**
 * @class Ext.Tab
 * @extends Ext.Button
 * 
 * <p>Used in the {@link Ext.TabBar} component. This shouldn't be used directly, instead use {@link Ext.TabBar} or {@link Ext.TabPanel}.</p>
 * 
 * @xtype tab
 */
Ext.Tab = Ext.extend(Ext.Button, {
    isTab: true,
    baseCls: 'x-tab',

    /**
     * @cfg {String} pressedCls
     * The CSS class to be applied to a Tab when it is pressed. Defaults to 'x-tab-pressed'.
     * Providing your own CSS for this class enables you to customize the pressed state.
     */
    pressedCls: 'x-tab-pressed',

    /**
     * @cfg {String} activeCls
     * The CSS class to be applied to a Tab when it is active. Defaults to 'x-tab-active'.
     * Providing your own CSS for this class enables you to customize the active state.
     */
    activeCls: 'x-tab-active',

    /**
     * @property Boolean
     * Read-only property indicating that this tab is currently active.
     * This is NOT a public configuration.
     */
    active: false,

    // @private
    initComponent : function() {
        this.addEvents(
            /**
             * @event activate
             * @param {Ext.Tab} this
             */
            'activate',
            /**
             * @event deactivate
             * @param {Ext.Tab} this
             */
            'deactivate'
        );

        Ext.Tab.superclass.initComponent.call(this);

        var card = this.card;
        if (card) {
            this.card = null;
            this.setCard(card);
        }
    },

    /**
     * Sets the card associated with this tab
     */
    setCard : function(card) {
        if (this.card) {
            this.mun(this.card, {
                activate: this.activate,
                deactivate: this.deactivate,
                scope: this
            });
        }
        this.card = card;
        if (card) {
            Ext.apply(this, card.tab || {});
            this.setText(this.title || card.title || this.text );
            this.setIconClass(this.iconCls || card.iconCls);
            this.setBadge(this.badgeText || card.badgeText);

            this.mon(card, {
                beforeactivate: this.activate,
                beforedeactivate: this.deactivate,
                scope: this
            });
        }
    },

    onRender: function() {
        Ext.Tab.superclass.onRender.apply(this, arguments);
        if (this.active) {
            this.el.addCls(this.activeCls);
        }
    },

    /**
     * Retrieves a reference to the card associated with this tab
     * @returns {Mixed} card
     */
    getCard : function() {
        return this.card;
    },

    // @private
    activate : function() {
        this.active = true;
        if (this.el) {
            this.el.addCls(this.activeCls);
        }
        this.fireEvent('activate', this);
    },

    // @private
    deactivate : function() {
        this.active = false;
        if (this.el) {
            this.el.removeCls(this.activeCls);
        }
        this.fireEvent('deactivate', this);
    }
});

Ext.reg('tab', Ext.Tab);
