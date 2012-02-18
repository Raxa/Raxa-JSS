/**
 * @class twitter.views.Searches
 * @extends Ext.List
 * 
 * This shows all of the Searches that the user has saved. It also contains a new search form docked to the top.
 * As well as the template and form, we set up a listener to the 'itemswipe' event which exposes the saved Search's
 * delete button when swiped. Finally we add a little custom logic to the onItemTap function to delete the record if
 * the Delete button was tapped.
 * 
 * The configured store loads the Search model instances using Search's default proxy (see app/models/Search.js).
 * 
 */
twitter.views.Searches = Ext.extend(Ext.List, {
    cls: 'searches',
    allowDeselect: false,
    singleSelect: true,
    
    /**
     * @cfg {String} activeCls The CSS class that is added to each item when swiped
     */
    activeCls: 'search-item-active',
    
    itemTpl: [
        '<div class="search-item">',
            '<div class="action delete x-button">Delete</div>',
            '<span>{query}</span>',
        '</div>'
    ],
    
    initComponent: function() {
        Ext.apply(this, {
            store: Ext.getStore('Searches')
        });
    
        twitter.views.Searches.superclass.initComponent.apply(this, arguments);
        
        this.enableBubble('selectionchange');
        
        this.on({
            scope: this,
            itemswipe: this.onItemSwipe,
            containertap: this.deactivateAll
        });
    },
    
    /**
     * @private
     * Here we intercept the normal tap handler. If the user tapped on the delete button we stop the event here
     * and remove the item from the store, otherwise we allow the event to continue
     */
    onItemTap: function(item, index, e) {
        if (e.getTarget('.' + this.activeCls + ' div.delete')) {
            var store    = this.store,
                selModel = this.getSelectionModel(),
                instance = store.getAt(index),
                selected = selModel.isSelected(instance),
                nearest  = store.getAt(index + 1) || store.getAt(index - 1);
            
            //if the item we are removing is currently selected, select the nearest item instead
            if (selected && nearest) {
                selModel.select(nearest);
            }
            
            store.removeAt(index);
            store.sync();
            
            //there were no other searches left so tell the user about that
            if (!nearest) {
                Ext.redirect('searches/first');
            }
        } else {
            this.deactivateAll();
            
            return twitter.views.Searches.superclass.onItemTap.apply(this, arguments);
        }
    },
    
    /**
     * @private
     * Removes the 'Delete' button from all items
     */
    deactivateAll: function() {
        Ext.select('div.search-item', this.el.dom).removeCls(this.activeCls);
    },
    
    /**
     * @private
     * Handler for the itemswipe event - shows the Delete button for the swiped item, hiding the Delete button
     * on any other items
     */
    onItemSwipe: function(list, index, node) {
        var el        = Ext.get(node),
            activeCls = this.activeCls,
            hasClass  = el.hasCls(activeCls);
        
        this.deactivateAll();
        
        if (hasClass) {
            el.removeCls(activeCls);
        } else {
            el.addCls(activeCls);
        }
    }
});

Ext.reg('searchesList', twitter.views.Searches);