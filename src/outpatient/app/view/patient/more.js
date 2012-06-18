Ext.define('RaxaEmr.Outpatient.view.patient.more', {
    extend: 'Ext.Container',
    xtype: 'patientlist-show',

    config: {
        title: 'Information',
        baseCls: 'x-show-contact',
        layout: 'vbox',

        items: [{
            id: 'content',
            tpl: ['<div class="top">', '<div class="headshot" style="background-image:url(resources/images/headshots/pic.gif);"></div>', '<div class="name">{firstName}<span>ID : {id}</span></div>', '</div>'].join('')
        }],

        record: null
    },

    updateRecord: function (newRecord) {
        if (newRecord) {
            this.down('#content').setData(newRecord.data);
        }
    }
});