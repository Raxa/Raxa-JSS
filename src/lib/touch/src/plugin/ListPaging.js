/**
 * Adds a Load More button at the bottom of the list. When the user presses this button,
 * the next page of data will be loaded into the store and appended to the List.
 *
 * By specifying `{@link #autoPaging}: true`, an 'infinite scroll' effect can be achieved,
 * i.e., the next page of content will load automatically when the user scrolls to the
 * bottom of the list.
 *
 * ## Example
 *
 *     Ext.define('TweetList', {
 *         extend: 'Ext.List',
 *
 *         config: {
 *             store: Ext.create('TweetStore'),
 *
 *             plugins: [
 *                 {
 *                     xclass: 'Ext.plugin.ListPaging',
 *                     autoPaging: true
 *                 }
 *             ],
 *
 *             itemTpl: [
 *                 '<img src="{profile_image_url}" />',
 *                 '<div class="tweet">{text}</div>'
 *             ]
 *         }
 *     });
 *
 */
Ext.define('Ext.plugin.ListPaging', {
    extend: 'Ext.Component',
    alias: 'plugin.listpaging',

    config: {
        /**
         * @cfg {Boolean} autoPaging
         * True to automatically load the next page when you scroll to the bottom of the list.
         */
        autoPaging: false,

        /**
         * @cfg {String} loadMoreText The text used as the label of the Load More button.
         */
        loadMoreText: 'Load More...',

        loadTpl: [
            '<div class="{cssPrefix}loading-spinner" style="font-size: 180%; margin: 10px auto;">',
                 '<span class="{cssPrefix}loading-top"></span>',
                 '<span class="{cssPrefix}loading-right"></span>',
                 '<span class="{cssPrefix}loading-bottom"></span>',
                 '<span class="{cssPrefix}loading-left"></span>',
            '</div>',
            '<div class="{cssPrefix}list-paging-msg">{loadMoreText}</div>'
        ].join('')
    },

    init: function(list) {

        var me = this;

        me.list = list;
        me.store = list.getStore();
        me.scroller = list.getScrollable().getScroller();

        me.store.on('load', me.onListUpdate, me);

        Ext.Function.createInterceptor(this.setStore, function(newStore, oldStore) {
            if (newStore) {
                newStore.on('load', 'onListUpdate', this);
            }
            if (oldStore) {
                oldStore.un('load', 'onListUpdate', this);
            }
        }, this);

        if (this.getAutoPaging()) {
            me.scroller.on({
                scrollend: 'onScrollEnd',
                scope: this
            });
        }
    },

    applyLoadTpl: function(config) {
        return (Ext.isObject(config) && config.isTemplate) ? config : new Ext.XTemplate(config);
    },

    onScrollEnd: function(scroller, position) {
        if (!this.loading && position.y >= scroller.maxPosition.y) {
            this.loading = true;
            this.loadNextPage();
        }
    },

    onListUpdate: function() {
        this.loading = false;
        this.addLoadMoreCmp();

        if (this.scrollY) {
            this.scroller.scrollTo(null, this.scrollY);
        }
        this.maxScroller = this.scroller.getMaxPosition();
        this.loadMoreCmp.removeCls(Ext.baseCSSPrefix + 'loading');
    },

    onBeforeLoad: function() {
        if (this.loading && this.list.store.getCount() > 0) {
            return false;
        }
    },

    addLoadMoreCmp: function() {

        if (this.loadMoreCmp) {
            return;
        }

        // Disable main list load mask
        this.list.onBeforeLoad = function() { return true; }

        this.loadMoreCmp = this.list.add({
            xclass: 'Ext.dataview.element.List',
            baseCls: Ext.baseCSSPrefix + 'list-paging',
            html: this.getLoadTpl().apply({
                cssPrefix: Ext.baseCSSPrefix,
                loadMoreText: this.getLoadMoreText()
            }),
            listeners: {
                itemtap: 'loadNextPage',
                scope: this
            }
        });
    },

    loadNextPage: function() {

        this.loadMoreCmp.addCls(Ext.baseCSSPrefix + 'loading');
        this.scrollY = this.scroller.position.y;

        this.list.getStore().nextPage({ addRecords: true });
    }
});
