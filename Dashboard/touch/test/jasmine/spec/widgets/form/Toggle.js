describe("Ext.form.Toggle", function() {
    var proto = Ext.form.Toggle.prototype,
        t;
    
    beforeEach(function() {
        t = new Ext.form.Toggle({
            label: 'test'
        });
    });
    
    afterEach(function() {
        t.destroy();
    });
    
    it("should have a minValue", function() {
        expect(proto.minValue).toEqual(0);
    });
    
    it("should have a maxValue", function() {
        expect(proto.maxValue).toEqual(1);
    });
    
    it("should have a ui", function() {
        expect(proto.ui).toEqual('toggle');
    });
    
    it("should have an inputType", function() {
        expect(proto.ui).toEqual('toggle');
    });
    
    it("should have a minValueCls", function() {
        expect(proto.minValueCls).toEqual('x-toggle-off');
    });
    
    it("should have a maxValueCls", function() {
        expect(proto.maxValueCls).toEqual('x-toggle-on');
    });
    
    describe("when rendered", function() {
        beforeEach(function() {
            t.render(Ext.getBody());
        });
        
        describe("when toggle", function() {
            it("should setValue", function() {
                var spy = spyOn(t, "setValue").andCallThrough();

                t.toggle();

                expect(spy).wasCalledWith(1, t.animationDuration);

                t.toggle();

                expect(spy).wasCalledWith(0, t.animationDuration);
            });
        });

        describe("when setValue", function() {
            it("should add maxValueCls and remove minValueCls", function() {
                var spy1 = spyOn(t.fieldEl, "addCls").andCallThrough(),
                    spy2 = spyOn(t.fieldEl, "removeCls").andCallThrough();
                
                t.setValue(1);
                
                expect(spy1).wasCalledWith(t.maxValueCls);
                expect(spy2).wasCalledWith(t.minValueCls);
            });
            
            it("should remove maxValueCls and add minValueCls", function() {
                var spy1 = spyOn(t.fieldEl, "addCls").andCallThrough(),
                    spy2 = spyOn(t.fieldEl, "removeCls").andCallThrough();
                
                t.setValue(0);
                
                expect(spy1).wasCalledWith(t.minValueCls);
                expect(spy2).wasCalledWith(t.maxValueCls);
            });
        });
        
        describe("when onTap", function() {
            it("should call toggle", function() {
                var spy = spyOn(t, "toggle").andCallThrough();
                
                t.onTap();
                
                expect(spy).wasCalled();
            });
        });
    });
});