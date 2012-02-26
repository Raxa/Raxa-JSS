/**
 * @class Ext.Map
 * @extends Ext.Component
 *
 * <p>Wraps a Google Map in an Ext.Component.<br/>
 * http://code.google.com/apis/maps/documentation/v3/introduction.html</p>
 *
 * <p>To use this component you must include an additional JavaScript file from
 * Google:</p>
 * <pre><code>&lt;script type="text/javascript" src="http:&#47;&#47;maps.google.com/maps/api/js?sensor=true"&gt;&lt/script&gt;</code></pre>
 * 
 * <h2>Screenshot:</h2>
 *
 * {@img Ext.Map/screenshot.png Ext.Map screenshot}
 * 
 * <h2>Example code:</h2>
 * <pre><code>
var pnl = new Ext.Panel({
    fullscreen: true,
    items     : [
        {
            xtype             : 'map',
            useCurrentLocation: true
        }
    ]
});</code></pre>
 * @xtype map
 */
Ext.Map = Ext.extend(Ext.Component, {
    /**
     * @cfg {String} baseCls
     * The base CSS class to apply to the Maps's element (defaults to <code>'x-map'</code>).
     */
    baseCls: 'x-map',

    /**
     * @cfg {Boolean} useCurrentLocation
     * Pass in true to center the map based on the geolocation coordinates.
     */
    useCurrentLocation: false,
    
    monitorResize : true,

    /**
     * @cfg {Object} mapOptions
     * MapOptions as specified by the Google Documentation:
     * http://code.google.com/apis/maps/documentation/v3/reference.html
     */

    /**
     * @type {google.maps.Map}
     * The wrapped map.
     */
    map: null,

    /**
     * @type {Ext.util.GeoLocation}
     */
    geo: null,

    /**
     * @cfg {Boolean} maskMap
     * Masks the map (Defaults to false)
     */
    maskMap: false,
    /**
     * @cfg {Strng} maskMapCls
     * CSS class to add to the map when maskMap is set to true.
     */
    maskMapCls: 'x-mask-map',


    initComponent : function() {
        this.mapOptions = this.mapOptions || {};
        
        this.scroll = false;
        
        //<deprecated since="0.99">
        if (Ext.isDefined(this.getLocation)) {
            console.warn("SpinnerField: getLocation has been removed. Please use useCurrentLocation.");
            this.useCurrentLocation = this.getLocation;
        }
        //</deprecated>
        
        if(!(window.google || {}).maps){
            this.html = 'Google Maps API is required';   
        }
        else if (this.useCurrentLocation) {
            this.geo = this.geo || new Ext.util.GeoLocation({autoLoad: false});
            this.geo.on({
                locationupdate : this.onGeoUpdate,
                locationerror : this.onGeoError, 
                scope : this
            });
        }
        
        Ext.Map.superclass.initComponent.call(this);
                
        this.addEvents ( 
            /**
             * @event maprender
             * @param {Ext.Map} this
             * @param {google.maps.Map} map The rendered google.map.Map instance
             */     
            'maprender',
        
            /**
             * @event centerchange
             * @param {Ext.Map} this
             * @param {google.maps.Map} map The rendered google.map.Map instance
             * @param {google.maps.LatLong} center The current LatLng center of the map
             */     
            'centerchange',
            
            /**
             * @event typechange
             * @param {Ext.Map} this
             * @param {google.maps.Map} map The rendered google.map.Map instance
             * @param {Number} mapType The current display type of the map
             */     
            'typechange',
            
            /**
             * @event zoomchange
             * @param {Ext.Map} this
             * @param {google.maps.Map} map The rendered google.map.Map instance
             * @param {Number} zoomLevel The current zoom level of the map
             */     
            'zoomchange'
        );
        
        if (this.geo){
            this.on({
                activate: this.onUpdate,
                scope: this,
                single: true
            });
            this.geo.updateLocation();
        }
        
    },
    
    // @private    
    onRender : function(container, position) {
        Ext.Map.superclass.onRender.apply(this, arguments);
        this.el.setVisibilityMode(Ext.Element.OFFSETS);        
    },
    
     // @private
    afterRender : function() {
        Ext.Map.superclass.afterRender.apply(this, arguments);
        this.renderMap();
    },
    
    // @private
    onResize : function( w, h) {
        Ext.Map.superclass.onResize.apply(this, arguments);
        if (this.map) {
            google.maps.event.trigger(this.map, 'resize');
        }
    },
    
    afterComponentLayout : function() {
        if (this.maskMap && !this.mask) {
            this.el.mask(null, this.maskMapCls);
            this.mask = true;
        }
    },
    
    renderMap : function(){
        var me = this,
            gm = (window.google || {}).maps;
        
        if (gm) {
            if (Ext.is.iPad) {
                Ext.applyIf(me.mapOptions, {
                    navigationControlOptions: {
                        style: gm.NavigationControlStyle.ZOOM_PAN
                    }
                });
            }
                
            Ext.applyIf(me.mapOptions, {
                center: new gm.LatLng(37.381592, -122.135672), // Palo Alto
                zoom: 12,
                mapTypeId: gm.MapTypeId.ROADMAP
            });
            
            if (me.maskMap && !me.mask) {
                me.el.mask(null, this.maskMapCls);
                me.mask = true;
            }
    
            if (me.el && me.el.dom && me.el.dom.firstChild) {
                Ext.fly(me.el.dom.firstChild).remove();
            }
        
            if (me.map) {
                gm.event.clearInstanceListeners(me.map);
            }
            
            me.map = new gm.Map(me.el.dom, me.mapOptions);
            
            var event = gm.event;
            //Track zoomLevel and mapType changes
            event.addListener(me.map, 'zoom_changed', Ext.createDelegate(me.onZoom, me));
            event.addListener(me.map, 'maptypeid_changed', Ext.createDelegate(me.onTypeChange, me));
            event.addListener(me.map, 'center_changed', Ext.createDelegate(me.onCenterChange, me));
            
            me.fireEvent('maprender', me, me.map);
        }
        
    },

    onGeoUpdate : function(coords) {
        var center;
        if (coords) {
            center = this.mapOptions.center = new google.maps.LatLng(coords.latitude, coords.longitude);
        }
        
        if (this.rendered) {
            this.update(center);
        }
        else {
            this.on('activate', this.onUpdate, this, {single: true, data: center});
        }
    },
    
    onGeoError : function(geo){
          
    },

    onUpdate : function(map, e, options) {
        this.update((options || {}).data);
    },
    
    
    /**
     * Moves the map center to the designated coordinates hash of the form:
<code><pre>
 { latitude : 37.381592,
  longitude : -122.135672
  }</pre></code>
     * or a google.maps.LatLng object representing to the target location. 
     * @param {Object/google.maps.LatLng} coordinates Object representing the desired Latitude and
     * longitude upon which to center the map
     */
    update : function(coordinates) {
        var me = this, 
            gm = (window.google || {}).maps;

        if (gm) {
            coordinates = coordinates || me.coords || new gm.LatLng(37.381592, -122.135672);
            
            if (coordinates && !(coordinates instanceof gm.LatLng) && 'longitude' in coordinates) {
                coordinates = new gm.LatLng(coordinates.latitude, coordinates.longitude);
            }
            
            if (!me.hidden && me.rendered) {
                me.map || me.renderMap();
                if (me.map && coordinates instanceof gm.LatLng) {
                   me.map.panTo(coordinates);
                }
            }
            else {
                me.on('activate', me.onUpdate, me, {single: true, data: coordinates});
            }
        }
    },
    
    // @private
    onZoom  : function() {
        this.mapOptions.zoom = (this.map && this.map.getZoom 
            ? this.map.getZoom() 
            : this.mapOptions.zoom) || 10 ;
            
        this.fireEvent('zoomchange', this, this.map, this.mapOptions.zoom);
    },
    
    // @private
    onTypeChange  : function() {
        this.mapOptions.mapTypeId = this.map && this.map.getMapTypeId 
            ? this.map.getMapTypeId() 
            : this.mapOptions.mapTypeId;
        
        this.fireEvent('typechange', this, this.map, this.mapOptions.mapTypeId);
    },

    // @private
    onCenterChange : function(){
       this.mapOptions.center = this.map && this.map.getCenter 
            ? this.map.getCenter() 
            : this.mapOptions.center;
        
       this.fireEvent('centerchange', this, this.map, this.mapOptions.center);
       
    },
    
    getState : function(){
        return this.mapOptions;  
    },
    
    // @private    
    onDestroy : function() {
        Ext.destroy(this.geo);
        if (this.maskMap && this.mask) {
            this.el.unmask();
        }
        if (this.map && (window.google || {}).maps) {
            google.maps.event.clearInstanceListeners(this.map);
        }
        Ext.Map.superclass.onDestroy.call(this);
    }
});

Ext.reg('map', Ext.Map);