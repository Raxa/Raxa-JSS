Ext.define('Kitchensink.view.Video', {
    extend: 'Ext.Container',
    requires: [
        'Ext.Video'
    ],
    config: {
        layout: 'fit',
        items: [{
            xtype: 'video',
            url: '../video/space.mp4',
            loop: true,
            posterUrl: '../video/Screenshot.png'
        }]
    }
});
