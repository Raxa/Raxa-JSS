Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    
    onReady: function() {
        var tpl = Ext.XTemplate.from('weather');
        
        var makeAjaxRequest = function() {
            Ext.getBody().mask('Loading...', 'x-mask-loading', false);
            Ext.Ajax.request({
                url: 'test.json',
                success: function(response, opts) {
                    Ext.getCmp('content').update(response.responseText);
                    Ext.getCmp('status').setTitle('Static test.json file loaded');
                    Ext.getBody().unmask();
                }
            });
        };
        
        var makeJSONPRequest = function() {
            Ext.getBody().mask('Loading...', 'x-mask-loading', false);
            Ext.util.JSONP.request({
                url: 'http://free.worldweatheronline.com/feed/weather.ashx',
                callbackKey: 'callback',
                params: {                    
                    key: '23f6a0ab24185952101705',
                    // palo alto
                    q: '94301',
                    format: 'json',
                    num_of_days: 5
                },
                callback: function(result) {
                    var weather = result.data.weather;
                    if (weather) {
                        var html = tpl.applyTemplate(weather);
                        Ext.getCmp('content').update(html);                        
                    }
                    else {
                        alert('There was an error retrieving the weather.');
                    }
                    Ext.getCmp('status').setTitle('Palo Alto, CA Weather');
                    Ext.getBody().unmask();
                }
            });
        };
        
        new Ext.Panel({
            fullscreen: true,
            id: 'content',
            scroll: 'vertical',
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    text: 'JSONP',
                    handler: makeJSONPRequest
                },{xtype: 'spacer'},{
                    text: 'XMLHTTP',
                    handler: makeAjaxRequest
                }]
            },{
                id: 'status',
                xtype: 'toolbar',
                dock: 'bottom',
                title: "Tap a button above."
            }]
        });
    }
});