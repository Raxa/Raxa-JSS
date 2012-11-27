/*
 * This screen shows a list of patients on the left side,
 * with a button to sort them. The right side shows available
 * doctors, with an assign button on top to give a patient to
 * a doctor.
 */
Ext.define("RaxaEmr.Admin.view.LocationView", {
	xtype: 'locationView',
	extend: 'Ext.List',
    id: 'locationView',
    config: {
        store: 'Locations',
        itemTpl: '{nestedName}',
        centered: true,
        modal: true,
        hideOnMaskTap: true,
        hidden: true,
        // Set the width and height of the panel
        width: 500,
        height: 310,
        items: [{
            xtype: 'titlebar',
            itemId: 'locationsTitle',
            docked: 'top',
            title: "Locations",
            items: [{
                xtype: 'button',
                text: "New Location",
                itemId: 'newLocation',
                action: 'newLocation',
                align: 'left'
            }
            ]
        }]
    }
});

