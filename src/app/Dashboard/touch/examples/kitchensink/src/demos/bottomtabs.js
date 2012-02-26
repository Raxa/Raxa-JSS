demos.BottomTabs = new Ext.TabPanel({
    tabBar: {
        dock: 'bottom',
        ui: 'light',
        layout: {
            pack: 'center'
        }
    },
    cardSwitchAnimation: {
        type: 'slide',
        cover: true
    },
    defaults: {
        scroll: 'vertical'
    },
    items: [{
        title: 'About',
        html: '<p>Docking tabs to the bottom will automatically change their style. The tabs below are ui="light", though the standard type is dark. Badges (like the 4 below) can be added by setting <code>badgeText</code> when creating a tab/card or by using <code>setBadge()</code> on the tab later.</p>',
        iconCls: 'info',
        cls: 'card card1'
    },
    {
        title: 'Favorites',
        html: 'Favorites Card',
        iconCls: 'favorites',
        cls: 'card card2',
        badgeText: '4'
    },
    {
        title: 'Downloads',
        id: 'tab3',
        html: 'Downloads Card',
        badgeText: 'Text can go here too, but it will be cut off if it is too long.',
        cls: 'card card3',
        iconCls: 'download'
    },
    {
        title: 'Settings',
        html: 'Settings Card',
        cls: 'card card4',
        iconCls: 'settings'
    },
    {
        title: 'User',
        html: 'User Card',
        cls: 'card card5',
        iconCls: 'user'
    }]
});