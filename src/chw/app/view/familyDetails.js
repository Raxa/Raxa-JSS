Ext.define('chw.view.familyDetails', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.familyDetails',
    requires: 'chw.view.userToolbar',
    config: {
        height: '100%',
        ui: 'neutral',
        items: [{
            xtype: 'titlebar',
            title: 'Patel',
            id: 'family_title',
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: 'Back',
                listeners: {
                    tap: function () {
                        helper.doBack()
                    }
                }
            }]
        }, {
            xtype: 'container',
            scrollable: true,
            title: 'Summary',
            items: [
            {
                xtype: 'label',
                html: '<i><p style="text-align: center;">Description</p></i>'
            },
            {
                xtype: 'container',
                layout: {
                    pack: 'center',
                    type: 'hbox'
                },
                scrollable: false,
                items: [
                {
                    xtype: 'image',
                    height: 201,
                    src: 'resources/home.png',
                    flex: 1
                },
                {
                    xtype: 'container',
                    margin: 5,
                    flex: 1,
                    items: [
                    {
                        xtype: 'container',
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                        {
                            xtype: 'label',
                            html: '<div style="font-size:13px;"><b>Family</b>:</div>',
                            flex: 1
                        },
                        {
                            xtype: 'label',
                            itemId: 'familyNameLabel',
                            html: '<div style="font-size:13px;">Patel</div>',
                            flex: 1
                        }
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                        {
                            xtype: 'label',
                            html: '<div style="font-size:13px;"><b>Address</b>:</div>',
                            flex: 1
                        },
                        {
                            xtype: 'label',
                            itemId: 'familyAddress',
                            html: '<div style="font-size:13px;">Hogwarts</div>',
                            flex: 1
                        }
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                        {
                            xtype: 'label',
                            html: '<div style="font-size:13px;"><b>Members</b>:</div>',
                            flex: 1
                        },
                        {
                            xtype: 'label',
                            itemId: 'familyMemberNumber',
                            html: '<div style="font-size:13px;">4</div>',
                            flex: 1
                        }
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                        {
                            xtype: 'label',
                            html: '<div style="font-size:13px;"><b>Children</b>:</div>',
                            flex: 1
                        },
                        {
                            xtype: 'label',
                            itemId: 'familyChildrenNumber',
                            html: '<div style="font-size:13px;">2</div>',
                            flex: 1
                        }
                        ]
                    },
                    {
                        xtype: 'container',
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                        {
                            xtype: 'label',
                            html: '<div style="font-size:13px;"><b>Last Visit</b>:</div>',
                            flex: 1
                        },
                        {
                            xtype: 'label',
                            itemId: 'lastVisit',
                            html: '<div style="font-size:13px;">10/7/12</div>',
                            flex: 1
                        }
                        ]
                    }
                    ]
                }
                ]
            },{
                xtype: 'map',
                height: '100%',
                items: [
                {
                    xtype: 'list',
                    id: 'familyMembersList',
                    itemTpl: [
                    '<div>List Item {string}</div>'
                    ]
                }
                ]
            },
            {
                xtype: 'button',
                ui: 'action-round',
                text: 'Start Visit'
            }
            
            ]
        },
        {
            xtype: 'container',
            layout: {
                type: 'fit'
            },
            title: 'Map',
            items: [{
                xtype: 'map',
                height: '100%'
            }]
        }, {
            xclass: 'chw.view.userToolbar'
        }
        ]
    }

});