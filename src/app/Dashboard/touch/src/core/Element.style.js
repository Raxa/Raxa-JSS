(function() {
    /**
     * @class Ext.Element
     */
    Ext.Element.classReCache = {};
    var El = Ext.Element,
        view = document.defaultView;

    El.addMethods({
        marginRightRe: /marginRight/i,
        trimRe: /^\s+|\s+$/g,
        spacesRe: /\s+/,

        /**
         * Adds one or more CSS classes to the element. Duplicate classes are automatically filtered out.
         * @param {String/Array} className The CSS class to add, or an array of classes
         * @return {Ext.Element} this
         */
        addCls: function(className) {
            var me = this,
                i,
                len,
                v,
                cls = [];

            if (!Ext.isArray(className)) {
                if (className && !this.hasCls(className)) {
                    me.dom.className += " " + className;
                }
            }
            else {
                for (i = 0, len = className.length; i < len; i++) {
                    v = className[i];
                    if (v && !me.hasCls(v)) {
                        cls.push(v);
                    }
                }
                if (cls.length) {
                    me.dom.className += " " + cls.join(" ");
                }
            }
            return me;
        },
        
        //<debug>
        addClass : function() {
            throw new Error("Component: addClass has been deprecated. Please use addCls.");
        },
        //</debug>

        /**
         * Removes one or more CSS classes from the element.
         * @param {String/Array} className The CSS class to remove, or an array of classes
         * @return {Ext.Element} this
         */
        removeCls: function(className) {
            var me = this,
                i,
                idx,
                len,
                cls,
                elClasses;
            if (!Ext.isArray(className)) {
                className = [className];
            }
            if (me.dom && me.dom.className) {
                elClasses = me.dom.className.replace(this.trimRe, '').split(this.spacesRe);
                for (i = 0, len = className.length; i < len; i++) {
                    cls = className[i];
                    if (typeof cls == 'string') {
                        cls = cls.replace(this.trimRe, '');
                        idx = elClasses.indexOf(cls);
                        if (idx != -1) {
                            elClasses.splice(idx, 1);
                        }
                    }
                }
                me.dom.className = elClasses.join(" ");
            }
            return me;
        },
        
        //<debug>
        removeClass : function() {
            throw new Error("Component: removeClass has been deprecated. Please use removeCls.");
        },
        //</debug>

        /**
         * Puts a mask over this element to disable user interaction.
         * This method can only be applied to elements which accept child nodes.
         * @param {String} msg (optional) A message to display in the mask. This can be html.
         * @param {String} msgCls (optional) A css class to apply to the msg element
         * @param {Boolean} transparent (optional) False to show make the mask gray with opacity. (defaults to true)
         * @return {Element} The mask element
         */
        mask: function(msg, msgCls, transparent) {
            var me = this,
                dom = me.dom,
                el = Ext.Element.data(dom, 'mask'),
                mask,
                size,
                cls = '';

            me.addCls('x-masked');
            if (me.getStyle("position") == "static") {
                me.addCls('x-masked-relative');
            }
            if (el) {
                el.remove();
            }
            if (Ext.isString(msgCls) && !Ext.isEmpty(msgCls)) {
                cls = ' ' + msgCls;
            }
            else {
                if (msgCls) {
                    cls = ' x-mask-gray';
                }
            }
                        
            mask = me.createChild({
                cls: 'x-mask' + ((transparent !== false) ? '' : ' x-mask-gray'),
                html: msg ? ('<div class="' + (msgCls || 'x-mask-message') + '">' + msg + '</div>') : ''
            });

            size = me.getSize();

            Ext.Element.data(dom, 'mask', mask);

            if (dom === document.body) {
                size.height = window.innerHeight;
                if (me.orientationHandler) {
                    Ext.EventManager.unOrientationChange(me.orientationHandler, me);
                }

                me.orientationHandler = function() {
                    size = me.getSize();
                    size.height = window.innerHeight;
                    mask.setSize(size);
                };

                Ext.EventManager.onOrientationChange(me.orientationHandler, me);
            }
            mask.setSize(size);
            if (Ext.is.iPad) {
                Ext.repaint();
            }
        },

        /**
         * Removes a previously applied mask.
         */
        unmask: function() {
            var me = this,
                dom = me.dom,
                mask = Ext.Element.data(dom, 'mask');

            if (mask) {
                mask.remove();
                Ext.Element.data(dom, 'mask', undefined);
            }
            me.removeCls(['x-masked', 'x-masked-relative']);

            if (dom === document.body) {
                Ext.EventManager.unOrientationChange(me.orientationHandler, me);
                delete me.orientationHandler;
            }
        },

        /**
         * Adds one or more CSS classes to this element and removes the same class(es) from all siblings.
         * @param {String/Array} className The CSS class to add, or an array of classes
         * @return {Ext.Element} this
         */
        radioCls: function(className) {
            var cn = this.dom.parentNode.childNodes,
                v;
            className = Ext.isArray(className) ? className: [className];
            for (var i = 0, len = cn.length; i < len; i++) {
                v = cn[i];
                if (v && v.nodeType == 1) {
                    Ext.fly(v, '_internal').removeCls(className);
                }
            };
            return this.addCls(className);
        },
        
        //<debug>
        radioClass : function() {
            throw new Error("Component: radioClass has been deprecated. Please use radioCls.");
        },
        //</debug>

        /**
         * Toggles the specified CSS class on this element (removes it if it already exists, otherwise adds it).
         * @param {String} className The CSS class to toggle
         * @return {Ext.Element} this
         */
        toggleCls: function(className) {
            return this.hasCls(className) ? this.removeCls(className) : this.addCls(className);
        },
        
        //<debug>
        toggleClass : function() {
            throw new Error("Component: toggleClass has been deprecated. Please use toggleCls.");
        },
        //</debug>

        /**
         * Checks if the specified CSS class exists on this element's DOM node.
         * @param {String} className The CSS class to check for
         * @return {Boolean} True if the class exists, else false
         */
        hasCls: function(className) {
            return className && (' ' + this.dom.className + ' ').indexOf(' ' + className + ' ') != -1;
        },
        
        //<debug>
        hasClass : function() {
            throw new Error("Element: hasClass has been deprecated. Please use hasCls.");
            return this.hasCls.apply(this, arguments);
        },
        //</debug>

        /**
         * Replaces a CSS class on the element with another.  If the old name does not exist, the new name will simply be added.
         * @param {String} oldClassName The CSS class to replace
         * @param {String} newClassName The replacement CSS class
         * @return {Ext.Element} this
         */
        replaceCls: function(oldClassName, newClassName) {
            return this.removeCls(oldClassName).addCls(newClassName);
        },
        
        //<debug>
        replaceClass : function() {
            throw new Error("Component: replaceClass has been deprecated. Please use replaceCls.");
        },
        //</debug>

        isStyle: function(style, val) {
            return this.getStyle(style) == val;
        },

        /**
         * Normalizes currentStyle and computedStyle.
         * @param {String} property The style property whose value is returned.
         * @return {String} The current value of the style property for this element.
         */
        getStyle: function(prop) {
            var dom = this.dom,
                result,
                display,
                cs,
                platform = Ext.is,
                style = dom.style;

            prop = El.normalize(prop);
            cs = (view) ? view.getComputedStyle(dom, '') : dom.currentStyle;
            result = (cs) ? cs[prop] : null;

            // Fix bug caused by this: https://bugs.webkit.org/show_bug.cgi?id=13343
            if (result && !platform.correctRightMargin &&
                    this.marginRightRe.test(prop) &&
                    style.position != 'absolute' &&
                    result != '0px') {
                display = style.display;
                style.display = 'inline-block';
                result = view.getComputedStyle(dom, null)[prop];
                style.display = display;
            }

            result || (result = style[prop]);

            // Webkit returns rgb values for transparent.
            if (!platform.correctTransparentColor && result == 'rgba(0, 0, 0, 0)') {
                result = 'transparent';
            }

            return result;
        },

        /**
         * Wrapper for setting style properties, also takes single object parameter of multiple styles.
         * @param {String/Object} property The style property to be set, or an object of multiple styles.
         * @param {String} value (optional) The value to apply to the given property, or null if an object was passed.
         * @return {Ext.Element} this
         */
        setStyle: function(prop, value) {
            var tmp,
                style;

            if (typeof prop == 'string') {
                tmp = {};
                tmp[prop] = value;
                prop = tmp;
            }

            for (style in prop) {
                if (prop.hasOwnProperty(style)) {
                    this.dom.style[El.normalize(style)] = prop[style];
                }
            }

            return this;
        },

        /**
         * Applies a style specification to an element.
         * @param {String/HTMLElement} el The element to apply styles to
         * @param {String/Object/Function} styles A style specification string e.g. 'width:100px', or object in the form {width:'100px'}, or
         * a function which returns such a specification.
         */
        applyStyles: function(styles) {
            if (styles) {
                var i,
                    len,
                    dom = this.dom;

                if (typeof styles == 'function') {
                    styles = styles.call();
                }
                if (typeof styles == 'string') {
                    styles = Ext.util.Format.trim(styles).split(/\s*(?::|;)\s*/);
                    for (i = 0, len = styles.length; i < len;) {
                        dom.style[El.normalize(styles[i++])] = styles[i++];
                    }
                }
                else if (typeof styles == 'object') {
                    this.setStyle(styles);
                }
            }
        },

        /**
         * Returns the offset height of the element
         * @param {Boolean} contentHeight (optional) true to get the height minus borders and padding
         * @return {Number} The element's height
         */
        getHeight: function(contentHeight) {
            var dom = this.dom,
                height = contentHeight ? (dom.clientHeight - this.getPadding("tb")) : dom.offsetHeight;
            return height > 0 ? height: 0;
        },

        /**
         * Returns the offset width of the element
         * @param {Boolean} contentWidth (optional) true to get the width minus borders and padding
         * @return {Number} The element's width
         */
        getWidth: function(contentWidth) {
            var dom = this.dom,
                width = contentWidth ? (dom.clientWidth - this.getPadding("lr")) : dom.offsetWidth;
            return width > 0 ? width: 0;
        },

        /**
         * Set the width of this Element.
         * @param {Mixed} width The new width. This may be one of:<div class="mdetail-params"><ul>
         * <li>A Number specifying the new width in this Element's {@link #defaultUnit}s (by default, pixels).</li>
         * <li>A String used to set the CSS width style. Animation may <b>not</b> be used.
         * </ul></div>
         * @return {Ext.Element} this
         */
        setWidth: function(width) {
            var me = this;
                me.dom.style.width = El.addUnits(width);
            return me;
        },

        /**
         * Set the height of this Element.
         * <pre><code>
        // change the height to 200px and animate with default configuration
        Ext.fly('elementId').setHeight(200, true);

        // change the height to 150px and animate with a custom configuration
        Ext.fly('elId').setHeight(150, {
        duration : .5, // animation will have a duration of .5 seconds
        // will change the content to "finished"
        callback: function(){ this.{@link #update}("finished"); }
        });
         * </code></pre>
         * @param {Mixed} height The new height. This may be one of:<div class="mdetail-params"><ul>
         * <li>A Number specifying the new height in this Element's {@link #defaultUnit}s (by default, pixels.)</li>
         * <li>A String used to set the CSS height style. Animation may <b>not</b> be used.</li>
         * </ul></div>
         * @return {Ext.Element} this
         */
        setHeight: function(height) {
            var me = this;
                me.dom.style.height = El.addUnits(height);
            return me;
        },

        /**
         * Set the size of this Element. If animation is true, both width and height will be animated concurrently.
         * @param {Mixed} width The new width. This may be one of:<div class="mdetail-params"><ul>
         * <li>A Number specifying the new width in this Element's {@link #defaultUnit}s (by default, pixels).</li>
         * <li>A String used to set the CSS width style. Animation may <b>not</b> be used.
         * <li>A size object in the format <code>{width: widthValue, height: heightValue}</code>.</li>
         * </ul></div>
         * @param {Mixed} height The new height. This may be one of:<div class="mdetail-params"><ul>
         * <li>A Number specifying the new height in this Element's {@link #defaultUnit}s (by default, pixels).</li>
         * <li>A String used to set the CSS height style. Animation may <b>not</b> be used.</li>
         * </ul></div>
         * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
         * @return {Ext.Element} this
         */
        setSize: function(width, height) {
            var me = this,
                style = me.dom.style;

            if (Ext.isObject(width)) {
                // in case of object from getSize()
                height = width.height;
                width = width.width;
            }

            style.width = El.addUnits(width);
            style.height = El.addUnits(height);
            return me;
        },

        /**
         * Gets the width of the border(s) for the specified side(s)
         * @param {String} side Can be t, l, r, b or any combination of those to add multiple values. For example,
         * passing <tt>'lr'</tt> would get the border <b><u>l</u></b>eft width + the border <b><u>r</u></b>ight width.
         * @return {Number} The width of the sides passed added together
         */
        getBorderWidth: function(side) {
            return this.sumStyles(side, El.borders);
        },

        /**
         * Gets the size of the padding(s) for the specified side(s)
         * @param {String} side Can be t, l, r, b or any combination of those to add multiple values. For example,
         * passing <tt>'lr'</tt> would get the padding <b><u>l</u></b>eft + the padding <b><u>r</u></b>ight.
         * @return {Number} The padding of the sides passed added together
         */
        getPadding: function(side) {
            return this.sumStyles(side, El.paddings);
        },

        /**
         * Gets the size of the margins(s) for the specified side(s)
         * @param {String} side Can be t, l, r, b or any combination of those to add multiple values. For example,
         * passing <tt>'lr'</tt> would get the margin <b><u>l</u></b>eft + the margin <b><u>r</u></b>ight.
         * @return {Number} The margin of the sides passed added together
         */
        getMargin: function(side) {
            return this.sumStyles(side, El.margins);
        },

        /**
         * <p>Returns the dimensions of the element available to lay content out in.<p>
         * <p>If the element (or any ancestor element) has CSS style <code>display : none</code>, the dimensions will be zero.</p>
         */
        getViewSize: function() {
            var doc = document,
                dom = this.dom;

            if (dom == doc || dom == doc.body) {
                return {
                    width: El.getViewportWidth(),
                    height: El.getViewportHeight()
                };
            }
            else {
                return {
                    width: dom.clientWidth,
                    height: dom.clientHeight
                };
            }
        },

        /**
         * Returns the size of the element.
         * @param {Boolean} contentSize (optional) true to get the width/size minus borders and padding
         * @return {Object} An object containing the element's size {width: (element width), height: (element height)}
         */
        getSize: function(contentSize) {
            var dom = this.dom;
            return {
                width: Math.max(0, contentSize ? (dom.clientWidth - this.getPadding("lr")) : dom.offsetWidth),
                height: Math.max(0, contentSize ? (dom.clientHeight - this.getPadding("tb")) : dom.offsetHeight)
            };
        },

        /**
         * Forces the browser to repaint this element
         * @return {Ext.Element} this
         */
        repaint: function() {
            var dom = this.dom;
                this.addCls("x-repaint");
            dom.style.background = 'transparent none';
            setTimeout(function() {
                dom.style.background = null;
                Ext.get(dom).removeCls("x-repaint");
            },
            1);
            return this;
        },

        /**
         * Retrieves the width of the element accounting for the left and right
         * margins.
         */
        getOuterWidth: function() {
            return this.getWidth() + this.getMargin('lr');
        },

        /**
         * Retrieves the height of the element account for the top and bottom
         * margins.
         */
        getOuterHeight: function() {
            return this.getHeight() + this.getMargin('tb');
        },

        // private
        sumStyles: function(sides, styles) {
            var val = 0,
                m = sides.match(/\w/g),
                len = m.length,
                s,
                i;

            for (i = 0; i < len; i++) {
                s = m[i] && parseFloat(this.getStyle(styles[m[i]])) || 0;
                if (s) {
                    val += Math.abs(s);
                }
            }
            return val;
        }
    });
})();