/**
 * @author Jacky Nguyen <jacky@sencha.com>
 * @private
 */
Ext.define('Ext.fx.runner.CssTransition', {
    extend: 'Ext.fx.runner.Css',

    listenersAttached: false,

    constructor: function() {
        this.requestAnimationFrame = Ext.feature.getSupportedPropertyName(window, 'requestAnimationFrame');

        this.runningData = {};

        this.runningAnimationsData = {};

        return this.callParent(arguments);
    },

    attachListeners: function() {
        this.listenersAttached = true;
        this.getEventDispatcher().addListener('element', '*', 'transitionend', 'onTransitionEnd', this);
    },

    onTransitionEnd: function(e) {
        this.refreshRunningAnimationsData(Ext.get(e.target), [e.browserEvent.propertyName]);
    },

    onAnimationEnd: function(element, animation, isInterrupted) {
        var id = element.getId(),
            endRules = {},
            endData = {
                'transition-property': null,
                'transition-duration': null,
                'transition-timing-function': null,
                'transition-delay': null
            },
            toPropertyNames, i, ln, name;

        endRules[id] = endData;

        if (animation.onBeforeEnd) {
            animation.onBeforeEnd.call(animation.scope || this, element, isInterrupted);
        }

        if (!isInterrupted && !animation.preserveEndState) {
            toPropertyNames = animation.toPropertyNames;

            for (i = 0,ln = toPropertyNames.length; i < ln; i++) {
                name = toPropertyNames[i];
                endData[name] = null;
            }
        }

        if (animation.after) {
            Ext.merge(endData, animation.after);
        }

        this.applyStyles(endRules);

        if (animation.onEnd) {
            animation.onEnd.call(animation.scope || this, element, isInterrupted);
        }
    },

    refreshRunningAnimationsData: function(element, propertyNames, interrupt) {
        var id = element.getId(),
            runningAnimationsData = this.runningAnimationsData,
            animations = runningAnimationsData[id],
            ln, j, subLn, name,
            i, animation, properties;

        if (!animations) {
            return this;
        }

        ln = animations.length;

        if (ln === 0) {
            return this;
        }

        for (i = 0; i < ln; i++) {
            animation = animations[i];
            properties = animation.properties;

            for (j = 0,subLn = propertyNames.length; j < subLn; j++) {
                name = propertyNames[j];

                if (properties[name]) {
                    delete properties[name];
                    animation.length--;
                }
            }

            if (animation.length == 0) {
                animations.splice(i, 1);
                i--;
                ln--;

                this.onAnimationEnd(element, animation.data, interrupt);
            }
        }
    },

    getTestElement: function() {
        var testElement = this.testElement,
            iframe, iframeDocument, iframeStyle;

        if (!testElement) {
            iframe = document.createElement('iframe');
            iframeStyle = iframe.style;
            iframeStyle.setProperty('visibility', 'hidden', '!important');
            iframeStyle.setProperty('width', '0px', '!important');
            iframeStyle.setProperty('height', '0px', '!important');
            iframeStyle.setProperty('position', 'absolute', '!important');
            iframeStyle.setProperty('zIndex', '-1000', '!important');

            document.body.appendChild(iframe);
            iframeDocument = iframe.contentDocument;
            
            iframeDocument.open();
            iframeDocument.writeln('</body>');
            iframeDocument.close();

            this.testElement = testElement = iframeDocument.createElement('div');
            testElement.style.setProperty('position', 'absolute', '!important');
            iframeDocument.body.appendChild(testElement);
            this.testElementComputedStyle = window.getComputedStyle(testElement);
        }

        return testElement;
    },

    getCssStyleValue: function(name, value) {
        var testElement = this.getTestElement(),
            computedStyle = this.testElementComputedStyle,
            style = testElement.style;

        style.setProperty(name, value);
        value = computedStyle.getPropertyValue(name);
        style.removeProperty(name);

        return value;
    },

    run: function(animations) {
        var me = this,
            isLengthPropertyMap = this.lengthProperties,
            requestAnimationFrame = this.requestAnimationFrame,
            runningData = this.runningData,
            fromData = {},
            toData = {},
            data = {},
            runningAnimationsData = this.runningAnimationsData,
            previous, element, elementId, from, to, before,
            fromPropertyNames, toPropertyNames, propertyNames,
            doApplyTo, message,
            runningAnimations,
            i, j, ln, animation, propertiesLength, propertiesMap,
            computedStyle, formattedName, name, toFormattedValue,
            computedValue, fromFormattedValue, isLengthProperty;

        if (!this.listenersAttached) {
            this.attachListeners();
        }

        animations = Ext.Array.from(animations);

        for (i = 0,ln = animations.length; i < ln; i++) {
            animation = animations[i];
            animation = Ext.factory(animation, Ext.fx.Animation);
            element = animation.getElement();

            computedStyle = window.getComputedStyle(element.dom);

            elementId = element.getId();

            previous = runningData[elementId];

            animation = Ext.merge({}, animation.getData());

            data[elementId] = animation;

            before = animation.before;
            from = animation.from;
            to = animation.to;

            animation.fromPropertyNames = fromPropertyNames = [];
            animation.toPropertyNames = toPropertyNames = [];

            for (name in to) {
                if (to.hasOwnProperty(name)) {
                    to[name] = toFormattedValue = this.formatValue(to[name], name);
                    formattedName = this.formatName(name);
                    isLengthProperty = isLengthPropertyMap.hasOwnProperty(name);

                    if (!isLengthProperty) {
                        toFormattedValue = this.getCssStyleValue(formattedName, toFormattedValue);
                    }

                    if (from.hasOwnProperty(name)) {
                        from[name] = fromFormattedValue = this.formatValue(from[name], name);

                        if (!isLengthProperty) {
                            fromFormattedValue = this.getCssStyleValue(formattedName, fromFormattedValue);
                        }

                        if (toFormattedValue !== fromFormattedValue) {
                            fromPropertyNames.push(formattedName);
                            toPropertyNames.push(formattedName);
                        }
                    }
                    else {
                        computedValue = computedStyle.getPropertyValue(formattedName);

                        if (toFormattedValue !== computedValue) {
                            toPropertyNames.push(formattedName);
                        }
                    }
                }
            }

            propertyNames = Ext.Array.merge(fromPropertyNames, toPropertyNames);

            propertiesMap = {};
            propertiesLength = toPropertyNames.length;

            for (j = 0; j < propertiesLength; j++) {
                propertiesMap[toPropertyNames[j]] = true;
            }

            if (!(runningAnimations = runningAnimationsData[elementId])) {
                runningAnimationsData[elementId] = runningAnimations = [];
            }

            this.refreshRunningAnimationsData(element, propertyNames, true);

            if (propertiesLength === 0) {
                this.onAnimationEnd(element, animation);
                continue;
            }
            else {
                runningAnimations.push({
                    element: element,
                    properties: propertiesMap,
                    length: propertiesLength,
                    data: animation
                });
            }

            fromData[elementId] = from = Ext.apply(Ext.Object.chain(before), from);

            if (previous) {
                fromPropertyNames = Ext.Array.difference(previous.toPropertyNames, fromPropertyNames);
                toPropertyNames = Ext.Array.merge(fromPropertyNames, toPropertyNames);

                from['transition-property'] = fromPropertyNames;
            }

            toData[elementId] = to = Ext.Object.chain(to);

            to['transition-property'] = toPropertyNames;
            to['transition-duration'] = animation.duration;
            to['transition-timing-function'] = animation.easing;
            to['transition-delay'] = animation.delay;
        }

        Ext.merge(runningData, data);

        if (requestAnimationFrame) {
            window[requestAnimationFrame](function() {
                me.applyStyles(fromData);
                window[requestAnimationFrame](function() {
                    me.applyStyles(toData);
                });
            });
        }
        else {
            message = this.$className;

            this.applyStyles(fromData);

            doApplyTo = function(e) {
                if (e.data === message && e.source === window) {
                    window.removeEventListener('message', doApplyTo, false);
                    me.applyStyles(toData);
                }
            };

            window.addEventListener('message', doApplyTo, false);
            window.postMessage(message, '*');
        }
    }
});
