/*
 * SMART API client
 * Josh Mandel
 * Ben Adida
 * Nikolai Schwertner
 */

var SMART_CONNECT_CLIENT = function(smart_server_origin, frame) {
    var debug = false;
    var _this = this;
    var sc = this;
    var channel = null;

    this.is_ready = false;
    this.jQuery = this.$ = jQuery;

    this.ready = function(callback) {
	this.ready_callback = callback;
	if (this.is_ready) this.ready_callback();
    };

    var notification_handlers = {};
    this.bind_channel = function(scope) {
        channel = Channel.build({window: frame, origin: "*", scope: scope, debugOutput: debug});

        _this.on = function(n, cb) {
          notification_handlers[n] = function(t, p) {
            cb(p);
          };

          channel.bind(n, notification_handlers[n]);
        };

        _this.off = function(n, cb) {
          channel.unbind(n, notification_handlers[n]);
        }

        _this.notify_host = function(n, p) {
          channel.notify({
              method: n,
              params: p 
            });
        };

        channel.bind("ready", function(trans, message) {
            trans.complete(true);
            sc.received_setup(message);
        });

    };

    var procureChannel = function(event){
	var app_instance_uuid = event.data.match(/^"app_instance_uuid=(.*)"$/);
	if (!app_instance_uuid) return;

	if (window.removeEventListener) window.removeEventListener('message', procureChannel, false);
	else if(window.detachEvent) window.detachEvent('onmessage', procureChannel);

	app_instance_uuid = app_instance_uuid[1];
	sc.bind_channel(app_instance_uuid);
    };

    if (window.addEventListener) window.addEventListener('message', procureChannel, false);
    else if(window.attachEvent) window.attachEvent('onmessage', procureChannel);
    window.parent.postMessage('"procure_channel"', "*");


    this.received_setup = function(message) {
	
	this.context = message.context;
	this.uuid = message.uuid;
	this.credentials = message.credentials;
	this.manifest = message.manifest;
	
	this.user = message.context.user;
	this.record = message.context.record;
	

	this.ready_data = message.ready_data;
	
 	this.is_ready = true;

	if (this.manifest.mode == "ui" || this.manifest.mode == "frame_ui")
	    this.assign_ui_handlers();
	
	if (this.manifest.mode == "frame_ui")
	    this.assign_frame_ui_handlers();

	if (this.ready_callback) this.ready_callback();
	
    };

    this.assign_ui_handlers = function() {
	this.api_call = function(options, callback_success, callback_error) {
        var dfd = $.Deferred(),
            prm = dfd.promise();
        prm.success = prm.done;
        prm.error = prm.fail;
        if (callback_success) {
           prm.success(callback_success);
           if (callback_error) prm.error(callback_error);
        }
        if (options.success) prm.success(options.success);
        if (options.error) prm.error(options.error);
	    channel.call({method: "api_call",
			  params: 
			  {
			      'func' : options.url,
			      'method' : options.method,
			      'params' : options.data,
			      'contentType' : options.contentType || "application/x-www-form-urlencoded"
			  },
			  success: function(r) { dfd.resolve({body: r.data, contentType: r.contentType}); },
              error: function(e,m) { dfd.reject({status: e, message: m}); }
			 });
        return prm;
	};

	this.call_app = function(manifest, ready_data, callback) {
	    channel.call({method: "call_app",
			  params: 
			  {
			    manifest: manifest,
			    ready_data: ready_data
			  },
			  success: callback
			 });
	  
	};

	// renamed from this.return because IE8 refuses to allow reserved words 
	// (this.return is no good; this['return'] would work)
	this.complete = function(returndata) {

	    channel.notify({
	      method: "return",
	      params: returndata
	    });

	};
    }

    this.assign_frame_ui_handlers = function() {
	this.api_call_delegated = function(app_instance, call_info, success) {
	    channel.call({method: "api_call_delegated",
			  params: {
			      app_instance: {
				  uuid: app_instance.uuid,
				  context: app_instance.context,
				  credentials: app_instance.credentials,
				  manifest: app_instance.manifest
			      },
			      
			      call_info: call_info
			  },
			  success: success
			 });
	};
	
	this.launch_app_delegated = function(app_instance, success) {
	    channel.call({
		method: "launch_app_delegated",
		params:	{
		    uuid: app_instance.uuid,
		    context: app_instance.context,
		    credentials: app_instance.credentials, // (won't exist yet.)
		    manifest: app_instance.manifest
		},
		success: success
	    });
	};

	this.PATIENTS_get = function(callback_success, callback_error) {
        var dfd = $.Deferred(),
            prm = dfd.promise();
        prm.success = prm.done;
        prm.error = prm.fail;
        if (callback_success) {
           prm.success(callback_success);
           if (callback_error) prm.error(callback_error);
        }
	    sc.api_call({
            url: "/records/search",
            method: "GET"
	    }, function(r) {
            var rdf,
                json;
            try {
                rdf = _this.process_rdf(r.contentType, r.body);
            } catch(err) {
                try {
                    json = JSON.parse(r.body);
                } catch(err) {}
            }
            dfd.resolve({body: r.body, contentType: r.contentType, graph: rdf, json: json});
	    }, function(r) {
            dfd.reject({status: r.status, message: r.message});
	    });
        return prm;
	};

    }
   
};

