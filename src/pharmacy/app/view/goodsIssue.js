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
        ui: 'raxa-orange-small',
        x: 500
    },
    {
        xtype: 'button',
        width: 60,
        text: 'Submit',
        action: 'submitIssue',
        ui: 'raxa-aqua-small',
        x: 600
    }]
});