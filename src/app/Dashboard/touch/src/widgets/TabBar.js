/**
 * @class Ext.TabBar
 * @extends Ext.Panel
 * 
 * <p>Used in the {@link Ext.TabPanel} component to display {@link Ext.Tab} components.</p>
 * 
 * <h2>Screenshot:</h2>
 *
 * {@img Ext.TabBar/screenshot.png Ext.TabBar screenshot}
 * 
 * <h2>Example code:</h2>
<pre><code>
var bar = new Ext.TabBar({
    dock : 'top',
    ui   : 'dark',
    items: [
        {
            text: '1st Button'
        },
        {
            text: '2nd Button'
        }
    ]
});

var myPanel = new Ext.Panel({
    dockedItems: [bar],
    fullscreen : true,
    html       : 'Test Panel'
});
</code></pre>
 * 
 * @xtype tabbar
 */
Ext.TabBar = Ext.extend(Ext.Panel, {
    componentCls: 'x-tabbar',

    /**
     * @type {Ext.Tab}
     * Read-only property of the currently active tab.
     */
    activeTab: null,

    // @private
    defaultType: 'tab',

    /**
     * @cfg {Boolean} sortable
     * Enable sorting functionality for the TabBar.
     */
    sortable: false,

    /**
     * @cfg {Number} sortHoldThreshold
     * Duration in milliseconds that a user must hold a tab
     * before dragging. The sortable configuration must be set for this setting
     * to be used.
     */
    sortHoldThreshold: 350,

    // @private
    initComponent : function() {
        /**
         * @event change
         * @param {Ext.TabBar} this
         * @param {Ext.Tab} tab The Tab button
         * @param {Ext.Component} card The component that has been activated
         */
        this.addEvents('change');

        this.layout = Ext.apply({}, this.layout || {}, {
            type: 'hbox',
            align: 'middle'
        });

        Ext.TabBar.superclass.initComponent.call(this);

    },

    // @private
    initEvents : function() {
        if (this.sortable) {
            this.sortable = new Ext.util.Sortable(this.el, {
                itemSelector: '.x-tab',
                direction: 'horizontal',
                delay: this.sortHoldThreshold,
                constrain: true
            });
            this.mon(this.sortable, 'sortchange', this.onSortChange, this);
        }

        this.mon(this.el, {
            touchstart: this.onTouchStart,
            scope: this
        });

        Ext.TabBar.superclass.initEvents.call(this);
    },

    // @private
    onTouchStart : function(e, t) {
        t = e.getTarget('.x-tab');
        if (t) {
            this.onTabTap(Ext.getCmp(t.id));
        }
    },

    // @private
    onSortChange : function(sortable, el, index) {
    },

    // @private
    onTabTap : function(tab) {
        if (!tab.disabled) {
            if (this.cardLayout) {
                if (this.cardSwitchAnimation) {
                    var animConfig = {
                        reverse: (this.items.indexOf(tab) < this.items.indexOf(this.activeTab)) ? true : false
                    };

                    if (Ext.isObject(this.cardSwitchAnimation)) {
                        Ext.apply(animConfig, this.cardSwitchAnimation);
                    } else {
                        Ext.apply(animConfig, {
                            type: this.cardSwitchAnimation
                        });
                    }
                }
                
                this.cardLayout.setActiveItem(tab.card, animConfig || this.cardSwitchAnimation);
            }
            this.activeTab = tab;
            this.fireEvent('change', this, tab, tab.card);
        }
    },

    /**
     * Returns a reference to the TabPanel's layout that wraps around the TabBar.
     * @private
     */
    getCardLayout : function() {
        return this.cardLayout;
    }
});

Ext.reg('tabbar', Ext.TabBar);
