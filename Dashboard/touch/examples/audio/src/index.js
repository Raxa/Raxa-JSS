Ext.setup({
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {
        
        var audioBase = {
            url: 'crash.mp3',
            loop: true
        }

        var hiddenAudio = new Ext.Audio(Ext.apply({}, audioBase, {
            title: 'Hidden',
            enableControls: false,
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            items: [{
                xtype: 'button',
                text: 'Play/pause audio',
                handler: function(){
                    hiddenAudio.toggle();
                },
            }]
        }));

        var autoAudio = new Ext.Audio(Ext.apply({}, audioBase, {
            title: 'autoResume (iPad only)',
            autoResume: true
        }));

        var styledAudio = new Ext.Audio(Ext.apply({}, audioBase, {
            title: 'Styled',
            cls: 'myAudio'
        }));

        new Ext.TabPanel({
            fullscreen: true,
            cardSwitchAnimation: 'flip',
            items: [hiddenAudio, styledAudio, autoAudio]
        })
    }
});