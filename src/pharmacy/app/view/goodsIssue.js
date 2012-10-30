Ext.define('RaxaEmr.Pharmacy.view.goodsIssue', {
    extend: 'Ext.panel.Panel',
    id: '.goodsIssue',
    autoScroll: true,
    alias: 'widget.goodsIssue',
    title: 'Orders >> Send Drugs',
    items:[{
        margin: '10 0 0 0',
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