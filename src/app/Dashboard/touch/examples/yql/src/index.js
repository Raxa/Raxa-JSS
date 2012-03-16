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

Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {
        var demoLookup = {
            kiva: {
                query: 'select * from kiva.loans.recent',
                tpl: new Ext.XTemplate('<tpl if="loans"><tpl for="loans">{name}<br/></tpl></tpl>')
            },
            weather: {
                query: 'select * from weather.forecast where location = 94301',
                tpl: new Ext.XTemplate('<h1>{channel.item.condition.temp}&deg; {channel.item.condition.text}</h1> \
                <h2>{channel.item.title}</h2>')
            },
            extjs: {
                query: "select * from rss where url='http://feeds.feedburner.com/extblog' limit 5",
                tpl: new Ext.XTemplate([
                    '<tpl if="item">',
                        '<tpl for="item">',
                            '<h2><a href="{link}" target="_blank">{title}</a><small> by {creator}</small></h2>',
                            '<p>{description}</p>',
                        '</tpl>',
                    '</tpl>'
                ])
            },
            flickr: {
                query: "select * from flickr.photos.recent",
                tpl: new Ext.XTemplate([
                    '<tpl if="photo">',
                        '<tpl for="photo">',
                            '<div>{title}</div>',
                            '<img src="http://farm{farm}.static.flickr.com/{server}/{id}_{secret}_t.jpg" /><br/>',
                            '<hr/>',
                        '</tpl>',
                    '</tpl>'
                ])
            }
        };
        
        var makeYqlRequest = function(btn) {
            Ext.getBody().mask('Loading...', 'x-mask-loading', false);
            var selected = btn.value;
            var opts = demoLookup[selected];
            if (opts) {
                Ext.YQL.request({
                    query: opts.query,
                    callback: function(response) {
                        var results = [];
                        if (response.query && response.query.results) {
                            results = response.query.results;
                        }
                        Ext.getCmp('content').update(opts.tpl.apply(results));
                        Ext.getBody().unmask();
                    }
                });
            }
        };
        
        new Ext.Panel({
            fullscreen: true,
            id: 'content',
            scroll: 'vertical',
            styleHtmlContent: true,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                layout: {
                    pack: 'center'
                },
                items: [{
                    xtype: 'segmentedbutton',
                    items: [{
                        text: 'Kiva',
                        value: 'kiva',
                        handler: makeYqlRequest
                    }, {
                        text: 'Weather',
                        value: 'weather',
                        handler: makeYqlRequest
                    }, {
                        text: 'Blog',
                        value: 'extjs',
                        handler: makeYqlRequest
                    }, {
                        text: 'Flickr',
                        value: 'flickr',
                        handler: makeYqlRequest
                    }]
                }]
            }],
            html: '<h2>YQL is an excellent service from Yahoo! that provides a multitude of JSON APIs for traditionally REST-based services.</h2>'
        });
    }
});