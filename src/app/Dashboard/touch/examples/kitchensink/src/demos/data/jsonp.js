demos.Data.jsonp = new Ext.Panel({
    scroll: 'vertical',
    cls: 'card1 demo-data',
    
    weatherTpl: new Ext.XTemplate([
        '<div class="demo-weather">',
            '<tpl for=".">',
                '<div class="day">',
                    '<div class="date">{date}</div>',
                    '<tpl for="weatherIconUrl"><img src="{value}"/></tpl>',
                    '<span class="temp">{tempMaxF}&deg;<span class="temp_low">{tempMinF}&deg;</span></span>',
                '</div>',
            '</tpl>',
        '</div>'
    ]),
    
    dockedItems: [
        {
            dock : 'top',
            xtype: 'toolbar',
            items: [
                {
                    text: 'Load using JSON-P',
                    handler: function() {
                        var panel = demos.Data.jsonp,
                            weatherTpl = panel.weatherTpl;
                        
                        panel.update('');
                        panel.setLoading(true, true);
                        
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
                                    panel.update(weatherTpl.applyTemplate(weather));   
                                    panel.scroller.scrollTo({x: 0, y: 0});                     
                                } else {
                                    alert('There was an error retrieving the weather.');
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