describe("Ext.Element - static-more", function() {

    var proto = Ext.Element.prototype,
        el, testEl;

    beforeEach(function() {
        testEl = Ext.getBody().createChild({
            id: 'ExtElementHelper'
        });
        el = Ext.getDom(new Ext.Element('ExtElementHelper'));
    });

    describe("cssTranslate", function() {
        it("should set the transform to translation", function() {
            expect(el.style.webkitTransform).toEqual('');
            Ext.Element.cssTranslate(el, {x: 0, y: 0});
            expect(el.style.webkitTransform).toEqual('translate3d(0px, 0px, 0px)');
            Ext.Element.cssTranslate(el, {x: 0, y: 14});
            expect(el.style.webkitTransform).toEqual('translate3d(0px, 14px, 0px)');
            Ext.Element.cssTranslate(el, {x: 0, y: -3});
            expect(el.style.webkitTransform).toEqual('translate3d(0px, -3px, 0px)');
            Ext.Element.cssTranslate(el, {x: 14, y: 0});
            expect(el.style.webkitTransform).toEqual('translate3d(14px, 0px, 0px)');
            Ext.Element.cssTranslate(el, {x: -3, y: 0});
            expect(el.style.webkitTransform).toEqual('translate3d(-3px, 0px, 0px)');
            Ext.Element.cssTranslate(el, {x: -3, y: 14});
            expect(el.style.webkitTransform).toEqual('translate3d(-3px, 14px, 0px)');
            Ext.Element.cssTranslate(el, {x: 14, y: 3});
            expect(el.style.webkitTransform).toEqual('translate3d(14px, 3px, 0px)');
        });
    });

});
