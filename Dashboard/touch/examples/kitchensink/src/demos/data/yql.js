demos.Data.yql = new Ext.Panel({
    scroll: 'vertical',
    cls: 'card1 demo-data',
    styleHtmlContent: true,
    
    blogTpl:  new Ext.XTemplate([
        '<tpl for="item">',
            '<h2><a href="{link}" target="_blank">{title}</a><small> by {creator}</small></h2>',
            '<p>{description}</p>',
        '</tpl>'
    ]),
    
    dockedItems: [
        {
            dock : 'top',
            xtype: 'toolbar',
            items: [
                {
                    text: 'Load using YQL',
                    handler: function() {
                        var panel = demos.Data.yql,
                            blogTpl = panel.blogTpl;
                        
                        panel.update('');  
                        panel.setLoading(true, true);
                        
                        Ext.YQL.request({
                            query: "select * from rss where url='http://feeds.feedburner.com/extblog' limit 5",
                            callback: function(response) {
                                if (response.query && response.query.results) {
                                    panel.update(blogTpl.apply(response.query.results));
                                    panel.scroller.scrollTo({x: 0, y: 0});
                                }
                                
                                panel.setLoading(false);
                            }
                        });
                    }
                }
            ]
        }
    ]
});

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