Ext.define('Kitchensink.view.Tabs', {
    extend: 'Ext.tab.Panel',

    config: {
        ui            : 'dark',
        tabBarPosition: 'top',
        activeTab     : 1,
        items: [
            {
                title: 'Tab 1',
                html : 'The tabs above are also sortable.<br />(tap and hold)',
                cls  : 'card card5'
            },
            {
                title: 'Tab 2',
                html : 'Tab 2',
                cls  : 'card card4'
            },
            {
                title: 'Tab 3',
                html : 'Tab 3',
                cls  : 'card card3'
            }
        ]
    }
});