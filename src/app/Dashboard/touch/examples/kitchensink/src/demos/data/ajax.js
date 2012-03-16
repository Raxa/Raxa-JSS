demos.Data.ajax = new Ext.Panel({
    scroll: 'vertical',
    cls: 'card1 demo-data',
    styleHtmlContent: true,
    
    dockedItems: [
        {
            dock : 'top',
            xtype: 'toolbar',
            items: [
                {
                    text: 'Load using AJAX',
                    handler: function() {
                        var panel = demos.Data.ajax;
                        
                        panel.update('');
                        panel.setLoading(true, true);
                        
                        Ext.Ajax.request({
                            url: 'test.json',
                            success: function(response, opts) {
                                panel.update(response.responseText);
                                panel.scroller.scrollTo({x: 0, y: 0});
                                panel.setLoading(false);
                            }
                        });
                    }
                }
            ]
        }
    ]
});