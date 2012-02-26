describe("Ext.form.FormPanel", function() {
    var fp, user, e, called;
    
    beforeEach(function() {
        fp = new Ext.form.FormPanel({
            items: [
                {
                    xtype: 'textfield',
                    name : 'first',
                    label: 'First name'
                },
                {
                    xtype: 'textfield',
                    name : 'last',
                    label: 'Last name'
                },
                {
                    xtype: 'numberfield',
                    name : 'age',
                    label: 'Age'
                },
                {
                    xtype: 'urlfield',
                    name : 'url',
                    label: 'Website'
                }
            ]
        });
        
        Ext.regModel('User', {
            fields: [
                {name: 'first', type: 'string'},
                {name: 'last',  type: 'string'},
                {name: 'age',   type: 'int'},
                {name: 'url',   type: 'string'}
            ]
        });
        
        user = Ext.ModelMgr.create({
            first: 'Ed',
            last : 'Spencer',
            age  : 24,
            url  : 'http://extjs.com'
        }, 'User');
    });
    
    afterEach(function() {
        fp.destroy();
    });
    
    it("should not be standardSubmit", function() {
        expect(fp.standardSubmit).toBeFalsy();
    });
    
    it("should have a componentCls", function() {
        expect(fp.componentCls).toEqual('x-form');
    });
    
    it("should not have a url", function() {
        expect(fp.url).not.toBeDefined();
    });
    
    it("should not have baseParams", function() {
        expect(fp.baseParams).not.toBeDefined();
    });
    
    it("should have a waitTpl", function() {
        expect(fp.waitTpl).toBeDefined();
    });
    
    describe("on getElConfig", function() {
        it("should return", function() {
            var obj = fp.getElConfig();
            
            expect(obj).toBeDefined();
            expect(obj.tag).toBeDefined();
        });
    });
    
    describe("when rendered", function() {
        beforeEach(function() {
            fp.render(Ext.getBody());
        });
        
        describe("on onSubmit", function() {
            beforeEach(function() {
                called = false;

                e = {
                    stopEvent: function() {
                        called = true;
                    }
                };
            });

            it("should fire the beforesubmit event", function() {
                var fired = false;

                fp.on({
                    beforesubmit: function() {
                        fired = true;
                        return true;
                    }
                });

                fp.standardSubmit = true;
                fp.onSubmit(e);

                expect(fired).toBeTruthy();
            });

            it("should call stopEvent", function() {
                fp.onSubmit(e);

                expect(called).toBeTruthy();
            });
        });
        
        describe("on loadRecord", function() {
            it("should load a record", function() {
                var spy = spyOn(fp, "setValues").andCallThrough();
                
                fp.loadRecord(user);
                
                expect(spy).wasCalledWith(user.data);
            });
        });
        
        describe("on loadModel", function() {
            it("should load a record", function() {
                var spy = spyOn(fp, "setValues").andCallThrough();
                
                fp.loadModel(user);
                
                expect(spy).wasCalledWith(user.data);
            });
        });
        
        describe("on getRecord", function() {
            describe("when no record", function() {
                it("should return nothing", function() {
                    expect(fp.getRecord()).not.toBeDefined();
                });
            });
            
            describe("when record", function() {
                beforeEach(function() {
                    fp.loadRecord(user);
                });
                
                it("should return nothing", function() {
                    expect(fp.getRecord()).toEqual(user);
                });
            });
        });
        
        describe("on updateRecord", function() {
            beforeEach(function() {
                fp.loadRecord(user);
            });
            
            it("should update model fields", function() {
                fp.setValues({
                    first: 'Rob'
                });
                
                expect(fp.getRecord().get('first')).toEqual('Ed');
                
                fp.updateRecord(user);
                
                expect(fp.getRecord().get('first')).toEqual('Rob');
            });
        });
        
        describe("on setValues", function() {
            beforeEach(function() {
                fp.loadRecord(user);
            });
            
            it("should getFields", function() {
                var spy = spyOn(fp, "getFields").andCallThrough();
                
                fp.setValues({
                    first: 'Rob'
                });
                
                expect(spy).wasCalled();
            });
            
            it("should ignore values for fields it can't find", function(){
                fp.setValues({
                    first: "foo",
                    notThere: "value"
                });    
                expect(fp.items.first().getValue()).toEqual("foo");
            });
            
            it("should set checkboxes", function(){
                var f = new Ext.form.FormPanel({
                    renderTo: document.body,
                    items: [{
                        xtype: 'checkboxfield',
                        name: 'check1'
                    },{
                        xtype: 'checkboxfield',
                        name: 'check2'
                    }]
                });    
                f.setValues({
                    check1: false,
                    check2: true
                });
                expect(f.items.first().isChecked()).toBeFalsy();
                expect(f.items.last().isChecked()).toBeTruthy();
                f.destroy();
            });
            
            it("should update field value", function() {
                expect(fp.getFields().first.getValue()).toEqual('Ed');
                
                fp.setValues({
                    first: 'Rob'
                });
                
                expect(fp.getFields().first.getValue()).toEqual('Rob');
            });
        });
        
        describe("on getValues", function() {
            beforeEach(function() {
                fp.loadRecord(user);
            });
            
            it("should return the values", function() {
                var fields = fp.getValues();
                
                for (name in fields) {
                    var value = user.get(name);
                    expect(fields[name]).toEqual((Ext.isNumber(value) ? value.toString() : value));
                }
            });
            
            describe("when a field is disabled", function() {
                beforeEach(function() {
                    var field = fp.getFields().first;
                    field.disable();
                });
                
                it("should return the values", function() {
                    var fields = fp.getValues(true);

                    for (name in fields) {
                        var value = user.get(name);
                        expect(fields[name]).toEqual((Ext.isNumber(value) ? value.toString() : value));
                    }
                });
            });
        });
        
        describe("on reset", function() {
            beforeEach(function() {
                fp.loadRecord(user);
            });
            
            it("should reset all fields", function() {
                var spies  = [],
                    fields = fp.getFields(),
                    i;
                
                for (name in fields) {
                    spies.push(spyOn(fields[name], "reset").andCallThrough());
                }
                
                fp.reset();
                
                for (i = 0; i < spies.length; i++) {
                    expect(spies[i]).wasCalled();
                }
            });
        });
        
        describe("on getFields", function() {
            it("should return 4 fields", function() {
                var fields = fp.getFields();
                
                expect(fields).toBeDefined();
                expect(fields.first).toBeDefined();
                expect(fields.last).toBeDefined();
                expect(fields.age).toBeDefined();
                expect(fields.url).toBeDefined();
            });
            
            describe("when it has a fieldset", function() {
                it("should return 4 fields", function() {
                    var fs = new Ext.form.FieldSet({
                        title: 'fieldset',
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'Location',
                                name : 'location'
                            }
                        ]
                    });

                    fp.add(fs);

                    var fields = fp.getFields();

                    expect(fields).toBeDefined();
                    expect(fields.first).toBeDefined();
                    expect(fields.last).toBeDefined();
                    expect(fields.age).toBeDefined();
                    expect(fields.url).toBeDefined();
                    expect(fields.location).toBeDefined();
                });
            });
        });
        
        describe("on showMask", function() {
            it("should show the mask", function() {
                fp.showMask('message');
            });
        });
        
        describe("on hideMask", function() {
            beforeEach(function() {
                fp.showMask('message');
            });
            
            it("should hide the mask", function() {
                fp.hideMask();
            });
        });
    });
});