describe("Ext.Sheet", function() {
    var sheet;
    
    beforeEach(function() {
        sheet = new Ext.Sheet({
            renderTo: Ext.getBody()
        });
    });
    
    afterEach(function() {
        sheet.destroy();
    });
    
    it("should have a componentCls", function() {
        expect(sheet.componentCls).toEqual('x-sheet');
    });
    
    it("should not be centered", function() {
        expect(sheet.centered).toBeFalsy();
    });
    
    it("should be floating", function() {
        expect(sheet.floating).toBeTruthy();
    });
    
    it("should be modal", function() {
        expect(sheet.modal).toBeTruthy();
    });
    
    it("should not hideOnMaskTap", function() {
        expect(sheet.hideOnMaskTap).toBeFalsy();
    });
    
    it("should not be draggable", function() {
        expect(sheet.draggable).toBeFalsy();
    });
    
    it("should monitorOrientation", function() {
        expect(sheet.monitorOrientation).toBeTruthy();
    });
    
    it("should be hidden", function() {
        expect(sheet.hidden).toBeTruthy();
    });
    
    it("should arrive from the bottom", function() {
        expect(sheet.enter).toEqual('bottom');
    });
    
    it("should depart from the bottom", function() {
        expect(sheet.exit).toEqual('bottom');
    });
    
    it("should have a default enterAnimation", function() {
        expect(sheet.enterAnimation).toEqual('slide');
    });
    
    it("should have a default exitAnimation", function() {
        expect(sheet.exitAnimation).toEqual('slide');
    });
    
    it("should have default transitions", function() {
        expect(sheet.transitions).toBeDefined();
    });
    
    describe("when orient", function() {
        describe("when !floating", function() {
            beforeEach(function() {
                sheet.floating = false;
            });
            
            it("should return", function() {
                // for 100% coverage
                sheet.orient();
            });
        });
        
        describe("when there is a cfg.x || cfg.y", function() {
            beforeEach(function() {
                sheet.initialConfig.x = 10;
                sheet.initialConfig.y = 10;
            });
            
            it("should use it", function() {
                // for 100% coverage
                sheet.orient();
            });
        });
        
        describe("when arrive = left", function() {
            beforeEach(function() {
                sheet.arrive = "left";
            });
            
            it("should orient", function() {
                // for 100% coverage
                sheet.orient();
            });
        });
    });
    
    describe("when onShow", function() {
        it("should call orient", function() {
            spyOn(sheet, "orient").andCallThrough();
            
            sheet.onShow();
            
            expect(sheet.orient).wasCalled();
        });
        
        it("should call oritent", function() {
            spyOn(sheet, "orient").andCallThrough();
            
            sheet.onShow(sheet.animSheet('depart'));
            
            expect(sheet.orient).wasCalled();
        });
    });
    
    describe("when onOrientationChange", function() {
        it("should call orient", function() {
            spyOn(sheet, "orient").andCallThrough();
            
            sheet.onOrientationChange();
            
            expect(sheet.orient).wasCalled();
        });
    });
});

describe("Ext.ActionSheet", function() {
    var sheet;
    
    beforeEach(function() {
        sheet = new Ext.ActionSheet({
            renderTo: Ext.getBody()
        });
    });
    
    afterEach(function() {
        sheet.destroy();
    });
    
    it("should have a componentCls", function() {
        expect(sheet.componentCls).toEqual('x-sheet-action');
    });
    
    it("should stretchY", function() {
        expect(sheet.stretchY).toBeTruthy();
    });
    
    it("should stretchX", function() {
        expect(sheet.stretchX).toBeTruthy();
    });
    
    it("should have a defaultType", function() {
        expect(sheet.defaultType).toEqual('button');
    });
    
    it("should have a layout", function() {
        expect(sheet.layout).toBeDefined();
    });
});