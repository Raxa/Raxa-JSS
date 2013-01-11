/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('RaxaEmr.Pharmacy.view.patientAssignedDrugs',{
    extend: 'Ext.container.Container',
    alias: 'widget.patientAssignedDrugs',
    autoScroll: true,
    id: 'patientPrescibedDrugs',
    height: 480,
    width: 750,
    items:[{
        xtype : 'prescribedDrugs',
        features: [Ext.create('Ext.grid.feature.Grouping',{
            startCollapsed: true,
            groupHeaderTpl: 
            [
            '{name} ',
            '{[this.formatName(values)]}',
            {
                formatName: function(values) {
                }
            }
            ]
        })]
    }]
});
