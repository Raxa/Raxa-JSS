/**
 * @class Geo.views.BillSummary
 * @extends Ext.Panel
 *
 * Shows the BillSummary details for a particular bill.
 */
Geo.views.BillSummary = Ext.extend(Ext.Panel, {
    scroll: 'vertical',
    html: "Loading...",
    styleHtmlContent: true,
    initComponent: function() {
        this.tpl = Ext.XTemplate.from('billsummary');
        Geo.views.BillSummary.superclass.initComponent.call(this);
    },
    
    /**
     * Get the billSummary and update the contents of the panel.
     */
    getBill: function(bill) {        
        Geo.CongressService.getBillSummary({
            bill: bill
        }, this.onBillSummaryResponse, this);
    },
    
    // private
    onBillSummaryResponse: function(billSummary) {
        if (Ext.isArray(billSummary.Paragraph)) {
            this.update(billSummary);
        } else {
            this.update('No Bill Summary Available');
        }
        
    }
});