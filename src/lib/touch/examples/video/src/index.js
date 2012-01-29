Ext.require(['Ext.Panel', 'Ext.Video']);

Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {
        var isPhone = Ext.os.deviceType.toLowerCase() == "phone";

        var panel = Ext.create('Ext.Panel', {
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'video',
                    id: 'video',
                    url: 'space.mp4',
                    loop: true,
                    flex: 1,
                    width: isPhone ? '100%' : 500,
                    height: isPhone ? '100%' : 400,
                    posterUrl: 'Screenshot.png'
                }
            ],
            fullscreen: true
        });
    }
});