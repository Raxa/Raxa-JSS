Ext.define('RaxaEmr.Pharmacy.view.goodsIssue', {
    extend: 'Ext.panel.Panel',
    id: '.goodsIssue',
    autoScroll: true,
    alias: 'widget.goodsIssue',
    title: 'Orders >> Send Drugs',
    items:[{
        xtype: 'goodsIssueText'
    },{
        xtype: 'goodsIssueGrid'
    },{
        xtype: 'button',
        text: 'Cancel',
        action: 'cancelIssue',
        margin: 5
    },
    {
        xtype: 'button',
        id: 'submitIssueButton',
        text: 'Submit',
        action: 'submitIssue',
        margin: 5
    }]
});