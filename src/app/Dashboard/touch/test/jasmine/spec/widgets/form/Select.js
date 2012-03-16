describe("Ext.form.Select", function() {
    var proto = Ext.form.Select.prototype,
        select, options, store,
        makeSelect;
    
    beforeEach(function() {
        options = [
            {text: 'First Option',  value: 'first'},
            {text: 'Second Option', value: 'second'},
            {text: 'Third Option',  value: 'third'}
        ];
        
        store = new Ext.data.Store({
            model: 'x-textvalue',
            data: options
        });
        
        makeSelect = function(config) {
            select = new Ext.form.Select(Ext.apply({
                label  : 'test',
                name   : 'test',
                options: options
            }, config || {}));
        };
    });
    
    afterEach(function() {
        if (select) select.destroy();
        options = null;
        store = null;
    });
    
    it("should have a ui", function() {
        expect(proto.ui).toEqual('select');
    });
    
    it("should have a valueField", function() {
        expect(proto.valueField).toEqual('value');
    });
    
    it("should have a displayField", function() {
        expect(proto.displayField).toEqual('text');
    });
    
    it("should useMask", function() {
        expect(proto.useMask).toBeTruthy();
    });
    
    describe("initComponent", function() {
        describe("backwards combility", function() {
            it("when label", function() {
                makeSelect();
                
                expect(select.label).toEqual('test');
            });
            
            it("when fieldLabel", function() {
                makeSelect({
                    label: null,
                    fieldLabel: 'test'
                });
                
                expect(select.label).toEqual('test');
            });
        });
        
        describe("when using options", function() {
            beforeEach(function() {
                makeSelect();
            });
            
            it("should create a store using the options", function() {
                expect(select.store).toBeDefined();
                expect(select.options).toEqual(options);
                expect(select.store.getCount()).toEqual(3);
            });
        });
        
        describe("when using a store", function() {
            beforeEach(function() {
                makeSelect({
                    options: null,
                    store  : store
                });
            });
            
            it("should use the store", function() {
                expect(select.store).toEqual(store);
            });
        });
        
        it("should set the tabIndex", function() {
            expect(select.tabIndex).toEqual(-1);
        });
    });
    
    describe("hiddenName", function(){
        it("should not create a hidden field if no hiddenName is specified", function(){
            makeSelect();
            select.render(Ext.getBody());
            expect(select.hiddenField).not.toBeDefined(); 
        });
        
        it("should create a hidden field when hiddenName is specified", function(){
            makeSelect({
                hiddenName: 'foo',
                renderTo: Ext.getBody()
            });    
            expect(select.hiddenField).toBeDefined();
            console.log(select.hiddenField.dom);
            expect(select.hiddenField.dom.name).toEqual('foo');
            expect(select.hiddenField.dom.type).toEqual('hidden');
        });
        
        it("should set the hidden field with an initial value", function(){
            makeSelect({
                hiddenName: 'foo',
                value: 'second'
            });    
            select.render(Ext.getBody());
            expect(select.hiddenField.dom.value).toEqual('second');
        });
        
        it("should change the hidden field when the value changes", function(){
            makeSelect({
                hiddenName: 'foo',
                renderTo: Ext.getBody()
            });    
            select.setValue('third');
            expect(select.hiddenField.dom.value).toEqual('third');
        });
        
        it("should destroy the hiddenField",  function(){
            makeSelect({
                hiddenName: 'foo1',
                renderTo: document.body
            });    
            select.destroy();
            expect(document.getElementsByName('foo1').length).toEqual(0);
        });
    });
    
    describe("onMaskTap", function() {
        beforeEach(function() {
            makeSelect();
            select.show();
        });
        
        describe("when disabled", function() {
            beforeEach(function() {
                select.disable();
            });
            
            it("should do nothing", function() {
                select.onMaskTap();
                
                expect(select.picker).not.toBeDefined();
                expect(select.listPanel).not.toBeDefined();
            });
        });
        
        describe("when enabled", function() {
            describe("when Phone", function() {
                beforeEach(function() {
                    Ext.is.Phone = true;
                });
                
                it("should create a picker", function() {
                    expect(select.picker).not.toBeDefined();
                    expect(select.listPanel).not.toBeDefined();
                    
                    select.onMaskTap();
                    
                    expect(select.picker).toBeDefined();
                    expect(select.listPanel).not.toBeDefined();
                });
                
                xdescribe("events", function() {
                    beforeEach(function() {
                        select.onMaskTap();
                    });
                    
                    describe("change", function() {
                        it("should call onPickerChange", function() {
                            var spy = spyOn(select, "onPickerChange");
                            
                            select.picker.fireEvent('change');
                            
                            expect(spy).wasCalled();
                        });
                    });
                    
                    describe("hide", function() {
                        it("should call onPickerHide", function() {
                            var spy = spyOn(select, "onPickerHide").andCallThrough();
                            
                            select.picker.fireEvent('hide');
                            
                            expect(spy).wasCalled();
                        });
                    });
                });
                
                describe("onPickerChange", function() {
                    beforeEach(function() {
                        select.onMaskTap();
                    });
                    
                    it("should call setValue", function() {
                        var spy = spyOn(select, "setValue");
                        
                        select.onPickerChange(select.picker, {test: 'hello'});
                        
                        expect(spy).wasCalledWith('hello');
                    });
                    
                    it("should fire the change event", function() {
                        var fired = false;
                        
                        select.on({change: function() { fired = true; }});
                        
                        select.onPickerChange(select.picker, {test: 'hello'});
                        
                        expect(fired).toBeTruthy();
                    });
                });
            });
            
            describe("when other", function() {
                beforeEach(function() {
                    Ext.is.Phone = false;
                    select.render(Ext.getBody());
                });
                
                it("should create a list", function() {
                    expect(select.picker).not.toBeDefined();
                    expect(select.listPanel).not.toBeDefined();
                    
                    select.onMaskTap();
                    
                    expect(select.listPanel).toBeDefined();
                    expect(select.picker).not.toBeDefined();
                });
                
                xdescribe("events", function() {
                    beforeEach(function() {
                        select.onMaskTap();
                    });
                    
                    describe("selectionchange", function() {
                        it("should call onListSelect", function() {
                            var spy = spyOn(select, "onListSelect");
                            select.listPanel.fireEvent('selectionchange', select.listPanel);
                            expect(spy).wasCalled();
                        });
                    });
                });
                
                describe("onListSelect", function() {
                    beforeEach(function() {
                        select.listPanel = select.getListPanel();
                    });
                    
                    it("should call setValue", function() {
                        var spy    = spyOn(select, "setValue"),
                            record = select.store.getAt(2);
                        
                        select.onListSelect(null, record);
                        
                        expect(spy).wasCalledWith(record.get(select.valueField));
                    });
                    
                    it("should fire the change event", function() {
                        var fired = false;
                        
                        select.on({change: function() { fired = true; }});
                        
                        select.onListSelect(null, select.store.getAt(2));
                        
                        expect(fired).toBeTruthy();
                    });
                    
                    it("should hide the list", function() {
                        var spy = spyOn(select.listPanel, "hide");
                        
                        select.onListSelect(select.listPanel, null, select.store.getAt(2));
                        
                        expect(spy).wasCalled();
                    });
                });
            });
        });
    });
    
    describe("getValue", function() {
        beforeEach(function() {
            makeSelect();
        });
        
        it("should return the currentValue", function() {
            expect(select.getValue()).not.toBeDefined();
            
            select.setValue('hello');
            
            expect(select.getValue()).toEqual('hello');
        });
    });
    
    describe("initValue", function() {
        beforeEach(function() {
            makeSelect({
                value: 'cats'
            });
        });
        
        it("should call setValue", function() {
            var spy = spyOn(select, "setValue").andCallThrough();
            
            select.initValue();
            
            expect(spy).wasCalled();
            
            expect(select.getValue()).toEqual('cats');
            expect(select.originalValue).toEqual('cats');
        });
    });
    
    describe("setValue", function() {
        beforeEach(function() {
            makeSelect();
        });
        
        describe("when rendered", function() {
            beforeEach(function() {
                select.render(Ext.getBody());
                select.show();
            });
            
            it("should set the value", function() {
                expect(select.value).toEqual('first');
                
                select.setValue('second');
                
                expect(select.value).toEqual('second');
            });
            
            describe("fieldEl", function() {
                it("should set the value of the fieldEl", function() {
                    select.setValue('first');
                    
                    expect(select.fieldEl.dom.value).toEqual('First Option');
                });
            });
        });
        
        describe("when no rendered", function() {
            it("should set the value", function() {
                expect(select.value).not.toBeDefined();
                
                select.setValue('second');
                
                expect(select.value).toEqual('second');
                
                select.setValue();
                
                expect(select.value).not.toBeDefined();
            });
        });
    });
    
    describe("setOptions", function() {
        var newOptions = [
            {
                text : 'Fourth Option',
                value: 'fourth'
            }
        ];
        
        beforeEach(function() {
            makeSelect();
        });
        
        describe("when options", function() {
            describe("when no append", function() {
                it("should call store.loadData", function() {
                    var spy = spyOn(select.store, "loadData");

                    select.setOptions(newOptions);

                    expect(spy).wasCalledWith(newOptions, undefined);
                });
            });
            
            describe("when append", function() {
                it("should call store.loadData", function() {
                    var spy = spyOn(select.store, "loadData");

                    select.setOptions(newOptions, true);

                    expect(spy).wasCalledWith(newOptions, true);
                });
            });
        });
        
        describe("when no options", function() {
            it("should call store.clearData", function() {
                var spy = spyOn(select.store, "clearData");

                select.setOptions();

                expect(spy).wasCalled();
            });
            
            it("should call setValue", function() {
                var spy = spyOn(select, "setValue");
                
                select.setOptions();
                
                expect(spy).wasCalledWith(null);
            });
        });
    });
});