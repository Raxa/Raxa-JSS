Ext.define('Kitchensink.view.EditorPanel', {
    extend: 'Ext.form.Panel',
    id: 'editorPanel',
    config: {
        modal: true,
        hideOnMaskTap: false,
        centered: true,
        height: 200,
        width: 300,
        items: [{
            xtype: 'fieldset',
            items: [{
                xtype: 'textfield',
                name: 'text',
                label: 'Name'
            }]
        }, {
            docked: 'top',
            xtype: 'toolbar',
            title: 'Edit Item'
        }, {
            docked: 'bottom',
            xtype: 'toolbar',
            items: [{
                text: 'Cancel',
                handler: function() {
                    Ext.getCmp('editorPanel').hide();
                }
            }, {
                xtype: 'spacer'
            }, {
                text: 'Change',
                ui: 'action',
                handler: function() {
                    var formPanel = Ext.getCmp('editorPanel'),
                        formRecord = formPanel.getRecord();
                    if (formRecord) {
                        formRecord.set(formPanel.getValues());
                        formRecord.commit();
                    }
                    formPanel.hide();
                }
            }]
        }]
    }
});
