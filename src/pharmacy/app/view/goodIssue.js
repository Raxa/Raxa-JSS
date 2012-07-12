Ext.define('RaxaEmr.Pharmacy.view.goodIssue', {
    extend: 'Ext.container.Container',
    id: '.goodIssue',
    autoScroll: true,
    alias: 'widget.goodIssue',
    items:[{
        xtype: 'goodIssueText',
        x : 400
    },{
        xtype: 'goodIssuePop',
        x : 400
    }]
});