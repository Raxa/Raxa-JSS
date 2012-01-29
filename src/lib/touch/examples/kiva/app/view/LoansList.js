/**
 * @class kiva.views.List
 * @extends Ext.List
 */
Ext.define('Kiva.view.LoansList', {
    extend: 'Ext.DataView',
    xtype : 'loanslist',
    requires: [
        'Kiva.view.LoansListItem'
    ],

    config: {
        ui   : 'loans',
        store: 'Loans',
        useComponents: true,
        defaultType: 'loanslistitem',
        deselectOnContainerClick: false
    },

    /**
     * Used so the "sorry something went wrong" message doesn't appear on first load
     * @private
     */
    refreshed: false,

    onLoad: function() {
        var me = this,
            store = me.getStore();

        me.callParent(arguments);

        if (me.refreshed && store.getCount() === 0) {
            me.setMasked({
                indicator: false,
                message: 'Sorry, KIVA is having issues right now.'
            });
        }

        me.refreshed = true;
    }
});
