Ext.define('Player.store.Media', {
    extend : 'Ext.data.Store',

    requires : 'Player.model.Media',

    config : {
        model   : 'Player.model.Media',
        storeId : 'Media',
        data    : [
            { name : 'Space', type : 'video', duration : 21,  location : 'media/videos/space.mp4', screen : 'media/videos/screens/space.png' },
            { name : 'Crash', type : 'audio', duration : 165, location : 'media/audio/crash.mp3' }
        ]
    }
});