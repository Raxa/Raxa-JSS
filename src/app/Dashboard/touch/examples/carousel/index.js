Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {
        // Create a Carousel of Items
        var carousel1 = new Ext.Carousel({
            defaults: {
                cls: 'card'
            },
            items: [{
                html: '<h1>Carousel</h1><p>Navigate the two carousels on this page by swiping left/right or clicking on one side of the circle indicators below.</p>'
            },
            {
                title: 'Tab 2',
                html: '2'
            },
            {
                title: 'Tab 3',
                html: '3'
            }]
        });
        
        var carousel2 = new Ext.Carousel({
            direction: 'vertical',
            ui: 'light',
            activeItem: 1,
            defaults: {
                cls: 'card'
            },
            items: [{
                title: 'Tab 1',
                html: '<h1>ui="light"</h1>'
            },
            {
                title: 'Tab 2',
                html: '2'
            },
            {
                title: 'Tab 3',
                html: '3'
            }]
        });

        new Ext.Panel({
            fullscreen: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                flex: 1
            },
            items: [carousel1, carousel2]
        });
    }
});