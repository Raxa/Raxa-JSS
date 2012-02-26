Ext.setup({
    onReady: function() {
        var entries = Ext.select('.entry'),
            cards = [];
        
        entries.each(function(entry) {
            cards.push({
                xtype: 'component',
                contentEl: entry.dom,
                scroll: 'vertical'
            });
        });
        
        new Ext.Carousel({
            fullscreen: true,
            direction: 'vertical',
            items: cards
        });
    }
});