SMART_CONNECT_CLIENT.prototype.methods = [];

SMART_CONNECT_CLIENT.prototype.register_method = function (name, method, target, category) {
    this.methods.push({name: name, method: method, target: target, category: category});
}

SMART_CONNECT_CLIENT.prototype.NOTES_get = function(callback_success, callback_error) {
    var _this = this,
        dfd = $.Deferred(),
        prm = dfd.promise();
    prm.success = prm.done;
    prm.error = prm.fail;
    if (callback_success) {
       prm.success(callback_success);
       if (callback_error) prm.error(callback_error);
    }
	this.api_call( {
		method : 'GET',
		url : "/records/" + _this.record.id + "/notes/",
		data : {}
	}, function(r) {
        var rdf,
            json;
        try {
            rdf = _this.process_rdf(r.contentType, r.body);
        } catch(err) {
            try {
                json = JSON.parse(r.body);
            } catch(err) {}
        }
        dfd.resolve({body: r.body, contentType: r.contentType, graph: rdf, json: json});
	}, function(r) {
        dfd.reject({status: r.status, message: r.message});
    });
    return prm;
};

SMART_CONNECT_CLIENT.prototype.NOTES_post = function(data, callback_success, callback_error) {
    var _this = this,
        dfd = $.Deferred(),
        prm = dfd.promise();
    prm.success = prm.done;
    prm.error = prm.fail;
    if (callback_success) {
       prm.success(callback_success);
       if (callback_error) prm.error(callback_error);
    }
	this.api_call( {
		method : 'POST',
		url : "/records/" + _this.record.id + "/notes/",
		contentType : 'application/rdf+xml',
		data : data
	}, function(r) {
		dfd.resolve({body: r.body, contentType: r.contentType, graph: undefined});
	}, function(r) {
        dfd.reject({status: r.status, message: r.message});
    });
    return prm;
};

SMART_CONNECT_CLIENT.prototype.NOTES_delete = function(note_uri, callback_success, callback_error) {
    var _this = this,
        dfd = $.Deferred(),
        prm = dfd.promise();
    prm.success = prm.done;
    prm.error = prm.fail;
    if (callback_success) {
       prm.success(callback_success);
       if (callback_error) prm.error(callback_error);
    }
	this.api_call( {
		method : 'DELETE',
		url : note_uri,
		data : {}
	}, function(r) {
		dfd.resolve({body: r.body, contentType: r.contentType, graph: undefined});
	}, function(r) {
        dfd.reject({status: r.status, message: r.message});
    });
    return prm;
};

SMART_CONNECT_CLIENT.prototype.NOTE_put = function(data, external_id, callback_success, callback_error) {
    var _this = this,
        dfd = $.Deferred(),
        prm = dfd.promise();
    prm.success = prm.done;
    prm.error = prm.fail;
    if (callback_success) {
       prm.success(callback_success);
       if (callback_error) prm.error(callback_error);
    }
	this.api_call( {
		method : 'PUT',
		url : "/records/" + _this.record.id + "/notes/external_id/"
				+ external_id,
		contentType : 'application/rdf+xml',
		data : data
	}, function(r) {
		var rdf = _this.process_rdf(r.contentType, r.body);
		dfd.resolve({body: r.body, contentType: r.contentType, graph: rdf});
	}, function(r) {
        dfd.reject({status: r.status, message: r.message});
    });
    return prm;
};

SMART_CONNECT_CLIENT.prototype.CODING_SYSTEM_get = function(system, query, callback_success, callback_error) {
    var _this = this,
        dfd = $.Deferred(),
        prm = dfd.promise();
    prm.success = prm.done;
    prm.error = prm.fail;
    if (callback_success) {
       prm.success(callback_success);
       if (callback_error) prm.error(callback_error);
    }
	this.api_call( {
		method : 'GET',
		url : "/codes/systems/" + system + "/query",
		data : {
			q : query
		}
	}, function(r) {
		var js = JSON.parse(r.body);
		dfd.resolve({body: r.body, contentType: r.contentType, graph: js});
	}, function(r) {
        dfd.reject({status: r.status, message: r.message});
    });
    return prm;
}

SMART_CONNECT_CLIENT.prototype.SPL_get = function(query, callback_success, callback_error) {
    var _this = this,
        dfd = $.Deferred(),
        prm = dfd.promise();
    prm.success = prm.done;
    prm.error = prm.fail;
    if (callback_success) {
       prm.success(callback_success);
       if (callback_error) prm.error(callback_error);
    }
	this.api_call( {
		method : 'GET',
		url : "/spl/for_rxnorm/" + query,
		data : {}
	}, function(r) {
		var rdf = _this.process_rdf(r.contentType, r.body);
		dfd.resolve({body: r.body, contentType: r.contentType, graph: rdf});
	}, function(r) {
        dfd.reject({status: r.status, message: r.message});
    });
    return prm;
};


