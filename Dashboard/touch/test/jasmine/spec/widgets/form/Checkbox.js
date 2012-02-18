describe("Ext.form.Checkbox", function() {
    var cb, panel, fields;
    
    beforeEach(function() {
        cb = new Ext.form.Checkbox({
            label: 'test',
            value: 'testvalue'
        });
    });
    
    afterEach(function() {
        cb.destroy();
    });
    
    it("should have a inputType", function() {
        expect(cb.inputType).toEqual('checkbox');
    });
    
    it("should have a ui", function() {
        expect(cb.ui).toEqual('checkbox');
    });
    
    it("should not be checked", function() {
        expect(cb.checked).toBeFalsy();
    });
    
    it("should have no inputValue", function() {
        expect(cb.inputValue).not.toBeDefined();
    });
    
    it("should have a renderTpl", function() {
        expect(cb.renderTpl).toBeDefined();
    });
    
    describe("not rendered", function(){
        it("should still set the value when not rendered", function(){
            cb.setChecked(true);
            expect(cb.isChecked()).toBeTruthy();
        });    
        
        it("should check the dom element if the value is set before render", function(){
            cb.setChecked(true);
            cb.render(Ext.getBody());
            expect(cb.fieldEl.dom.checked).toBeTruthy();    
        });
        
        it("should return the correct value when not rendered", function(){
            cb.setChecked(true);
            expect(cb.isChecked()).toBeTruthy();
            cb.setChecked(false);
            expect(cb.isChecked()).toBeFalsy();    
        });
    });
    
    describe("on render", function() {
        it("should call setChecked", function() {
            var spy = spyOn(cb, "setChecked").andCallThrough();
            
            cb.render(Ext.getBody());
            
            expect(spy).wasCalled();
        });
    });
    
    describe("after render", function() {
        beforeEach(function() {
            cb.render(Ext.getBody());
            cb.setChecked(false);
        });

        describe("on getValue()", function() {
            it("should return the value", function() {
                expect(cb.getValue()).toEqual('testvalue');
            });
        });

        describe("on setValue()", function() {
            it("should set the value", function() {
                cb.setValue('newvalue');

                expect(cb.getValue()).toEqual('newvalue');
            });
        });

        describe("on setChecked()", function() {
            it("should set the checked state", function() {
                cb.setChecked(true);

                expect(cb.isChecked()).toBeTruthy();
            });

            it("should call onChange", function() {
                var spy = spyOn(cb, "onChange").andCallThrough();

                cb.setChecked(true);

                expect(spy).wasCalled();
            });
        });

        describe("on check()", function() {
            it("should fire a check event", function() {
                var fired = false;

                cb.on({
                    check: function() {
                        fired = true;
                    }
                });

                cb.check();
            });
        });

        describe("on uncheck()", function() {
            it("should fire a uncheck event", function() {
                var fired = false;

                cb.on({
                    uncheck: function() {
                        fired = true;
                    }
                });

                cb.uncheck();
            });
        });
        
    });

    describe("when a group", function() {
        beforeEach(function() {
            panel = new Ext.form.FormPanel({
                defaults: {
                    xtype: 'checkboxfield'
                },
                items: [
                    {
                        label: 'One',
                        name : 'test',
                        value: 'a'
                    },
                    {
                        label: 'Two',
                        name : 'test',
                        value: 'b'
                    },
                    {
                        label: 'Two',
                        name : 'test',
                        value: 'c'
                    }
                ],
                renderTo: Ext.getBody()
            });

            fields = panel.items.items;
        });

        afterEach(function() {
            panel.destroy();
        });

        describe("on setGroupValues", function() {
            it("should check the corresponding fields", function() {
                fields[1].setGroupValues(['a', 'c']);

                expect(fields[0].isChecked()).toBeTruthy();
                expect(fields[2].isChecked()).toBeTruthy();
            });
        });

        describe("on getGroupValues", function() {
            it("should return the correct checked values", function() {
                fields[1].check();
                fields[2].check();

                expect(fields[0].getGroupValues()).toEqual(['b', 'c']);
            });
        });
    });
});