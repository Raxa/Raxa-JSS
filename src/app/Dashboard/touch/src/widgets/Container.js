/**
 * @class Ext.Container
 * @extends Ext.lib.Container
 * <p>Base class for any {@link Ext.BoxComponent} that may contain other Components. Containers handle the
 * basic behavior of containing items, namely adding, inserting and removing items.</p>
 *
 * <p><u><b>Layout</b></u></p>
 * <p>Container classes delegate the rendering of child Components to a layout
 * manager class which must be configured into the Container using the
 * <code><b>{@link #layout}</b></code> configuration property.</p>
 * <p>When either specifying child <code>{@link #items}</code> of a Container,
 * or dynamically {@link #add adding} Components to a Container, remember to
 * consider how you wish the Container to arrange those child elements, and
 * whether those child elements need to be sized using one of Ext's built-in
 * <b><code>{@link #layout}</code></b> schemes. By default, Containers use the
 * {@link Ext.layout.AutoContainerLayout AutoContainerLayout} scheme which only
 * renders child components, appending them one after the other inside the
 * Container, and <b>does not apply any sizing</b> at all.</p>
 * <p>A common mistake is when a developer neglects to specify a
 * <b><code>{@link #layout}</code></b>. If a Container is left to use the default
 * {@link Ext.layout.AutoContainerLayout AutoContainerLayout} scheme, none of its
 * child components will be resized, or changed in any way when the Container
 * is resized.</p>
 * @xtype container
 */
