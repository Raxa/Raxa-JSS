      // This portion of SMART_HOST setup should be pretty much the same for any 
      // SMART Frame UI App.

      SMART_HOST = new SMART_CONNECT_HOST();
      
      SMART_HOST.get_credentials = function (app_instance, callback){
          callback(app_instance.credentials);
      };

      SMART_HOST.handle_api = function(app_instance, call_info, callback) {
        SMART.api_call_delegated( app_instance, 
                                  call_info, 
                                  function(r) { callback(r); }
                                );
      };

      SMART_HOST.on_app_launch_begin = function(app_instance, callback) {
        SMART.launch_app_delegated(app_instance,
            function(updated_app_instance) {
              jQuery.extend(app_instance, updated_app_instance);
              callback();
            });        
      };

      // Support for recursive nesting of Frame UI apps
      SMART_HOST.on_app_launch_delegated_begin =  SMART_HOST.on_app_launch_begin;



