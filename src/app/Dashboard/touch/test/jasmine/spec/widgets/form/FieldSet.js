describe("Ext.form.FieldSet", function() {
    var fs;
    
    beforeEach(function() {
        fs = new Ext.form.FieldSet({
            title: 'fieldset',
            instructions: 'instructions'
        });
    });
    
    afterEach(function() {
        fs.destroy();
    });
    
    it("should have a componentCls", function() {
        expect(fs.componentCls).toEqual('x-form-fieldset');
    });
    
    describe("before render", function(){
        it("should set the title if not rendered", function(){
            fs.setTitle("new title");
            expect(fs.title).toEqual("new title");
        });  
        
        it("should set the instructions if not rendered", function(){
            fs.setInstructions("new instructions");
            expect(fs.instructions).toEqual("new instructions");    
        });
    });
    
    describe("after render", function() {
        describe("when title", function() {
            beforeEach(function() {
                fs.render(Ext.getBody());
            });
            
            it("should create titleEl", function() {
                expect(fs.titleEl).toBeDefined();
            });
            
            it("should add the title", function() {
                expect(fs.titleEl.dom.innerHTML).toEqual("fieldset");
            });
            
            it("should set a new title", function(){
                fs.setTitle("new title");  
                expect(fs.titleEl.dom.innerHTML).toEqual("new title");  
            });
        });
        
        describe("when no title", function() {
            beforeEach(function() {
                fs.title = null;
            });
            
            it("should not create titleEl", function() {
                fs.render(Ext.getBody());
                expect(fs.titleEl).not.toBeDefined();
            });
            
            describe("when titleEl", function() {
                beforeEach(function() {
                    var titleEl = Ext.getBody().insertFirst({
                        cls : fs.componentCls + '-title',
                        html: fs.title
                    });
                    
                    fs.titleEl = titleEl;
                });
                
                it("should add it", function() {
                    var spy = null;
                    
                    fs.on({
                        render: function() {
                            spy = spyOn(fs.el, "insertFirst").andCallThrough();
                        }
                    });
                    
                    fs.render(Ext.getBody());
                    
                    expect(spy).wasCalled();
                });
            });
            
            it("should create a new title with an element", function(){
                fs.render(Ext.getBody());
                fs.setTitle("new title");
                expect(fs.titleEl).toBeDefined();
                expect(fs.titleEl.dom.innerHTML).toEqual("new title");  
            });
        });
        
        describe("when instructions", function() {
            beforeEach(function() {
                fs.render(Ext.getBody());
            });
            
            it("should create instructionsEl", function() {
                expect(fs.instructionsEl).toBeDefined();
            });
            
            it("should add the instructions", function() {
                expect(fs.instructionsEl.dom.innerHTML).toEqual('instructions');
            });
            
            it("should set new instructions", function(){
                fs.setInstructions("new instructions");
                expect(fs.instructionsEl.dom.innerHTML).toEqual("new instructions");
            })
        });
        
        describe("when no instructions", function() {
            beforeEach(function() {
                fs.instructions = null;
            });
            
            it("should not create instructionsEl", function() {
                fs.render(Ext.getBody());
                expect(fs.instructionsEl).not.toBeDefined();
            });
            
            describe("when instructionsEl", function() {
                beforeEach(function() {
                    var instructionsEl = Ext.getBody().insertFirst({
                        cls : fs.componentCls + '-instructions',
                        html: fs.instructions
                    });
                    
                    fs.instructionsEl = instructionsEl;
                });
                
                it("should add it", function() {
                    var spy = null;
                    
                    fs.on({
                        render: function() {
                            spy = spyOn(fs.el, "appendChild").andCallThrough();
                        }
                    });
                    
                    fs.render(Ext.getBody());
                    
                    expect(spy).wasCalled();
                });
            });
            
            it("should create a new instruction with an element", function(){
                fs.render(Ext.getBody());
                fs.setInstructions("new instructions");
                expect(fs.instructionsEl).toBeDefined();
                expect(fs.instructionsEl.dom.innerHTML).toEqual("new instructions");  
            });
        });
    });
});