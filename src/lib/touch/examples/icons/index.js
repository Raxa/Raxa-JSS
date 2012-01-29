Ext.require([
    'Ext.tab.Panel',
    'Ext.Toolbar'
]);

Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function() {
        Ext.create('Ext.tab.Panel', {
            fullscreen: true,
            tabBar: {
                docked: 'bottom',
                layout: {
                    pack: 'center',
                    align: 'center'
                },
                scrollable: {
                    direction: 'horizontal',
                    indicators: false
                }
            },
            ui  : 'light',
            html: 'Both toolbars and tabbars have built-in, ready to use icons. Styling custom icons is no hassle.<p><small>If you cant see all of the buttons below, try scrolling left/right.</small></p>',
            styleHtmlContent: true,
            items: [
                { iconCls: 'bookmarks', title: 'Bookmarks' },
                { iconCls: 'download',  title: 'Download' },
                { iconCls: 'favorites', title: 'Favorites' },
                { iconCls: 'info',      title: 'Info' },
                { iconCls: 'more',      title: 'More' },
                { iconCls: 'search',    title: 'Search' },
                { iconCls: 'settings',  title: 'Settings' },
                { iconCls: 'team',      title: 'Team' },
                { iconCls: 'time',      title: 'Time' },
                { iconCls: 'user',      title: 'User' },
                {
                    xtype: 'toolbar',
                    docked: 'top',
                    layout: {
                        pack: 'center',
                        align: 'center'
                    },
                    scrollable: {
                        direction: 'horizontal',
                        indicators: false
                    },
                    defaults: {
                        iconMask: true,
                        ui      : 'plain'
                    },
                    items: [
                        { iconCls: 'action' },
                        { iconCls: 'add' },
                        { iconCls: 'arrow_up' },
                        { iconCls: 'arrow_right' },
                        { iconCls: 'arrow_down' },
                        { iconCls: 'arrow_left' },
                        { iconCls: 'compose' },
                        { iconCls: 'delete' },
                        { iconCls: 'refresh' },
                        { iconCls: 'reply' },
                        { iconCls: 'search' },
                        { iconCls: 'star' },
                        { iconCls: 'trash' }
                    ]
                }
            ]
        });
    }
});