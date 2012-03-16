demos.isSimulatorEnabled = false;

demos.isSimulatorDemoing = false;

demos.Simulator = new Ext.Panel({
    layout: {
        type: 'vbox',
        pack: 'center',
        align: 'stretch'
    },
    defaults: {
        xtype: 'button',
        cls: 'demobtn'
    },
    items: [
//        {
//            text: 'Dump',
//            handler: function() {
//                var events = Ext.getCmp('simulator').getRecorder().getEventSet('main');
//                console.log(JSON.stringify(events));
//                Ext.Ajax.request({
//                    url: '../../dump.php',
//                    method: 'POST',
//                    params: {data: JSON.stringify(events)}
//                });
//            }
//        },
    {
        text: "What's This?",
        handler: function() {
            if (!this.popup) {
                var popup = this.popup = new Ext.Panel({
                    cls: "x-simulator-popup",
                    floating: true,
                    modal: true,
                    centered: true,
                    width: "90%",
                    height: "80%",
                    styleHtmlContent: true,
                    scroll: 'vertical',
                    html: "<p>Sencha Touch's <b>EventRecorder</b> and <b>EventSimulator</b> allow you to capture, \n\
                           store and later playback all the touch events fired on the device's screen.</p>\n\
                           <p>This opens up the possibility for automated UI and functional testing, or something\n\
                           cool like live demostration of how your app works without the need of any pre-recorded videos.</p>\n\
                           <p>Close this dialog and tap on the <b>\"Show Me!\"</b> button to see it in action. A demo series of events \n\
                              (technically an array of serialized events in JSON format) will be replayed live on the screen.</p>\n\
                           <p>To try it yourself, follow the steps below:\n\
                            <ul>\n\
                            <li>Show the Simulator Toolbar by tapping on the <b>\"Enable Simulator\"</b> button</li>\n\
                            <li>Tap on the <b>\"Start\"</b> button to start recording events.</li>\n\
                            <li>Interact with the app in any way you like, then tap on the <b>\"Stop\"</b> button to stop recording.</li>\n\
                            <li>Tap on the <b>\"Playback\"</b> button and enjoy watching!.</li>\n\
                            <li>Remember to tap on the <b>\"Erase\"</b> button before tapping on <b>\"Start\"</b> again if you want to start a new session.\n\
                                Otherwise it will resume recording from where it was left off.</li>\n\
                           </ul></p>",
                    dockedItems: [{
                        dock: 'bottom',
                        xtype: 'toolbar',
                        layout: {
                            type: 'vbox',
                            pack: 'center',
                            align: 'stretch'
                        },
                        items: [
                            { xtype: 'button', ui: 'decline', text: 'Close', handler: function() { popup.hide('fade'); } }
                        ]
                    }]
                });
            }
            this.popup.show('pop');
        }
    },
    {
        ui: 'action',
        text: "Show Me!",
        handler: function() {
            if (Ext.Viewport.orientation != 'portrait') {
                Ext.Msg.alert('Sorry...', 'The pre-recorded data were made for portrait orientation only. Rotate your device and try again');
            }
            else if (Ext.is.Desktop){
                Ext.Msg.alert('Sorry...', "There's no pre-recorded data for desktop yet. Tap on \"What's This?\" for instructions.");
            }
            else {
                var simulator = Ext.getCmp('simulator');
                simulator.enableSimulator();
                
                demos.Simulator.setLoading(true);

                Ext.Ajax.request({
                    url: 'resources/simulator/' + ((Ext.is.Phone) ? 'phone' : 'tablet') + '.json',
                    method: 'GET',
                    success: function(response, opts) {
                        demos.Simulator.setLoading(false);
                        simulator.getRecorder().setEventSet('demo', Ext.decode(response.responseText));
                        simulator.getRecorder().replay('demo');
                    }
                });
            }
        }
    },
    {
        id: 'simulator',
        ui: 'confirm',
        text: 'Enable Simulator',
        recorderEvents: ['touchstart', 'touchmove', 'touchend', 'mousedown', 'mousemove', 'mouseup', 'click'],
        handler: function() {
            if (!demos.isSimulatorEnabled) {
                this.enableSimulator();
            } else {
                this.disableSimulator();
            }
        },
        enableSimulator: function() {
            if (!demos.isSimulatorEnabled) {
                demos.isSimulatorEnabled = true;
                this.setText('Disable Simulator');
                this.el.addCls('x-button-decline').removeCls('x-button-confirm');
                this.showToolbar();
            }
        },
        disableSimulator: function() {
            if (demos.isSimulatorEnabled) {
                demos.isSimulatorEnabled = false;
                this.setText('Enable Simulator');
                this.el.removeCls('x-button-decline').addCls('x-button-confirm');
                this.hideToolbar();
                this.eraseRecorder();
            }
        },
        doRecord: function(e) {
            var target = e.target;

            if (target.nodeType == 3)
            target = target.parentNode;

            if (Ext.get(target).hasCls('x-button-label')) {
                target = target.parentNode;
            }

            if (!Ext.get(target).hasCls('recorderButton')) {
                this.getRecorder().record('main', e);
            }
        },
        getRecorder: function() {
            if (!this.recorder) {
                this.recorder = new Ext.util.EventRecorder();
                this.recorder.on({
                    replaystart: this.onReplayStart,
                    replayend: this.onReplayEnd,
                    beforecalculatetarget: this.onBeforeCalculateTarget,
                    aftercalculatetarget: this.onAfterCalculateTarget,
                    beforefire: this.onBeforeFire,
                    afterfire: this.onAfterFire,
                    interrupted: this.onInterrupted,
                    scope: this
                });
            }

            return this.recorder;
        },
        startRecorder: function() {
            if (demos.isSimulatorDemoing) {
                return;
            }

            var me = this;

            if (!this.doRecordWrap) {
                this.doRecordWrap = Ext.createDelegate(me.doRecord, me);
            }

            this.getRecorder().start('main');
            this.recorderEvents.forEach(function(name) {
                document.addEventListener(name, me.doRecordWrap, true);
            });
            this.isRecording = true;
        },
        stopRecorder: function() {
            if (demos.isSimulatorDemoing) {
                return;
            }
            
            var me = this;

            if (!this.doRecordWrap) {
                this.doRecordWrap = Ext.createDelegate(me.doRecord, me);
            }

            this.recorderEvents.forEach(function(name) {
                document.removeEventListener(name, me.doRecordWrap, true);
            });

            window.localStorage.setItem('recordedEvents', JSON.stringify(this.getRecorder().getEventSet('main')));
        },
        eraseRecorder: function() {
            this.getThumb().hide();
            this.getRecorder().erase('main');
            window.localStorage.setItem('recordedEvents', null);
        },
        replayRecorder: function() {
            if (this.isRecording) {
                this.stopRecorder();
                this.isRecording = false;
            }

            var events = window.localStorage.getItem('recordedEvents');
            if (events) {
                this.getRecorder().setEventSet('main', JSON.parse(events));
            }
            this.getRecorder().replay('main');
        },
        showToolbar: function() {
            sink.Main.ui.addDocked(this.getToolbar());
        },
        hideToolbar: function() {
            sink.Main.ui.removeDocked(this.getToolbar(), false);
        },
        getToolbar: function() {
            if (!this.toolbar) {

                this.toolbar = new Ext.Toolbar({
                    docked: 'bottom',
                    items: [
                    {
                        xtype: 'button',
                        ui: 'confirm',
                        cls: 'recorderButton',
                        text: 'Start',
                        handler: Ext.createDelegate(this.startRecorder, this)
                    },
                    {
                        xtype: 'button',
                        text: 'Stop',
                        ui: 'decline',
                        cls: 'recorderButton',
                        handler: Ext.createDelegate(this.stopRecorder, this)
                    },
                    {
                        xtype: 'button',
                        text: 'Erase',
                        ui: 'action',
                        cls: 'recorderButton',
                        handler: Ext.createDelegate(this.eraseRecorder, this)
                    },
                    {
                        xtype: 'button',
                        ui: 'forward',
                        text: 'Playback',
                        cls: 'recorderButton',
                        handler: Ext.createDelegate(this.replayRecorder, this)
                    }
                    ]
                });

            }

            return this.toolbar;
        },
        onEventDuringReplay: function(e) {
            if (!e.isSimulated) {
                e.preventDefault();
                e.stopPropagation();
                e.stopped = true;

                if (e.type == 'touchstart' || e.type == 'mousedown') {
                    this.getRecorder().stopReplay();
                }
                
                return false;
            }
        },
        getThumb: function() {
            if (!this.thumb) {
                this.thumb = Ext.getBody().createChild({
                    cls: 'x-simulator-thumb'
                });
                this.thumb.hide();
            }

            return this.thumb;
        },
        onReplayStart: function(name) {
            if (name == 'demo') {
                demos.isSimulatorDemoing = true;
            }

            if (!this.onEventDuringReplayWrap) {
                this.onEventDuringReplayWrap = Ext.createDelegate(this.onEventDuringReplay, this);
            }

            Ext.gesture.Manager.detachListeners();
            this.recorderEvents.forEach(function(name) {
                document.addEventListener(name, this.onEventDuringReplayWrap, true);
            }, this);
            Ext.gesture.Manager.attachListeners();
            
            this.getThumb().show();
        },
        onReplayEnd: function(name, isInterrupted) {
            var me = this;

            if (name == 'demo') {
                demos.isSimulatorDemoing = false;
            }

            this.recorderEvents.forEach(function(name) {
                document.removeEventListener(name, this.onEventDuringReplayWrap, true);
            }, this);
            
            this.getThumb().hide();
            
            if (isInterrupted) {
                if (!confirm("Do you want to stop this playback?")) {
                    setTimeout(function() {
                        me.getRecorder().resumeReplay(name);
                    }, 100);
                }
            } else {
                if (name == 'demo') {
                    Ext.Msg.alert("End of Demo", "For full description / instructions, tap on the \"What's This?\" button");
                }
            }
        },
        onBeforeCalculateTarget: function() {
            this.getThumb().dom.style.visibility = 'hidden';
        },
        onAfterCalculateTarget: function() {
            this.getThumb().dom.style.visibility = 'visible';
        },
        onAfterFire: Ext.emptyFn,
        onInterrupted: function() {
            this.getThumb().removeCls('pressed');
        },
        onBeforeFire: function(type, target, event) {
            var point = Ext.util.Point.fromEvent(event);
            point.translate(-20, -20);
            
            Ext.Element.cssTranslate(this.getThumb(), point);

            if (type == 'touchstart' || type == 'mousedown') {
                this.getThumb().addCls('pressed');
            } else if (type == 'touchend' || type == 'mouseup') {
                this.getThumb().removeCls('pressed');
            }
        }
    }]
});

Ext.Element.fromPoint = function(x, y) {
    if (!demos.isSimulatorEnabled) {
        return Ext.get(document.elementFromPoint(x, y));
    } else {
        var thumb = Ext.getCmp('simulator').getThumb(),
            target;

        thumb.dom.style.visibility = 'hidden';
        target = Ext.get(document.elementFromPoint(x, y));
        thumb.dom.style.visibility = 'visible';

        return target;
    }
};