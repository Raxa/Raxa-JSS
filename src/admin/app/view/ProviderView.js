/*
 * This screen shows a list of patients on the left side,
 * with a button to sort them. The right side shows available
 * doctors, with an assign button on top to give a patient to
 * a doctor.
 */
Ext.define("RaxaEmr.Admin.view.ProviderView", {
	xtype: 'providerView',
	extend: 'Ext.List',
    id: 'providerView',
    config: {
        store: 'Providers',
        itemTpl: '{person.display}',
        centered: true,
        modal: true,
        hideOnMaskTap: true,
        hidden: true,
        // Set the width and height of the panel
        width: 500,
        height: 310,
        items: [{
            xtype: 'titlebar',
            itemId: 'patientsWaiting',
            docked: 'top',
            title: "Providers",
            items: [{
                xtype: 'button',
                text: "New Provider",
                itemId: 'newProvider',
                action: 'newProvider',
                align: 'left'
            }
            ]
        }]
    }
});

