// wrap in closure to avoid global vars.
(function() {

Ext.regModel('Cars', {
    fields: [
        {name: 'text', type: 'string'}
    ]
});


var txtFld = new Ext.form.Text({
    label: 'Name'
});

var calculateDesiredWidth = function() {
    var viewWidth = Ext.Element.getViewportWidth(),
        desiredWidth = Math.min(viewWidth, 400) - 10;

    return desiredWidth;
};


var editPnl = new Ext.Panel({
    floating: true,
    centered: true,
    modal: true,
    width: calculateDesiredWidth(),

    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        title: 'Editing Item'
    },{
        dock: 'bottom',
        xtype: 'toolbar',
        items: [{
            text: 'Cancel',
            handler: function() {
                editPnl.hide();
            }
        },{
            xtype: 'spacer'
        },{
            text: 'Change',
            ui: 'action',
            handler: function() {
                var activeList = demos.NestedList.getActiveItem(),
                    record     = activeList.getSelectedRecords()[0];
                record.set('text', txtFld.getValue());

                // Workaround: selection *should* be maintained.
                activeList.getSelectionModel().select(record);

                editPnl.hide();
            }
        }]
    }],
    items: [{
        xtype: 'form',
        items: [{
            xtype: 'fieldset',
            items: [txtFld]
        }]
    }]
});

Ext.EventManager.onOrientationChange(function() {
    editPnl.setWidth(calculateDesiredWidth());
});

var editBtn = new Ext.Button({
    text: 'Edit',
    disabled: true,
    handler: function() {
        editPnl.show();

        var activeList = demos.NestedList.getActiveItem(),
            record     = activeList.getSelectedRecords()[0];

        txtFld.setValue(record.get('text'));
    }
});


var store = new Ext.data.TreeStore({
    model: 'Cars',
    proxy: {
        type: 'ajax',
        url: 'carregions.json',
        reader: {
            type: 'tree',
            root: 'items'
        }
    }
});

demos.NestedList = new Ext.NestedList({
    plugins: [new Ext.LeafSelectedPlugin()],
    toolbar: {
        items: [{xtype: 'spacer'}, editBtn]
    },
    store: store
});

// leafselected event is provided by the LeafSelectedPlugin.js
demos.NestedList.on('leafselected', function(enabled) {
    editBtn.setDisabled(!enabled);
});



})();