describe("Ext.util.GeoLocation", function() {
    var geo;
    beforeEach(function() {
    geo = new Ext.util.GeoLocation();
});
    if (Ext.supports.GeoLocation) {
        describe("if browser has geolocation support", function() {
            beforeEach(function() {
                spyOn(Ext.util.GeoLocation.prototype, "setAutoUpdate").andCallThrough();
                geo = new Ext.util.GeoLocation();
                spyOn(geo.factory, "getCurrentPosition");
            });

            describe("instantiation", function() {
                it("should be an instance of Ext.util.Observable", function() {
                    expect(geo.superclass).toEqual(Ext.util.Observable.prototype);
                });

                it("should call setAutoUpdate", function() {
                    waitsFor(function(){
                        return Ext.util.GeoLocation.prototype.setAutoUpdate.calls.length > 0;
                    }, "setAutoUpdate was never called");

                    runs(function() {
                         expect(Ext.util.GeoLocation.prototype.setAutoUpdate).toHaveBeenCalledWith(geo.autoUpdate);
                    });
                });

                it("should have coords", function(){
                    expect(geo.coords).toEqual(geo);
                });

                describe("configuration options", function() {
                    it("should have autoUpdate", function () {
                        expect(geo.autoUpdate).toBe(true);
                    });

                    it("should have a null latitude", function() {
                        expect(geo.latitude).toBeNull();
                    });

                    it("should have a null longitude", function() {
                        expect(geo.longitude).toBeNull();
                    });

                    it("should have a null accuracy", function() {
                        expect(geo.accuracy).toBeNull();
                    });

                    it("should have a null altitude", function() {
                        expect(geo.altitude).toBeNull();
                    });

                    it("should have a null altitudeAccuracy", function() {
                        expect(geo.altitudeAccuracy).toBeNull();
                    });

                    it("should have a null heading", function() {
                        expect(geo.heading).toBeNull();
                    });

                    it("should have a null speed", function() {
                        expect(geo.speed).toBeNull();
                    });

                    it("should have a null timestamp", function() {
                        expect(geo.timestamp).toBeNull();
                    });

                    it("should have disabled high accuracy", function() {
                        expect(geo.allowHighAccuracy).toBe(false);
                    });

                    it("should never timeout", function() {
                        expect(geo.timeout).toEqual(Infinity);
                    });

                    it("should have a maximumAge equal to 0", function() {
                        expect(geo.maximumAge).toEqual(0);
                    });
                });
            });

            describe("methods", function() {
                describe("setMaximumAge", function() {
                    it("should change the maxiumAge option and call autoUpdate", function() {
                        geo.setMaximumAge(10);

                        expect(geo.maximumAge).toEqual(10);

                        expect(Ext.util.GeoLocation.prototype.setAutoUpdate).toHaveBeenCalledWith(geo.autoUpdate);
                    });
                });

                describe("setTimeout", function() {
                    it("should change the timeout option and call autoUpdate", function() {
                        geo.setTimeout(500);

                        expect(geo.timeout).toEqual(500);

                        expect(Ext.util.GeoLocation.prototype.setAutoUpdate).toHaveBeenCalledWith(geo.autoUpdate);
                    });
                });

                describe("setAllowHighAccuracy", function() {
                    it("should change the allowHighAccuracy option and call autoUpdate", function() {
                        geo.setAllowHighAccuracy(true);

                        expect(geo.allowHighAccuracy).toBe(true);

                        expect(Ext.util.GeoLocation.prototype.setAutoUpdate).toHaveBeenCalledWith(geo.autoUpdate);
                    });
                });

                describe("setAutoUpdate", function() {
                    var watchOperation;

                    beforeEach(function() {
                        spyOn(geo, "fireEvent");
                        spyOn(geo.factory, "clearWatch");
                        spyOn(geo.factory, "watchPosition");
                    });

                    it("should cancel the updates if autoUpdate = true", function() {
                        geo.setAutoUpdate(true);

                        waitsFor(function() {
                            watchOperation = geo.watchOperation;
                            return geo.factory.clearWatch.calls.length > 0;
                        }, "clearWatch was never called");

                        runs(function() {
                            expect(geo.factory.clearWatch).toHaveBeenCalledWith(watchOperation);
                        });
                    });

                    it("should cancel the updates if autoUpdate = false and return true", function() {
                        geo.watchOperation = [10];

                        var ret = geo.setAutoUpdate(false);

                        waitsFor(function() {
                            return geo.factory.clearWatch.calls.length === 1;
                        }, "clearWatch was never called");

                        runs(function() {
                            expect(ret).toBe(true);
                            expect(geo.factory.clearWatch).toHaveBeenCalledWith([10]);
                        });
                    });

                    it("should start position watching if autoUpdate = true and return true", function() {
                        expect(geo.setAutoUpdate(true)).toBe(true);
                        expect(geo.factory.watchPosition).toHaveBeenCalled();
                    });

                    it("should fireEvent locationerror if watchPosition throw an error and return false", function() {
                        geo.factory.watchPosition.andCallFake(function() {
                            throw {message: "I'am lost!"};
                        });

                        expect(geo.setAutoUpdate(true)).toBe(false);
                        expect(geo.fireEvent).toHaveBeenCalledWith("locationerror", geo, false, false, true, "I'am lost!");
                    });
                });

                describe("updateLocation", function() {
                    var fakeCallback;

                    beforeEach(function(){
                        fakeCallback = jasmine.createSpy("fakeCallback");
                        spyOn(geo, "fireEvent");
                    });

                    it("should call factory getCurrentPosition", function() {
                        geo.updateLocation(fakeCallback, this);

                        waitsFor(function() {
                            return geo.factory.getCurrentPosition.calls.length > 0;
                        }, "getCurrentPosition was never called");

                        runs(function() {
                            expect(geo.factory.getCurrentPosition).toHaveBeenCalled();
                        });
                    });

                    describe("when getCurrentPosition throw an error", function() {
                        beforeEach(function() {
                            geo.factory.getCurrentPosition.andCallFake(function() {
                                throw {message: "I'am lost!"};
                            });

                            geo.updateLocation(fakeCallback, this);
                        });

                        it("should fire event locationerror", function() {
                            waitsFor(function() {
                                return geo.fireEvent.calls.length > 0;
                            }, "fireEvent was never called");

                            runs(function() {
                                expect(geo.fireEvent).toHaveBeenCalledWith("locationerror", geo, false, false, true, "I'am lost!");
                            });
                         });

                         it("should call callback function", function() {
                            waitsFor(function() {
                                return fakeCallback.calls.length > 0;
                            }, "fireEvent was never called");

                            runs(function() {
                                expect(fakeCallback).toHaveBeenCalledWith(null, geo);
                            });
                         });

                         it("should fire update", function() {
                            waitsFor(function() {
                                return geo.fireEvent.calls.length > 0;
                            }, "fireEvent was never called");

                            runs(function() {
                                expect(geo.fireEvent).toHaveBeenCalledWith("update", false, geo);
                            });
                         });
                    });

                    describe("when getCurrentPosition is successful", function() {
                        var fakePosition,
                            coords;

                        describe("and call the success callback", function() {
                            beforeEach(function() {
                                fakePosition = {
                                    timestamp: 1285837067410,
                                    coords: {
                                        latitude:  43.604363,
                                        longitude: 1.442951,
                                        altitude: 0,
                                        accuracy: 140000,
                                        altitudeAccuracy: 0,
                                        heading: 6,
                                        speed: 9
                                    }
                                };
                                coords = fakePosition.coords;

                                geo.factory.getCurrentPosition.andCallFake(function(successFn) {
                                    successFn(fakePosition);
                                });

                                geo.updateLocation(fakeCallback, this);

                            });

                            it("should fire locationupdate event", function() {
                                expect(geo.fireEvent).toHaveBeenCalledWith("locationupdate", geo);
                            });

                            it("should update geolocation timestamp", function() {
                                expect(geo.timestamp).toEqual(fakePosition.timestamp);
                            });

                            it("should update geolocation latitude", function() {
                                expect(geo.latitude).toEqual(coords.latitude);
                            });

                            it("should update geolocation longitude", function() {
                                expect(geo.longitude).toEqual(coords.longitude);
                            });

                            it("should update geolocation accuracy", function() {
                                expect(geo.accuracy).toEqual(coords.accuracy);
                            });

                            it("should update geolocation altitudeAccuracy", function() {
                                expect(geo.altitudeAccuracy).toEqual(coords.altitudeAccuracy);
                            });

                            it("should update geolocation heading", function() {
                                expect(geo.heading).toEqual(coords.heading);
                            });

                            it("should update geolocation speed", function() {
                                expect(geo.speed).toEqual(coords.speed);
                            });

                            it("should call callback function", function() {
                                expect(fakeCallback).toHaveBeenCalledWith(geo, geo);
                            });

                            it("should fire event update", function() {
                                expect(geo.fireEvent).toHaveBeenCalledWith("update", geo, geo);
                            });
                        });

                        describe("when heading and speed aren't defined", function() {
                            beforeEach(function() {
                                fakePosition = {
                                    timestamp: 1285837067410,
                                    coords: {
                                        latitude:  43.604363,
                                        longitude: 1.442951,
                                        altitude: 0,
                                        accuracy: 140000,
                                        altitudeAccuracy: 0
                                    }
                                };
                                coords = fakePosition.coords;

                                geo.factory.getCurrentPosition.andCallFake(function(successFn) {
                                    successFn(fakePosition);
                                });

                                geo.updateLocation(fakeCallback, this);
                            });

                            it("should have geolocation heading null", function() {
                                expect(geo.heading).toBeNull();
                            });

                            it("should have geolocation speed null", function() {
                                expect(geo.speed).toBeNull();
                            });
                        });
                    });

                    describe("when getCurrentPosition failed", function() {
                        var fakeError;

                        beforeEach(function() {
                            fakeError = {
                                code: 1,
                                UNKNOWN_ERROR: 0,
                                PERMISSION_DENIED: 1,
                                POSITION_UNAVAILABLE: 2,
                                TIMEOUT: 3,
                                message: "I'am lost!"
                            };

                            geo.factory.getCurrentPosition.andCallFake(function(successFn, failFn) {
                                failFn(fakeError);
                            });

                            geo.updateLocation(fakeCallback, this);
                        });

                        it("should fire locationerror event", function() {
                            expect(geo.fireEvent).toHaveBeenCalledWith("locationerror", geo, false, true, false, "I'am lost!");
                        });

                        it("should call callback function", function() {
                            expect(fakeCallback).toHaveBeenCalledWith(null, geo);
                        });

                        it("should fire event update", function() {
                            expect(geo.fireEvent).toHaveBeenCalledWith("update", false, geo);
                        });
                    });
                });


                describe("getLocation", function() {
                    var fakeCallback,
                        updateLocationSpy;

                    beforeEach(function(){
                        fakeCallback = jasmine.createSpy("fakeCallback");
                        updateLocationSpy = spyOn(geo, "updateLocation");
                    });

                    it("should call callback function if latitude is not null", function() {
                        geo.latitude = 15000;
                        geo.getLocation(fakeCallback, this);

                        expect(fakeCallback).toHaveBeenCalledWith(geo, geo);
                    });

                    it("should not call callback function if latitude is null", function() {
                        geo.getLocation(fakeCallback, this);

                        expect(fakeCallback).not.toHaveBeenCalled();
                    });

                    it("should call updateLocation method", function() {
                        geo.getLocation(fakeCallback, fakeScope);

                        expect(updateLocationSpy).toHaveBeenCalledWith(fakeCallback, fakeScope);
                    });
                });
            });
        });
    } else {
        describe("if browser hasn't geoLocation support", function() {
            beforeEach(function() {
                spyOn(Ext.util.GeoLocation.prototype, "setAutoUpdate").andCallThrough();
                geo = new Ext.util.GeoLocation();
            });

            describe("instantiation", function() {
                it("should be an instance of Ext.util.Observable", function() {
                    expect(geo.superclass).toEqual(Ext.util.Observable.prototype);
                });

                it("should call setAutoUpdate", function() {
                    waitsFor(function(){
                        return Ext.util.GeoLocation.prototype.setAutoUpdate.calls.length > 0;
                    }, "setAutoUpdate was never called");

                    runs(function() {
                         expect(Ext.util.GeoLocation.prototype.setAutoUpdate).toHaveBeenCalledWith(geo.autoUpdate);
                    });
                });

                it("should have coords", function(){
                    expect(geo.coords).toEqual(geo);
                });

                describe("configuration options", function() {
                    it("should have autoUpdate", function () {
                        expect(geo.autoUpdate).toBe(true);
                    });

                    it("should have a null latitude", function() {
                        expect(geo.latitude).toBeNull();
                    });

                    it("should have a null longitude", function() {
                        expect(geo.longitude).toBeNull();
                    });

                    it("should have a null accuracy", function() {
                        expect(geo.accuracy).toBeNull();
                    });

                    it("should have a null altitude", function() {
                        expect(geo.altitude).toBeNull();
                    });

                    it("should have a null altitudeAccuracy", function() {
                        expect(geo.altitudeAccuracy).toBeNull();
                    });

                    it("should have a null heading", function() {
                        expect(geo.heading).toBeNull();
                    });

                    it("should have a null speed", function() {
                        expect(geo.speed).toBeNull();
                    });

                    it("should have a null timestamp", function() {
                        expect(geo.timestamp).toBeNull();
                    });

                    it("should have disabled high accuracy", function() {
                        expect(geo.allowHighAccuracy).toBe(false);
                    });

                    it("should never timeout", function() {
                        expect(geo.timeout).toEqual(Infinity);
                    });

                    it("should have a maximumAge equal to 0", function() {
                        expect(geo.maximumAge).toEqual(0);
                    });
                });
            });

            describe("methods", function() {
                describe("setMaximumAge", function() {
                    it("should change the maxiumAge option and call autoUpdate", function() {
                        geo.setMaximumAge(10);

                        expect(geo.maximumAge).toEqual(10);

                        expect(Ext.util.GeoLocation.prototype.setAutoUpdate).toHaveBeenCalledWith(geo.autoUpdate);
                    });
                });

                describe("setTimeout", function() {
                    it("should change the timeout option and call autoUpdate", function() {
                        geo.setTimeout(500);

                        expect(geo.timeout).toEqual(500);

                        expect(Ext.util.GeoLocation.prototype.setAutoUpdate).toHaveBeenCalledWith(geo.autoUpdate);
                    });
                });

                describe("setAllowHighAccuracy", function() {
                    it("should change the allowHighAccuracy option and call autoUpdate", function() {
                        geo.setAllowHighAccuracy(true);

                        expect(geo.allowHighAccuracy).toBe(true);

                        expect(Ext.util.GeoLocation.prototype.setAutoUpdate).toHaveBeenCalledWith(geo.autoUpdate);
                    });
                });

                describe("setAutoUpdate", function() {
                    var watchOperation;

                    beforeEach(function() {
                        spyOn(geo, "fireEvent");
                    });

                    it("should fire event locationerror", function() {
                        expect(geo.setAutoUpdate(true)).toBe(false);
                        expect(geo.fireEvent).toHaveBeenCalledWith("locationerror", geo, false, false, true, null);
                    });
                });

                describe("updateLocation", function() {
                    var fakeCallback;

                    beforeEach(function(){
                        fakeCallback = jasmine.createSpy("fakeCallback");
                        spyOn(geo, "fireEvent");
                        geo.updateLocation(fakeCallback, this);
                    });

                    it("should fire event locationerror", function() {
                        waitsFor(function() {
                            return geo.fireEvent.calls.length == 3;
                        }, "fireEvent was never called");

                        runs(function() {
                            expect(geo.fireEvent).toHaveBeenCalledWith("locationerror", geo, false, false, true, null);
                        });
                    });

                    it("should call callback function", function() {
                        waitsFor(function() {
                            return fakeCallback.calls.length === 1;
                        }, "fakeCallback was never called");

                        runs(function() {
                            expect(fakeCallback).toHaveBeenCalledWith(null, geo);
                        });
                    });

                    it("should fire update", function() {
                        waitsFor(function() {
                            return geo.fireEvent.calls.length == 3;
                        }, "fireEvent was never called");

                        runs(function() {
                            var arg = geo.fireEvent.calls[2].args;
                            expect(arg[0]).toEqual("update");
                            expect(arg[1]).toEqual(false);
                            expect(arg[2]).toEqual(geo);
                        });
                    });
                });

                describe("getLocation", function() {
                    var fakeCallback,
                        updateLocationSpy;

                    beforeEach(function(){
                        fakeCallback = jasmine.createSpy("fakeCallback");
                        updateLocationSpy = spyOn(geo, "updateLocation");
                    });

                    it("should call callback function if latitude is not null", function() {
                        geo.latitude = 15000;
                        geo.getLocation(fakeCallback, this);

                        expect(fakeCallback).toHaveBeenCalledWith(geo, geo);
                    });

                    it("should not call callback function if latitude is null", function() {
                        geo.getLocation(fakeCallback, this);

                        expect(fakeCallback).not.toHaveBeenCalled();
                    });

                    it("should call updateLocation method", function() {
                        geo.getLocation(fakeCallback, fakeScope);

                        expect(updateLocationSpy).toHaveBeenCalledWith(fakeCallback, fakeScope);
                    });
                });
            });
        });
    }
});
