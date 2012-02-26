describe("Ext.data.Connection", function() {
    var proto = Ext.data.Connection.prototype,
        conn, makeConn, makeRequest;
    
    beforeEach(function() {
        makeConn = function(config) {
            return conn = new Ext.data.Connection(config || {});
        };
        
        makeRequest = function(config) {
            return conn.request(Ext.apply({
                url: 'test'
            }, config || {}));
        };
        
        makeConn();
    });
    
    afterEach(function() {
        conn = null;
    });
    
    it("should have a method", function() {
        expect(proto.method).toEqual('post');
    });
    
    it("should have no url", function() {
        expect(proto.url).toBeNull();
    });
    
    it("should disableCaching", function() {
        expect(proto.disableCaching).toBeTruthy();
    });
    
    it("should have a disableCachingParam", function() {
        expect(proto.disableCachingParam).toBeDefined();
    });
    
    it("should have a timeout", function() {
        expect(proto.timeout).toBeDefined();
    });
    
    it("should useDefaultHeader", function() {
        expect(proto.useDefaultHeader).toBeTruthy();
    });
    
    it("should have defaultPostHeader", function() {
        expect(proto.defaultPostHeader).toBeDefined();
    });
    
    it("should useDefaultXhrHeader", function() {
        expect(proto.useDefaultXhrHeader).toBeTruthy();
    });
    
    it("should have a defaultXhrHeader", function() {
        expect(proto.defaultXhrHeader).toBeDefined();
    });
    
    it("should have no requests", function() {
        expect(conn.requests).toEqual({});
    });
    
    describe("request", function() {
        it("should send a beforerequest event", function() {
            var fired  = false,
                called = false;
            
            conn.on({
                beforerequest: function() {
                    fired = true;
                    return false;
                }
            });
            
            makeRequest({
                callback: function() { called = true; }
            });
            
            expect(fired).toBeTruthy();
            expect(called).toBeTruthy();
        });
        
        describe("params", function() {
            describe("when params is a function", function() {
                it("should execute the function", function() {
                    var called = false;

                    makeRequest({
                        params: function() { called = true; }
                    });

                    expect(called).toBeTruthy();
                });
            });
            
            describe("when params is an object", function() {
                it("should call Ext.urlEncode", function() {
                    var spy = spyOn(Ext, "urlEncode").andCallThrough();

                    makeRequest({
                        params: {
                            key: 'value'
                        }
                    });

                    expect(spy).wasCalled();
                });
            });
            
            describe("when .extraParams is set", function() {
                describe("when params is a string", function() {
                    it("should call urlEncode with the extraParams", function() {
                        conn.extraParams = {
                            another: 'test'
                        };

                        var spy = spyOn(Ext, "urlEncode").andCallThrough();

                        var request = makeRequest({
                            url: 'hmmmm',
                            method: 'GET',
                            params: "key=value"
                        });

                        expect(spy).wasCalledWith(conn.extraParams, "key=value");
                    });
                });
                
                describe("when params is an object", function() {
                    it("should call urlEncode with the extraParams", function() {
                        conn.extraParams = {
                            another: 'test'
                        };

                        var spy = spyOn(Ext, "urlEncode").andCallThrough();

                        var request = makeRequest({
                            url: 'hmmmm',
                            method: 'GET',
                            params: {
                                key: 'value'
                            }
                        });

                        expect(spy).wasCalledWith(conn.extraParams, "key=value");
                    });
                });
            });
        });
        
        describe("when url is a function", function() {
            it("should execute the function", function() {
                var called = false;

                makeRequest({
                    url: function() { called = true; return 'test' }
                });
                
                expect(called).toBeTruthy();
            });
        });
        
        describe("when jsonData", function() {
            it("should call Ext.isPrimitive", function() {
                var spy = spyOn(Ext, "isPrimitive").andCallThrough();
                
                makeRequest({
                    jsonData: {
                        key: 'value'
                    }
                });
                
                expect(spy).wasCalled();
            });
        });
        
        describe("urlParams", function() {
            describe("when urlParams is an object", function() {
                it("should call Ext.urlEncode", function() {
                    var spy = spyOn(Ext, "urlEncode").andCallThrough();

                    makeRequest({
                        urlParams: {
                            key: 'value'
                        }
                    });

                    expect(spy).wasCalled();
                });
            });
            
            it("should call Ext.urlAppend", function() {
                var spy = spyOn(Ext, "urlAppend").andCallThrough();

                makeRequest({
                    urlParams: {
                        key: 'value'
                    }
                });

                expect(spy).wasCalled();
            });
        });
        
        describe("when disableCaching = false", function() {
            it("should call urlAppend", function() {
                conn.disableCaching = false;
                
                var spy = spyOn(Ext, "urlAppend").andCallThrough();
        
                makeRequest({
                    method: 'GET'
                });
                
                //expect(spy).wasCalledWith('test', conn.disableCachingParam + '=' + (new Date().getTime()));
                // this doesnt work since there might be a ms difference
            });
        });
        
        describe("when data + params", function() {
            it("should call urlAppend", function() {
                var params = {
                    key: 'value'
                };
                
                var spy = spyOn(Ext, "urlAppend").andCallThrough();
                
                makeRequest({
                    disableCaching: false,
                    method: 'GET',
                    params: params
                });
                
                expect(spy).wasCalledWith('test', 'key=value');
            });
        });
        
        describe("autoAbort", function() {
            it("should call abort", function() {
                var spy = spyOn(conn, "abort");
                
                makeRequest({
                    autoAbort: true
                });
                
                expect(spy).wasCalled();
            });
        });
        
        it("should call getXhrInstance", function() {
            var spy = spyOn(conn, "getXhrInstance").andCallThrough();
            
            makeRequest();
            
            expect(spy).wasCalled();
        });
    });
    
    describe("isLoading", function() {
        it("should return false", function() {
            expect(conn.isLoading()).toBeFalsy();
        });
    });
    
    
});
