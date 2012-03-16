/**
 * @class loans
 * @extends Ext.Controller
 * 
 * The only controller in this simple application - this simply sets up the fullscreen viewport panel
 * and renders a detailed overlay whenever a Loan is tapped on.
 */
Ext.regController("loans", {

    /**
     * Renders the Viewport and sets up listeners to show details when a Loan is tapped on. This
     * is only expected to be called once - at application startup. This is initially called inside
     * the app.js launch function.
     */
    list: function() {
        this.listView = this.render({
            xtype: 'kivaMain',
            listeners: {
                scope : this,
                filter: this.onFilter,
                selectionchange: this.onSelected
            }
        }, Ext.getBody()).down('.loansList');
    },

    /**
     * Shows a details overlay for a given Loan. This creates a single reusable detailView and simply
     * updates it each time a Loan is tapped on.
     */
    show: function(options) {
        var view = this.detailView;
        
        if (!view) {
            this.detailView = this.render({
                xtype: 'loanShow',
                listeners: {
                    scope: this,
                    hide : function() {
                        this.listView.getSelectionModel().deselectAll();
                    }
                }
            }, false);
            
            view = this.detailView;
        }
        
        view.setLoan(options.instance);
        view.show();
    },
    
    /**
     * @private
     * Listener for the 'filter' event fired by the listView set up in the 'list' action. This simply
     * gets the form values that the user wants to filter on and tells the Store to filter using them.
     */
    onFilter: function(values, form) {
        var view    = this.listView,
            store   = view.store,
            filters = [],
            field;
        
        Ext.iterate(values, function(field, value) {
            filters.push(new Ext.util.Filter({
                property: field,
                value   : value
            }));
        });
        
        store.clearFilter();
        store.filter(filters);
    },
    
    /**
     * @private
     * Causes the Loan details overlay to be shown if there is a Loan selected
     */
    onSelected: function(selectionModel, records) {
        var loan = records[0];
        
        if (loan) {
            this.show({
                instance: loan
            });
        }
    }
});