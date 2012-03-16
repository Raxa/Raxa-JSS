/**
 * @class Ext.plugins.ListPagingPlugin
 * @extends Ext.util.Observable
 * This plugin adds pull to refresh functionality to the List.
 */
Ext.plugins.PullRefreshPlugin = Ext.extend(Ext.util.Observable, {
    /**
     * @cfg {String} pullRefreshText The text that will be shown while you are pulling down.
     */
    pullRefreshText: 'Pull down to refresh...',

    /**
     * @cfg {String} pullRefreshText The text that will be shown after you have pulled down enough to show the release message.
     */
    releaseRefreshText: 'Release to refresh...',

    /**
     * @cfg {String} pullRefreshText The text that will be shown while the list is refreshing.
     */
    loadingText: 'Loading...',

    /**
     * @cfg {String} snappingAnimationDuration The duration for snapping back animation after the data has been refreshed
     */
    snappingAnimationDuration: 150,

    /**
     * @cfg {Function} refreshFn The function that will be called to refresh the list. If this is not defined, the store's load
     * function will be called. The refresh function gets called with two parameters. The first one is the callback function
     * that should be called after your refresh is complete. The second one is a reference to this plugin instance.
     */
    refreshFn: null,

    /**
     * @cfg {XTemplate/String/Array} pullTpl The template being used for the pull to refresh markup.
     */
    pullTpl: new Ext.XTemplate(
        '<div class="x-list-pullrefresh">',
            '<div class="x-list-pullrefresh-arrow"></div>',
            Ext.LoadingSpinner,
            '<div class="x-list-pullrefresh-wrap">',
                '<h3 class="x-list-pullrefresh-message">{message}</h3>',
                '<div class="x-list-pullrefresh-updated">Last Updated: <span>{lastUpdated:date("m/d/Y h:iA")}</span></div>',
            '</div>',
        '</div>'
    ),

    isRefreshing: false,
    isLoading: false,
    currentViewState: '',

    init: function(list) {
        this.list = list;
        this.lastUpdated = new Date();

        list.on('update', this.onListUpdate, this);

        list.onBeforeLoad = Ext.util.Functions.createInterceptor(list.onBeforeLoad, this.onBeforeLoad, this);
    },

    /**
     * This function renders the pull to refresh markup into the list if it doesnt exist yet. It also makes sure
     * that the pull to refresh element is inserted to the beginning of the list again after the List items have
     * been updated.
     * @private
     */
    onListUpdate: function() {
        if (!this.rendered) {
            this.render();
        }

        this.list.getTargetEl().insertFirst(this.el);

        if (!this.refreshFn) {
            this.onLoadComplete.call(this);
        }
    },

    /**
     * This function renders the pull to refresh markup into the list and binds listeners to the scroller.
     * @private
     */
    render : function() {
        var list = this.list,
            targetEl = list.getTargetEl(),
            scroller = targetEl.getScrollParent();

        if (!this.pullTpl.isTemplate) {
            this.pullTpl = new Ext.XTemplate(this.pullTpl);
        }

        this.el = this.pullTpl.insertFirst(targetEl, {
            message: this.pullRefreshText,
            lastUpdated: this.lastUpdated
        }, true);

        this.messageEl = this.el.down('.x-list-pullrefresh-message');
        this.updatedEl = this.el.down('.x-list-pullrefresh-updated > span');

        this.pullHeight = this.el.getHeight();

        // We won't be using the event since it might affect the scroller speed.
        this.scroller = scroller;

        scroller.on('bouncestart', this.onBounceStart, this);
        scroller.on('offsetchange', this.onOffsetChange, this);
        scroller.on('bounceend', this.onBounceEnd, this);
        scroller.on('offsetboundaryupdate', this.onOffsetBoundaryUpdate, this);

        this.rendered = true;
    },

    onOffsetBoundaryUpdate: function(scroller, offsetBoundary) {
        if (this.isRefreshing) {
            offsetBoundary.bottom += this.pullHeight;
        }
    },

    onBounceStart: function(scroller, info) {
        if (info.axis === 'y') {
            if (!this.isRefreshing && scroller.offset.y > this.pullHeight) {
                this.isRefreshing = true;

                this.onOffsetBoundaryUpdate(scroller, scroller.offsetBoundary);
            }
        }
    },

    onBounceEnd: function(scroller, info) {
        if (info.axis === 'y') {
            if (this.isRefreshing) {
                this.isRefreshing = false;

                this.setViewState('loading');
                this.isLoading = true;

                if (this.refreshFn) {
                    this.refreshFn.call(this, this.onLoadComplete, this);
                }
                else {
                    this.list.getStore().load();
                }
            }
        }
    },

    onOffsetChange: function(scroller, offset) {
        if (offset.y > 0 && !this.isRefreshing && !this.isLoading) {
            if (offset.y > this.pullHeight) {
                this.setViewState('release');
            }
            else {
                this.setViewState('pull');
            }
        }
    },

    setViewState: function(state) {
        if (state === this.currentViewState) {
            return this;
        }

        this.currentViewState = state;

        switch (state) {
            case 'pull':
                this.messageEl.setHTML(this.pullRefreshText);
                this.el.removeCls(['x-list-pullrefresh-release', 'x-list-pullrefresh-loading']);
            break;

            case 'release':
                this.messageEl.setHTML(this.releaseRefreshText);
                this.el.addCls('x-list-pullrefresh-release');
            break;

            case 'loading':
                this.messageEl.setHTML(this.loadingText);
                this.el.addCls('x-list-pullrefresh-loading');
                break;
        }

        return this;
    },

    /**
     * This function makes sure that the List's LoadMask is not shown when the list is being reloaded by
     * this plugin.
     * @private
     */
    onBeforeLoad: function() {
        if (this.isLoading && this.list.store.getCount() > 0) {
            this.list.loadMask.disable();
            return false;
        }
    },

    /**
     * This function is called after the List has been refreshed. It resets the Pull to Refresh markup and
     * updates the last updated date. It also animates the pull to refresh markup away.
     * @private
     */
    onLoadComplete: function() {
        var me = this;

        if (this.isLoading) {
            this.isLoading = false;
            this.lastUpdated = new Date();

            this.setViewState('pull');
            this.updatedEl.setHTML(Ext.util.Format.date(this.lastUpdated, "m/d/Y h:iA"));

            setTimeout(function() {
                me.scroller.updateBoundary(me.snappingAnimationDuration);
            }, 100);
        }
    }
});

Ext.preg('pullrefresh', Ext.plugins.PullRefreshPlugin);
