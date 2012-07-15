/**
 * @tag models, home
 * Wraps backend rdf object.
 */
$.Model.extend('Smart.Models.RdfObject',
/* @Static */
	{
	saveRDF: function(r) {
		this.rdf = r.graph;
		
		// abstract method to instantiate a list of objects from the rdf store.
		return [this.instantiateByType()];
	},
	
    // Abstract function
    instantiateByType : function() {
    	throw "Subclass must implement abstract function instantiateByType - do not call on RdfObject directly!";
	    },

compare: function(f) {
		return function(a,b) {	
	a = f(a);
	b = f(b);
	if (a < b) return -1;
	if (a > b) return 1;
	return 0;
		}
}

    
},
/* @Prototype */
{	

    nodeName: function() {
	var p = this.rdf.value;
	if (this.rdf.type === 'uri') p= "<"+p+">";
	return p;
	}

});