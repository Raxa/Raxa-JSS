Ext.Loader.setConfig({
    enabled: true
});
Ext.Loader.setPath('Ext.ux', '../lib/extjs/examples/ux');

Ext.require(['Ext.selection.CellModel', 'Ext.tab.*', 'Ext.grid.*', 'Ext.data.*', 'Ext.util.*', 'Ext.state.*', 'Ext.form.*', 'Ext.ux.CheckColumn']);

Ext.onReady(function () {

    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'side';
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));


    var tabs = Ext.createWidget('viewport', {
        renderTo: Ext.getBody(),
        layout: {
            align: 'stretch',
            pack: 'center',
            type: 'hbox'
        },
        items: [mainPanel]
    });


    var c1 = Ext.getCmp('noeditemergency');
    var c2 = Ext.getCmp('noeditpostemergency');
    var c3 = Ext.getCmp('noeditnoemergency');
    var c4 = Ext.getCmp('noeditpostnoemergency');

    if (c1.checked == true) c4.setVisible(false);

    if (c3.checked == true) c2.setVisible(false);

});