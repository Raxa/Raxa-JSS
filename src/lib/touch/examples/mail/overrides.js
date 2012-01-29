Ext.require([
    'Ext.ux.app.Application',
    'Ext.viewport.Viewport',
    'Ext.data.Model',
    'Ext.data.Store',
    'Ext.form.FieldSet',
    'Ext.field.Search',
    'Ext.Toolbar',
    'Ext.List'
], function() {
    Ext.override(Ext.data.Model, {
        toUrl: function() {
            var pieces = this.$className.split('.'),
                name   = pieces[pieces.length - 1].toLowerCase();
            
            return name + '/' + this.getId();
        }
    });
    
    Ext.override(Ext.List, {
        //there is similar logic in picker Slot's scrollToItem function
        
        /**
         * Makes sure a given record is visible in the list, scrolling the view as necessary to ensure it is fully 
         * visible. If the item is partially visible or nearby the list will be scrolled just enough to completely show
         * the item. If the item is not visible at all and not nearby, it will attempt to center the item. If the item
         * is already fully visible nothing happens.
         * @param {Ext.data.Model} record The Model instance to find the list item for and make visible
         */
        ensureVisible: function(record) {
            var scrollView     = this.scrollableBehavior.getScrollView(),
                scroller       = scrollView.getScroller(),
                scrollerTop    = scroller.position.y,
                scrollerHeight = scroller.getContainer().getHeight(),
                scrollerBottom = scrollerTop + scrollerHeight,
                
                item       = Ext.get(this.getViewItems()[this.getStore().indexOf(record)]),
                itemTop    = item.dom.offsetTop,
                itemHeight = item.getHeight(),
                itemBottom = itemTop + itemHeight,
                
                //this is where we would scroll to in order to center the item
                itemCenterPoint = itemTop + (itemHeight / 2) - (scrollerHeight / 2),
                
                //this is the lowest point we can scroll to without bouncing
                lowestPoint  = this.innerElement.getHeight() - scrollerHeight,
                
                //detect if the item is nearby, in which case we'll scroll to just show it (instead of centering)
                tolerance   = 1.5 * scrollerHeight,
                isNearAbove = itemTop < scrollerTop && itemTop > (scrollerTop - tolerance),
                isNearBelow = itemBottom > scrollerBottom && itemBottom < (scrollerBottom + tolerance),
                isOffScreen = !isNearBelow && !isNearBelow && (itemTop < scrollerTop || itemBottom > scrollerBottom),
                newY;
            
            //if the item is nearby below, scroll down so that it's fully visible but no more
            if (isNearBelow) {
                newY = itemTop + item.getHeight() - scrollerHeight;
            }
            
            //same thing for the top
            else if (isNearAbove) {
                newY = itemTop;
            }
            
            //if it's not visible and not nearby, center it, constraining it so we don't bounce
            else if (isOffScreen) {
                newY = itemCenterPoint;
            }
            
            if (newY) {
                scrollView.showIndicator('y');
                scroller.scrollToAnimated(0, Ext.Number.constrain(newY, 0, lowestPoint));
            }
        }
    });
    
    //this is crude and totally wrong. We should really just checking to see if the Store
    //has ever been loaded (as opposed to a zero count check)
    Ext.override(Ext.data.Store, {
        ensureLoaded: function(callback, scope) {
            if (this.getCount() == 0) {
                this.load({
                    callback: callback,
                    scope: scope
                });
            } else {
                if (callback) {
                    callback.call(scope, this);
                }
            }
        }
    });
});