Ext.require([
    'Ext.Sortable'
]);

Ext.setup({
    icon: 'icon.png',
    glossOnIcon: false,
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    onReady: function() {
        Ext.create('Ext.Sortable', 'sortable', {
            itemSelector: 'li',
            direction: 'vertical',
            scroll: true,
            constrain: true
        });
    }
});