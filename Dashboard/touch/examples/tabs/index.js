Ext.setup({
    icon: 'icon.png',
    glossOnIcon: false,
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    onReady: function() {
        new Ext.TabPanel({
            fullscreen: true,
            type: 'dark',
            sortable: true,
            items: [{
                title: 'Tab 1',
                html: '1',
                cls: 'card1'
            }, {
                title: 'Tab 2',
                html: '2',
                cls: 'card2'
            }, {
                title: 'Tab 3',
                html: '3',
                cls: 'card3'
            }]
        });
    }
});
