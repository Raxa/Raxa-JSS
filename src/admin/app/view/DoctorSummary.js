Ext.define('RaxaEmr.Admin.view.DoctorSummary', {
    extend: 'Ext.Panel',
    id: 'doctorSummary',
    config: {
        centered: true,
        modal: true,
        hideOnMaskTap: true,
        hidden: false,
        // Set the width and height of the panel
        width: 400,
        height: 700,
        layout: 'fit',
        scrollable: true,
        items: [{
                xtype: 'list',
                height: 226,
                id: 'assignedPatientList',
                itemTpl: ['<div>{name}</div>']
                
    },{
        xtype: 'button',
        text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.DoctorSummary.rem_all'),
        id: 'removeAllPatientsButton',
        width: 390,
        height: 50,
        docked: 'top'
        
    },{
        xtype: 'button',
        text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.DoctorSummary.remove'),
        id: 'removeButton',
        width: 390,
        height: 50,
        docked: 'top',
        disabled: 'true'
    }]
    }
});