Ext.Container = Ext.extend(Ext.lib.Container, {
    /**
     * @cfg {String/Mixed} cardSwitchAnimation
     * Animation to be used during transitions of cards. Note this only works when this container has a CardLayout.
     * Any valid value from Ext.anims can be used ('fade', 'slide', 'flip', 'cube', 'pop', 'wipe').
     * Defaults to <tt>null</tt>.
     */
    cardSwitchAnimation: null,

    initComponent: function() {
        if (this.scroll) {
            this.fields = new Ext.util.MixedCollection();

            if (!Ext.is.Blackberry) {
                this.fields.on({
                    add: this.onFieldAdd,
                    remove: this.onFieldRemove,
                    scope: this
                });
            }

            this.on({
                add: this.onItemAdd,
                remove: this.onItemRemove,
                scope: this
            });
        }

        //<deprecated since="0.99">
        if (Ext.isDefined(this.animation)) {
            console.warn("Container: animation has been removed. Please use cardSwitchAnimation.");
            this.cardSwitchAnimation = this.animation;
        }
        //</deprecated>

        Ext.Container.superclass.initComponent.apply(this, arguments);
    },

    afterRender: function() {
        Ext.Container.superclass.afterRender.apply(this, arguments);

        if (this.scroller) {
            if ((Ext.is.Android) && this.containsFormFields) {
                this.scroller.setUseCssTransform(false);
            }

            this.scroller.on('scrollstart', this.onFieldScrollStart, this);
        }
    },

    onFieldScrollStart: function() {
        var focusedField = this.focusedField;

        if (focusedField && Ext.is.iOS) {
            focusedField.blur();
//            Ext.Viewport.scrollToTop();
        }
    },

    onItemAdd: function(me, item) {
        this.fields.addAll(Ext.ComponentQuery.query('[isField]', item));
    },

    onItemRemove: function(me, item) {
        this.fields.removeAll(Ext.ComponentQuery.query('[isField]', item));
    },

    onFieldAdd: function(key, field) {
        this.handleFieldEventListener(true, field);
    },

    onFieldRemove: function(key, field) {
        this.handleFieldEventListener(false, field);
    },

    handleFieldEventListener: function(isAdding, item) {
        if (!this.fieldEventWrap)
            this.fieldEventWrap = {};

        if (['textfield', 'passwordfield', 'emailfield',
             //<deprecated since=0.99>
             'textarea',
             //</deprecated>
             'textareafield', 'searchfield', 'urlfield',
             'numberfield', 'spinnerfield'].indexOf(item.xtype) !== -1) {
            if (isAdding) {
                this.fieldEventWrap[item.id] = {
                    beforefocus: function(e) {this.onFieldBeforeFocus(item, e);},
                    focus: function(e) {this.onFieldFocus(item, e);},
                    blur: function(e) {this.onFieldBlur(item, e);},
                    keyup: function(e) {this.onFieldKeyUp(item, e);},
                    scope: this
                };

                this.containsFormFields = true;
            }

            item[isAdding ? 'on' : 'un'](this.fieldEventWrap[item.id]);

            if (!isAdding) {
                delete this.fieldEventWrap[item.id];
            }
        }
    },

    onFieldKeyUp: function(field, e) {
        if (Ext.is.iOS || Ext.is.Desktop) {
            this.resetLastWindowScroll();
        }
    },

    onFieldBeforeFocus: function(field, e) {
        this.focusingField = field;
    },

    getLastWindowScroll: function() {
        if (!this.lastWindowScroll) {
            this.resetLastWindowScroll();
        }

        return {x: this.lastWindowScroll.x, y: this.lastWindowScroll.y};
    },

    resetLastWindowScroll: function() {
        this.lastWindowScroll = {
            x: window.pageXOffset,
            y: window.pageYOffset
        };
    },

    adjustScroller: function(offset) {
        var scroller = this.getClosestScroller(),
            windowScroll = this.getLastWindowScroll();

        scroller.setOffset(offset);

        // Keep the window in the previous scroll position
        if (Ext.is.iOS) {
            window.scrollTo(windowScroll.x, windowScroll.y);
        }

        this.resetLastWindowScroll();
    },

    onFieldFocus: function(field, e) {
        if (!Ext.is.iOS && !Ext.is.Desktop) {
            var dom = field.fieldEl.dom;

            if (dom.scrollIntoViewIfNeeded) {
                dom .scrollIntoViewIfNeeded(true);
            }
        }
        else {
             var scroller = this.getClosestScroller(),
                containerRegion = Ext.util.Region.from(scroller.containerBox),
                fieldRegion = field.fieldEl.getPageBox(true);

            // Focus by mouse click or finger tap, or not iOS
            if (this.focusingField == field || !Ext.is.iOS) {
                if (Ext.is.iOS && window.pageYOffset == 0) {
                    window.scrollTo(0, 0);
                }

                var adjustment = new Ext.util.Offset();

                if (fieldRegion.left < containerRegion.left) {
                    adjustment.x = containerRegion.left - fieldRegion.left;
                }

                if (fieldRegion.top < containerRegion.top) {
                    adjustment.y = containerRegion.top - fieldRegion.top;
                }

                if (!adjustment.isZero()) {
                    var windowScroll = this.getLastWindowScroll();

                    scroller.scrollBy(adjustment);

                    if (Ext.is.iOS) {
                        window.scrollTo(windowScroll.x, windowScroll.y);
                    }

                    this.resetLastWindowScroll();
                }
            }
            // Focus by next / previous / tab
            else {
                if (this.lastFocusedField) {
                    var deltaY = fieldRegion.top - this.lastFocusedField.fieldEl.getY(),
                        offsetY = scroller.offset.y - deltaY,
                        selfHandling = false;

                    if (!containerRegion.contains(fieldRegion) &&
                        (offsetY != 0 || (offsetY == 0 && scroller.offset.y != 0))) {
                        selfHandling = true;
                    }

                    if (offsetY > 0) {
                        offsetY = 0;
                    }

                    if (selfHandling) {
                        this.adjustScroller(new Ext.util.Offset(
                            scroller.offset.x, offsetY
                        ));
                    }
                }
            }

            this.resetLastWindowScroll();
        }

        this.lastFocusedField = field;
        this.focusedField = field;
        this.focusingField = null;
    },

    getClosestScroller: function() {
        if (!this.closestScroller) {
            this.closestScroller = this.scroller || this.el.getScrollParent();
        }

        return this.closestScroller;
    },

    onFieldBlur: function(field, e) {
        if (this.focusingField == field) {
            this.focusingField = null;
        }

        if (this.focusedField == field) {
            this.focusedField = null;
        }
    },

    // @private
    afterLayout : function(layout) {
        if (this.floating && this.centered) {
            this.setCentered(true, true);
        }

        if (this.scroller) {
            this.scroller.updateBoundary();
        }
        Ext.Container.superclass.afterLayout.call(this, layout);
    },

    /**
     * Returns the current activeItem for the layout (only for a card layout)
     * @return {activeItem} activeItem Current active component
     */
    getActiveItem : function() {
        if (this.layout && this.layout.type == 'card') {
            return this.layout.activeItem;
        }
        else {
            return null;
        }
    },

    /**
     * Allows you to set the active card in this container. This
     * method is only available if the container uses a CardLayout.
     * Note that a Carousel and TabPanel both get a CardLayout
     * automatically, so both of those components are able to use this method.
     * @param {Ext.Component/Number/Object} card The card you want to be made active. A number
     * is interpreted as a card index. An object will be converted to a Component using the
     * objects xtype property, then added to the container and made active. Passing a Component
     * will make sure the component is a child of this container, and then make it active.
     * @param {String/Object} cardSwitchAnimation (optional) The cardSwitchAnimation used to switch between the cards.
     * This can be an animation type string or an animation configuration object.
     * @return {Ext.Container} this
     */
    setActiveItem : function(card, animation) {
        this.layout.setActiveItem(card, animation);
        return this;
    },

    //<deprecated since=0.99>
    setCard: function() {
        console.warn("Container: setCard has been deprecated. Please use setActiveItem.");
        this.setActiveItem.apply(this, arguments);
    },
    //</deprecated>

    /**
     * A template method that can be implemented by subclasses of
     * Container. By returning false we can cancel the card switch.
     * @param {Ext.Component} newCard The card that will be switched to
     * @param {Ext.Component} oldCard The card that will be switched from
     * @param {Number} newIndex The Container index position of the selected card
     * @param {Boolean} animated True if this cardswitch will be animated
     * @private
     */
    onBeforeCardSwitch : function(newCard, oldCard, newIndex, animated) {
        return this.fireEvent('beforecardswitch', this, newCard, oldCard, newIndex, animated);
    },

    /**
     * A template method that can be implemented by subclasses of
     * Container. If the card is switched using an animation, this method
     * will be called after the animation has finished.
     * @param {Ext.Component} newCard The card that has been switched to
     * @param {Ext.Component} oldCard The card that has been switched from
     * @param {Number} newIndex The Container index position of the selected card
     * @param {Boolean} animated True if this cardswitch was animated
     * @private
     */
    onCardSwitch : function(newCard, oldCard, newIndex, animated) {
        return this.fireEvent('cardswitch', this, newCard, oldCard, newIndex, animated);
    },

    /**
     * Disable this container by masking out
     */
    disable: function() {
        Ext.Container.superclass.disable.call(this);
        this.el.mask(null, 'x-mask-gray');
    },

    /**
     * Enable this container by removing mask
     */
    enable: function() {
        Ext.Container.superclass.enable.call(this);
        this.el.unmask();
    }
});

Ext.reg('container', Ext.Container);
