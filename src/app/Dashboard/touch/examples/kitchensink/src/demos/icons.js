demos.Icons = new Ext.TabPanel({
    defaults: {
        cls: 'card card3'
    },
    items: [{
        iconCls: 'bookmarks',
        title: 'Bookmarks',
        html: 'Both toolbars and tabbars have built-in, ready to use icons. Styling custom icons is no hassle.<p><small>If you can&#8217;t see all of the buttons below, try scrolling left/right.</small></p>'
    }, {
        iconCls: 'download',
        title: 'Download',
        html: 'Pressed Download'
    }, {
        iconCls: 'favorites',
        title: 'Favorites',
        html: 'Pressed Favorites'
    }, {
        iconCls: 'info',
        title: 'Info',
        html: 'Pressed Info'
    }, {
        iconCls: 'more',
        title: 'More',
        html: 'Pressed More'
    }, {
        iconCls: 'search',
        title: 'Search',
        html: 'Pressed Search'
    }, {
        iconCls: 'settings',
        title: 'Settings',
        html: 'Pressed Settings'
    }, {
        iconCls: 'team',
        title: 'Team',
        html: 'Pressed Team'
    }, {
        iconCls: 'time',
        title: 'Time',
        html: 'Pressed Time'
    }, {
        iconCls: 'user',
        title: 'User',
        html: 'Pressed User'
    }],
    dockedItems: [{
        xtype: 'toolbar',
        ui: 'light',
        dock: 'top',
        defaults: {
            iconMask: true,
            ui: 'plain'
        },
        scroll: {
            direction: 'horizontal',
            useIndicators: false
        },
        layout: {
            pack: 'center'
        },
        items: [{
            iconCls: 'action'
        }, {
            iconCls: 'add'
        }, {
            iconCls: 'arrow_up'
        }, {
            iconCls: 'arrow_right'
        }, {
            iconCls: 'arrow_down'
        }, {
            iconCls: 'arrow_left'
        }, {
            iconCls: 'compose'
        }, {
            iconCls: 'delete'
        }, {
            iconCls: 'refresh'
        }, {
            iconCls: 'reply'
        }, {
            iconCls: 'search'
        }, {
            iconCls: 'star'
        }, {
            iconCls: 'home'
        }, {
            iconCls: 'locate'
        }, {
            iconCls: 'maps'
        }, {
            iconCls: 'trash'
        }]
    }],
    tabBar: {
        dock: 'bottom',
        scroll: {
            direction: 'horizontal',
            useIndicators: false
        },
        layout: {
            pack: 'center'
        }
    }
});
