Ext.define('chw.view.familyDetails', {
    extend: 'Ext.tab.Panel',
    requires: 'chw.view.userToolbar',
    config: {
        height: '100%',
        ui: 'neutral',
        items: [
        {
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
                    src: 'somesrc',
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
                            html: '<div style="font-size:13px;"><b>Village</b>:</div>',
                            flex: 1
                        },
                        {
                            xtype: 'label',
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
                            html: '<div style="font-size:13px;">10/7/12</div>',
                            flex: 1
                        }
                        ]
                    }
                    ]
                }
                ]
            },{
                xtype: 'container',
                items: [
                {
                    xtype: 'map',
                    height: 300
                }
                ]
            },
            
            ]
        },
        {
            xtype: 'container',
            title: 'Members',
            items: [
            {
                xtype: 'container',
                items: [
                {
                    xtype: 'list',
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
        }, {
            xclass: 'chw.view.userToolbar'
        }
        ]
    }

});