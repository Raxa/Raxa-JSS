Ext.define('RaxaEmr.Screener.view.MapDocPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mapdocpanel',
    border: 0,
    bodyPadding: 10,
    requires: ['RaxaEmr.Screener.view.MapDocsGrid', 'RaxaEmr.Screener.view.MapPatientsGrid', ],
    initComponent: function () {
        border: 0,
        this.items = {
            border: 0,
            padding: 10,
            items: [{
                xtype: 'panel',
                layout: {
                    type: 'column'
                },
                title: 'Map Doctors with Unassigned Patients',
                items: [{
                    xtype: 'mappatientsgrid'
                }, {
                    xtype: 'mapdocsgrid'
                }],
                dockedItems: [{
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'bottom',
                    items: [{
                        xtype: 'button',
                        text: 'Assign',
                        handler: function () {
                            var patientgrid = Ext.getCmp('mappatientsgrid');
                            var pm = patientgrid.getSelectionModel();
                            patientgrid.getStore().remove(pm.getSelection());
                            var docgrid = Ext.getCmp('mapdocsgrid');
                            var dm = docgrid.getSelectionModel().getSelection();
                            var number = dm[0].get('noofpatients');
                            var newnumber = number + 1;
                            dm[0].set('noofpatients', newnumber);
                        }
                    }, {
                        xtype: 'tbfill'
                    }, {
                        xtype: 'button',
                        text: 'Cancel',
                        handler: function () {
                            var l = Ext.getCmp('mainregarea').getLayout();
                            l.setActiveItem(0); //redirect to home
                        }
                    }]
                }]
            }]
        };
        this.callParent();
    }
});