/**
 * Ext.tab.Bar is used internally by {@link Ext.tab.Panel} to create the bar of tabs that appears at the top of the tab
 * panel. It's unusual to use it directly, instead see the {@link Ext.tab.Panel tab panel docs} for usage instructions.
 *
 * Used in the {@link Ext.tab.Panel} component to display {@link Ext.tab.Tab} components.
 *
 * @private
 */
Ext.define('Ext.tab.Bar', {
    extend: 'Ext.Toolbar',
    alternateClassName: 'Ext.TabBar',
    xtype : 'tabbar',

    requires: ['Ext.tab.Tab'],

    config: {
        /**
         * @cfg {Ext.Component} activeTab
         * @accessor
         */
        activeTab: null,

        // @inherit
        baseCls: Ext.baseCSSPrefix + 'tabbar',

        // @private
        defaultType: 'tab',

        // @private
        layout: {
            type: 'hbox',
            align: 'middle'
        }
    },

    /**
     * @event tabchange
     * @param {Ext.tab.Bar} this
     * @param {Ext.tab.Tab} newTab The new Tab
     * @param {Ext.tab.Tab} oldTab The old Tab
     */

    initialize: function() {
        var me = this;
        me.callParent();

        me.on({
            tap: 'onTabTap',

            delegate: '> tab',
            scope   : me
        });
    },

    // @private
    onTabTap: function(tab) {
        this.setActiveTab(tab);
    },

    /**
     * @private
     */
    applyActiveTab: function(activeTab) {
        if (!activeTab && activeTab !== 0) {
            return;
        }

        var activeTabInstance = this.parseActiveTab(activeTab);
        if (!activeTabInstance) {
            // <debug warn>
            Ext.Logger.warn('Trying to set a non-existent activeTab');
            // </debug>
            return;
        }
        return activeTabInstance;
    },

    /**
     * @private
     * When docked to the top, pack left, when on the bottom pack center
     */
    doSetDocked: function(newDocked) {
        var layout = this.getLayout(),
            pack   = newDocked == 'bottom' ? 'center' : 'left';

        //layout isn't guaranteed to be instantiated so must test
        if (layout.isLayout) {
            layout.setPack(pack);
        } else {
            layout.pack = (layout && layout.pack) ? layout.pack : pack;
        }
    },

    /**
     * @private
     * Fires off the tabchange action
     */
    updateActiveTab: function(newTab, oldTab) {
        this.fireAction('tabchange', [this, newTab, oldTab], 'doActiveTabChange');
    },

    /**
     * @private
     * Sets the active tab
     */
    doActiveTabChange: function(me, newTab, oldTab) {
        if (newTab) {
            newTab.setActive(true);
        }

        if (oldTab) {
            oldTab.setActive(false);
        }
    },

    /**
     * @private
     * Parses the active tab, which can be a number or string
     */
    parseActiveTab: function(tab) {
        //we need to call getItems to initialize the items, otherwise they will not exist yet.
        if (typeof tab == 'number') {
            return this.getInnerItems()[tab];
        }
        else if (typeof tab == 'string') {
            tab = Ext.getCmp(tab);
        }
        return tab;
    }
});
