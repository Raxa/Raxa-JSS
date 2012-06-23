/**
 * @tag models, home
 * Wraps backend med services.  Enables 
 * [Smart.Models.Med.static.findAll retrieving],
 */
Smart.Models.RdfObject.
extend('Smart.Models.Problem',
/* @Static */
{
	get: function(success, error){
	SMART.PROBLEMS_get().success(	
				this.callback([this.saveRDF, success])
			);  
	},

	put: function(data, external_id, success, error){
		SMART.PROBLEMS_put(data, external_id).success(success);  
	},

	post: function(problem, success, error){
		SMART.PROBLEMS_post(problem.toRDFXML()).success(success);  
	},
	
	del: function(uri,success, error){
		SMART.PROBLEMS_delete(uri).success(success);  
	},
	
	object_type: "sp:Problem",
	instantiateByType: function() {
		if (this.rdf === undefined || !this.rdf instanceof jQuery.rdf)
			throw "rdfToMeds needs a jquery.rdf to work with!";
		
		var ret = [];
		           
		this.rdf.prefix("sp","http://smartplatforms.org/terms#");
		this.rdf.prefix("dcterms","http://purl.org/dc/terms/");
		
		var r = this.rdf.where("?problem rdf:type "+this.object_type);
			
		for (var i = 0; i < r.length; i++) {
		    var p = new Smart.Models.Problem({rdf: r[i].problem});
		    ret.push(p);
		}
		ret.sort(this.compare(function(a){return a.title.toUpperCase();}));		
	    return ret;

    }

},
/* @Prototype */
{	
	init: function() {
		if (!this.rdf) return;
		
		var p = Smart.Models.Problem.rdf
		.optional(this.nodeName() + " sp:problemName ?pc ")
		.optional("?pc dcterms:title ?title ")
		.optional("?pc sp:code ?concept")
		.optional(this.nodeName() + " sp:notes ?notes")
		.optional(this.nodeName() + " sp:onset ?onset")
		.optional(this.nodeName() + " sp:resolution ?resolution")[0];
		
		if (p.concept)
			this.concept= p.concept.value._string;
		
		this.title = p.title && p.title.type==='literal' ? p.title.value : "";
		this.notes = p.notes && p.notes.type==='literal'? p.notes.value : "";
		this.onset = p.onset && p.onset.type==='literal'? p.onset.value : "";
		this.resolution= p.resolution && p.resolution.type==='literal'? p.resolution.value : "";
		
	},
	
	toRDFXML: function() {
		
		var rdf = $.rdf()
		  .prefix('sp', 'http://smartplatforms.org/terms#')
		  .prefix('dc', 'http://purl.org/dc/elements/1.1/')
		  .prefix('dcterms', 'http://purl.org/dc/terms/')
		  .prefix('rdf', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#');

		rdf.add('_:m rdf:type sp:Problem .');
		
		rdf.add('_:m sp:problemName _:pc .');
		rdf.add('_:pc dcterms:title "'+this.title+'" .');
		if (this.concept) 
			rdf.add('_:pc sp:code <'+this.concept+'> .');

		if (this.notes)
			rdf.add('_:m sp:notes "'+this.notes+'" .');
		
		if (this.onset)
			rdf.add('_:m sp:onset "'+this.onset+'" .');

		if (this.resolution)
			rdf.add('_:m sp:resolution "'+this.resolution+'" .');
		
		return jQuery.rdf.dump(rdf.databank.triples(), {format:'application/rdf+xml', serialize: true});
	},
	

	
	toString: function(){
	}
});
