/**
 * @class Ext.layout.CardLayout
 * @extends Ext.layout.FitLayout
 * <p>This layout manages multiple child Components, each is fit to the Container, where only a single child Component
 * can be visible at any given time.  This layout style is most commonly used for wizards, tab implementations, etc.
 * This class is intended to be extended or created via the layout:'card' {@link Ext.Container#layout} config,
 * and should generally not need to be created directly via the new keyword.</p>
 * <p>The CardLayout's focal method is {@link #setActiveItem}.  Since only one panel is displayed at a time,
 * the only way to move from one Component to the next is by calling setActiveItem, passing the id or index of
 * the next panel to display.  The layout itself does not provide a user interface for handling this navigation,
 * so that functionality must be provided by the developer.</p>
 * <p>Containers that are configured with a card layout will have a method setActiveItem dynamically added to it. 
 * <pre><code>
      var p = new Ext.Panel({
          fullscreen: true,
          layout: 'card',
          items: [{
              html: 'Card 1'
          },{
              html: 'Card 2'
          }]
      });
      p.setActiveItem(1);
   </code></pre>
 * </p>
 */

Ext.layout.CardLayout = Ext.extend(Ext.layout.FitLayout, {
    type: 'card',

    sizeAllCards: false,
    hideInactive: true,

    beforeLayout: function() {
        this.activeItem = this.getActiveItem();
        return Ext.layout.CardLayout.superclass.beforeLayout.apply(this, arguments);
    },

    onLayout: function() {
        Ext.layout.FitLayout.superclass.onLayout.apply(this, arguments);

        var activeItem = this.activeItem,
            items = this.getLayoutItems(),
            ln = items.length,
            targetBox = this.getTargetBox(),
            i,
            item;

        for (i = 0; i < ln; i++) {
            item = items[i];
            this.setItemBox(item, targetBox);
        }

        if (!this.firstActivated && activeItem) {
            if (activeItem.fireEvent('beforeactivate', activeItem) !== false) {
                activeItem.fireEvent('activate', activeItem);
            }
            this.firstActivated = true;
        }
    },

    /**
     * Return the active (visible) component in the layout.
     * @returns {Ext.Component}
     */
    getActiveItem: function() {
        if (!this.activeItem && this.owner) {
            this.activeItem = this.parseActiveItem(this.owner.activeItem);
        }

        if (this.activeItem && this.owner.items.items.indexOf(this.activeItem) != -1) {
            return this.activeItem;
        }

        return null;
    },

    // @private
    parseActiveItem: function(item) {
        if (item && item.isComponent) {
            return item;
        }
        else if (typeof item == 'number' || item == undefined) {
            return this.getLayoutItems()[item || 0];
        }
        else {
            return this.owner.getComponent(item);
        }
    },

    // @private
    configureItem: function(item, position) {
        Ext.layout.FitLayout.superclass.configureItem.call(this, item, position);
        if (this.hideInactive && this.activeItem !== item) {
            item.hide();
        }
        else {
            item.show();
        }
    },

    onRemove: function(component) {
        if (component === this.activeItem) {
            this.activeItem = null;
            if (this.owner.items.getCount() == 0) {
                this.firstActivated = false;
            }
        }
    },

    // @private
    getAnimation: function(newCard, owner) {
        var newAnim = (newCard || {}).cardSwitchAnimation;
        if (newAnim === false) {
            return false;
        }
        return newAnim || owner.cardSwitchAnimation;
    },

    /**
     * Sets the active (visible) item in the layout.
     * @param {String/Number} item The string component id or numeric index of the item to activate
     */
    setActiveItem: function(newCard, animation) {
        var me = this,
            owner = me.owner,
            doc = Ext.getDoc(),
            oldCard = me.activeItem,
            newIndex;
        
        animation = (animation == undefined) ? this.getAnimation(newCard, owner) : animation;

        newCard = me.parseActiveItem(newCard);
        newIndex = owner.items.indexOf(newCard);


        // If the card is not a child of the owner, then add it
        if (newIndex == -1) {
            owner.add(newCard);
        }

        // Is this a valid, different card?
        if (newCard && oldCard != newCard && owner.onBeforeCardSwitch(newCard, oldCard, newIndex, !!animation) !== false) {
            // If the card has not been rendered yet, now is the time to do so.
            if (!newCard.rendered) {
                this.layout();
            }

            // Fire the beforeactivate and beforedeactivate events on the cards
            if (newCard.fireEvent('beforeactivate', newCard, oldCard) === false) {
                return false;
            }
            if (oldCard && oldCard.fireEvent('beforedeactivate', oldCard, newCard) === false) {
                return false;
            }
                        
            // Make sure the new card is shown
            if (newCard.hidden) {
                newCard.show();
            }

            me.activeItem = newCard;

            if (animation) {
                doc.on('click', Ext.emptyFn, me, {
                    single: true,
                    preventDefault: true
                });

                Ext.Anim.run(newCard, animation, {
                    out: false,
                    autoClear: true,
                    scope: me,
                    after: function() {
                        Ext.defer(function() {
                            doc.un('click', Ext.emptyFn, me);
                        },
                        50, me);

                        newCard.fireEvent('activate', newCard, oldCard);

                        if (!oldCard) {
                            // If there is no old card, the we have to make sure that we fire
                            // onCardSwitch here.
                            owner.onCardSwitch(newCard, oldCard, newIndex, true);
                        }
                    }
                });

                if (oldCard) {
                    Ext.Anim.run(oldCard, animation, {
                        out: true,
                        autoClear: true,
                        after: function() {
                            oldCard.fireEvent('deactivate', oldCard, newCard);
                            if (me.hideInactive && me.activeItem != oldCard) {
                                oldCard.hide();
                            }

                            // We fire onCardSwitch in the after of the oldCard animation
                            // because that is the last one to fire, and we want to make sure
                            // both animations are finished before firing it.
                            owner.onCardSwitch(newCard, oldCard, newIndex, true);
                        }
                    });
                }
            }
            else {
                newCard.fireEvent('activate', newCard, oldCard);
                if (oldCard) {
                    oldCard.fireEvent('deactivate', oldCard, newCard);
                    if (me.hideInactive) {
                        oldCard.hide();
                    }
                }
                owner.onCardSwitch(newCard, oldCard, newIndex, false);
            }

            return newCard;
        }

        return false;
    },

    /**
     * Return the active (visible) component in the layout to the next card, optional wrap parameter to wrap to the first
     * card when the end of the stack is reached.
     * @param {boolean} wrap Wrap to the first card when the end of the stack is reached.
     * @returns {Ext.Component}
     */
    getNext: function(wrap) {
        var items = this.getLayoutItems(),
            index = items.indexOf(this.activeItem);
        return items[index + 1] || (wrap ? items[0] : false);
    },

    /**
     * Sets the active (visible) component in the layout to the next card, optional wrap parameter to wrap to the first
     * card when the end of the stack is reached.
     * @param {Mixed} anim Animation to use for the card transition
     * @param {boolean} wrap Wrap to the first card when the end of the stack is reached.
     */
    next: function(anim, wrap) {
        return this.setActiveItem(this.getNext(wrap), anim);
    },

    /**
     * Return the active (visible) component in the layout to the previous card, optional wrap parameter to wrap to
     * the last card when the beginning of the stack is reached.
     * @param {boolean} wrap Wrap to the first card when the end of the stack is reached.
     * @returns {Ext.Component}
     */
    getPrev: function(wrap) {
        var items = this.getLayoutItems(),
            index = items.indexOf(this.activeItem);
        return items[index - 1] || (wrap ? items[items.length - 1] : false);
    },

    /**
     * Sets the active (visible) component in the layout to the previous card, optional wrap parameter to wrap to
     * the last card when the beginning of the stack is reached.
     * @param {Mixed} anim Animation to use for the card transition
     * @param {boolean} wrap Wrap to the first card when the end of the stack is reached.
     */
    prev: function(anim, wrap) {
        return this.setActiveItem(this.getPrev(wrap), anim);
    }
});

Ext.regLayout('card', Ext.layout.CardLayout);