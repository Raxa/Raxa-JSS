Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {
        var pnl = new Ext.Panel({
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            items: [{
                xtype: 'video',
                url: 'space.mp4',
                loop: true,
                width: 500,
                height: 400,
                posterUrl: 'Screenshot.png'
            }],
            fullscreen: true
        })
    }
});