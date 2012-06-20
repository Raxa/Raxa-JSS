Ext.define('RaxaEmr.Outpatient.view.patient.labresulthistorypanel', {
    extend: 'Ext.Container',
    xtype: 'labresulthistorypanel',
    requires: ['RaxaEmr.Outpatient.view.patient.labresulthistory'],
    config: {
        title: 'Lab Results History',
        cls: 'x-show-contact',
        layout: 'vbox',
        items: [{
            id: 'labcontent',
            tpl: ['<div class="top">', '<div style="float:left;width:50%;">', '<div class="headshot" style="float:left;background-image:url(resources/images/headshots/pic.gif);">', '</div>', '<div class="name" style="float:left;width:80%;">', '{firstName} {lastName}', '</br>', '<span>From : {city}, {state}</span>', '</br>', '</div>', '</div>', '<div style="float:left;width:50%;">', '<div class="name_small" style="float:left;width:50%;">', '<span> Age: {age} </span>', '<span>ID : {id}</span>', '</br>', '</div>', '<div class="name_right" style="float:left;width:50%;">', '<span> {nameofdoc} </span>', '<span></span>', '</div>', '</div>', '</div>'].join('')
        }, {
            xtype: 'Lab-Result-History',
            flex: 1
        }],
        record: null
    },

    updateRecord: function (newRecord) {
        if (newRecord) {
            this.down('#labcontent').setData(newRecord.data);
        }
    }
});