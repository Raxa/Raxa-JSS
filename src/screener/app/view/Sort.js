/**
 * This overlay allows the user to choose whether
 * to sort by name or FIFO id
 */
Ext.define("Screener.view.Sort", {
    requires: ['Ext.field.Text', 'Ext.field.Number'],
    extend: 'Ext.Panel',
    xtype: 'sortPanel',
    config: {
        centered: true,
        //grey everything else out when open, otherwise keep hidden
        modal: true,
        hideOnMaskTap: true,
        hidden: true,
        padding: 30,
        items: [{
            xtype: 'button',
            id: 'sortByNameButton',
            text: 'Sort by Name',
            ui: 'round'
        }, {
            xtype: 'button',
            id: 'sortByFIFOButton',
            text: 'Sort by FIFO',
            ui: 'round'
        }, {
            xtype: 'button',
            id: 'sortByBMIButton',
            text: 'Sort By BMI',
            ui: 'round'
        }]
    },
    saveForm: function () {
        return this.getValues();
    }

});