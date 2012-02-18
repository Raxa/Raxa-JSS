describe("Ext.DomHelper", function() {
    var dh = Ext.DomHelper,
        el, els;
    
    beforeEach(function() {
        el = Ext.getBody().createChild({
            id      : 'DomHelperHelper',
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
        
        els = Ext.select('#DomHelperHelper > div');
    });
    
    describe("markup", function() {
        it("should return the markup for a string", function() {
            var markup = '<div class="class">my div!</div>';
            
            expect(dh.markup(markup)).toEqual(markup);
        });
        
        it("should return the markup for an object", function() {
            var markup = '<div class="class"><span style="padding:10px;">test</span><br/></div>',
                html   = {
                    cls: 'class',
                    children: [
                        {
                            tag : 'span',
                            html: 'test',
                            style: {
                                padding: '10px'
                            }
                        },
                        {tag: 'br'}
                    ]
                };
            
            expect(dh.markup(html)).toEqual(markup);
        });
    });
    
    describe("applyStyles", function() {
        it("should apply styles from a string", function() {
            dh.applyStyles(el, 'padding:10px;');
            
            expect(el.dom.style.padding).toEqual('10px');
        });
        
        it("should apply styles from an object", function() {
            dh.applyStyles(el, {
                padding: '10px'
            });
            
            expect(el.dom.style.padding).toEqual('10px');
        });
        
        it("should apply styles from a function", function() {
            dh.applyStyles(el, function() {
                return {
                    padding: '10px'
                };
            });
            
            expect(el.dom.style.padding).toEqual('10px');
        });
    });
    
    describe("insertHtml", function() {
        describe("beforeBegin", function() {
            it("should insert a new element", function() {
                expect(Ext.get('newChild')).toBeNull();

                dh.insertHtml('beforeBegin', Ext.getDom(els.first()), '<div id="newChild"></div>');

                expect(Ext.get('newChild')).toBeDefined();
            });
        });
        
        describe("afterBegin", function() {
            it("should insert a new element", function() {
                expect(Ext.get('newChild')).toBeNull();

                dh.insertHtml('afterBegin', Ext.getDom(els.first()), '<div id="newChild"></div>');

                expect(Ext.get('newChild')).toBeDefined();
            });
        });
        
        describe("beforeEnd", function() {
            it("should insert a new element", function() {
                expect(Ext.get('newChild')).toBeNull();

                dh.insertHtml('beforeEnd', Ext.getDom(els.first()), '<div id="newChild"></div>');

                expect(Ext.get('newChild')).toBeDefined();
            });
        });
        
        describe("afterEnd", function() {
            it("should insert a new element", function() {
                expect(Ext.get('newChild')).toBeNull();

                dh.insertHtml('beforeBegin', Ext.getDom(els.first()), '<div id="newChild"></div>');

                expect(Ext.get('newChild')).toBeDefined();
            });
        });
    });
    
    describe("insertBefore", function() {
        it("should call doInsert", function() {
            var spy = spyOn(dh, "doInsert");
            
            dh.insertBefore(Ext.getDom(els.first()), '<div id="newChild"></div>', false);
            
            expect(spy).wasCalledWith(Ext.getDom(els.first()), '<div id="newChild"></div>', false, 'beforebegin');
        });
    });
    
    describe("insertAfter", function() {
        it("should call doInsert", function() {
            var spy = spyOn(dh, "doInsert");
            
            dh.insertAfter(Ext.getDom(els.first()), '<div id="newChild"></div>', false);
            
            expect(spy).wasCalledWith(Ext.getDom(els.first()), '<div id="newChild"></div>', false, 'afterend', 'nextSibling');
        });
    });
    
    describe("insertFirst", function() {
        it("should call doInsert", function() {
            var spy = spyOn(dh, "doInsert");
            
            dh.insertFirst(Ext.getDom(els.first()), '<div id="newChild"></div>', false);
            
            expect(spy).wasCalledWith(Ext.getDom(els.first()), '<div id="newChild"></div>', false, 'afterbegin', 'firstChild');
        });
    });
    
    describe("append", function() {
        it("should call doInsert", function() {
            var spy = spyOn(dh, "doInsert");
            
            dh.append(Ext.getDom(els.first()), '<div id="newChild"></div>', false);
            
            expect(spy).wasCalledWith(Ext.getDom(els.first()), '<div id="newChild"></div>', false, 'beforeend', '', true);
        });
    });
    
    describe("overwrite", function() {
        it("should overwrite the el", function() {
            var node = Ext.getDom(els.first());
            
            expect(node.innerHTML).toEqual('');
            
            dh.overwrite(node, {
                tag : 'span',
                html: 'hello'
            });
            
            expect(node.innerHTML).toEqual('<span>hello</span>');
        });
    });
});
