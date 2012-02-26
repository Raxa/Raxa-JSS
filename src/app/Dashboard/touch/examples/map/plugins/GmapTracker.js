
Ext.ns('Ext.plugin.GMap');

Ext.plugin.GMap.Tracker = Ext.extend(Ext.util.Observable, {
   
    /**
     * @cfg {Boolean} autoUpdate
     * When set to true, continually monitor the location of the device
     * and fire update events. (Defaults to true.)
     */
    autoUpdate: true,
    
    ptype : 'gmaptracker',
    
    /**
     * @property trackSuspended
     * @type Boolean
     */
    trackSuspended : false,
    
    /**
     * @cfg {Boolean} highAccuracy <tt>true</tt> to enable highAccuracy position fixes (often required for
     * simulators) To conserve battery life, this value defaults to false.
     */
    highAccuracy : false,
    
    /**
     * @cfg {Boolean} updateInterval
     * The autoUpdate polling interval. (Defaults to 90000.)
     */
    updateInterval : 90000,

    /**
     * @constructor
     * @param config {Object}
     */
    constructor : function(config) {
        Ext.apply(this, config || {});
        
        if (Ext.supports.GeoLocation) {
            this.provider = this.provider || 
                (navigator.geolocation ? navigator.geolocation : 
                (window.google || {}).gears ? google.gears.factory.create('beta.geolocation') : null);            
        }
        
        this.addEvents(
            /**
             * @event beforeupdate
             * @param {Coordinates} coord A coordinate object as defined by the coords property. Will return false if geolocation is disabled or denied access.
             * @param {Ext.util.GeoLocation} this
             */
        
            'beforeupdate',
            
            /**
	         * @event update
	         * @param {Cooridinates} coord A coordinate object as defined by the coords property. Will return false if geolocation is disabled or denied access.
	         * @param {Ext.util.GeoLocation} this
	         */    
            'update',
           
            /**
             * @event exception Raised when an error occurs while attempting a positional fix
             * @param {Ext.util.GeoLocation} this
             * @param {Error/String} error
             */
            'exception'
        );
        
        Ext.plugin.GMap.Tracker.superclass.constructor.call(this);

        this.onError = Ext.createDelegate(this.onError, this);
        this.onPosition = Ext.createDelegate(this.onPosition, this);
        this.updateLocation = Ext.createDelegate(this.updateLocation, this);

        if (this.autoUpdate) {
            this.startUpdates();
        }
    },
    
    /**
     * Initialize the plugin, binding to the host Ext.Map instance
     * @param {Ext.Map} host
     */
    init : function(host){
       if (host && typeof host.renderMap == 'function') {
            this.host = host;
            host.geo = this;
            
            Ext.apply(host, {
                suspendUpdates : Ext.createDelegate(this.suspendUpdates, this),
                resumeUpdates  : Ext.createDelegate(this.resumeUpdates, this),
                setHighAccuracy  : Ext.createDelegate(this.setHighAccuracy, this)
            });
            
            host.on({
                maprender : this.onMapRender,
                resize    : this.onResized,
                scope     : this
            });
           
            this.on('update', this.updateTrack, this);
       }
    },
    
    /**
     * Toggles the highAccuracy setting for subsequent position fixes
     * @param {Boolean} accuracy <tt>true</tt> to enable a high-accuracy position fix.
     * @return {Ext.plugin.GMap.Tracker} this
     */
    setHighAccuracy : function(accuracy) {
        var h = !!this.highAccuracy;
        this.highAccuracy = !!accuracy;
        if ( (h !== this.highAccuracy) && this.watchId) {
            this.provider.clearWatch(this.watchId);
            this.startUpdates();
        }
        return this;
    },
    
    // @private      
    startUpdates : function() {
        if (Ext.supports.GeoLocation && 'watchPosition' in this.provider) {
            this.watchId = this.provider.watchPosition(
                this.onPosition, 
                this.onError,
                 {
                    allowHighAccuracy: !!this.highAccuracy,
                    maximumAge : this.updateInterval || 60000,
                    gearsLocationProviderUrls: null
                 }
              );
        }
        else { 
            this.updateLocation();
            this.pollId = this.updateInterval ? setInterval( this.updateLocation , this.updateInterval ) : null;
        }
        return this;
    },
    
    // @private    
    updateTrack : function(tracker, coords) {
        this.getMarker().setPosition(coords);
        this.trackSuspended || this.host.update(coords);
    },
    
    suspendUpdates : function() {
        this.trackSuspended = true;
    },
    
    resumeUpdates : function() {
        this.trackSuspended = false;
        this.updateTrack(this, this.coords);
    },
    
    // @private    
    onMapRender : function(host, map) {
        var marker = this.getMarker();
        if (marker) {
            marker.setMap(map);
        }
    },
    
    // @private    
    onResized : function( host, w, h) {
        if (host.map) {
            this.trackSuspended || this.host.update(this.coords);
        }
    },
    
    // @private
    getMarker : function() {
        var gm = (window.google || {}).maps;
        if (gm && this.host && !this.marker) {
            this.marker = new gm.Marker({
                position : this.coords || this.host.mapOptions.center
            });
        }
        return this.marker;
    },

    /**
     * Returns cached coordinates, and updates if there are no cached coords yet.
     */
    getLocation : function(callback, scope) {
        var me = this;
        if (Ext.supports.GeoLocation && !me.coords) {
            me.updateLocation(callback, scope);
        }
        else if (callback) {
            setTimeout(function() {
                callback.call(scope || me, Ext.supports.GeoLocation ? me.coords : null, me);
            }, 0);
        }
    },

    /**
     * Forces an update of the coords.
     */
    updateLocation : function(callback, scope) {
        var me = this;
        if (Ext.supports.GeoLocation) {
            me.fireEvent('beforeupdate', me);
            me.provider.getCurrentPosition(
                function(position) {
                    me.onPosition(position);
                    if (callback) {
                        callback.call(scope || me, me.coords, me);
                    }
                }, 
                me.onError,
                {
                    allowHighAccuracy: !!me.highAccuracy,
                    maximumAge : me.updateInterval || 60000,
                    gearsLocationProviderUrls: null
                }
             );
        }
        else {
            setTimeout(function() {
                me.onPosition();
                if (callback) {
                    callback.call(scope || me, null, me);
                }
            }, 0);
        }
    },
    
    // @private
    onPosition : function(position) {
        var me = this;
        me.coords = me.parseCoords(position);
        me.fireEvent('update', me, me.coords );
    },
    
    // @private
    onError : function(error) {
        this.fireEvent('exception', this, error);
    },

    // @private
    parseCoords : function(location, asObject) {
        var coords = location && location.coords ?
            {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                original: location
            } : this.coords;
            
        if (coords && asObject !== false && (window.google || {}).maps) {
            coords = new google.maps.LatLng(coords.latitude, coords.longitude);
        }
        return (this.coords = coords);
    },
    
    // @private
    destroy : function() {
       this.updateInterval = 0;
       if (Ext.supports.GeoLocation && this.watchId) {
            this.provider.clearWatch(this.watchId);
       }
       if (this.pollId) {
            clearInterval(this.pollId);
       }
       this.provider = null;
    }
});

Ext.preg('gmaptracker', Ext.plugin.GMap.Tracker);