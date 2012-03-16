Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function() {
        
        var viewport = new Ext.Panel({
            fullscreen: true,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    xtype: 'field',
                    xtype: 'textfield',
                    name : 'name',
                    placeHolder: 'Text',
                    // label: 'Name',
                    autoCapitalize : false
                }, {
                    xtype: 'searchfield',
                    name : 'search',
                    placeHolder: 'Search'
                    // label: 'Search',
                }, {
                    xtype: 'selectfield',
                    name: 'options',
                    options: [
                        {text: 'Option 1 should be very very very long',  value: '1'},
                        {text: 'Option 2', value: '2'}
                    ]
                }]
            }]
        })
    }
});