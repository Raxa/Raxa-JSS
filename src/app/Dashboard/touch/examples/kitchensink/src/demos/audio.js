demos.Audio = new Ext.Panel({
    layout: {
        type: 'vbox',
        pack: 'center'
    },
    items: [{
        xtype: 'audio',
        url: '../audio/crash.mp3',
        loop: true
    }]
});
