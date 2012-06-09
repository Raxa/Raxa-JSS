/**
 * Demonstrates a very simple tab panel with 3 tabs
 */
Ext.define('Kitchensink.view.Tabs', {
    extend: 'Ext.tab.Panel',

    config: {
        ui: 'light',
        tabBar: {
            layout: {
                pack: 'center'
            }
        },
        activeTab: 1,
        defaults: {
            scrollable: true
        },
        items: [
            {
                title: 'Tab 1',
                html : 'By default, tabs are aligned to the top of a view.',
                cls: 'card dark'
            },
            {
                title: 'Tab 2',
                html : 'A TabPanel can use different animations by setting <code>layout.animation.</code>',
                cls  : 'card'
            },
            {
                title: 'Tab 3',
                html : '<span class="action">User tapped Tab 3</span>',
                cls  : 'card dark'
            }
        ]
    }
});
