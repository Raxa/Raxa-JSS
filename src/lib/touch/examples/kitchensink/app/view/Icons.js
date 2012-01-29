Ext.define('Kitchensink.view.Icons', {
    extend: 'Ext.tab.Panel',

    config: {
        activeTab: 0,
        layout: {
            animation: {
                type: 'slide',
                duration: 250
            }
        },
        tabBar: {
            layout: {
                pack : 'center',
                align: 'center'
            },
            docked: 'bottom',
            scrollable: {
                direction: 'horizontal',
                indicators: false
            }
        },
        items: [
            {
                iconCls: 'bookmarks',
                title  : 'Bookmarks',
                cls    : 'card card3',
                html   : 'Both toolbars and tabbars have built-in, ready to use icons. Styling custom icons is no hassle.<p><small>If you can&#8217;t see all of the buttons below, try scrolling left/right.</small></p>'
            },
            {
                iconCls: 'download',
                title  : 'Download',
                cls    : 'card card3',
                html   : 'Pressed Download'
            },
            {
                iconCls: 'favorites',
                title  : 'Favorites',
                cls    : 'card card3',
                html   : 'Pressed Favorites'
            },
            {
                iconCls: 'info',
                title  : 'Info',
                cls    : 'card card3',
                html   : 'Pressed Info'
            },
            {
                iconCls: 'more',
                title  : 'More',
                cls    : 'card card3',
                html   : 'Pressed More'
            },
            {
                iconCls: 'search',
                title  : 'Search',
                cls    : 'card card3',
                html   : 'Pressed Search'
            },
            {
                iconCls: 'settings',
                title  : 'Settings',
                cls    : 'card card3',
                html   : 'Pressed Settings'
            },
            {
                iconCls: 'team',
                title  : 'Team',
                cls    : 'card card3',
                html   : 'Pressed Team'
            },
            {
                iconCls: 'time',
                title  : 'Time',
                cls    : 'card card3',
                html   : 'Pressed Time'
            },
            {
                iconCls: 'user',
                title  : 'User',
                cls    : 'card card3',
                html   : 'Pressed User'
            },
            {
                xtype : 'toolbar',
                ui    : 'light',
                docked: 'top',
                height: 47,
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
                    { iconCls: 'home' },
                    { iconCls: 'locate' },
                    { iconCls: 'maps' },
                    { iconCls: 'trash' }
                ],
                layout: {
                    pack : 'center',
                    align: 'center'
                }
            }
        ]
    }
});
