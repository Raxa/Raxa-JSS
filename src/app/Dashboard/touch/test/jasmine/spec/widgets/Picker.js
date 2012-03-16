// I can't figure out a way to render a picker without it erroring
// I think it needs css..
describe("Ext.Picker", function() {
    var proto = Ext.Picker.prototype,
        p, panel, fired = false, store;
    
    beforeEach(function() {
        store = new Ext.data.Store({
            model: 'x-textvalue',
            data : [
                {text: 'First Option',  value: 'first'},
                {text: 'Second Option', value: 'second'},
                {text: 'Third Option',  value: 'third'}
            ]
        });
        
        p = new Ext.Picker({
            slots: [
                {
                    align       : 'center',
                    name        : 'test',
                    valueField  : 'value',
                    displayField: 'text',
                    value       : 'first',
                    store       : store
                }
            ]
        });
    });
    
    afterEach(function() {
        fired = false;
        p.destroy();
    });
    
    it("should have a componentCls", function() {
        expect(proto.componentCls).toEqual('x-picker');
    });
    
    it("should stretchX", function() {
        expect(proto.stretchX).toBeTruthy();
    });
    
    it("should stretchY", function() {
        expect(proto.stretchY).toBeTruthy();
    });
    
    it("should not hideOnMaskTap", function() {
        expect(proto.hideOnMaskTap).toBeFalsy();
    });
    
    it("should have doneButton", function() {
        expect(proto.doneButton).toEqual('Done');
    });
    
    it("should have a height", function() {
        expect(proto.height).toEqual(220);
    });
    
    it("should not use titles", function() {
        expect(proto.useTitles).toBeFalsy();
    });
    
    it("should have a defaultType", function() {
        expect(proto.defaultType).toEqual('pickerslot');
    });
    
    describe("on onDoneButtonTap", function() {
        it("should call hide", function() {
            var spy = spyOn(p, "hide");

            p.onDoneButtonTap();

            expect(spy).wasCalled();
        });
    });
    
    describe("on onSlotPick", function() {
        it("should fire a pick event", function() {
            expect(fired).toBeFalsy();
            
            p.on({
                pick: function() {
                    fired = true;
                }
            });
            
            p.onSlotPick();
            
            expect(fired).toBeTruthy();
        });
    });
    
    describe("on setValue", function() {
        it("should call setValue 0 on all items", function() {
            p.setValue(0);
        });
        
        it("should call setValue", function() {
            p.setValue({
                test: '1'
            });
        });
    });
    
    describe("on getValue", function() {
        it("should return the values", function() {
            expect(p.getValue()).toEqual({
                test: 'first'
            });
        });
    });
});

describe("Ext.Picker.Slot", function() {
    var ps, store;
    
    beforeEach(function() {
        store = new Ext.data.Store({
            model: 'x-textvalue',
            data : [
                {text: 'First Option',  value: 'first'},
                {text: 'Second Option', value: 'second'},
                {text: 'Third Option',  value: 'third'}
            ]
        });
        
        ps = new Ext.Picker.Slot({
            align       : 'center',
            name        : 'test',
            valueField  : 'value',
            displayField: 'text',
            value       : 'first',
            store       : store
        });
    });
    
    afterEach(function() {
        ps.destroy();
    });
    
    it("should be isSlot", function() {
        expect(ps.isSlot).toBeTruthy();
    });
    
    it("should flex", function() {
        expect(ps.flex).toEqual(1);
    });
    
    it("should have a name", function() {
        expect(ps.name).toEqual('test');
    });
    
    it("should have a displayField", function() {
        expect(ps.displayField).toEqual('text');
    });
    
    it("should have a valueField", function() {
        expect(ps.valueField).toEqual('value');
    });
    
    it("should have an itemSelector", function() {
        expect(ps.itemSelector).toEqual('div.x-picker-item');
    });
    
    it("should have a componentCls", function() {
        expect(ps.componentCls).toEqual('x-picker-slot');
    });
    
    it("should have a renderTpl", function() {
        expect(ps.renderTpl).toBeDefined();
    });
    
    it("should have a selectedIndex", function() {
        expect(ps.selectedIndex).toEqual(0);
    });
    
    describe("on getElConfig", function() {
        it("should be defined", function() {
            expect(ps.getElConfig()).toBeDefined();
        });
    });

    // This is not completed and freezes Safari while running!
    xdescribe("after render", function() {
        describe("when using data", function() {
            it("should create a store using the data", function() {
                ps.destroy();
                ps = new Ext.Picker.Slot({
                    align       : 'center',
                    name        : 'test',
                    valueField  : 'value',
                    displayField: 'text',
                    value       : 'first',
                    data        : [
                        // different formats
                        {text: 'First Option',  value: 'first'},
                        ['Second Option', 'second'],
                        'third'
                    ]
                });
            });
        });
    });
});
