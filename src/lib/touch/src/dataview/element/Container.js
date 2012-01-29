/**
 * @private
 */
Ext.define('Ext.dataview.element.Container', {
    extend: 'Ext.Component',

    /**
     * @event itemtouchstart
     * Fires whenever an item is touched
     * @param {Ext.dataview.element.Container} this
     * @param {Ext.dataview.component.DataItem} item The item touched
     * @param {Number} index The index of the item touched
     * @param {Ext.EventObject} e The event object
     */

    /**
     * @event itemtouchmove
     * Fires whenever an item is moved
     * @param {Ext.dataview.element.Container} this
     * @param {Ext.dataview.component.DataItem} item The item moved
     * @param {Number} index The index of the item moved
     * @param {Ext.EventObject} e The event object
     */

    /**
     * @event itemtouchend
     * Fires whenever an item is touched
     * @param {Ext.dataview.element.Container} this
     * @param {Ext.dataview.component.DataItem} item The item touched
     * @param {Number} index The index of the item touched
     * @param {Ext.EventObject} e The event object
     */

    /**
     * @event itemtap
     * Fires whenever an item is tapped
     * @param {Ext.dataview.element.Container} this
     * @param {Ext.dataview.component.DataItem} item The item tapped
     * @param {Number} index The index of the item tapped
     * @param {Ext.EventObject} e The event object
     */

    /**
     * @event itemtaphold
     * Fires whenever an item is tapped
     * @param {Ext.dataview.element.Container} this
     * @param {Ext.dataview.component.DataItem} item The item tapped
     * @param {Number} index The index of the item tapped
     * @param {Ext.EventObject} e The event object
     */

    /**
     * @event itemdoubletap
     * Fires whenever an item is doubletapped
     * @param {Ext.dataview.element.Container} this
     * @param {Ext.dataview.component.DataItem} item The item doubletapped
     * @param {Number} index The index of the item doubletapped
     * @param {Ext.EventObject} e The event object
     */

    /**
     * @event itemswipe
     * Fires whenever an item is swiped
     * @param {Ext.dataview.element.Container} this
     * @param {Ext.dataview.component.DataItem} item The item swiped
     * @param {Number} index The index of the item swiped
     * @param {Ext.EventObject} e The event object
     */

    doInitialize: function() {
        this.element.on({
            touchstart: 'onItemTouchStart',
            touchend: 'onItemTouchEnd',
            tap: 'onItemTap',
            taphold: 'onItemTapHold',
            touchmove: 'onItemTouchMove',
            doubletap: 'onItemDoubleTap',
            swipe: 'onItemSwipe',
            delegate: '> div',
            scope: this
        });
    },

    //@private
    initialize: function() {
        this.callParent();
        this.doInitialize();
    },

    onItemTouchStart: function(e) {
        var me = this,
            target = e.getTarget(),
            index = me.getViewItems().indexOf(target);

        Ext.get(target).on({
            touchmove: 'onItemTouchMove',
            scope   : me,
            single: true
        });

        me.fireEvent('itemtouchstart', me, Ext.get(target), index, e);
    },

    onItemTouchEnd: function(e) {
        var me = this,
            target = e.getTarget(),
            index = me.getViewItems().indexOf(target);

        Ext.get(target).un({
            touchmove: 'onItemTouchMove',
            scope   : me
        });

        me.fireEvent('itemtouchend', me, Ext.get(target), index, e);
    },

    onItemTouchMove: function(e) {
        var me = this,
            target = e.getTarget(),
            index = me.getViewItems().indexOf(target);

        me.fireEvent('itemtouchmove', me, Ext.get(target), index, e);
    },

    onItemTap: function(e) {
        var me = this,
            target = e.getTarget(),
            index = me.getViewItems().indexOf(target);

        me.fireEvent('itemtap', me, Ext.get(target), index, e);
    },

    onItemTapHold: function(e) {
        var me     = this,
            target = e.getTarget(),
            index  = me.getViewItems().indexOf(target);

        me.fireEvent('itemtaphold', me, Ext.get(target), index, e);
    },

    onItemDoubleTap: function(e) {
        var me = this,
            target = e.getTarget(),
            index = me.getViewItems().indexOf(target);

        me.fireEvent('itemdoubletap', me, Ext.get(target), index, e);
    },

    onItemSwipe: function(e) {
        var me = this,
            target = e.getTarget(),
            index = me.getViewItems().indexOf(target);

        me.fireEvent('itemswipe', me,  Ext.get(target), index, e);
    },

    updateListItem: function(record, item) {
        var me = this,
            dataview = me.dataview,
            data = dataview.prepareData(record.getData(true), dataview.getStore().indexOf(record), record);
        item.innerHTML = me.dataview.getItemTpl().apply(data);
    },

    addListItem: function(index, record) {
        var me = this,
            dataview = me.dataview,
            data = dataview.prepareData(record.getData(true), dataview.getStore().indexOf(record), record),
            element = me.element,
            childNodes = element.dom.childNodes,
            ln = childNodes.length,
            wrapElement;

        wrapElement = Ext.Element.create(this.getItemElementConfig(index, data));

        if (!ln || index == ln) {
            wrapElement.appendTo(element);
        } else {
            wrapElement.insertBefore(childNodes[index]);
        }
    },

    getItemElementConfig: function(index, data) {
        var dataview = this.dataview;
        return {
            cls: dataview.getBaseCls() + '-item',
            html: dataview.getItemTpl().apply(data)
        };
    },

    // Remove
    moveItemsToCache: function(from, to) {
        var me = this,
            items = me.getViewItems(),
            i = to - from,
            item;

        for (; i >= 0; i--) {
            item = items[from + i];
            item.parentNode.removeChild(item);
        }
        if (me.getViewItems().length == 0) {
            this.dataview.showEmptyText();
        }
    },

    // Add
    moveItemsFromCache: function(records) {
        var me = this,
            dataview = me.dataview,
            store = dataview.getStore(),
            ln = records.length,
            i = 0,
            record;

        if (ln) {
            dataview.hideEmptyText();
        }

        for (; i < ln; i++) {
            record = records[i];
            me.addListItem(store.indexOf(record), record);
        }
    },

    // Transform ChildNodes into a proper Array so we can do indexOf...
    getViewItems: function() {
        return Array.prototype.slice.call(this.element.dom.childNodes);
    },

    doCreateItems: function(records) {
        this.moveItemsFromCache(records);
    }
});
