demos.Video = new Ext.Panel({
    layout: {
        type: 'vbox',
        pack: 'center'
    },
    items: [{
        xtype: 'video',
        url: '../video/space.mp4',
        loop: true,
        width: 500,
        height: 400,
        posterUrl: '../video/Screenshot.png'
    }]
});
