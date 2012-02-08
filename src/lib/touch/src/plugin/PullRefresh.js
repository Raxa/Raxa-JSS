/**
 * This plugin adds pull to refresh functionality to the List.
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
 *                     xclass: 'Ext.plugin.PullRefresh',
 *                     pullRefreshText: 'Pull down for more new Tweets!'
 *                 }
 *             ],
 *
 *             itemTpl: [
 *                 '<img src="{profile_image_url}" />',
 *                 '<div class="tweet">{text}</div>'
 *             ]
 *         }
 *     });
 */
Ext.define('Ext.plugin.PullRefresh', {
    extend: 'Ext.Component',
    alias: 'plugin.pullrefresh',
    requires: ['Ext.DateExtras'],

    config: {
        /*
         * @accessor
         */
        list: null,

        /*
         * @cfg {String} pullRefreshText The text that will be shown while you are pulling down.
         * @accessor
         */
        pullRefreshText: 'Pull down to refresh...',

        /*
         * @cfg {String} releaseRefreshText The text that will be shown after you have pulled down enough to show the release message.
         * @accessor
         */
        releaseRefreshText: 'Release to refresh...',

        /*
         * @cfg {String} loadingText The text that will be shown while the list is refreshing.
         * @accessor
         */
        loadingText: 'Loading...',

        /*
         * @cfg {Number} snappingAnimationDuration The duration for snapping back animation after the data has been refreshed
         * @accessor
         */
        snappingAnimationDuration: 150,

        /*
         * @cfg {Function} refreshFn The function that will be called to refresh the list.
         * If this is not defined, the store's load function will be called.
         * The refresh function gets called with a reference to this plugin instance.
         * @accessor
         */
        refreshFn: null,

        /*
         * @cfg {XTemplate/String/Array} pullTpl The template being used for the pull to refresh markup.
         * @accessor
         */
        pullTpl: [
            '<div class="x-list-pullrefresh">',
                '<div class="x-list-pullrefresh-arrow"></div>',
                '<div class="x-loading-spinner">',
                    '<span class="x-loading-top"></span>',
                    '<span class="x-loading-right"></span>',
                    '<span class="x-loading-bottom"></span>',
                    '<span class="x-loading-left"></span>',
                '</div>',
                '<div class="x-list-pullrefresh-wrap">',
                    '<h3 class="x-list-pullrefresh-message">{message}</h3>',
                    '<div class="x-list-pullrefresh-updated">Last Updated: <span>{lastUpdated:date("m/d/Y h:iA")}</span></div>',
                '</div>',
            '</div>'
        ].join('')
    },

    isRefreshing: false,
    currentViewState: '',

    initialize: function() {
        this.callParent();

        this.on({
            painted: 'onPainted',
            scope: this
        });
    },

    onPainted: function() {
        this.pullHeight = this.loadingElement.getHeight();
    },

    init: function(list) {
        var me = this,
            pullTpl = me.getPullTpl(),
            element = me.element,
            scroller = list.getScrollable().getScroller();

        me.setList(list);
        me.lastUpdated = new Date();

        me.getList().insert(0, me);

        pullTpl.overwrite(element, {
            message: me.getPullRefreshText(),
            lastUpdated: me.lastUpdated
        }, true);

        me.loadingElement = element.getFirstChild();
        me.messageEl = element.down('.x-list-pullrefresh-message');
        me.updatedEl = element.down('.x-list-pullrefresh-updated > span');

        me.maxScroller = scroller.getMaxPosition();

        scroller.on({
            maxpositionchange: me.setMaxScroller,
            scroll: me.onScrollChange,
            scope: me
        });
    },

    setMaxScroller: function(scroller, position) {
        this.maxScroller = position;
    },

    onScrollChange: function(scroller, x, y) {
        if (y < 0) {
            this.onBounceTop(y);
        }
        if (y > this.maxScroller.y) {
            this.onBounceBottom(y);
        }
    },

    /**
     * @private
     */
    applyPullTpl: function(config) {
        return (Ext.isObject(config) && config.isTemplate) ? config : new Ext.XTemplate(config);
    },

    onBounceTop: function(y) {
        var me = this,
            list = me.getList(),
            scroller = list.getScrollable().getScroller();

        if (!me.isRefreshing && -y >= me.pullHeight + 10) {
            me.isRefreshing = true;

            me.setViewState('release');

            scroller.getContainer().onBefore({
                dragend: 'onScrollerDragEnd',
                single: true,
                scope: me
            });
        }
        else if (me.isRefreshing && -y < me.pullHeight + 10) {
            me.isRefreshing = false;
            me.setViewState('pull');
        }
    },

    onScrollerDragEnd: function() {
        var me = this;
        if (me.isRefreshing) {
            var list = me.getList(),
                scroller = list.getScrollable().getScroller();

            scroller.minPosition.y = -me.pullHeight;
            scroller.on({
                scrollend: 'loadStore',
                single: true,
                scope: me
            });
        }
    },

    loadStore: function() {
        var me = this,
            list = me.getList(),
            scroller = list.getScrollable().getScroller(),
            store = list.getStore();

        me.setViewState('loading');
        Ext.defer(function() {
            scroller.on({
                scrollend: function() {
                    if (me.getRefreshFn()) {
                        me.getRefreshFn().call(me, me);
                    } else {
                        store.load();
                    }
                    me.resetRefreshState()
                },
                delay: 100,
                single: true,
                scope: me
            });
            scroller.minPosition.y = 0;
            scroller.scrollToAnimated(null, 0);
        }, 500, me);
    },

    onBounceBottom: Ext.emptyFn,

    setViewState: function(state) {
        var me = this;
        var prefix = Ext.baseCSSPrefix,
            messageEl = me.messageEl,
            loadingElement = me.loadingElement;

        if (state === me.currentViewState) {
            return me;
        }
        me.currentViewState = state;


        if (messageEl && loadingElement) {
            switch (state) {
                case 'pull':
                    messageEl.setHtml(me.getPullRefreshText());
                    loadingElement.removeCls([prefix + 'list-pullrefresh-release', prefix + 'list-pullrefresh-loading']);
                break;

                case 'release':
                    messageEl.setHtml(me.getReleaseRefreshText());
                    loadingElement.addCls(prefix + 'list-pullrefresh-release');
                break;

                case 'loading':
                    messageEl.setHtml(me.getLoadingText());
                    loadingElement.addCls(prefix + 'list-pullrefresh-loading');
                    break;
            }
        }

        return me;
    },

    resetRefreshState: function() {
        var me = this;
        me.isRefreshing = false;
        me.lastUpdated = new Date();

        me.setViewState('pull');
        me.updatedEl.setHtml(Ext.util.Format.date(me.lastUpdated, "m/d/Y h:iA"));
    }
});
