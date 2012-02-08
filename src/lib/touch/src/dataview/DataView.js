/**
 * DataView makes it easy to create lots of components dynamically, usually based off a {@link Ext.data.Store Store}.
 * It's great for rendering lots of data from your server backend or any other data source and is what powers
 * components like {@link Ext.List}.
 *
 * Use DataView whenever you want to show sets of the same component many times, for examples in apps like these:
 *
 * - List of messages in an email app
 * - Showing latest news/tweets
 * - Tiled set of albums in an HTML5 music player
 *
 * # Creating a Simple DataView
 *
 * At its simplest, a DataView is just a Store full of data and a simple template that we use to render each item:
 *
 *     @example miniphone preview
 *     var touchTeam = Ext.create('Ext.DataView', {
 *         fullscreen: true,
 *         store: {
 *             fields: ['name', 'age'],
 *             data: [
 *                 {name: 'Jamie',  age: 100},
 *                 {name: 'Rob',   age: 21},
 *                 {name: 'Tommy', age: 24},
 *                 {name: 'Jacky', age: 24},
 *                 {name: 'Ed',   age: 26}
 *             ]
 *         },
 *
 *         itemTpl: '<div>{name} is {age} years old</div>'
 *     });
 *
 * Here we just defined everything inline so it's all local with nothing being loaded from a server. For each of the 5
 * data items defined in our Store, DataView will render a {@link Ext.Component Component} and pass in the name and age
 * data. The component will use the tpl we provided above, rendering the data in the curly bracket placeholders we
 * provided.
 *
 * Because DataView is integrated with Store, any changes to the Store are immediately reflected on the screen. For
 * example, if we add a new record to the Store it will be rendered into our DataView:
 *
 *     touchTeam.getStore().add({
 *         name: 'Abe Elias',
 *         age: 33
 *     });
 *
 * We didn't have to manually update the DataView, it's just automatically updated. The same happens if we modify one
 * of the existing records in the Store:
 *
 *     touchTeam.getStore().getAt(0).set('age', 42);
 *
 * This will get the first record in the Store (Jamie), change the age to 42 and automatically update what's on the
 * screen.
 *
 *     @example miniphone
 *     var touchTeam = Ext.create('Ext.DataView', {
 *         fullscreen: true,
 *         store: {
 *             fields: ['name', 'age'],
 *             data: [
 *                 {name: 'Jamie',  age: 100},
 *                 {name: 'Rob',   age: 21},
 *                 {name: 'Tommy', age: 24},
 *                 {name: 'Jacky', age: 24},
 *                 {name: 'Ed',   age: 26}
 *             ]
 *         },
 *
 *         itemTpl: '<div>{name} is {age} years old</div>'
 *     });
 *
 *     touchTeam.getStore().add({
 *         name: 'Abe Elias',
 *         age: 33
 *     });
 *
 *     touchTeam.getStore.getAt(0).set('age', 42);
 *
 * # Loading data from a server
 *
 * We often want to load data from our server or some other web service so that we don't have to hard code it all
 * locally. Let's say we want to load all of the latest tweets about Sencha Touch into a DataView, and for each one
 * render the user's profile picture, user name and tweet message. To do this all we have to do is modify the
 * {@link #store} and {@link #itemTpl} a little:
 *
 *     @example portrait
 *     Ext.create('Ext.DataView', {
 *         fullscreen: true,
 *         cls: 'twitterView',
 *         store: {
 *             autoLoad: true,
 *             fields: ['from_user', 'text', 'profile_image_url'],
 *
 *             proxy: {
 *                 type: 'jsonp',
 *                 url: 'http://search.twitter.com/search.json?q=Sencha Touch',
 *
 *                 reader: {
 *                     type: 'json',
 *                     root: 'results'
 *                 }
 *             }
 *         },
 *
 *         itemTpl: '<img src="{profile_image_url}" /><h2>{from_user}</h2><p>{text}</p><div style="clear: both"></div>'
 *     });
 *
 * The Store no longer has hard coded data, instead we've provided a {@link Ext.data.proxy.Proxy Proxy}, which fetches
 * the data for us. In this case we used a JSON-P proxy so that we can load from Twitter's JSON-P search API. We also
 * specified the fields present for each tweet, and used Store's {@link Ext.data.Store#autoLoad autoLoad} configuration
 * to load automatically. Finally, we configured a Reader to decode the response from Twitter, telling it to expect
 * JSON and that the tweets can be found in the 'results' part of the JSON response.
 *
 * The last thing we did is update our template to render the image, twitter username and message. All we need to do
 * now is add a little CSS to style the list the way we want it and we end up with a very basic twitter viewer. Click
 * the preview button on the example above to see it in action.
 */
