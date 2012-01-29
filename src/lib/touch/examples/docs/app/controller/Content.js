Ext.define('Docs.controller.Content', {
    extend: 'Docs.controller.Main',

    requires: [
        'Docs.view.Guide'
    ],

    onNavTap: function(nestedList, list, index, item) {
        this.getApplication().redirectTo(list.getStore().getAt(index));
    },

    config: {
        routes: {
            '/guide/:id': 'showGuide',
            '/video/:id': 'showVideo',
            '/api/:id'  : 'showApi'
        },

        control: {
            'contentlist': {
                leafitemtap: 'showContent'
            }
        },

        refs: {
            mainPanel: '#mainPanel'
        }
    }
});