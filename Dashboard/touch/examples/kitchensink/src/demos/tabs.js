demos.Tabs = new Ext.TabPanel({
    sortable: true, // Tap and hold to sort
    ui: 'dark',
    items: [{
        title: 'Tab 1',
        html: 'The tabs above are also sortable.<br />(tap and hold)',
        cls: 'card card5'
    },
    {
        title: 'Tab 2',
        html: 'Tab 2',
        cls: 'card card4'
    },
    {
        title: 'Tab 3',
        html: 'Tab 3',
        cls: 'card card3'
    }]
});
