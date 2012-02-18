describe("Ext.Element", function() {
    var proto = Ext.Element.prototype,
        el, testEl,
        input, testInputEl;

    beforeEach(function() {
        testEl = Ext.getBody().createChild({
            id: 'ExtElementHelper'
        });

        testInputEl = Ext.getBody().createChild({
            id  : 'ExtElementInputHelper',
            tag : 'input',
            type: 'text'
        });

        el    = new Ext.Element(Ext.getDom(testEl));
        input = new Ext.Element(Ext.getDom(testInputEl));
    });

    it("should have a defaultUnit", function() {
        expect(proto.defaultUnit).toEqual('px');
    });

    describe("constructor", function() {
        describe("when passed a string", function() {
            it("should get the element", function() {
                el = new Ext.Element('ExtElementHelper');

                expect(el).toBeDefined();
                expect(Ext.getDom(el)).toEqual(Ext.getDom(testEl));
                expect(el.id).toEqual(Ext.getDom(el).id);
            });
        });

        describe("when passed a dom", function() {
            it("should get the element", function() {
                el = new Ext.Element(Ext.getDom(testEl));

                expect(el).toBeDefined();
                expect(Ext.getDom(el)).toEqual(Ext.getDom(testEl));
                expect(el.id).toEqual(Ext.getDom(el).id);
            });
        });
    });

    describe("methods", function() {
        describe("set", function() {
            it("should set styles", function() {
                var spy = spyOn(el, "applyStyles").andCallThrough();

                el.set({
                    style: 'padding:10px'
                });

                expect(spy).wasCalled();
            });

            it("should set class", function() {
                expect(Ext.getDom(el).className).toEqual('');

                el.set({
                    cls: 'class'
                });

                expect(Ext.getDom(el).className).toEqual('class');
            });

            it("should call setAttribute", function() {
                var spy = spyOn(Ext.getDom(el), "setAttribute").andCallThrough();

                expect(Ext.getDom(el).getAttribute('rel')).toBeNull();

                el.set({
                    rel: 'rel'
                });

                expect(spy).wasCalled();
                expect(Ext.getDom(el).getAttribute('rel')).toEqual('rel');
            });

            it("should set the attribute", function() {
                Ext.getDom(el).expando = true;

                expect(Ext.getDom(el)['counter']).not.toBeDefined();

                el.set({
                    counter: '2'
                }, false);

                expect(Ext.getDom(el)['counter']).toEqual('2');
            });
        });

        describe("is", function() {
            it("should return true", function() {
                expect(el.is('#ExtElementHelper')).toBeTruthy();
            });

            it("should return false", function() {
                expect(el.is('.suite:first-child')).toBeFalsy();
            });
        });

        describe("getValue", function() {
            it("should return the value", function() {
                input.set({
                    value: 'test'
                });

                expect(input.getValue()).toEqual('test');
            });
        });

        describe("addListener", function() {
            it("should call Ext.EventManager.on", function() {
                var spy = spyOn(Ext.EventManager, "on").andCallThrough();

                el.addListener('test', function() {});

                expect(spy).wasCalled();
            });
        });

        describe("removeListener", function() {
            it("should call Ext.EventManager.un", function() {
                var spy = spyOn(Ext.EventManager, "un").andCallThrough();

                el.removeListener('test', function() {});

                expect(spy).wasCalled();
            });
        });

        describe("removeAllListeners", function() {
            it("should call Ext.EventManager.removeAll", function() {
                var spy = spyOn(Ext.EventManager, "removeAll").andCallThrough();

                el.removeAllListeners();

                expect(spy).wasCalled();
            });
        });

        describe("purgeAllListeners", function() {
            it("should call Ext.EventManager.purgeElement", function() {
                var spy = spyOn(Ext.EventManager, "purgeElement");

                el.purgeAllListeners();

                expect(spy).wasCalled();
            });
        });

        describe("remove", function() {
            it("should remove the element", function() {
                var spy = spyOn(Ext, "removeNode").andCallThrough();

                el.remove();

                expect(spy).wasCalled();
            });
        });

        describe("isAncestor", function() {
            it("should return true", function() {
                var test = Ext.DomHelper.append(el, {tag: 'input'});
                
                expect(el.isAncestor(Ext.get(test))).not.toBeUndefined();
            });

            it("should return false", function() {
                expect(el.isAncestor(Ext.getBody())).toBeFalsy();
            });

            it("should return false", function() {
                expect(el.isAncestor()).toBeFalsy();
            });
        });

        describe("isDescendent", function() {
            it("should return true", function() {
                expect(el.isDescendent(Ext.getBody())).toBeTruthy();
            });

            it("should return false", function() {
                var test = Ext.DomHelper.append(el, {tag: 'input'});

                expect(el.isDescendent(Ext.get(test))).toBeFalsy();
            });
        });

        describe("contains", function() {
            it("should return true", function() {
                var test = Ext.DomHelper.append(el, {tag: 'input'});

                expect(el.contains(Ext.get(test))).toBeTruthy();
            });

            it("should return false", function() {
                expect(el.contains(Ext.getBody())).toBeFalsy();
            });
        });

        describe("getAttribute", function() {
            it("should return the attribute", function() {
                el.dom.setAttribute('rel', 'test');

                expect(el.getAttribute('rel')).toEqual('test');
            });
        });

        describe("setHTML", function() {
            it("should set the innerHTML", function() {
                expect(el.getHTML()).toEqual('');

                el.setHTML('test');

                expect(el.getHTML()).toEqual('test');
            });
        });

        describe("getHTML", function() {
            it("should set the innerHTML", function() {
                expect(el.getHTML()).toEqual('');

                el.setHTML('test');

                expect(el.getHTML()).toEqual('test');
            });
        });

        describe("hide", function() {
            it("should call setVisible", function() {
                var spy = spyOn(el, "setVisible");

                el.hide();

                expect(spy).wasCalledWith(false);
            });
        });

        describe("show", function() {
            it("should call setVisible", function() {
                var spy = spyOn(el, "setVisible");

                el.show();

                expect(spy).wasCalledWith(true);
            });
        });

        describe("setVisible", function() {
            describe("true", function() {
                describe("Ext.Element.VISIBILITY", function() {
                    beforeEach(function() {
                        el.setDisplayMode(Ext.Element.VISIBILITY);
                    });

                    it("should call removeCls", function() {
                        var spy = spyOn(el, "removeCls").andCallThrough();

                        el.setVisible(true);

                        expect(spy).wasCalledWith(['x-hidden-display', 'x-hidden-offsets']);
                    });

                    it("should call removeCls", function() {
                        var spy = spyOn(el, "removeCls").andCallThrough();

                        el.setVisible(true);

                        expect(spy).wasCalledWith('x-hidden-visibility');
                    });
                });

                describe("Ext.Element.DISPLAY", function() {
                    beforeEach(function() {
                        el.setDisplayMode(Ext.Element.DISPLAY);
                    });

                    it("should call removeCls", function() {
                        var spy = spyOn(el, "removeCls").andCallThrough();

                        el.setVisible(true);

                        expect(spy).wasCalledWith(['x-hidden-visibility', 'x-hidden-offsets']);
                    });

                    it("should call removeCls", function() {
                        var spy = spyOn(el, "removeCls").andCallThrough();

                        el.setVisible(true);

                        expect(spy).wasCalledWith('x-hidden-display');
                    });
                });

                describe("Ext.Element.OFFSETS", function() {
                    beforeEach(function() {
                        el.setDisplayMode(Ext.Element.OFFSETS);
                    });

                    it("should call removeCls", function() {
                        var spy = spyOn(el, "removeCls").andCallThrough();

                        el.setVisible(true);

                        expect(spy).wasCalledWith(['x-hidden-visibility', 'x-hidden-display']);
                    });

                    it("should call removeCls", function() {
                        var spy = spyOn(el, "removeCls").andCallThrough();

                        el.setVisible(true);

                        expect(spy).wasCalledWith('x-hidden-offsets');
                    });
                });
            });

            describe("false", function() {
                describe("Ext.Element.VISIBILITY", function() {
                    beforeEach(function() {
                        el.setDisplayMode(Ext.Element.VISIBILITY);
                    });

                    it("should call removeCls", function() {
                        var spy = spyOn(el, "removeCls").andCallThrough();

                        el.setVisible(false);

                        expect(spy).wasCalledWith(['x-hidden-display', 'x-hidden-offsets']);
                    });

                    it("should call addCls", function() {
                        var spy = spyOn(el, "addCls").andCallThrough();

                        el.setVisible(false);

                        expect(spy).wasCalledWith('x-hidden-visibility');
                    });
                });

                describe("Ext.Element.DISPLAY", function() {
                    beforeEach(function() {
                        el.setDisplayMode(Ext.Element.DISPLAY);
                    });

                    it("should call removeCls", function() {
                        var spy = spyOn(el, "removeCls").andCallThrough();

                        el.setVisible(false);

                        expect(spy).wasCalledWith(['x-hidden-visibility', 'x-hidden-offsets']);
                    });

                    it("should call addCls", function() {
                        var spy = spyOn(el, "addCls").andCallThrough();

                        el.setVisible(false);

                        expect(spy).wasCalledWith('x-hidden-display');
                    });
                });

                describe("Ext.Element.OFFSETS", function() {
                    beforeEach(function() {
                        el.setDisplayMode(Ext.Element.OFFSETS);
                    });

                    it("should call removeCls", function() {
                        var spy = spyOn(el, "removeCls").andCallThrough();

                        el.setVisible(false);

                        expect(spy).wasCalledWith(['x-hidden-visibility', 'x-hidden-display']);
                    });

                    it("should call addCls", function() {
                        var spy = spyOn(el, "addCls").andCallThrough();

                        el.setVisible(false);

                        expect(spy).wasCalledWith('x-hidden-offsets');
                    });
                });
            });
        });

        describe("getVisibilityMode", function() {
            describe("Ext.Element.VISIBILITY", function() {
                beforeEach(function() {
                    el.setDisplayMode(Ext.Element.VISIBILITY);
                });

                it("should return the visibility mode", function() {
                    expect(el.getVisibilityMode()).toEqual(Ext.Element.VISIBILITY);
                });
            });

            describe("Ext.Element.DISPLAY", function() {
                beforeEach(function() {
                    el.setDisplayMode(Ext.Element.DISPLAY);
                });

                it("should return the visibility mode", function() {
                    expect(el.getVisibilityMode()).toEqual(Ext.Element.DISPLAY);
                });
            });

            describe("Ext.Element.OFFSETS", function() {
                beforeEach(function() {
                    el.setDisplayMode(Ext.Element.OFFSETS);
                });

                it("should return the visibility mode", function() {
                    expect(el.getVisibilityMode()).toEqual(Ext.Element.OFFSETS);
                });
            });
        });

        describe("setDisplayMode", function() {
            beforeEach(function() {
                el.setDisplayMode(Ext.Element.VISIBILITY);
            });

            it("should set the display mode", function() {
                expect(el.getVisibilityMode()).toEqual(Ext.Element.VISIBILITY);

                el.setDisplayMode(Ext.Element.DISPLAY);

                expect(el.getVisibilityMode()).toEqual(Ext.Element.DISPLAY);
            });
        });
    });
});
