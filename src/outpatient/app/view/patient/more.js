Ext.define('RaxaEmr.Outpatient.view.patient.more', {
    extend: 'Ext.Container',
    xtype: 'patientlist-show',
    requires: ['RaxaEmr.Outpatient.view.Grid', 'RaxaEmr.Outpatient.view.patient.work'],
    config: {
        title: 'Information',
        baseCls: 'x-show-contact',
        layout: 'vbox',

        items: [{
            id: 'content',
            tpl: ['<div class="top">', '<div style="float:left;width:50%;">', '<div class="headshot" style="float:left;background-image:url(resources/images/headshots/pic.gif);">', '</div>', '<div class="name" style="float:left;width:80%;">', '{firstName} {lastName}', '</br>', '<span>From : {city}, {state}</span>', '</br>', '</div>', '</div>', '<div style="float:left;width:50%;">', '<div class="name_small" style="float:left;width:50%;">', '<span> Age: {age} </span>', '<span>ID : {id}</span>', '</br>', '</div>', '<div class="name_right" style="float:left;width:50%;">', '<span> {nameofdoc} </span>', '<span></span>', '</div>', '</div>', '</div>'].join('')
        }, {
            xtype: 'grid-grid',
            height: 85,
            border: 10,
        }, {
            xtype: 'formpanel',
            height: 110,
            layout: {
                pack: 'center',
                type: 'hbox'
            },
            items: [{
                xtype: 'fieldset',
                height: 75,
                margin: '0 20 0 0',
                layout: {
                    type: 'hbox'
                },
                flex: 1,
                items: [{
                    xtype: 'textareafield',
                    label: 'Cheif Complaint',
                    flex: 1
                }]
            }, {
                xtype: 'fieldset',
                height: 75,
                layout: {
                    type: 'hbox'
                },
                flex: 1,
                items: [{
                    xtype: 'textareafield',
                    label: 'Notes',
                    flex: 1
                }]
            }]
        }, {
            xtype: 'work',
            flex: 2
        }],

        record: null
    },

    updateRecord: function (newRecord) {
        if (newRecord) {
            this.down('#content').setData(newRecord.data);
        }
    }
});