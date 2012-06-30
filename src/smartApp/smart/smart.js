steal.plugins(  
	      'jquery/controller',                    // a widget factory
	      'jquery/controller/view',                    // a widget factory
	      'jquery/controller/subscribe',  // subscribe to OpenAjax.hub
	      'jquery/view/ejs',                              // client side templates
	      'jquery/model',                                 // Ajax wrappers
	      'jquery/dom/fixture',                   // simulated Ajax requests
	      'jquery/dom/form_params')               // form data helper
	      .then('scripts/class')
	      .then('scripts/json2')
	      .then('scripts/jquery-ui')
	      .then('scripts/jquery.rdfquery.core-1.0')
	      .then('scripts/jquery.hotkeys')
	      .then('scripts/jquery.addons')
	      .then('scripts/date')
	      .then('scripts/jquery.form')
     .models('rdf_object', 'med', 'med_details', 'problem')
     .controllers('keybind')
     .views();
