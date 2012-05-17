Ext.define('RaxaEmr.Screener.view.DocListPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.doclistpanel',
    border: 0,
    bodyPadding: 10,
    requires: ['RaxaEmr.Screener.view.DocsListGrid', ],
    initComponent: function () {
        border: 0,
        this.items = {
            border: 0,
            padding: 10,
            items: [{
                xtype: 'docslistgrid'
            }]
        };
        this.callParent();
    }
});