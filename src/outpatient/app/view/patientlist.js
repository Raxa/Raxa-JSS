Ext.define('RaxaEmr.Outpatient.view.patientlist', {
    extend: 'Ext.List',
    xtype: 'patientlist',

    config: {
        title: 'Medical Records',
        cls: 'x-contacts',

        store: 'patientlist',
        itemTpl: ['<div class="headshot" style="background-image:url(resources/images/headshots/pic.gif);"></div>', '<div style="float:left;width:30%;">', '{firstName}{lastName}', '<span>From : {city}, {state}</span>', '<span>ID : {id}</span>', '</div>', '<div style="float:left;width:30%;">', '<span>Disease : {disease}</span>', '<span>Age : {age}</span>', '</div>', '<div style="float:right;width:30%;">', '<span>{nameofdoc}</span>', '<span>Last Visit : {lastvisit}</span>', '<span>No. of Visits : {noofvisits}</span>', '</div>'].join('')
    }
});