describe("Ext.util.JSONP", function() {
    var jsonp = Ext.util.JSONP, url, params, scripts, scriptLength, headChildLength, makeRequest;
    
    beforeEach(function() {
        jsonp.current = null;
        jsonp.queue = [];
        
        url = 'test.jsonp';
        params = {
            test: 'test'
        };
        
        scripts = function() {
            var tags = document.getElementsByTagName("script");
            
            return tags;
        };
        
        scriptLength = function() {
            return scripts().length;
        };
        
        headChildLength = function() {
            return document.getElementsByTagName('head')[0].childNodes.length;
        };
        
        makeRequest = function(config) {
            jsonp.request(Ext.apply({
                url: url,
                callback: function() { }
            }, config));
        };
    });
    
    afterEach(function() {
        if (jsonp.current && jsonp.current.callback) jsonp.callback();
    });
    
    it("should have no queue", function() {
        expect(jsonp.queue.length).toEqual(0);
    });
    
    it("should have no current request", function() {
        expect(jsonp.current).toBeNull();
    });
    
    describe("request", function() {
        describe("with url", function() {
            describe("with params", function() {
                it("it should call Ext.urlEncode", function() {
                    var spy = spyOn(Ext, "urlEncode").andCallThrough();

                    makeRequest({
                        params: params
                    });

                    expect(spy).wasCalledWith(params);
                });
            });
            
            describe("with callbackKey", function() {
                it("should add a callbackKey", function() {
                    makeRequest({
                        callbackKey: 'key'
                    });
                    
                    expect(jsonp.current.params).toEqual('key=Ext.util.JSONP.callback');
                });
            });
            
            it("should add the request to the queue", function() {
                var length = jsonp.queue.length;
                
                jsonp.current = {};
                
                makeRequest();
                
                expect(jsonp.queue.length).toEqual(length + 1);
            });
            
            describe("when no current", function() {
                beforeEach(function() {
                    jsonp.current = null;
                });
                
                it("should call next", function() {
                    var spy = spyOn(jsonp, "next").andCallThrough();
                    
                    makeRequest();
                    
                    expect(spy).wasCalled();
                });
            });
            
            describe("when current", function() {
                beforeEach(function() {
                    jsonp.current = {};
                });
                
                it("should call next", function() {
                    var spy = spyOn(jsonp, "next").andCallThrough();
                    
                    makeRequest();
                    
                    expect(spy).wasNotCalled();
                });
            });
        });
        
        describe("with no url", function() {
            it("it should return", function() {
                var length = scriptLength();

                jsonp.request();

                expect(scriptLength()).toEqual(length);
            });
        });
    });
    
    describe("next", function() {
        it("should set current", function() {
            makeRequest();
            
            expect(jsonp.current).toBeDefined();
        });
        
        it("should move the script tag to the head", function() {
            var length = headChildLength();
            
            makeRequest();
            
            expect(headChildLength()).toEqual(length + 1);
        });
    });
    
    describe("callback", function() {
        it("should call the callback", function() {
            var called = false,
                foo    = function() {
                    called = true;
                };
            
            makeRequest({
                callback: foo
            });
            
            jsonp.callback();
            
            expect(called).toBeTruthy();
        });
        
        it("should remove the script tag", function() {
            makeRequest();
            
            var length = headChildLength();
            
            jsonp.callback();
            
            expect(headChildLength()).toEqual(length - 1);
        });
        
        it("should call next", function() {
            var spy = spyOn(jsonp, "next").andCallThrough();
            
            makeRequest();
            jsonp.callback();
            
            expect(spy).wasCalled();
        });
    });
});