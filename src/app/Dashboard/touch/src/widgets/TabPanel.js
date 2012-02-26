/**
 * @class Ext.TabPanel
 * @extends Ext.Panel
 *
 * TabPanel is a Container which can hold other components to be accessed in a tabbed
 * interface. It uses a {@link Ext.TabBar} to display a {@link Ext.Tab} for each item defined.
 *
 * <h2>Useful Properties</h2>
 * <ul class="list">
 *   <li>{@link #ui}</li>
 *   <li>{@link #tabBarDock}</li>
 *   <li>{@link #cardSwitchAnimation}</li>
 *   <li>{@link #sortable}</li>
 * </ul>
 * 
 * <h2>Screenshot:</h2>
 *
 * {@img Ext.TabPanel/screenshot.png Ext.TabPanel screenshot}
 * 
 * <h2>Example code:</h2>
 * <pre><code>
new Ext.TabPanel({
    fullscreen: true,
    ui        : 'dark',
    sortable  : true,
    items: [
        {
            title: 'Tab 1',
            html : '1',
            cls  : 'card1'
        },
        {
            title: 'Tab 2',
            html : '2',
            cls  : 'card2'
        },
        {
            title: 'Tab 3',
            html : '3',
            cls  : 'card3'
        }
    ]
});</code></pre>
 * @xtype tabpanel
 */
Ext.TabPanel = Ext.extend(Ext.Panel, {
    /**
     * @cfg {String} cardSwitchAnimation
     * Animation to be used during transitions of cards.
     * Any valid value from Ext.anims can be used ('fade', 'slide', 'flip', 'cube', 'pop', 'wipe'), or false.
     * Defaults to <tt>'slide'</tt>.
     */
    cardSwitchAnimation: 'slide',

    /**
     * @cfg {String} tabBarDock
     * Where to dock the Ext.TabPanel. Valid values are 'top' and 'bottom'.
     */
    tabBarDock: 'top',
    componentCls: 'x-tabpanel',

    /**
     * @cfg {String} ui
     * Defaults to 'dark'.
     */
    ui: 'dark',

    /**
     * @cfg {Object} layout
     * @hide
     */

    /**
     * @cfg {Object} tabBar
     * An Ext.TabBar configuration
     */

    /**
     * @cfg {Boolean} sortable
     * Enable sorting functionality for the TabBar.
     */

    // @private
    initComponent : function() {
        //<deprecated since=0.99>
        if (Ext.isDefined(this.tabBarPosition)) {
            throw new Error("TabPanel: tabBarPosition has been removed. Please use tabBarDock.");
        }
        //</deprecated>

        
        var layout = new Ext.layout.CardLayout(this.layout || {});
        this.layout = null;
        this.setLayout(layout);

        this.tabBar = new Ext.TabBar(Ext.apply({}, this.tabBar || {}, {
            cardLayout: layout,
            cardSwitchAnimation: this.cardSwitchAnimation,
            dock: this.tabBarDock,
            ui: this.ui,
            sortable: this.sortable
        }));

        if (this.dockedItems && !Ext.isArray(this.dockedItems)) {
            this.dockedItems = [this.dockedItems];
        }
        else if (!this.dockedItems) {
            this.dockedItems = [];
        }
        this.dockedItems.push(this.tabBar);

        Ext.TabPanel.superclass.initComponent.call(this);
    },

    /**
     * Retrieves a reference to the Ext.TabBar associated with the TabPanel.
     * @returns {Ext.TabBar} tabBar
     */
    getTabBar : function() {
        return this.tabBar;
    },
    
    // whenever a component is added to the TabPanel, add a
    // tab into the tabBar
    onAdd: function(cmp, idx) {
        var tabBar = this.tabBar;
        // maintain cross reference between tab and card
        cmp.tab = tabBar.insert(idx, {
            xtype: 'tab',
            card: cmp
        });
        tabBar.doLayout();
    },
    
    
    onRemove: function(cmp, autoDestroy) {
        // remove the tab from the tabBar
        if (!this.destroying) {
            this.tabBar.remove(cmp.tab, autoDestroy);
            this.tabBar.doLayout();
        }
    }
});

Ext.reg('tabpanel', Ext.TabPanel);
