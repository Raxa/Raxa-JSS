(function(context) {

	if (!context.smart_parser) {
		context.smart_parser = {};
	}

	// Manages a collection of SMART objects (meds, fulfillments, etc)
	// Can parse an rdfquery object to extract plain old JS objects
	var SMART_Object_Collection = function() {
		var items_by_type = {};
		var items_by_uri = {};
		var collection = this;
		this.parsed_payloads = [];

		// Parse an rdfquery payload to extract plain-old JS objects
		this.parse_rdf_payload = function(payload)  {
		    var st = new Date().getTime();
			var parsed_items = [];

			// For every type we know about
			$.each(context.smart_parser.type_definitions, function(oURI, o) {

				// If it's a top-level clinical statement type (e.g. Medication)
				if (!o.is_statement) return;

				// Then look for items of this type in the payload
				var items = parse_one_type(payload, o);
				$.each(items, function(i,item) {
					parsed_items.push(item);
				});
			});

			// Add all identified object to this collection.
			$.each(parsed_items, function(i,item) {
				collection.add_item(make_structured(item));
			});	    

			// Expose the payload so the caller can find it later
			this.parsed_payloads.push(payload);
		    console.log(new Date().getTime() - st);
		};

		// Add a new item to the collection
		this.add_item = function(i) {
		    var t = context.smart_parser.type_definitions[i.type];
		    if (!t.is_statement)
			throw "Only Statements can be added to a SMART Object collection, not " + t;
		    
		    items_by_type[t.name] || (items_by_type[t.name] = {});
		    items_by_type[t.name][i.uri] = i;
		    items_by_uri[i.uri] = i;
		};

		// Get all items from the collection, by type (e.g. "Medication")
		this.by_type = function(type_name) {
		    
		    // This function should only be called with a "clinical statement" type
		    // (e.g. it can be called to find all Medications, but not all CodedValues
		    // since CodedValues don't stand up on their own.)
		    var td = false;
		    $.each(context.smart_parser.type_definitions, 
			   function(tURI, t) {
			       if (t.is_statement && t.name == type_name)
				   td = true;
			   }); 
		    
		    if (!td || td.length == 0)
			throw "Only Statements can be retrieved to a SMART Object collection."
		    
		    var ret = [];
		    if (!items_by_type[type_name]) return ret;
		    
		    $.each(items_by_type[type_name], function(n, item){
			ret.push(item);
		    });
		    return ret;
		};

		// Get a single item from the collection, by URI
		this.by_uri = function(item_uri) {
			return items_by_uri[item_uri];
		};
	};

	// Private helper function
	// (Here begins the mind-bending recurisve fun :-))
      function parse_one_type(payload, t, starting_from, depth) {
            if (depth === undefined) depth = 0;

	    var subject_uri = starting_from && starting_from.uri || "?subject";
	    var matches = payload.where(subject_uri + " rdf:type "+t.uri);
	    //	console.log('payload.where("'+subject_uri+'" + " rdf:type "+'+t.uri+');)');
	    var matched_items = {};
	    if (starting_from) 
		matched_items[starting_from.uri] = starting_from;
	    
	    var bind_and_return_match_uri = function (match){
		
		var match_uri = starting_from && starting_from.uri || match['subject'].toString();
		
		if (!matched_items[match_uri])
		    matched_items[match_uri] = {
			uri: match_uri,
			type: [t]
		    };
		return match_uri
	    }


	    // Assign any additional types discovered in the graph.
	    matches = matches.where(subject_uri + " rdf:type ?t");
	    $.each(matches, function(i, match) {		
		var match_uri = bind_and_return_match_uri(match);
		var t = context.smart_parser.type_definitions[match.t.toString()];
		
		var already_present = $.grep(matched_items[match_uri].type, function(existing_t, i) {
		    return (existing_t.uri == t.uri);
		});

		if (already_present.length == 0)
		{
		    matched_items[match_uri].type.push(t);
		}
	    });	    
	    matches = matches.end();


	    // Assign any data properties discovered in the graph
	    $.each(t.data_properties, function(i, dp) {
		matches = matches.where(subject_uri + " " + dp.uri + " ?dp");
		$.each(matches, function(i, match) {
		    var match_uri = bind_and_return_match_uri(match);
		  
		    matched_items[match_uri].data_properties || 
			(matched_items[match_uri].data_properties = {});
		    
		    var ii = matched_items[match_uri].data_properties[dp.uri] || 
			(matched_items[match_uri].data_properties[dp.uri] = {
			    values: []
			});

		    var v = match.dp.value;		    
		    if (v._string) v = v._string;
		    if ($.inArray(v,ii.values) == -1) {
			ii.values.push(v);
		    }
		});
		matches = matches.end();
	    });


	    // Assign any object properties discovered in the graph
	    $.each(t.object_properties, function(i, op) {
		matches = matches.where(subject_uri + " " + op.uri + " ?op");

		$.each(matches, function(i, match) {
		    var match_uri = bind_and_return_match_uri(match);

		    matched_items[match_uri].object_properties || 
			(matched_items[match_uri].object_properties = {});
		    
		    var ii = matched_items[match_uri].object_properties[op.uri] || 
			(matched_items[match_uri].object_properties[op.uri] = {});
		    
		    var item_uri = match.op.toString();
		    if (!ii[item_uri])  {
			ii[item_uri] = {
			    uri: item_uri,
			    type: [context.smart_parser.type_definitions[op.target]]
			}
		    };	   
		});
		matches = matches.end();		
	    });
	    
  	    var add_depth = 0;
	    // Recurse to populate sub-items discovered in the graph
	    $.each(matched_items, function(iURL, item) {
		if (!item.object_properties) return; 
		$.each(item.object_properties, function(opURI, sub_item_set) {
		    $.each(sub_item_set, function(subItemURI, sub_item) {
			if (sub_item.type[0].is_statement) add_depth = 1;
			if (!sub_item.type[0].is_statement || depth == 0)
			    parse_one_type(payload, sub_item.type[0], sub_item, depth + add_depth);
		    });
		});
	    });

		return matched_items;	
	};

	// private helper to make a nice plain-old JS object
	// from a raw parsed object
	function make_structured(item) {

	    
	    var structured_item = {
		type: item.type[0].uri,
		extra_types: $.map(item.type.slice(1), function(t, i) { return t.uri; })
	    };

  	    if (structured_item.extra_types.length == 0)
  		delete structured_item.extra_types;

	    if (item.uri && !(item.uri.match(/^_:/)))
		structured_item.uri= item.uri;
	    

	    $.each(item.type[0].data_properties, function(i, dp) {
		if (!item.data_properties) return;
		if (!item.data_properties[dp.uri]) return;
		
		if (dp.allow_list) {
		    structured_item[dp.name] =  item.data_properties[dp.uri].values;
		}
		else {
		    if (item.data_properties[dp.uri].values.length == 1)
			structured_item[dp.name] =  item.data_properties[dp.uri].values[0];
		    else if (item.data_properties[dp.uri].values.length > 1)
					throw "Expected cardinality <= 1 for dp " + dp.name
		}
	    });
	    
	    $.each(item.type[0].object_properties, function(i, op) {
		var structured_subitems = [];
		if (!item.object_properties) return;
		if (!item.object_properties[op.uri]) return;
		$.each(item.object_properties[op.uri], function(siURI, subitem) {
		    structured_subitems.push(make_structured(subitem));
		});
		
		if (op.allow_list) {
		    structured_item[op.name] =  structured_subitems;
		}
		
		else {
		    if (structured_subitems.length == 1)
			structured_item[op.name] =  structured_subitems[0];
		    else if (structured_subitems.length > 1)
			throw "Expected cardinality <= 1";
		}
	    });
	    
	    return  structured_item;
	};
    
    context.smart_parser.Collection = SMART_Object_Collection;
})(window);