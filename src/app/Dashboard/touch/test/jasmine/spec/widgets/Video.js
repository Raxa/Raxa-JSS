describe("Ext.Video", function() {
    var video;
    
    beforeEach(function() {
        video = new Ext.Video({
        });
    });
    
    afterEach(function() {
        video.destroy();
    });
    
    it("it should not have a posterUrl by default", function() {
        expect(video.posterUrl).toEqual('');
    });
    
    it("should have a componentCls", function() {
        expect(video.componentCls).toEqual('x-video');
    });
    
    describe("when posterUrl", function() {
        beforeEach(function() {
            video.destroy();
            video = new Ext.Video({
                posterUrl : 'url'
            });
            video.media = {
                show: Ext.emptyFn
            };
            video.ghost = {
                hide: Ext.emptyFn
            };
            video.play = Ext.emptyFn
        });
                
        describe("when onGhostTap", function() {
                        
            it("should show media", function() {
                spyOn(video.media, "show");
                
                video.onGhostTap();
                
                expect(video.media.show).wasCalled();
            });
            
            it("should hide ghost", function() {
                spyOn(video.ghost, "hide");
                
                video.onGhostTap();
                
                expect(video.ghost.hide).wasCalled();
            });
            
            it("should play", function() {
                spyOn(video, "play");
                
                video.onGhostTap();
                
                expect(video.play).wasCalled();
            });
        });
    });
});
