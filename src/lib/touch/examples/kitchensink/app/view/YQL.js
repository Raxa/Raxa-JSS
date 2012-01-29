Ext.require('Ext.util.JSONP', function() {

Ext.YQL = {
    useAllPublicTables: true,
    yqlUrl: 'http://query.yahooapis.com/v1/public/yql',
    request: function(cfg) {
        var p = cfg.params || {};
        p.q = cfg.query;
        p.format = 'json';
        if (this.useAllPublicTables) {
            p.env = 'store://datatables.org/alltableswithkeys';
        }

        Ext.util.JSONP.request({
            url: this.yqlUrl,
            callbackKey: 'callback',
            params: p,
            callback: cfg.callback,
            scope: cfg.scope || window
        });
    }
};

Ext.define('Kitchensink.view.YQL', {
    extend: 'Ext.Container',
    config: {
        scrollable: true,
        items: [
            {
                xtype: 'panel',
                id   : 'YQL',
                styleHtmlContent: true
            },
            {
                docked: 'top',
                xtype: 'toolbar',
                items: [{
                    text: 'Load using YQL',
                    handler: function() {
                        var panel = Ext.getCmp('YQL'),
                            tpl = new Ext.XTemplate([
                                '<tpl for="item">',
                                    '<h2><a href="{link}" target="_blank">{title}</a><small> by {creator}</small></h2>',
                                    '<p>{description}</p>',
                                '</tpl>'
                        ]);

                        panel.getParent().setMasked({
                            message: 'Loading...'
                        });

                        Ext.YQL.request({
                            query: "select * from rss where url='http://feeds.feedburner.com/extblog' limit 5",
                            callback: function(response) {
                                if (response.query && response.query.results) {
                                    panel.update(tpl.apply(response.query.results));
                                }
                                else {
                                    alert('There was an error retrieving the YQL request.');
                                }

                                panel.getParent().unmask();
                            }
                        });
                    }
                }
            ]
        }]
    }
});

});
