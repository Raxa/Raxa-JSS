Ext.define('RaxaEmr.Pharmacy.view.goodsIssue', {
    extend: 'Ext.container.Container',
    id: '.goodsIssue',
    autoScroll: true,
    alias: 'widget.goodsIssue',
    items:[{
        xtype: 'goodsIssueText',
        x : 110
    },{
        xtype: 'goodsIssueGrid',
        x : 110
    },{
        xtype: 'button',
        text: 'Cancel',
        action: 'cancelIssue',
        x: 500
    },
    {
        xtype: 'button',
        id: 'submitIssueButton',
        width: 60,
        text: 'Submit',
        action: 'submitIssue',
        x: 600
    }]
});