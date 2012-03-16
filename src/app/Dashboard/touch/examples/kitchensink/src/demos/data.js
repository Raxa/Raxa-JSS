(function() {
    var weatherTpl = new Ext.XTemplate([
        '<div class="demo-weather">',
            '<tpl for=".">',
                '<div class="day">',
                    '<div class="date">{date}</div>',
                    '<tpl for="weatherIconUrl"><img src="{value}"/></tpl>',
                    '<span class="temp">{tempMaxF}&deg;<span class="temp_low">{tempMinF}&deg;</span></span>',
                '</div>',
            '</tpl>',
        '</div>'
    ]);
    
    var blogTpl = new Ext.XTemplate([
        '<tpl for="item">',
            '<h2><a href="{link}" target="_blank">{title}</a><small> by {creator}</small></h2>',
            '<p>{description}</p>',
        '</tpl>'
    ]);
    
    var makeAjaxRequest = function() {
        demos.Data.update('');
        Ext.getBody().mask(false, '<div class="demos-loading">Loading&hellip;</div>');
        Ext.Ajax.request({
            url: 'test.json',
            success: function(response, opts) {
                demos.Data.update(response.responseText);
                demos.Data.scroller.scrollTo({x: 0, y: 0});
                Ext.getBody().unmask();
            }
        });
    };
    
    var makeJSONPRequest = function() {
        demos.Data.update('');
        Ext.getBody().mask(false, '<div class="demos-loading">Loading&hellip;</div>');
        Ext.util.JSONP.request({
            url: 'http://free.worldweatheronline.com/feed/weather.ashx',
            callbackKey: 'callback',
            params: {                    
                key: '23f6a0ab24185952101705',
                q: '94301', // Palo Alto
                format: 'json',
                num_of_days: 5
            },
            callback: function(result) {
                var weather = result.data.weather;
                if (weather) {
                    demos.Data.update(weatherTpl.applyTemplate(weather));   
                    demos.Data.scroller.scrollTo({x: 0, y: 0});                     
                }
                else {
                    alert('There was an error retrieving the weather.');
                }
                Ext.getBody().unmask();
            }
        });
    };
    
    var makeYQLRequest = function() {
        demos.Data.update('');  
        Ext.getBody().mask(false, '<div class="demos-loading">Loading&hellip;</div>');
        Ext.YQL.request({
            query: "select * from rss where url='http://feeds.feedburner.com/extblog' limit 5",
            callback: function(response) {
                if (response.query && response.query.results) {
                    demos.Data.update(blogTpl.apply(response.query.results));
                    demos.Data.scroller.scrollTo({x: 0, y: 0});
                }
                Ext.getBody().unmask();
            }
        });
    };
    
    demos.Data = new Ext.Panel({
        scroll: 'vertical',
        cls: 'card1 demo-data',
        styleHtmlContent: true,
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            ui: 'light',
            layout: {
                pack: 'center'
            },
            items: [{
                xtype: 'segmentedbutton',
                items: [{
                    text: 'JSONP',
                    handler: makeJSONPRequest
                }, {xtype: 'spacer'}, {
                    text: 'YQL',
                    handler: makeYQLRequest
                }, {xtype: 'spacer'}, {
                    text: 'AJAX',
                    handler: makeAjaxRequest
                }]
            }]
        }]
    });
})();

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