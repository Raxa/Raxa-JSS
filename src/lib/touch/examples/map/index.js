Ext.require([
    'Ext.Map',
    'Ext.Button',
    'Ext.SegmentedButton',
    'Ext.Panel',
    'Ext.Toolbar'
]);

Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {

        // The following is accomplished with the Google Map API
        var position = new google.maps.LatLng(37.44885, -122.158592),  //Sencha HQ

            infowindow = new google.maps.InfoWindow({
                content: 'Sencha HQ'
            }),

            //Tracking Marker Image
            image = new google.maps.MarkerImage(
                'point.png',
                new google.maps.Size(32, 31),
                new google.maps.Point(0, 0),
                new google.maps.Point(16, 31)
            ),

            shadow = new google.maps.MarkerImage(
                'shadow.png',
                new google.maps.Size(64, 52),
                new google.maps.Point(0, 0),
                new google.maps.Point(-5, 42)
            ),

            trackingButton = Ext.create('Ext.Button', {
                iconMask: true,
                iconCls: 'locate'
            }),

            trafficButton = Ext.create('Ext.Button', {
                iconMask: true,
                pressed: true,
                iconCls: 'maps'
            }),

            toolbar = Ext.create('Ext.Toolbar', {
                docked: 'top',
                ui: 'light',
                defaults: {
                    iconMask: true
                },
                items : [
                    {
                        position: position,
                        iconCls: 'home',
                        handler: function() {
                            //disable tracking
                            var newPressed = trafficButton.pressed ? [trafficButton] : [];
                            Ext.getCmp('segmented').setPressedButtons(newPressed);
                            mapdemo.getMap().panTo(this.position);
                        }
                    },
                    {
                        id: 'segmented',
                        xtype: 'segmentedbutton',
                        allowMultiple: true,
                        listeners: {
                            toggle: function(buttons, button, active) {
                                if (button == trafficButton) {
                                    mapdemo.getPlugins()[1].setHidden(!active);
                                }
                                else if (button == trackingButton) {
                                    var tracker = mapdemo.getPlugins()[0];
                                    tracker.setTrackSuspended(!active);
                                    tracker.getMarker().setVisible(active);
                                }
                            }
                        },
                        items: [
                            trackingButton, trafficButton
                        ]
                    }
                ]
            });

        var mapdemo = Ext.create('Ext.Map', {

            mapOptions : {
                center : new google.maps.LatLng(37.381592, -122.135672),  //nearby San Fran
                zoom : 12,
                mapTypeId : google.maps.MapTypeId.ROADMAP,
                navigationControl: true,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            },

            plugins : [
                new Ext.plugin.GMap.Tracker({
                    trackSuspended: true,   //suspend tracking initially
                    allowHighAccuracy: false,
                    marker: new google.maps.Marker({
                        position: position,
                        title: 'My Current Location',
                        shadow: shadow,
                        icon: image
                    })
                }),
                new Ext.plugin.GMap.Traffic()
            ],

            listeners: {
                maprender: function(comp, map) {
                    var marker = new google.maps.Marker({
                        position: position,
                        title : 'Sencha HQ',
                        map: map
                    });

                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(map, marker);
                    });

                    setTimeout(function() {
                        map.panTo(position);
                    }, 1000);
                }

            }
        });

        Ext.create('Ext.Panel', {
            fullscreen: true,
            layout: 'fit',
            items: [toolbar, mapdemo]
        });

    }
});