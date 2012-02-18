/**
 * @class kiva.views.LoanFilter
 * @extends Ext.form.FormPanel
 * 
 * This form enables the user to filter the types of Loans visible to those that they are interested in.
 * 
 * We add a custom event called 'filter' to this class, and fire it whenever the user changes any of the
 * fields. The loans controller listens for this event and filters the Ext.data.Store that contains the
 * Loans based on the values selected (see the onFilter method in app/controllers/loans.js).
 * 
 */
kiva.views.LoanFilter = Ext.extend(Ext.form.FormPanel, {
    ui: 'green',
    cls: 'x-toolbar-dark',
    baseCls: 'x-toolbar',
    
    initComponent: function() {
        this.addEvents(
            /**
             * @event filter
             * Fires whenever the user changes any of the form fields
             * @param {Object} values The current value of each field
             * @param {Ext.form.FormPanel} form The form instance
             */
            'filter'
        );
        
        this.enableBubble('filter');
        
        Ext.apply(this, {
            defaults: {
                listeners: {
                    change: this.onFieldChange,
                    scope: this
                }
            },
            
            layout: {
                type: 'hbox',
                align: 'center'
            },
            
            items: [
                {
                    xtype: 'selectfield',
                    name: 'gender',
                    prependText: 'Gender:',
                    options: [
                        {text: 'Both',   value: ''},
                        {text: 'Male',   value: 'male'},
                        {text: 'Female', value: 'female'}
                    ]
                },
                {
                    xtype: 'selectfield',
                    name: 'sector',
                    prependText: 'Sector:',
                    options: [
                        {text: 'All',            value: ''},
                        {text: 'Agriculture',    value: 'agriculture'},
                        {text: 'Transportation', value: 'transportation'},
                        {text: 'Services',       value: 'services'},
                        {text: 'Clothing',       value: 'clothing'},
                        {text: 'Health',         value: 'health'},
                        {text: 'Retail',         value: 'retail'},
                        {text: 'Manufacturing',  value: 'manufacturing'},
                        {text: 'Arts',           value: 'arts'},
                        {text: 'Housing',        value: 'housing'},
                        {text: 'Food',           value: 'food'},
                        {text: 'Wholesale',      value: 'wholesale'},
                        {text: 'Construction',   value: 'construction'},
                        {text: 'Education',      value: 'education'},
                        {text: 'Personal Use',   value: 'personal'},
                        {text: 'Entertainment',  value: 'entertainment'},
                        {text: 'Green',          value: 'green'}
                    ]
                },
                {
                    xtype: 'spacer'
                },
                {
                    xtype: 'selectfield',
                    name: 'sort_by',
                    prependText: 'Sort by:',
                    options: [
                        {text: 'Newest',           value: 'newest'},
                        {text: 'Oldest',           value: 'oldest'},
                        {text: 'Expiring',         value: 'expiration'},
                        {text: 'Amount Remaining', value: 'amount_remaining'},
                        {text: 'Popularity',       value: 'popularity'},
                        {text: 'Loan Amount',      value: 'loan_amount'}
                    ]
                },
                {
                    xtype: 'spacer'
                },
                {
                    xtype: 'searchfield',
                    name: 'q',
                    placeholder: 'Search',
                    listeners : {
                        change: this.onFieldChange,
                        keyup: function(field, e) {
                            var key = e.browserEvent.keyCode;
                            
                            // blur field when user presses enter/search which will trigger a change if necessary.
                            if (key === 13) {
                                field.blur();
                            }
                        },
                        scope : this
                    }
                }
            ]
        });
            
        kiva.views.LoanFilter.superclass.initComponent.apply(this, arguments);
    },
    
    /**
     * This is called whenever any of the fields in the form are changed. It simply collects all of the 
     * values of the fields and fires the custom 'filter' event.
     */
    onFieldChange : function(comp, value) {
        this.fireEvent('filter', this.getValues(), this);
    }
});

Ext.reg('loanFilter', kiva.views.LoanFilter);