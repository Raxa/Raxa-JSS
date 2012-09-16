Ext.define('RaxaEmr.Pharmacy.view.DrugDetails', {
    extend: 'Ext.container.Container',
    id: 'drugDetails',
    autoScroll: true,
    alias: 'widget.drugDetails',
    layout: 'vbox',
    margin: '0 0 0 110',
    items:[
    {
        xtype: 'drugDetailsText'
    },{
        xtype: 'drugDetailsGrid'
    },{
        xtype: 'button',
        text: 'Back',
        action: 'backFromDrugDetails',
        ui: 'raxa-orange-small'
    }],
    //initializing the first two components, drug details text and drug details grid by filling in a drug's details
    initForDrug: function(drugName){
        this.items.items[0].initForDrug(drugName);
        this.items.items[1].initForDrug(drugName);
    }
});
