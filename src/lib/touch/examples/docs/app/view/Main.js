//A Container is expected to react to changes in available size and orientation
//For example hiding a list in portrait mode, revealing it as a float instead
Ext.define('Docs.view.Main', {
    extend: 'Ext.Container',
    
    config: {
        items: [
            {
                xtype: 'nestedlist',
                itemId: 'list',
                store: 'Docs.store.Content'
            },
            {
                xtype: 'viewer'
            }
        ]
    },
    
    orientationChange: {
        vertical: {
            hide: ['list'],
            show: ['showListButton']
        },
        horizontal: {
            hide: ['showListButton'],
            show: ['list'],
            callback: 'doSpecialFunctionOnHorizontal'
        }
    },
    
    onOrientationChange: function(orientation) {
        if (orientation == 'vertical') {
            this.down('#list').hide();
            this.down('#showListButton').show();
        } else {
            this.down('#list').show();
            this.down('#showListButton').hide();
        }
    }
});