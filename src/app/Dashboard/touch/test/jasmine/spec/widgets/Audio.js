describe("Ext.Audio", function() {
    var audio;
    
    beforeEach(function() {
        audio = new Ext.Audio({
            url     : 'test.mp3'
        });
    });
    
    afterEach(function() {
        audio.destroy();
    });
    
    it("should have a componentCls", function() {
        expect(audio.componentCls).toEqual('x-audio');
    });
    
    describe("after rendering", function() {
        beforeEach(function() {
            audio.media = {
                show: Ext.emptyFn,
                hide: Ext.emptyFn
            };
        });
        
        
        describe("onActivate", function() {
            it("should call the superclass onActivate", function() {
                spyOn(Ext.Audio.superclass, "onActivate");

                audio.onActivate();

                expect(Ext.Audio.superclass.onActivate).wasCalled();
            });

            it("should show the media item if it is the iPhone", function() {
                spyOn(audio.media, "show");

                Ext.is.Phone = true;
                audio.onActivate();

                expect(audio.media.show).wasCalled();
            });

            it("should not show the media item if it is the iPhone", function() {
                spyOn(audio.media, "show");

                Ext.is.Phone = false;
                audio.onActivate();

                expect(audio.media.show).wasNotCalled();
            });
        });

        describe("onDeactivate", function() {
            it("should call the superclass onDeactivate", function() {
                spyOn(Ext.Audio.superclass, "onDeactivate");

                audio.onDeactivate();

                expect(Ext.Audio.superclass.onDeactivate).wasCalled();
            });

            it("should hide the media item if it is the iPhone", function() {
                spyOn(audio.media, "hide");

                Ext.is.Phone = true;
                audio.onDeactivate();

                expect(audio.media.hide).wasCalled();
            });

            it("should not hide the media item if it is the iPhone", function() {
                spyOn(audio.media, "hide");

                Ext.is.Phone = false;
                audio.onDeactivate();

                expect(audio.media.hide).wasNotCalled();
            });
        });
        
        describe("when Ext.support.supportsAudioTag", function() {
            it("should return a different configuration", function() {
                audio.destroy();

                Ext.supports.AudioTag = true;

                audio = new Ext.Audio({
                    url     : 'test.mp3'
                });
                
                var config = {
                    tag   : 'audio',
                    hidden: !audio.enableControls
                };
                
                expect(audio.getConfiguration()).toEqual(config);
            });
        });
        
        describe("when !Ext.support.supportsAudioTag", function() {
            it("should return a different configuration", function() {
                audio.destroy();

                Ext.supports.AudioTag = false;

                audio = new Ext.Audio({
                    url     : 'test.mp3'
                });
                
                var config = {
                    tag     : 'embed',
                    type    : 'audio/mpeg',
                    target  : 'myself',
                    controls: 'true',
                    hidden  : !audio.enableControls
                };
                
                expect(audio.getConfiguration()).toEqual(config);
            });
        });
    });
});