SMART_CONNECT_CLIENT.prototype.webhook_post = function(webhook_name, data, callback_success, callback_error) {
    var _this = this,
        dfd = $.Deferred(),
        prm = dfd.promise();
    prm.success = prm.done;
    prm.error = prm.fail;
    if (callback_success) {
       prm.success(callback_success);
       if (callback_error) prm.error(callback_error);
    }
	this.api_call( {
		method : 'POST',
		contentType : 'application/rdf+xml',
		url : "/webhook/"+webhook_name,
		data : data
    }, function(r) {
		var rdf = _this.process_rdf(r.contentType, r.body);
		dfd.resolve({body: r.body, contentType: r.contentType, graph: rdf});
	}, function(r) {
        dfd.reject({status: r.status, message: r.message});
    });
    return prm;
};


SMART_CONNECT_CLIENT.prototype.webhook_get = function(webhook_name, data, callback_success, callback_error) {
    var _this = this,
        dfd = $.Deferred(),
        prm = dfd.promise();
    prm.success = prm.done;
    prm.error = prm.fail;
    if (callback_success) {
       prm.success(callback_success);
       if (callback_error) prm.error(callback_error);
    }
	this.api_call({
            method : 'GET',
            url : "/webhook/"+webhook_name,
            data : data
    }, function(r) {
        var rdf = _this.process_rdf(r.contentType, r.body);
        dfd.resolve({body: r.body, contentType: r.contentType, graph: rdf});
	}, function(r) {
        dfd.reject({status: r.status, message: r.message});
    });
    return prm;
};

SMART_CONNECT_CLIENT.prototype.webhook = SMART_CONNECT_CLIENT.prototype.webhook_get;

SMART_CONNECT_CLIENT.prototype.AUTOCOMPLETE_RESOLVER = function(system) {
	var _this = this;
	var source = function(request, response) {
		_this.CODING_SYSTEM_get(system, request.term, function(json) {
			response(jQuery.map(json, function(item) {
				return {
					label : item.full_value,
					value : item.code
				};
			}));
		})
	};

	return source;
}

SMART_CONNECT_CLIENT.prototype.SPARQL = function(query, callback_success, callback_error) {
    var _this = this,
        dfd = $.Deferred(),
        prm = dfd.promise();
    prm.success = prm.done;
    prm.error = prm.fail;
    if (callback_success) {
       prm.success(callback_success);
       if (callback_error) prm.error(callback_error);
    }
	this.api_call( {
		method : 'GET',
		url : "/records/" + _this.record.id + "/sparql",
		data : {
			q : query
		}
	}, function(r) {
		var rdf = _this.process_rdf(r.contentType, r.body);
		dfd.resolve({body: r.body, contentType: r.contentType, graph: rdf});
	}, function(r) {
        dfd.reject({status: r.status, message: r.message});
    });
    return prm;
};

SMART_CONNECT_CLIENT.prototype.createXMLDocument = function(string) {
    var parser, xmlDoc;
    if (window.DOMParser)
	{
	    parser = new DOMParser();
	    xmlDoc = parser.parseFromString(string, 'text/xml');
	}
    else
	{
	    xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
	    xmlDoc.async = 'false';
	    xmlDoc.loadXML(string);
	}
    return xmlDoc;
};

SMART_CONNECT_CLIENT.prototype.node_name = function(node) {
	node = node.value;
    if (node._string !== undefined)
    { node = "<"+node._string+">";}
    return node;
};


SMART_CONNECT_CLIENT.prototype.process_rdf = function(contentType, data) {

try {
	// Get the triples into jquery.rdf
	var d = this.createXMLDocument(data);

	var rdf = jQuery.rdf();
	rdf.base("");

		rdf.load(d, {});
		// Load all the namespaces from the xml+rdf into jquery.rdf
	var r = d.childNodes[0];
	if (r.nodeName !== "RDF" && r.nodeName !== "rdf:RDF")
	    r = d.childNodes[1];
        if (r.attributes === null)
            r = d.childNodes[1];

	
	for ( var i = 0; i < r.attributes.length; i++) {
	    a = r.attributes[i];
	    try {
		var match = /xmlns:(.*)/i.exec(a.nodeName);
		if (match.length == 2) {
		    rdf.prefix(match[1], a.nodeValue);
		}
	    } catch (err) {}
	}

	rdf.prefix("sp", "http://smartplatforms.org/terms#");
	rdf.prefix("dcterms", "http://purl.org/dc/terms/");
    rdf.prefix("foaf","http://xmlns.com/foaf/0.1/");
    rdf.prefix("v","http://www.w3.org/2006/vcard/ns#");

	return rdf;
 } catch(err) {
    return;
 }
}
