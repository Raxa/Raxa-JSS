Ext.setup({
    icon: 'icon.png',
    glossOnIcon: false,
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    onReady: function() {
        new Ext.util.Sortable('sortable', {
            itemSelector: 'li',
            direction: 'vertical',
            scroll: true,
            constrain: true
        });
    }
});