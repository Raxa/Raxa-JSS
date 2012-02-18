/**
 * @class Ext.Element
 */
Ext.applyIf(Ext.Element, {
    
    /**
     * Returns the calculated CSS 2D transform offset values (translate x and y)
     * @static
     * @param {Ext.Element/Element} el the element
     * @return {Ext.util.Offset} instance of Ext.util.Offset, with x and y properties
     */
    getComputedTransformOffset: function(el) {
        if (el instanceof Ext.Element)
            el = el.dom;
            
        var transform = window.getComputedStyle(el).webkitTransform,
            cssMatrix = transform != 'none' ? new WebKitCSSMatrix(transform) : new WebKitCSSMatrix();

        if (typeof cssMatrix.m41 != 'undefined') {
            return new Ext.util.Offset(cssMatrix.m41, cssMatrix.m42);
        } else if (typeof cssMatrix.d != 'undefined') {
            return new Ext.util.Offset(cssMatrix.d, cssMatrix.e);
        }

        return new Ext.util.Offset(0, 0);
    },

    /**
     * Transform an element using CSS 3
     * @static
     * @param {Ext.Element/Element} el the element
     * @param {Object} transforms an object with all transformation to be applied. The keys are transformation method names,
     * the values are arrays of params or a single number if there's only one param e.g:
     *
     * {
     *      translate: [0, 1, 2],
     *      scale: 0.5,
     *      skew: -25,
     *      rotate: 7
     * }
     */
    cssTransform: function(el, transforms) {
        if (el instanceof Ext.Element)
            el = el.dom;

        var m = new WebKitCSSMatrix();

        Ext.iterate(transforms, function(n, v) {
            v = Ext.isArray(v) ? v : [v];
            m = m[n].apply(m, v);
        });

        // To enable hardware accelerated transforms on iOS (v3 only, fixed in v4?) we have to build the string manually
        // Other than that simply apply the matrix works perfectly on the rest of devices including Androids & Blackberry
        if (Ext.supports.CSS3DTransform) {
            el.style.webkitTransform = 'matrix3d(' +
                                            m.m11+', '+m.m12+', '+m.m13+', '+m.m14+', '+
                                            m.m21+', '+m.m22+', '+m.m23+', '+m.m24+', '+
                                            m.m31+', '+m.m32+', '+m.m33+', '+m.m34+', '+
                                            m.m41+', '+m.m42+', '+m.m43+', '+m.m44+
                                       ')';
        } else {
            el.style.webkitTransform = m;
        }
    },

    /**
     * Translate an element using CSS 3 in 2D. This is supposed to be faster than cssTransform when we only need to translate
     * an element without reserving its original matrix
     * @param {Ext.Element/Element} el the element
     * @param {Ext.util.Offset/Object} offset The new offset with format
     *
     * {
     *      x: offsetX,
     *      y: offsetY
     * }
     */
    cssTranslate: function(el, offset) {
        if (el instanceof Ext.Element)
            el = el.dom;

        if (Ext.supports.CSS3DTransform) {
            el.style.webkitTransform = 'translate3d('+offset.x+'px, '+offset.y+'px, 0px)';
        } else {
            el.style.webkitTransform = 'translate('+offset.x+'px, '+offset.y+'px)';
        }
    }

});
