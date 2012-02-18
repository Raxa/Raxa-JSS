

Ext.ns('Ext.plugin.GMap');

Ext.plugin.GMap.Traffic = Ext.extend(Object, {

    /**
     * @property {Boolean} hidden
     */
    hidden : false,
    
    constructor : function(config){
      Ext.apply(this, config || {});  
    },
    
    /**
     * Initialize the plugin, binding to the host Ext.Map instance
     * @param {Ext.Map} host
     */
    init : function( host ) {
        if (host && typeof host.renderMap == 'function') {
            this.host = host;
            host.traffic = this;
            
            host.on({
                maprender : this.onMapRender,
                scope     : this
            });
        }
    },
    
    // @private    
    onMapRender : function(host, map) {
        var overlay = this.getOverlay();
        if (overlay) {
            this.hidden || overlay.setMap(map);
        }
    },
    
    getOverlay : function(map){
        if(!this.overlay && (window.google || {}).maps){
            this.overlay = new google.maps.TrafficLayer();
        }
        return this.overlay;
    },
    
    show : function(){
        var overlay = this.getOverlay();
        if (this.host && this.host.map && overlay) {
           overlay.setMap(this.host.map); 
        }
        this.hidden = false;
        
    },
    
    hide : function(){
        var overlay = this.getOverlay();
        if (overlay) {
           overlay.setMap(null); 
        }
        this.hidden = true;
    }
    
    
});

Ext.preg('gmaptraffic', Ext.plugin.GMap.Traffic);