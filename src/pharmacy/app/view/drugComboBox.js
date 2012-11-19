Ext.define('RaxaEmr.Pharmacy.view.drugComboBox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.drugComboBox',
    editable: true,
    autoSelect: false,
    store: 'allDrugs',
    displayField: 'text',
    enableKeyEvents: true,
    disableKeyFilter: true,
    queryMode: 'local',
//               hideTrigger : true,
    forceSelection: false,
    listeners: {
        focus: function (comboField) {
            this.store.clearFilter(true);
            comboField.expand();
            console.log(Ext.dom.Element.select(".x-boundlist-list-ct").first());
            //Ext.DomHelper.destroy
//            if(Ext.get('addNewDrug') === null){
//                Ext.create("<div id='addNewDrug'><img src='../resources/img/add.png' align='right'/><align='right>New</div>");
//            }
            Ext.DomHelper.append(Ext.dom.Element.select(".x-boundlist-list-ct").first(), "<div id='addNewDrug'><img src='../resources/img/add.png' align='right'/><align='right>New</div>");
            var el = Ext.get('addNewDrug');
            el.addListener('click', function() {
                Ext.getCmp('addDrug').show();
            });
        },
        keyup: function (comboField, key) {
            console.log(key.getKey());
            if(key.getKey() === KEY.DELETE){

            }
        },
        keypress: function (comboField, key) {
            this.store.clearFilter(true);
            var query = (comboField.rawValue + String.fromCharCode(key.getKey())).toLowerCase();
            console.log(query);
            this.store.filterBy(function(record, id) {
                return record.data.name.toLowerCase().indexOf(query)!==-1 ||
                    record.data.shortName.toLowerCase().indexOf(query)!==-1 ||
                    record.data.brandName.toLowerCase().indexOf(query)!==-1;
            });
            console.log(this.store.count());
            comboField.expand();
        },
        beforequery: function(queryEvent) {
            queryEvent.combo.onLoad();
            // prevent doQuery from firing and clearing out my filter.
            return false;
        }
    }
});