Ext.require([
    'Ext.Audio',
    'Ext.Button',
    'Ext.tab.Panel'
]);

Ext.setup({
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() { 
        var audioBase = {
            xtype: 'audio',
            url  : 'crash.mp3',
            loop : true
        };

        var hiddenAudio = Ext.create('Ext.Container', {
            title: 'Hidden',
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            items: [
                {
                    xtype : 'button',
                    text  : 'Play audio',
                    margin: 20,
                    handler: function() {
                        var audio = this.getParent().down('audio');

                        if (audio.isPlaying()) {
                            audio.pause();
                            this.setText('Play audio');
                        } else {
                            audio.play();
                            this.setText('Pause audio');
                        }
                    }
                },
                Ext.apply({}, audioBase, {
                    enableControls: false
                })
            ]
        });

        var styledAudio = Ext.create('Ext.Audio', Ext.apply({}, audioBase, {
            title: 'Styled',
            cls  : 'myAudio',
            layout: 'fit',
            enableControls: true
        }));

        var autoAudio = Ext.create('Ext.Audio', Ext.apply({}, audioBase, {
            title     : 'autoResume (iPad only)',
            autoResume: true
        }));

        var items = [];

        if (Ext.os.is.Android) {
            //android devices do not support the <audio> tag controls
            items = [
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    title: 'Hidden',
                    items: [
                        {
                            html: 'Android devices do not support the HTML5 &lt;audio&gt; tag controls, so you must use JavaScript to control the audio.'  ,
                            styleHtmlContent: true
                        },
                        hiddenAudio
                    ]
                }
            ];
        } else {
            items = [hiddenAudio, styledAudio];
            if (Ext.os.deviceType.toLowerCase() != "phone") {
                items.push(autoAudio);
            }
        }

        Ext.create('Ext.tab.Panel', {
            fullscreen         : true,
            tabBarPosition     : 'top',
            cardSwitchAnimation: 'flip',
            items: items
        });
    }
});