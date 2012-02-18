describe("Ext", function() {
    var config, hasMeta, hasLink;
    
    beforeEach(function() {
        hasMeta = function(name) {
            var tags  = document.getElementsByTagName("meta"),
                found = false,
                i;
            
            for (i = 0; i < tags.length; i++) {
                var tag = tags[i];
                if (tag.name == name) found = true;
            };
            
            return found;
        };
        
        hasLink = function(rel) {
            var tags  = document.getElementsByTagName("link"),
                found = false,
                i;
            
            for (i = 0; i < tags.length; i++) {
                var tag = tags[i];
                if (tag.rel == rel) found = true;
            };
            
            return found;
        };
    });
    
    it("should have a version", function() {
        expect(Ext.version).toBeDefined();
    });
    
    it("should have a versionDetail", function() {
        expect(Ext.versionDetail).toBeDefined();
    });
    
    describe("setup", function() {
        beforeEach(function() {
            config = {
                fullscreen: true,
                onReady   : function() {}
            };
        });
    
        if (!Ext.is.Desktop) {
            describe("!Ext.is.Desktop", function() {
                it("should add no scale meta tag", function() {
                    Ext.setup(config);
                    
                    expect(hasMeta('viewport')).toBeTruthy();
                });
            });
        }
        if (Ext.is.iOS) {
            describe("Ext.is.iOS", function() {
                beforeEach(function() {
                    Ext.is.iOS = true;
                });
                
                it("fullscreen", function() {
                    Ext.setup(config);
                    
                    expect(hasMeta('apple-mobile-web-app-capable')).toBeTruthy();
                });
                
                it("statusBarStyle", function() {
                    Ext.setup(Ext.apply(config, {
                        statusBarStyle: 'hey'
                    }));
                    
                    expect(hasMeta('apple-mobile-web-app-status-bar-style')).toBeTruthy();
                });
                
                it("tabletStartupScreen", function() {
                    Ext.is.iPad = true;
                    
                    Ext.setup(Ext.apply(config, {
                        tabletStartupScreen: 'hey'
                    }));
                    
                    expect(hasLink('apple-touch-startup-image')).toBeTruthy();
                });
                
                it("phoneStartupScreen", function() {
                    Ext.is.iPad = false;
                    
                    Ext.setup(Ext.apply(config, {
                        phoneStartupScreen: 'hey'
                    }));
                    
                    expect(hasLink('apple-touch-startup-image')).toBeTruthy();
                });
                
                it("icon", function() {
                    Ext.setup(Ext.apply(config, {
                        icon: 'hey'
                    }));
                    
                    expect(hasLink('apple-touch-icon')).toBeTruthy();
                });
                
                it("tabletIcon", function() {
                    Ext.is.iPad = true;
                    
                    Ext.setup(Ext.apply(config, {
                        tabletIcon: 'hey'
                    }));
                    
                    expect(hasLink('apple-touch-icon')).toBeTruthy();
                });
            });
        }
    });
});
