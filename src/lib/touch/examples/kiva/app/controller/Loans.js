/**
 * @class Kiva.controller.Loans
 * @extends Ext.app.Controller
 *
 * The only controller in this simple application - this simply sets up the fullscreen viewport panel
 * and renders a detailed overlay whenever a Loan is tapped on.
 */
Ext.define('Kiva.controller.Loans', {
    extend: 'Ext.app.Controller',

    config: {
        profile: Ext.os.deviceType.toLowerCase()
    },

    views : [
        'Main',
        'Detail',
        'LoanFilter'
    ],

    stores: [
        'Loans'
    ],

    refs: [
        {
            ref     : 'main',
            selector: 'mainview',
            autoCreate: true,
            xtype   : 'mainview'
        },
        {
            ref     : 'detail',
            selector: 'detail'
        },
        {
            ref : 'loansList',
            selector: 'loanslist'
        },
        {
            ref: 'loanFilter',
            selector: 'loanfilter'
        },
        {
            ref: 'refreshButton',
            selector: 'button[iconCls=refresh]'
        }
    ],

    init: function() {
        this.getMainView().create();

        this.control({
            'loanslist': {
                select: this.onListTap
            },
            'detail': {
                hideanimationstart: this.onDetailHideAnimationStart
            },
            'searchfield': {
                change: function(field) {
                    this.doFilter({
                        q: field.getValue()
                    });
                }
            },
            'selectfield': {
                change: function(field) {
                    var config = {};
                    config[field.getName()] = field.getValue();
                    this.doFilter(config);
                }
            },
            'button[iconCls=refresh]': {
                tap: this.onRefreshButtonTap
            }
        });

        this.getLoansStore().on({
            scope: this,

            beforeload: this.onBeforeStoreLoad,
            load      : this.onStoreLoad
        });
    },

    onListTap: function(list, loan) {
        if (!this.getDetail()) {
            this.getDetailView().create();
        }

        var view = this.getDetail();
        view.setLoan(loan);

        if (this.getProfile() == "phone") {
            view.setWidth(null);
            view.setHeight('85%');
            view.setTop(null);
            view.setLeft(0);
        }

        view.show();
    },

    onDetailHideAnimationStart: function() {
        this.getLoansList().deselectAll();
    },

    onRefreshButtonTap: function() {
        this.getLoansStore().load();
    },

    onBeforeStoreLoad: function() {
        this.getRefreshButton().setDisabled(true);
    },

    onStoreLoad: function() {
        this.getRefreshButton().setDisabled(false);
    },

    /**
     * @private
     * Listener for the 'filter' event fired by the listView set up in the 'list' action. This simply
     * gets the form values that the user wants to filter on and tells the Store to filter using them.
     */
    doFilter: function(values) {
        var store   = this.getLoansStore(),
            filters = [];

        Ext.iterate(values, function(field, value) {
            filters.push(new Ext.util.Filter({
                property: field,
                value   : value
            }));
        });

        store.clearFilter();
        store.filter(filters);
    }
});