Ext.define('Ext.dataview.DataView', {
    extend: 'Ext.Container',

    alternateClassName: 'Ext.DataView',

    mixins: ['Ext.mixin.Selectable'],

    xtype: 'dataview',

    requires: [
        'Ext.LoadMask',
        'Ext.data.StoreManager',
        'Ext.dataview.component.Container',
        'Ext.dataview.element.Container'
    ],

    /**
     * @event itemtouchstart
     * Fires whenever an item is touched
     * @param {Ext.dataview.DataView} this
     * @param {Number} index The index of the item touched
     * @param {Ext.Element/Ext.dataview.component.DataItem} target The element or DataItem touched
     * @param {Ext.data.Model} record The record assosciated to the item
     * @param {Ext.EventObject} e The event object
     */

    /**
     * @event itemtouchmove
     * Fires whenever an item is moved
     * @param {Ext.dataview.DataView} this
     * @param {Number} index The index of the item moved
     * @param {Ext.Element/Ext.dataview.component.DataItem} target The element or DataItem moved
     * @param {Ext.data.Model} record The record assosciated to the item
     * @param {Ext.EventObject} e The event object
     */

    /**
     * @event itemtouchend
     * Fires whenever an item is touched
     * @param {Ext.dataview.DataView} this
     * @param {Number} index The index of the item touched
     * @param {Ext.Element/Ext.dataview.component.DataItem} target The element or DataItem touched
     * @param {Ext.data.Model} record The record assosciated to the item
     * @param {Ext.EventObject} e The event object
     */

    /**
     * @event itemtap
     * Fires whenever an item is tapped
     * @param {Ext.dataview.DataView} this
     * @param {Number} index The index of the item tapped
     * @param {Ext.Element/Ext.dataview.component.DataItem} target The element or DataItem tapped
     * @param {Ext.data.Model} record The record assosciated to the item
     * @param {Ext.EventObject} e The event object
     */

    /**
     * @event itemtaphold
     * Fires whenever an item's taphold event fires
     * @param {Ext.dataview.DataView} this
     * @param {Number} index The index of the item touched
     * @param {Ext.Element/Ext.dataview.component.DataItem} target The element or DataItem touched
     * @param {Ext.data.Model} record The record assosciated to the item
     * @param {Ext.EventObject} e The event object
     */

    /**
     * @event itemdoubletap
     * Fires whenever an item is doubletapped
     * @param {Ext.dataview.DataView} this
     * @param {Number} index The index of the item doubletapped
     * @param {Ext.Element/Ext.dataview.component.DataItem} target The element or DataItem doubletapped
     * @param {Ext.data.Model} record The record assosciated to the item
     * @param {Ext.EventObject} e The event object
     */

    /**
     * @event itemswipe
     * Fires whenever an item is swiped
     * @param {Ext.dataview.DataView} this
     * @param {Number} index The index of the item swiped
     * @param {Ext.Element/Ext.dataview.component.DataItem} target The element or DataItem swiped
     * @param {Ext.data.Model} record The record assosciated to the item
     * @param {Ext.EventObject} e The event object
     */

    /**
     * @event select
     * @preventable doItemSelect
     * Fires whenever an item is selected
     * @param {Ext.dataview.DataView} this
     * @param {Ext.data.Model} record The record assosciated to the item
     */

    /**
     * @event deselect
     * @preventable doItemDeselect
     * Fires whenever an item is deselected
     * @param {Ext.dataview.DataView} this
     * @param {Ext.data.Model} record The record assosciated to the item
     * @param {Boolean} supressed Flag to supress the event
     */

    /**
     * @event refresh
     * @preventable doRefresh
     * Fires whenever the DataView is refreshed
     * @param {Ext.dataview.DataView} this
     */

    config: {
        /**
         * @cfg layout
         * Hide layout config in DataView. It only causes confusion.
         * @accessor
         * @private
         */

        /**
         * @cfg {Ext.data.Store/Object} store
         * Can be either a Store instance or a configuration object that will be turned into a Store. The Store is used
         * to populate the set of items that will be rendered in the DataView. See the DataView intro documentation for
         * more information about the relationship between Store and DataView.
         * @accessor
         */
        store: null,

        // @inherit
        baseCls: Ext.baseCSSPrefix + 'dataview',

        /**
         * @cfg {String} emptyText
         * The text to display in the view when there is no data to display
         */
        emptyText: null,

        /**
         * @cfg {Boolean} deferEmptyText True to defer emptyText being applied until the store's first load
         */
        deferEmptyText: true,

        /**
         * @cfg {String/String[]/Ext.XTemplate} itemTpl
         * The tpl to use for each of the items displayed in this DataView.
         */
        itemTpl: '<div>{text}</div>',

        /**
         * @cfg {String} pressedCls
         * The CSS class to apply to an item on the view while it is being pressed.
         * @accessor
         */
        pressedCls: 'x-item-pressed',

        /**
         * @cfg {String} itemCls
         * An additional CSS class to apply to items within the DataView.
         * @accessor
         */
        itemCls: null,

        /**
         * @cfg {String} selectedCls
         * The CSS class to apply to an item on the view while it is selected.
         * @accessor
         */
        selectedCls: 'x-item-selected',

        /**
         * @cfg {String} triggerEvent
         * Determines what type of touch event causes an item to be selected.
         * Valid options are 'tap' and 'singletap'.
         * @accessor
         */
        triggerEvent: 'itemtap',

        /**
         * @cfg {String} triggerCtEvent
         * Determines what type of touch event is recognized as a touch on the container.
         * Valid options are 'tap' and 'singletap'.
         * @accessor
         */
        triggerCtEvent: 'tap',

        /**
         * @cfg {Boolean} deselectOnContainerClick
         * When set to true, tapping on the DataView's background (i.e. not on
         * an item in the DataView) will deselect any currently selected items.
         * @accessor
         */
        deselectOnContainerClick: true,

        // @inherit
        scrollable: true,

        /**
         * @cfg {Number} pressedDelay
         * The amount of delay between the tapstart and the moment we add the pressedCls.
         * Settings this to true defaults to 100ms.
         * @accessor
         */
        pressedDelay: 100,

        /**
         * @cfg {String} loadingText
         * A string to display during data load operations (defaults to 'Loading...').  If specified, this text will be
         * displayed in a loading div and the view's contents will be cleared while loading, otherwise the view's
         * contents will continue to display normally until the new data is loaded and the contents are replaced.
         */
        loadingText: 'Loading...',

        /**
         * @cfg {Boolean} useComponents
         * Flag the use a component based DataView implementation.  This allows the full use of components in the
         * DataView at the cost of some performance.
         *
         * Checkout the [DataView Guide](#!/guide/dataview) for more information on using this configuration.
         * @accessor
         */
        useComponents: null,

        /**
         * @cfg {Object} itemConfig
         * A configuration object that is passed to every item created by a component based DataView. Because each
         * item that a DataView renders is a Component, we can pass configuration options to each component to
         * easily customize how each child component behaves.
         * Note this is only used when useComponents is true.
         * @accessor
         */
        itemConfig: {},

        /**
         * @cfg {Number} maxItemCache
         * Maintains a cache of reusable components when using a component based DataView.  Improveing performance at
         * the cost of memory.
         * Note this is currently only used when useComponents is true.
         * @accessor
         */
        maxItemCache: 20,

        /**
         * @cfg {String} defaultType
         * The xtype used for the component based DataView. Defaults to dataitem.
         * Note this is only used when useComponents is true.
         * @accessor
         */
        defaultType: 'dataitem'
    },

    constructor: function() {
        var me = this;

        me.hasLoadedStore = false;

        me.mixins.selectable.constructor.apply(me, arguments);

        me.callParent(arguments);
    },

    updateItemCls: function(newCls, oldCls) {
        var container = this.container;
        if (container) {
            if (oldCls) {
                container.doRemoveItemCls(oldCls);
            }
            if (newCls) {
                container.doAddItemCls(newCls);
            }
        }
    },

    storeEventHooks: {
        beforeload: 'onBeforeLoad',
        load: 'onLoad',
        refresh: 'refresh',
        addrecords: 'onStoreAdd',
        removerecords: 'onStoreRemove',
        updaterecord: 'onStoreUpdate'
    },

    doInitialize: function() {
        var me = this,
            container;

        me.on(me.getTriggerCtEvent(), me.onContainerTrigger, me);

        container = me.container = this.add(new Ext.dataview[me.getUseComponents() ? 'component' : 'element'].Container());
        container.dataview = me;

        container.on(me.getTriggerEvent(), me.onItemTrigger, me);

        container.on({
            itemtouchstart: 'onItemTouchStart',
            itemtouchend: 'onItemTouchEnd',
            itemtap: 'onItemTap',
            itemtaphold: 'onItemTapHold',
            itemtouchmove: 'onItemTouchMove',
            itemdoubletap: 'onItemDoubleTap',
            itemswipe: 'onItemSwipe',
            scope: me
        });

        if (this.getStore()) {
            this.refresh();
        }
    },

    //@private
    initialize: function() {
        this.callParent();
        this.doInitialize();
    },

    /**
     * Function which can be overridden to provide custom formatting for each Record that is used by this
     * DataView's {@link #tpl template} to render each node.
     * @param {Object/Object[]} data The raw data object that was used to create the Record.
     * @param {Number} recordIndex the index number of the Record being prepared for rendering.
     * @param {Ext.data.Model} record The Record being prepared for rendering.
     * @return {Array/Object} The formatted data in a format expected by the internal {@link #tpl template}'s overwrite() method.
     * (either an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'}))
     */
    prepareData: function(data, index, record) {
        return data;
    },

    // apply to the selection model to maintain visual UI cues
    onContainerTrigger: function(e) {
        var me = this;
        if (e.target != me.element.dom) {
            return;
        }
        if (me.getDeselectOnContainerClick() && me.getStore()) {
            me.deselectAll();
        }
    },

    // apply to the selection model to maintain visual UI cues
    onItemTrigger: function(container, target, index, e) {
        this.selectWithEvent(this.getStore().getAt(index));
    },

    doAddPressedCls: function(record) {
        var me = this,
        item = me.container.getViewItems()[me.getStore().indexOf(record)];
        if (Ext.isElement(item)) {
            item = Ext.get(item);
        }
        item.addCls(me.getPressedCls());
    },

    onItemTouchStart: function(container, target, index, e) {
        var me = this,
            store = me.getStore(),
            record = store && store.getAt(index),
            pressedDelay = me.getPressedDelay();

        if (record) {
            if (pressedDelay > 0) {
                me.pressedTimeout = Ext.defer(me.doAddPressedCls, pressedDelay, me, [record]);
            }
            else {
                me.doAddPressedCls(record);
            }
        }

        me.fireEvent('itemtouchstart', me, index, target, record, e);
    },

    onItemTouchEnd: function(container, target, index, e) {
        var me = this,
            store = me.getStore(),
            record = store && store.getAt(index);

        if (this.hasOwnProperty('pressedTimeout')) {
            clearTimeout(this.pressedTimeout);
            delete this.pressedTimeout;
        }

        if (record) {
            target.removeCls(me.getPressedCls());
        }

        me.fireEvent('itemtouchend', me, index, target, record, e);
    },

    onItemTouchMove: function(container, target, index, e) {
        var me = this,
            store = me.getStore(),
            record = store && store.getAt(index);

        if (me.hasOwnProperty('pressedTimeout')) {
            clearTimeout(me.pressedTimeout);
            delete me.pressedTimeout;
        }

        if (record) {
            target.removeCls(me.getPressedCls());
        }
        me.fireEvent('itemtouchmove', me, index, target, record, e);
    },

    onItemTap: function(container, target, index, e) {
        var me = this,
            store = me.getStore(),
            record = store && store.getAt(index);

        me.fireEvent('itemtap', me, index, target, record, e);
    },

    onItemTapHold: function(container, target, index, e) {
        var me = this,
            store = me.getStore(),
            record = store && store.getAt(index);

        me.fireEvent('itemtaphold', me, index, target, record, e);
    },

    onItemDoubleTap: function(container, target, index, e) {
        var me = this,
            store = me.getStore(),
            record = store && store.getAt(index);

        me.fireEvent('itemdoubletap', me, index, target, record, e);
    },

    onItemSwipe: function(container, target, index, e) {
        var me = this,
            store = me.getStore(),
            record = store && store.getAt(index);

        me.fireEvent('itemswipe', me, index, target, record, e);
    },

    // invoked by the selection model to maintain visual UI cues
    onItemSelect: function(record, suppressEvent) {
        var me = this;
        if (suppressEvent) {
            me.doItemSelect(me, record);
        } else {
            me.fireAction('select', [me, record], 'doItemSelect');
        }
    },

    // invoked by the selection model to maintain visual UI cues
    doItemSelect: function(me, record) {
        if (me.container) {
            var item = me.container.getViewItems()[me.getStore().indexOf(record)];
            if (Ext.isElement(item)) {
                item = Ext.get(item);
            }
            item.removeCls(me.getPressedCls());
            item.addCls(me.getSelectedCls());
        }
    },

    // invoked by the selection model to maintain visual UI cues
    onItemDeselect: function(record, suppressEvent) {
        var me = this;
        if (me.container) {
            if (suppressEvent) {
                me.doItemDeselect(me, record);
            }
            else {
                me.fireAction('deselect', [me, record, suppressEvent], 'doItemDeselect');
            }
        }
    },

    doItemDeselect: function(me, record) {
        var item = me.container.getViewItems()[me.getStore().indexOf(record)];

        if (Ext.isElement(item)) {
            item = Ext.get(item);
        }

        if (item) {
            item.removeCls([me.getPressedCls(), me.getSelectedCls()]);
        }
    },

    updateData: function(data) {
        var store = this.getStore();
        if (!store) {
            this.setStore(Ext.create('Ext.data.ArrayStore', {
                fields: data
            }));
        } else {
            store.add(data);
        }
    },

    applyStore: function(store) {
        var me = this,
            bindEvents = Ext.apply({}, me.storeEventHooks, { scope: me });

        if (store) {
            store = Ext.data.StoreManager.lookup(store);
            if (store && Ext.isObject(store) && store.isStore) {
                store.on(bindEvents);
            }
            //<debug warn>
            else {
                Ext.Logger.warn("The specified Store cannot be found", this);
            }
            //</debug>
        }

        return store;
    },

    updateStore: function(newStore, oldStore) {
        var me = this,
            bindEvents = Ext.apply({}, me.storeEventHooks, { scope: me }),
            proxy;

        if (oldStore && Ext.isObject(oldStore) && oldStore.isStore) {
            if (oldStore.autoDestroy) {
                oldStore.destroy();
            }
            else {
                oldStore.un(bindEvents);
            }
        }

        if (newStore) {
            proxy = newStore.getProxy();
            if (newStore.isAutoLoading()) {
                this.hasLoadedStore = true;
            }

            if (newStore.isLoading()) {
                this.hasLoadedStore = true;
                me.onBeforeLoad();
            }
            if (me.container) {
                me.refresh();
            }
        }
    },

    onBeforeLoad: function() {
        var loadingText = this.getLoadingText();
        if (loadingText) {

            this.setMasked({
                xtype: 'loadmask',
                message: loadingText
            });
        }
    },

    updateEmptyText: function(newEmptyText) {
        var me = this;
        if (newEmptyText) {
            me.emptyTextCmp = me.add({
                xtype: 'component',
                cls: me.getBaseCls() + '-emptytext',
                html: newEmptyText,
                hidden: true
            });
        }
        else if (me.emptyTextCmp) {
            me.remove(me.emptyTextCmp, true);
            delete me.emptyTextCmp;
        }
    },

    onLoad: function() {
        //remove any masks on the store
        this.hasLoadedStore = true;
        this.setMasked(false);
    },

    /**
     * Refreshes the view by reloading the data from the store and re-rendering the template.
     */
    refresh: function() {
        var me = this,
            container = me.container;

        if (!me.getStore()) {
            if (!me.hasLoadedStore && !me.getDeferEmptyText()) {
                me.showEmptyText();
            }
            return;
        }
        if (container) {
            me.fireAction('refresh', [me], 'doRefresh');
        }
    },

    applyItemTpl: function(config) {
        return (Ext.isObject(config) && config.isTemplate) ? config : new Ext.XTemplate(config);
    },

    onAfterRender: function() {
        var me = this;
        me.callParent(arguments);
        me.updateStore(me.getStore());
    },

    getViewItems: function() {
        return this.container.getViewItems();
    },

    doRefresh: function(me) {
        var container = me.container,
            store = me.getStore(),
            records = store.getRange(),
            items = container.getViewItems(),
            recordsLn = records.length,
            itemsLn = items.length,
            deltaLn = recordsLn - itemsLn,
            scrollable = me.getScrollable(),
            i, item;

        if (scrollable) {
            scrollable.getScroller().scrollTo(0, 0);
        }

        // No items, hide all the items from the collection.
        if (recordsLn < 1) {
            me.onStoreClear();
            return;
        }

        // Too many items, hide the unused ones
        if (deltaLn < 0) {
            container.moveItemsToCache(itemsLn + deltaLn, itemsLn - 1);
            // Items can changed, we need to refresh our references
            items = container.getViewItems();
            itemsLn = items.length;
        }
        // Not enough items, create new ones
        else if (deltaLn > 0) {
            container.doCreateItems(store.getRange(itemsLn), itemsLn);
        }

        // Update Data and insert the new html for existing items
        for (i = 0; i < itemsLn; i++) {
            item = items[i];
            container.updateListItem(records[i], item);
        }
    },

    showEmptyText: function() {
        if (this.hasLoadedStore && this.getEmptyText()) {
            this.emptyTextCmp.show();
        }
    },

    hideEmptyText: function() {
        if (this.getEmptyText()) {
            this.emptyTextCmp.hide();
        }
    },

    onStoreClear: function() {
        var me = this,
            container = me.container,
            items = container.getViewItems();

        container.moveItemsToCache(0, items.length - 1);
        this.showEmptyText();
    },

    // private
    onStoreAdd: function(store, records) {
        if (records) {
            this.container.doCreateItems(records);
        }
    },

    // private
    onStoreRemove: function(store, records, indices) {
        var container = this.container,
            ln = records.length,
            i;
        for (i = 0; i < ln; i++) {
            container.moveItemsToCache(indices[i], indices[i]);
        }
    },

    // private
    onStoreUpdate: function(store, record, newIndex, oldIndex) {
        var me = this,
            container = me.container;
        oldIndex = (typeof oldIndex === 'undefined') ? newIndex : oldIndex;

        if (oldIndex !== newIndex) {
            container.moveItemsToCache(oldIndex, oldIndex);
            container.moveItemsFromCache([record]);
        }
        else {
            // Bypassing setter because sometimes we pass the same record (different data)
            container.updateListItem(record, container.getViewItems()[newIndex]);
        }
    }
}, function() {
    //<deprecated product=touch since=2.0>

    /**
     * Binds a new {@link Ext.data.Store Store} to this DataView.
     * @deprecated 2.0 please use {@link #setStore} instead
     * @method bindStore
     */
    Ext.deprecateClassMethod(this, 'bindStore', this.prototype.setStore, "'bindStore()' is deprecated, please use 'setStore' instead");
    //</deprecated>
});
