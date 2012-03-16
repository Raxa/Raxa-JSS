Ext.DataViewSelectionModel = Ext.extend(Ext.AbstractStoreSelectionModel, {
    deselectOnContainerClick: true,
    bindComponent: function(view) {
        this.view = view;
        this.bind(view.getStore());
        var eventListeners = {
            refresh: this.refresh,
            scope: this,
            el: {
                scope: this
            }
        };
        eventListeners.el[view.triggerEvent] = this.onItemClick;
        eventListeners.el[view.triggerCtEvent] = this.onContainerClick;
        
        view.on(eventListeners);
    },


    onItemClick: function(e) {
        var view   = this.view,
            node   = view.findTargetByEvent(e);
        
        if (node) {
            this.selectWithEvent(view.getRecord(node), e);
        } else {
            return false;
        }
    },

    onContainerClick: function() {
        if (this.deselectOnContainerClick) {
            this.deselectAll();
        }
    },

    // Allow the DataView to update the ui
    onSelectChange: function(record, isSelected, suppressEvent) {
        var view = this.view;
        
        if (isSelected) {
            view.onItemSelect(record);
            if (!suppressEvent) {
                this.fireEvent('select', this, record);
            }
        } else {
            view.onItemDeselect(record);
            if (!suppressEvent) {
                this.fireEvent('deselect', this, record);
            }
        }
    }
});
