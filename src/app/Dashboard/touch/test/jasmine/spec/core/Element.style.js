describe("Ext.Element - style", function() {
    var proto = Ext.Element,
        el, testEl,
        input, testInputEl,
        child1, child2, child3;
    
    beforeEach(function() {
        testEl = Ext.getBody().createChild({
            id      : 'ExtElementHelper',
            style   : 'position:absolute;',
            children: [
                {id: 'child1', style: 'position:absolute;'},
                {id: 'child2', style: 'position:absolute;'},
                {id: 'child3', style: 'position:absolute;'}
            ]
        });
        
        testInputEl = Ext.getBody().createChild({
            id  : 'ExtElementInputHelper',
            tag : 'input',
            type: 'text'
        });
        
        el    = new Ext.Element(Ext.getDom(testEl));
        input = new Ext.Element(Ext.getDom(testInputEl));
        
        child1 = Ext.get('child1');
        child2 = Ext.get('child2');
        child3 = Ext.get('child3');
    });
    
    describe("addCls", function() {
        describe("when string", function() {
            it("should add the class", function() {
                expect(el.hasCls('test')).toBeFalsy();
                
                el.addCls('test');
                
                expect(el.hasCls('test')).toBeTruthy();
            });
        });
        
        describe("when array", function() {
            it("should add the classes", function() {
                expect(el.hasCls('test1')).toBeFalsy();
                expect(el.hasCls('test2')).toBeFalsy();
                
                el.addCls(['test1', 'test2']);
                
                expect(el.hasCls('test1')).toBeTruthy();
                expect(el.hasCls('test2')).toBeTruthy();
            });
        });
    });
    
    describe("removeCls", function() {
        describe("when string", function() {
            beforeEach(function() {
                el.addCls('test');
            });
            
            it("should remove the class", function() {
                expect(el.hasCls('test')).toBeTruthy();
                
                el.removeCls('test');
                
                expect(el.hasCls('test')).toBeFalsy();
            });
        });
        
        describe("when array", function() {
            beforeEach(function() {
                el.addCls(['test1', 'test2']);
            });
            
            it("should remove the classes", function() {
                expect(el.hasCls('test1')).toBeTruthy();
                expect(el.hasCls('test2')).toBeTruthy();
                
                el.removeCls(['test1', 'test2']);
                
                expect(el.hasCls('test1')).toBeFalsy();
                expect(el.hasCls('test2')).toBeFalsy();
            });
        });
    });
    
    describe("mask", function() {
        it("should add a x-masked class to the element", function() {
            expect(el.hasCls('x-masked')).toBeFalsy();
            
            el.mask();
            
            expect(el.hasCls('x-masked')).toBeTruthy();
        });
        
        it("should add a x-masked-relative class when it is a static element", function() {
            expect(el.hasCls('x-masked-relative')).toBeFalsy();
            
            el.setStyle('position', 'static');
            el.mask();
            
            expect(el.hasCls('x-masked-relative')).toBeTruthy();
        });
        
        it("should remove any old masks", function() {
            el.mask();
            
            var mask = Ext.Element.data(Ext.getDom(el), 'mask'),
                spy  = spyOn(mask, "remove").andCallThrough();
            
            el.mask();
            
            expect(spy).wasCalled();
        });
        
        it("should call getSize", function() {
            var spy = spyOn(el, "getSize").andCallThrough();
            
            el.mask();
            
            expect(spy).wasCalled();
        });
        
        it("should set the size of the mask", function() {
            var size = el.getSize();
            
            el.mask();
            
            var mask = Ext.Element.data(Ext.getDom(el), 'mask');
            
            expect(mask.getSize()).toEqual(size);
        });
        
        describe("when iPad", function() {
            beforeEach(function() {
                Ext.is.iPad = true;
            });
            
            it("should call repaint", function() {
                var spy = spyOn(Ext, "repaint");
                
                el.mask();
                
                expect(spy).wasCalled();
            });
        });
    });
    
    describe("unmask", function() {
        beforeEach(function() {
            el.mask();
        });
        
        it("should remove the mask", function() {
            var mask = Ext.Element.data(Ext.getDom(el), 'mask'),
                spy  = spyOn(mask, "remove").andCallThrough();
            
            el.unmask();
            
            expect(spy).wasCalled();
            expect(Ext.Element.data(Ext.getDom(el), 'mask')).not.toBeDefined();
        });
        
        it("should call removeCls", function() {
            var spy = spyOn(el, "removeCls").andCallThrough();
            
            el.unmask();
            
            expect(spy).wasCalledWith(['x-masked', 'x-masked-relative']);
        });
    });
    
    describe("radioCls", function() {
        it("should add a class to the element", function() {
            expect(child1.hasCls('test')).toBeFalsy();
            
            child1.radioCls('test');
            
            expect(child1.hasCls('test')).toBeTruthy();
        });
        
        it("should remove the class from other elements", function() {
            child1.addCls('test');
            child2.addCls('test');
            child3.addCls('test');
            
            expect(child1.hasCls('test')).toBeTruthy();
            expect(child2.hasCls('test')).toBeTruthy();
            expect(child3.hasCls('test')).toBeTruthy();
            
            child2.radioCls('test');
            
            expect(child1.hasCls('test')).toBeFalsy();
            expect(child2.hasCls('test')).toBeTruthy();
            expect(child3.hasCls('test')).toBeFalsy();
        });
    });
    
    describe("toggleCls", function() {
        it("should add the class", function() {
            expect(el.hasCls('test')).toBeFalsy();
            
            el.toggleCls('test');
            
            expect(el.hasCls('test')).toBeTruthy();
        });
        
        it("should remove the class", function() {
            el.addCls('test');
            
            expect(el.hasCls('test')).toBeTruthy();
            
            el.toggleCls('test');
            
            expect(el.hasCls('test')).toBeFalsy();
        });
    });
    
    describe("hasCls", function() {
        it("should return false", function() {
            expect(el.hasCls('test')).toBeFalsy();
        });
        
        it("should return true", function() {
            el.addCls('test');
            
            expect(el.hasCls('test')).toBeTruthy();
        }); 
    });   
    
    describe("replaceCls", function() {
        it("should replace the class", function() {
            el.addCls('test1');
            
            expect(el.hasCls('test1')).toBeTruthy();
            expect(el.hasCls('test2')).toBeFalsy();
            
            el.replaceCls('test1', 'test2');
            
            expect(el.hasCls('test1')).toBeFalsy();
            expect(el.hasCls('test2')).toBeTruthy();
        });
    });
    
    describe("isStyle", function() {
        it("should return false", function() {
            expect(el.isStyle('position', 'static')).toBeFalsy();
        });
        
        it("should return true", function() {
            el.setStyle('position', 'static');
            
            expect(el.isStyle('position', 'static')).toBeTruthy();
        });
    });
    
    describe("getStyle", function() {
        it("should return the style", function() {
            expect(el.getStyle('position')).toEqual('absolute');
            
            el.setStyle('position', 'static');
            
            expect(el.getStyle('position')).toEqual('static');
        });
        
        it("should return correct background", function() {
            expect(el.getStyle('background')).toEqual('');
            
            el.setStyle('background', 'transparent');
            
            expect(el.getStyle('background')).toEqual('transparent');
            
            el.setStyle('background', 'rgba(0, 0, 0, 0)');
            
            expect(el.getStyle('background')).toEqual('transparent');
        });
    });
    
    describe("setStyle", function() {
        describe("string", function() {
            it("should set the style", function() {
                expect(el.isStyle('position', 'static')).toBeFalsy();
                
                el.setStyle('position', 'static');

                expect(el.isStyle('position', 'static')).toBeTruthy();
            });
        });
        
        describe("object", function() {
            it("should set the style", function() {
                expect(el.isStyle('position', 'static')).toBeFalsy();
                expect(el.isStyle('background', 'red')).toBeFalsy();
                
                el.setStyle({
                    position  : 'static',
                    background: 'red'
                });
                
                expect(el.isStyle('position',   'static')).toBeTruthy();
                expect(el.isStyle('background', 'red')).toBeTruthy();
            });
        });
    });
    
    describe("applyStyles", function() {
        it("should apply styles from a string", function() {
            el.applyStyles('padding:10px;');
            
            expect(el.isStyle('padding', '10px')).toBeTruthy();
        });
        
        it("should apply styles from an object", function() {
            el.applyStyles({
                padding: '10px'
            });
            
            expect(el.isStyle('padding', '10px')).toBeTruthy();
        });
        
        it("should apply styles from a function", function() {
            el.applyStyles(function() {
                return {
                    padding: '10px'
                };
            });
            
            expect(el.isStyle('padding', '10px')).toBeTruthy();
        });
    });
    
    describe("getHeight", function() {
        it("should return the height of the element", function() {
            var result = el.getHeight();
            
            expect(result).toBeDefined();
            expect(Ext.isNumber(result)).toBeTruthy();
        });
    });
    
    describe("getWidth", function() {
        it("should return the width of the element", function() {
            var result = el.getWidth();
            
            expect(result).toBeDefined();
            expect(Ext.isNumber(result)).toBeTruthy();
        });
    });
    
    describe("setWidth", function() {
        beforeEach(function() {
            Ext.getDom(el).style.width = "10px";
        });
        
        it("should set the width", function() {
            expect(el.getWidth()).toEqual(10);
            
            el.setWidth(20);
            
            expect(el.getWidth()).toEqual(20);
        });
    });
    
    describe("setHeight", function() {
        beforeEach(function() {
            Ext.getDom(el).style.height = "10px";
        });
        
        it("should set the height", function() {
            expect(el.getHeight()).toEqual(10);
            
            el.setHeight(20);
            
            expect(el.getHeight()).toEqual(20);
        });
    });
    
    describe("setSize", function() {
        describe("object", function() {
            it("should set the width and height", function() {
                el.setSize({
                    width : 10,
                    height: 20
                });

                expect(el.getWidth()).toEqual(10);
                expect(el.getHeight()).toEqual(20);
            });
        });
        
        describe("arguments", function() {
            it("should set the width and height", function() {
                el.setSize(10, 20);

                expect(el.getWidth()).toEqual(10);
                expect(el.getHeight()).toEqual(20);
            });
        });
    });
    
    describe("getBorderWidth", function() {
        it("should call sumStyles with the side config", function() {
            var spy = spyOn(el, "sumStyles").andCallThrough();
            
            el.getBorderWidth('l');
            
            expect(spy).wasCalledWith('l', Ext.Element.borders);
        });
    });
    
    describe("getPadding", function() {
        it("should call sumStyles with the side config", function() {
            var spy = spyOn(el, "sumStyles").andCallThrough();
            
            el.getPadding('l');
            
            expect(spy).wasCalledWith('l', Ext.Element.paddings);
        });
    });
    
    describe("getMargin", function() {
        it("should call sumStyles with the side config", function() {
            var spy = spyOn(el, "sumStyles").andCallThrough();
            
            el.getMargin('l');
            
            expect(spy).wasCalledWith('l', Ext.Element.margins);
        });
    });
    
    describe("getViewSize", function() {
        describe("element", function() {
            it("should return the view sizes", function() {
                var result = el.getViewSize();
                
                expect(result).toBeDefined();
                expect(result.width).toEqual(Ext.getDom(el).clientWidth);
                expect(result.height).toEqual(Ext.getDom(el).clientHeight);
            });
        });
        
        describe("document/body", function() {
            it("should return the view sizes", function() {
                var body   = Ext.getBody(true),
                    result = body.getViewSize();
                
                expect(result).toBeDefined();
                expect(result.width).toEqual(Ext.Element.getViewportWidth());
                expect(result.height).toEqual(Ext.Element.getViewportHeight());
            });
        });
    });
    
    describe("getSize", function() {
        it("should return the size of the element", function() {
            expect(el.getSize()).toBeDefined();
        });
    });
    
    describe("repaint", function() {
        it("should add a repaint class", function() {
            runs(function() {
                expect(el.hasCls('x-repaint')).toBeFalsy();
                
                el.repaint();
                
                expect(el.hasCls('x-repaint')).toBeTruthy();
            });
            
            waitsFor(function() {
                return el.hasCls('x-repaint') === false;
            }, "repaint class wasn't removed");
        });
        
        it("should set the background to transparent and then remove it", function() {
            runs(function() {
                el.repaint();
                
                expect(Ext.getDom(el).style.background).toEqual('transparent none');
            });
            
            waitsFor(function() {
                return Ext.getDom(el).style.background === '';
            }, "background wasn't removed");
        });
    });
    
    describe("getOuterWidth", function() {
        it("should return the outer width of the el", function() {
            var result = el.getOuterWidth();
            
            expect(result).toBeDefined();
            expect(Ext.isNumber).toBeTruthy();
        });
    });
    
    describe("getOuterHeight", function() {
        it("should return the outer height of the el", function() {
            var result = el.getOuterHeight();
            
            expect(result).toBeDefined();
            expect(Ext.isNumber).toBeTruthy();
        });
    });
    
    describe("sumStyles", function() {
        describe("1 side", function() {
            it("should return a value", function() {
                var result = el.sumStyles('l', Ext.Element.paddings);
                
                expect(result).toBeDefined();
                expect(Ext.isNumber(result)).toBeTruthy();
            });
        });
        
        describe("2 sides", function() {
            it("should return a value", function() {
                var result = el.sumStyles('lr', Ext.Element.paddings);
                
                expect(result).toBeDefined();
                expect(Ext.isNumber(result)).toBeTruthy();
            });
        });
        
        describe("3 sides", function() {
            it("should return a value", function() {
                var result = el.sumStyles('lrt', Ext.Element.paddings);
                
                expect(result).toBeDefined();
                expect(Ext.isNumber(result)).toBeTruthy();
            });
        });
        
        describe("4 sides", function() {
            it("should return a value", function() {
                var result = el.sumStyles('lrtb', Ext.Element.paddings);
                
                expect(result).toBeDefined();
                expect(Ext.isNumber(result)).toBeTruthy();
            });
        });
    });
});
