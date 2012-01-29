/**
 * Encapsulates a DOM element, adding simple DOM manipulation facilities, normalizing for browser differences.
 *
 * All instances of this class inherit the methods of Ext.Fx making visual effects easily available to all DOM elements.
 *
 * Note that the events documented in this class are not Ext events, they encapsulate browser events. To access the
 * underlying browser event, see Ext.EventObject.browserEvent. Some older browsers may not support the full range of
 * events. Which events are supported is beyond the control of Sencha Touch.
 *
 * ## Usage
 *
 *     // by id
 *     var el = Ext.get("my-div");
 *
 *     // by DOM element reference
 *     var el = Ext.get(myDivElement);
 *
 * ## Composite (Collections of) Elements
 *
 * For working with collections of Elements, see Ext.CompositeElement
 */
Ext.define('Ext.dom.Element', {
    extend: 'Ext.dom.AbstractElement',
    alternateClassName: 'Ext.Element',

    requires: [
        'Ext.dom.Query',
        'Ext.dom.Helper'
    ],

    mixins: [
        'Ext.mixin.Observable'
    ],

    observableType: 'element',

    xtype: 'element',

    WIDTH: 'width',

    HEIGHT: 'height',

    TOP: 'top',

    RIGHT: 'right',

    BOTTOM: 'bottom',

    LEFT: 'left',

    SEPARATOR: '-',

    spacesRegex: /\s+/,

    statics: {
        CREATE_ATTRIBUTES: {
            style: 'style',
            className: 'className',
            cls: 'cls',
            classList: 'classList',
            text: 'text',
            hidden: 'hidden',
            html: 'html',
            children: 'children'
        },

        create: function(attributes, domNode) {
            var ATTRIBUTES = this.CREATE_ATTRIBUTES,
                element, elementStyle, tag, value, name, i, ln;

            if (!attributes) {
                attributes = {};
            }

            if (attributes.isElement) {
                return attributes.dom;
            }
            else if ('nodeType' in attributes) {
                return attributes;
            }

            if (typeof attributes == 'string') {
                return document.createTextNode(attributes);
            }

            tag = attributes.tag;

            if (!tag) {
                tag = 'div';
            }

            element = document.createElement(tag);
            elementStyle = element.style;

            for (name in attributes) {
                if (name != 'tag' && attributes.hasOwnProperty(name)) {
                    value = attributes[name];

                    switch (name) {
                        case ATTRIBUTES.style:
                                if (typeof value == 'string') {
                                    element.setAttribute(name, value);
                                }
                                else {
                                    for (i in value) {
                                        if (value.hasOwnProperty(i)) {
                                            elementStyle[i] = value[i];
                                        }
                                    }
                                }
                            break;

                        case ATTRIBUTES.className:
                        case ATTRIBUTES.cls:
                            element.className = value;
                            break;

                        case ATTRIBUTES.classList:
                            element.className = value.join(' ');
                            break;

                        case ATTRIBUTES.text:
                            element.textContent = value;
                            break;

                        case ATTRIBUTES.hidden:
                            if (value) {
                                element.style.display = 'none';
                            }
                            break;

                        case ATTRIBUTES.html:
                            element.innerHTML = value;
                            break;

                        case ATTRIBUTES.children:
                            for (i = 0,ln = value.length; i < ln; i++) {
                                element.appendChild(this.create(value[i], true));
                            }
                            break;

                        default:
                            element.setAttribute(name, value);
                    }
                }
            }

            if (domNode) {
                return element;
            }
            else {
                return Ext.get(element);
            }
        },

        documentElement: null,

        cache: {},

        get: function(element) {
            var cache = this.cache,
                instance, dom, id;

            if (!element) {
                return null;
            }

            if (typeof element == 'string') {
                if (cache.hasOwnProperty(element)) {
                    return cache[element];
                }

                if (!(dom = document.getElementById(element))) {
                    return null;
                }

                cache[element] = instance = new this(dom);

                return instance;
            }

            if ('tagName' in element) { // dom element
                id = element.id;

                if (cache.hasOwnProperty(id)) {
                    return cache[id];
                }

                instance = new this(element);
                cache[instance.getId()] = instance;

                return instance;
            }

            if (element.isElement) {
                return element;
            }

            if (element.isComposite) {
                return element;
            }

            if (Ext.isArray(element)) {
                return this.select(element);
            }

            if (element === document) {
                // create a bogus element object representing the document object
                if (!this.documentElement) {
                    this.documentElement = new this(document.documentElement);
                    this.documentElement.setId('ext-application');
                }

                return this.documentElement;
            }

            return null;
        }
    },

    isElement: true,

    classNameSplitRegex: /[\s]+/,

    isSynchronized: false,

    constructor: function(dom) {
        if (typeof dom == 'string') {
            dom = document.getElementById(dom);
        }

        if (!dom) {
            throw new Error("Invalid domNode reference or an id of an existing domNode: " + dom);
        }

        this.dom = dom;

        this.getUniqueId();
    },

    getUniqueId: function() {
        var id = this.id,
            dom;

        if (!id) {
            dom = this.dom;

            if (dom.id.length > 0) {
                this.id = id = dom.id;
            }
            else {
                dom.id = id = this.mixins.identifiable.getUniqueId.call(this);
            }

            Ext.Element.cache[id] = this;
        }

        return id;
    },

    setId: function(id) {
        var currentId = this.id,
            cache = Ext.Element.cache;

        if (currentId) {
            delete cache[currentId];
        }

        this.dom.id = id;
        this.id = id;

        cache[id] = this;

        return this;
    },

    /**
     * @private
     */
    synchronize: function() {
        var dom = this.dom,
            hasClassMap = {},
            className = dom.className,
            classList, i, ln, name;

        if (className.length > 0) {
            classList = dom.className.split(this.classNameSplitRegex);

            for (i = 0,ln = classList.length; i < ln; i++) {
                name = classList[i];
                hasClassMap[name] = true;
            }
        }
        else {
            classList = [];
        }

        this.classList = classList;

        this.hasClassMap = hasClassMap;

        this.isSynchronized = true;

        return this;
    },

    /**
     * Adds the given CSS class(es) to this Element
     * @param {String} names The CSS class(es) to add to this element
     * @param {String} prefix Optional prefix to prepend to each class
     * @param {String} suffix Optional suffix to append to each class
     */
    addCls: function(names, prefix, suffix) {
        if (!names) {
            return this;
        }

        if (!this.isSynchronized) {
            this.synchronize();
        }

        var dom = this.dom,
            map = this.hasClassMap,
            classList = this.classList,
            SEPARATOR = this.SEPARATOR,
            i, ln, name;

        prefix = prefix ? prefix + SEPARATOR : '';
        suffix = suffix ? SEPARATOR + suffix : '';

        if (typeof names == 'string') {
            names = names.split(this.spacesRegex);
        }

        for (i = 0,ln = names.length; i < ln; i++) {
            name = prefix + names[i] + suffix;

            if (!map[name]) {
                map[name] = true;
                classList.push(name);
            }
        }

        dom.className = classList.join(' ');

        return this;
    },

    /**
     * Removes the given CSS class(es) from this Element
     * @param {String} names The CSS class(es) to remove from this element
     * @param {String} prefix Optional prefix to prepend to each class to be removed
     * @param {String} suffix Optional suffix to append to each class to be removed
     */
    removeCls: function(names, prefix, suffix) {
        if (!names) {
            return this;
        }

        if (!this.isSynchronized) {
            this.synchronize();
        }


        if (!suffix) {
            suffix = '';
        }

        var dom = this.dom,
            map = this.hasClassMap,
            classList = this.classList,
            SEPARATOR = this.SEPARATOR,
            i, ln, name;

        prefix = prefix ? prefix + SEPARATOR : '';
        suffix = suffix ? SEPARATOR + suffix : '';

        if (typeof names == 'string') {
            names = names.split(this.spacesRegex);
        }

        for (i = 0,ln = names.length; i < ln; i++) {
            name = prefix + names[i] + suffix;

            if (map[name]) {
                delete map[name];
                Ext.Array.remove(classList, name);
            }
        }

        dom.className = classList.join(' ');

        return this;
    },

    replaceCls: function(oldName, newName, prefix, suffix) {
        return this.removeCls(oldName, prefix, suffix).addCls(newName, prefix, suffix);
    },

    hasCls: function(name) {
        if (!this.isSynchronized) {
            this.synchronize();
        }

        return this.hasClassMap.hasOwnProperty(name);
    },

    show: function() {
        this.dom.style.display = '';
    },

    hide: function() {
        this.dom.style.setProperty('display', 'none', 'important');
    },

    setHtml: function(html) {
        this.dom.innerHTML = html;
    },

    setHTML: function() {
        this.setHtml.apply(this, arguments);
    },

    setText: function(text) {
        this.dom.textContent = text;
    },

    setWidth: function(width) {
        return this.setLengthValue(this.WIDTH, width);
    },

    setHeight: function(height) {
        return this.setLengthValue(this.HEIGHT, height);
    },

    setTop: function(top) {
        return this.setLengthValue(this.TOP, top);
    },

    setRight: function(right) {
        return this.setLengthValue(this.RIGHT, right);
    },

    setBottom: function(bottom) {
        return this.setLengthValue(this.BOTTOM, bottom);
    },

    setLeft: function(left) {
        return this.setLengthValue(this.LEFT, left);
    },

    setMargin: function(margin) {
        if (margin || margin === 0) {
            margin = this.self.unitizeBox((margin === true) ? 5 : margin);
        }
        else {
            margin = null;
        }
        this.dom.style.margin = margin;
    },

    setPadding: function(padding) {
        if (padding || padding === 0) {
            padding = this.self.unitizeBox((padding === true) ? 5 : padding);
        }
        else {
            padding = null;
        }
        this.dom.style.padding = padding;
    },

    setBorder: function(border) {
        if (border || border === 0) {
            border = this.self.unitizeBox((border === true) ? 1 : border);
        }
        else {
            border = null;
        }
        this.dom.style.borderWidth = border;
    },

    setLengthValue: function(name, value) {
        if (typeof value == 'number') {
            value = value + 'px';
        } else if (value === null) {
            value = 'auto';
        }

        this.dom.style.setProperty(name, value, 'important');

        return this;
    },

    getParent: function() {
        return Ext.get(this.dom.parentNode);
    },

    getFirstChild: function() {
        return Ext.get(this.dom.firstElementChild);
    },

    append: function(element) {
        this.dom.appendChild(Ext.getDom(element));

        return this;
    },

    insertFirst: function(element) {
        var elementDom = Ext.getDom(element),
            dom = this.dom,
            firstChild = dom.firstChild;

        if (!firstChild) {
            dom.appendChild(elementDom);
        }
        else {
            dom.insertBefore(elementDom, firstChild);
        }

        return this;
    },

    wrap: function(config, domNode) {
        var dom = this.dom,
            wrapper = this.self.create(config, domNode),
            wrapperDom = (domNode) ? wrapper : wrapper.dom,
            parentNode = dom.parentNode;

        if (parentNode) {
            parentNode.insertBefore(wrapperDom, dom);
        }

        wrapperDom.appendChild(dom);

        return wrapper;
    },

    wrapAllChildren: function(config) {
        var dom = this.dom,
            children = dom.childNodes,
            wrapper = this.self.create(config),
            wrapperDom = wrapper.dom;

        while (children.length > 0) {
            wrapperDom.appendChild(dom.firstChild);
        }

        dom.appendChild(wrapperDom);

        return wrapper;
    },

    unwrapAllChildren: function() {
        var dom = this.dom,
            children = dom.childNodes,
            parentNode = dom.parentNode;

        if (parentNode) {
            while (children.length > 0) {
                parentNode.insertBefore(dom, dom.firstChild);
            }

            this.destroy();
        }
    },

    unwrap: function() {
        var dom = this.dom,
            parentNode = dom.parentNode,
            grandparentNode;

        if (parentNode) {
            grandparentNode = parentNode.parentNode;
            grandparentNode.insertBefore(dom, parentNode);
            grandparentNode.removeChild(parentNode);
        }
        else {
            grandparentNode = document.createDocumentFragment();
            grandparentNode.appendChild(dom);
        }

        return this;
    },

    redraw: function() {
        var dom = this.dom,
            domStyle = dom.style;

        domStyle.display = 'none';
        dom.offsetHeight;
        domStyle.display = '';
    },

    isPainted: function() {
        return Boolean(this.dom.offsetParent);
    },

    destroy: function() {
        this.destroy = Ext.emptyFn;

        var cache = this.self.cache,
            dom = this.dom;

        if (dom && dom.parentNode && dom.tagName != 'BODY') {
            dom.parentNode.removeChild(dom);
        }

        delete cache[this.id];
        delete this.dom;
    }

}, function(Element) {
    Ext.elements = Ext.cache = Element.cache;

    Ext.get = function(element) {
        return Element.get.call(Element, element);
    }
});
