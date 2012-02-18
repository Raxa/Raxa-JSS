oreilly.views.LocationMap = Ext.extend(Ext.Panel, {
    coords: [37.788115, -122.402222],
    mapText: '',
    permLink: '',
    initComponent: function(){
        
        var position = new google.maps.LatLng(this.coords[0], this.coords[1]);
        
        this.dockedItems = [{
            xtype: 'toolbar',
            title: 'Location',
            items: [{xtype: 'spacer', flex: 1}, {
                ui: 'plain',
                iconCls: 'action',
                iconMask: true,
                scope: this,
                handler: function(){
                    
                    Ext.Msg.confirm('External Link', 'Open in Google Maps?', function(res){
                        if (res == 'yes') window.location = this.permLink;
                    }, this);
                }
            }]
        }]
        
        var infowindow = new google.maps.InfoWindow({
            content: this.mapText
        });
        
        this.map = new Ext.Map({
            mapOptions : {
                center : position,  //nearby San Fran
                zoom: 12,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            },
            listeners: {
                maprender : function(comp, map){
                    var marker = new google.maps.Marker({
                         position: position,
                         title : 'Sencha HQ',
                         map: map
                    });

                    infowindow.open(map, marker);

                    google.maps.event.addListener(marker, 'click', function() {
                         infowindow.open(map, marker);
                    });
                }
            }
        });
        
        this.items = this.map;
        
        oreilly.views.LocationMap.superclass.initComponent.call(this);
    }
});

Ext.reg('location', oreilly.views.LocationMap);