describe("Ext.form.DatePicker", function() {
    var field, makeField;

    makeField = function(cfg) {
        if (field) {
            field.destroy();
        }
        
        field = new Ext.form.DatePicker(Ext.apply({
            label   : 'Label',
            renderTo: Ext.getBody()
        }, cfg || {}));
    };
    
    beforeEach(function() {
        makeField();
    });

    afterEach(function() {
        if (field)
            field.destroy();
    });
    
    it("should have a ui", function() {
        expect(field.ui).toEqual('select');
    });

    it("should useMask", function() {
        expect(field.useMask).toBeTruthy();
    });

    it("should have no picker", function() {
        expect(field.picker).toBeNull();
    });

    describe("initComponent", function() {
        it("should still set tabIndex", function() {
            makeField({tabIndex: 123});

            expect(field.tabIndex).toEqual(-1);
        });

        it("should still set useMask", function() {
            makeField({useMask: false});

            expect(field.useMask).toBeTruthy();
        });
    });

    describe("onMaskTap", function() {
        describe("when disabled", function() {
            it("should do nothing", function() {
                makeField({
                    disabled: true
                });

                expect(field.datePicker).not.toBeDefined();
                field.onMaskTap();
                expect(field.datePicker).not.toBeDefined();
            });
        });

        describe("when enabled", function() {
            describe("when no datePicker", function() {
                it("should create a new datePicker", function() {
                    makeField();

                    expect(field.datePicker).not.toBeDefined();

                    field.onMaskTap();

                    expect(field.datePicker).toBeDefined();
                });

                describe("when picker is set", function() {
                    it("should use the config", function() {
                        makeField({
                            picker: {
                                yearFrom: 1900
                            }
                        });

                        field.onMaskTap();

                        expect(field.datePicker.yearFrom).toEqual(1900);
                    });
                });
            });
        });
    });

    describe("setValue", function() {
        beforeEach(function() {
            makeField();
        });

        describe("when date", function() {
            it("should set the value to the object", function() {
                var values = {
                    day  : 1,
                    month: 5,
                    year : 1989
                };

                var date = new Date(values.year, values.month - 1, values.day);

                field.setValue(date);

                expect(field.getValue()).toEqual(date);
                expect(field.getValue(true)).toEqual(date.format(Ext.util.Format.defaultDateFormat));
            });
        });
    });

    describe("getValue", function() {
        describe("nothing", function() {
            beforeEach(function() {
                makeField();
            });

            it("should return null", function() {
                expect(field.getValue()).toBeNull();
            });
        });

        describe("value", function() {
            beforeEach(function() {
                makeField({
                    value: {
                        day  : 1,
                        month: 5,
                        year : 1989
                    }
                });
            });

            it("should return a date", function() {
                expect(Ext.isDate(field.getValue())).toBeTruthy();
            });

            it("should return a formatted date", function() {
                var result = field.getValue(true);
                expect(Ext.isDate(result)).toBeFalsy();
                expect(result).toEqual('05/01/1989');
            });
        });
    });
});