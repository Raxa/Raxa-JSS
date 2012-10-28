Ext.define('RaxaEmr.Pharmacy.view.goodsIssue', {
    extend: 'Ext.container.Container',
    id: '.goodsIssue',
    autoScroll: true,
    alias: 'widget.goodsIssue',
    items:[{
        xtype: 'goodsIssueText',
    },{
        xtype: 'goodsIssueGrid',
    },{
        xtype: 'button',
        text: 'Cancel',
        action: 'cancelIssue',
    },
    {
        xtype: 'button',
        id: 'submitIssueButton',
        text: 'Submit',
        action: 'submitIssue',
    }]
});