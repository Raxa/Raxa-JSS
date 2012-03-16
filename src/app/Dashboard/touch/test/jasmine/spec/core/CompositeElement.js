describe("Ext.CompositeElement", function() {
    var proto = Ext.CompositeElement.prototype,
        el, els,
        el2, els2;
    
    beforeEach(function() {
        el = Ext.getBody().createChild({
            id      : 'CompositeElementHelper',
            children: [
                {cls: 'child', id: 'firstChild'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child2'},
                {cls: 'child2'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'}
            ]
        });
        
        els = Ext.select('#CompositeElementHelper > div');
        
        el2 = Ext.getBody().createChild({
            id      : 'CompositeElementHelper2',
            children: [
                {cls: 'child', id: 'firstChild2'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'}
            ]
        });
        
        els2 = Ext.select('#CompositeElementHelper2 > div');
    });
    
    describe("getElement", function() {
        it("should return an Ext.Element", function() {
            var el = els.elements[0];
            
            expect(els.getElement(el).id).toEqual(el.id);
        });
    });
    
    describe("transformElement", function() {
        it("should return the dom", function() {
            var dom = els.elements[0],
                el  = els.getElement(dom);
            
            expect(els.transformElement(el)).toEqual(dom);
        });
    });
    
    describe("getCount", function() {
        it("should return the number of elements", function() {
            expect(els.getCount()).toEqual(10);
        });
    });
    
    describe("add", function() {
        it("should add nothing", function() {
            expect(els.getCount()).toEqual(10);
            
            els.add();
            
            expect(els.getCount()).toEqual(10);
        });
        
        it("should get CompositeElementHelper2 and add to CompositeElementHelper", function() {
            var spy = spyOn(Ext.Element, "selectorFunction").andCallThrough();
            
            expect(els.getCount()).toEqual(10);
            
            els.add('#CompositeElementHelper2 > div');
            
            expect(els.getCount()).toEqual(20);
            expect(spy).wasCalled();
        });
        
        it("should add CompositeElementHelper2 to CompositeElementHelper", function() {
            expect(els.getCount()).toEqual(10);
            
            els.add(els2);
            
            expect(els.getCount()).toEqual(20);
        });
        
        it("should add 1 dom to CompositeElementHelper", function() {
            expect(els.getCount()).toEqual(10);
            
            els.add(els2.elements[0]);
            
            expect(els.getCount()).toEqual(11);
        });
    });
    
    describe("invoke", function() {
        it("should run a function on each element", function() {
            var spy = spyOn(Ext.Element.prototype, "getVisibilityMode");
            
            els.invoke('getVisibilityMode');
            
            expect(spy.callCount).toEqual(10);
        });
    });
    
    describe("item", function() {
        it("should return an item at a specified index", function() {
            expect(els.item(2)).toEqual(els.getElement(els.elements[2]));
        });
    });
    
    describe("addListener", function() {
        it("should call Ext.EventManager.on", function() {
            var spy = spyOn(Ext.EventManager, "on"),
                foo = function() {};
            
            els.addListener('show', foo);
            
            expect(spy.callCount).toEqual(10);
        });
    });
    
    describe("each", function() {
        it("should call a function with each element", function() {
            var callback = jasmine.createSpy();
            
            els.each(callback);
            
            expect(callback.callCount).toEqual(10);
        });
    });
    
    describe("fill", function() {
        it("should call add", function() {
            var spy = spyOn(els, "add").andCallThrough();
            
            els.fill(els2);
            
            expect(spy).wasCalled();
        });
    });
    
    describe("filter", function() {
        it("should return filtered elements", function() {
            expect(els.getCount()).toEqual(10);
            
            els.filter('.child2');
            
            expect(els.getCount()).toEqual(2);
        });
    });
    
    describe("first", function() {
        it("should return the first child", function() {
            expect(els.first()).toEqual(els.item(0));
        });
    });
    
    describe("last", function() {
        it("should return the last child", function() {
            expect(els.last()).toEqual(els.item(els.getCount() - 1));
        });
    });
    
    describe("contains", function() {
        describe("when element", function() {
            describe("when found", function() {
                it("should return true", function() {
                    expect(els.contains(els.first())).toBeTruthy();
                });
            });
            
            describe("when not found", function() {
                it("should return false", function() {
                    expect(els.contains(els2.first())).toBeFalsy();
                });
            });
        });
        
        describe("when id", function() {
            describe("when found", function() {
                it("should return true", function() {
                    expect(els.contains('firstChild')).toBeTruthy();
                });
            });
            
            describe("when not found", function() {
                it("should return false", function() {
                    expect(els.contains('firstChild2')).toBeFalsy();
                });
            });
        });
    });
    
    describe("indexOf", function() {
        describe("when element", function() {
            it("should return the correct index", function() {
                expect(els.indexOf(els.first())).toEqual(0);
            });
        });
        
        describe("when id", function() {
            it("should return the correct index", function() {
                expect(els.indexOf('firstChild')).toEqual(0);
            });
        });
    });
    
    describe("clear", function() {
        it("should remove all elements", function() {
            expect(els.getCount()).toEqual(10);
            
            els.clear();
            
            expect(els.getCount()).toEqual(0);
        });
    });
});

describe("Ext.CompositeElementLite", function() {
    var proto = Ext.CompositeElement.prototype,
        el, els,
        el2, els2;
    
    beforeEach(function() {
        el = Ext.getBody().createChild({
            id      : 'CompositeElementHelper',
            children: [
                {cls: 'child', id: 'firstChild'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child2'},
                {cls: 'child2'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'}
            ]
        });
        
        els = Ext.select('#CompositeElementHelper > div');
        
        el2 = Ext.getBody().createChild({
            id      : 'CompositeElementHelper2',
            children: [
                {cls: 'child', id: 'firstChild2'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'},
                {cls: 'child'}
            ]
        });
        
        els2 = Ext.select('#CompositeElementHelper2 > div');
    });
    
    describe("addElements", function() {
        it("should add nothing", function() {
            expect(els.getCount()).toEqual(10);
            
            els.addElements();
            
            expect(els.getCount()).toEqual(10);
        });
        
        it("should get CompositeElementHelper2 and add to CompositeElementHelper", function() {
            var spy = spyOn(Ext.Element, "selectorFunction").andCallThrough();
            
            expect(els.getCount()).toEqual(10);
            
            els.addElements('#CompositeElementHelper2 > div');
            
            expect(els.getCount()).toEqual(20);
            expect(spy).wasCalled();
        });
    });
    
    describe("replaceElement", function() {
        it("should replace the element", function() {
            var replacement = els2.first();
            
            els.replaceElement(els.first(), replacement);
            
            expect(els.first()).toEqual(replacement);
        });
    });
});
