Ext.define('Laboratory.view.PaperEntry2', {
    extend: 'Ext.container.Container',
    alias: 'widget.PaperEntry2',
    autoScroll: true,
    activeItem: 0,

    layout: {
        type: 'absolute'
    },

    items: [{
        xtype: 'combobox',
        fieldLabel: 'Search Lab',
        x: 10,
        y: 30
    }, {
        xtype: 'textfield',
        width: 240,
        fieldLabel: '',
        emptyText: 'Enter the Lab order no.',
        x: 10,
        y: 110
    }, {
        xtype: 'textfield',
        width: 240,
        blankText: '',
        emptyText: 'Enter the Patient Registration Number',
        x: 10,
        y: 190
    }, {
        xtype: 'textfield',
        width: 280,
        fieldLabel: 'Provider\'s Name',
        hideEmptyLabel: false,
        labelAlign: 'top',
        blankText: '',
        emptyText: 'Enter Provider\'s Name',
        x: 10,
        y: 310
    }, {
        xtype: 'textfield',
        width: 140,
        fieldLabel: 'Patient\'s Name',
        labelAlign: 'top',
        labelWidth: 50,
        emptyText: 'First Name',
        x: 10,
        y: 260
    }, {
        xtype: 'textfield',
        width: 240,
        fieldLabel: '',
        hideEmptyLabel: false,
        emptyText: 'Last Name',
        x: 50,
        y: 280
    }, {
        xtype: 'button',
        height: 20,
        width: 50,
        text: 'Find',
        x: 260,
        y: 110
    }, {
        xtype: 'button',
        height: 20,
        width: 50,
        text: 'Find',
        x: 260,
        y: 190
    }, {
        xtype: 'button',
        height: 20,
        width: 50,
        text: 'Find',
        x: 10,
        y: 420
    }, {
        xtype: 'datefield',
        width: 130,
        fieldLabel: 'Lab orders from',
        labelAlign: 'top',
        x: 10,
        y: 360
    }, {
        xtype: 'datefield',
        width: 150,
        fieldLabel: 'to',
        hideEmptyLabel: false,
        labelWidth: 20,
        x: 150,
        y: 380
    }, {
        xtype: 'image',
        height: 40,
        width: 40,
        src: '../resources/img/OR.png',
        x: 100,
        y: 60
    }, {
        xtype: 'image',
        height: 40,
        width: 40,
        src: '../resources/img/OR.png',
        x: 100,
        y: 60
    }, {
        xtype: 'image',
        height: 40,
        width: 40,
        src: '../resources/img/OR.png',
        x: 100,
        y: 140
    }, {
        xtype: 'image',
        height: 40,
        width: 40,
        src: '../resources/img/OR.png',
        x: 100,
        y: 220
    }]

});
