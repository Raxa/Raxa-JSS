/**
 * @tag models, home
 * Wraps backend med services.  Enables 
 * [Smart.Models.Med.static.findAll retrieving],
 */
Smart.Models.RdfObject.
extend('Smart.Models.MedDetails',
/* @Static */
{
	getDetails : function(med) {
	
	var ret = [];

	this.getFulfillmentDetails(med, ret);
	this.getImageDetails(med,ret);
	
	return ret;
    },

    getFulfillmentDetails : function(med, ret) {

		var r = med.Class.rdf
		.where(med.nodename+" <http://smartplatforms.org/terms#fulfillment> ?o")
		.where("?o ?f_field ?f_detail");
	
		for (var i = 0; i < r.length; i++)
		{
		var field = r[i].f_field.value._string;
		var value = r[i].f_detail.type=="bnode"? "" : r[i].f_detail.value._string || r[i].f_detail.value
		ret.push([field, value]);
		}

    },
    getImageDetails : function(med, ret) {
		var s = "<"+med.cui._string+"> ";
		var firstImage = true;		
		var r = med.Class.rdf
		 .where(s+ " <http://pillbox.nlm.nih.gov/pill> ?pill")
		 .where("?pill <http://pillbox.nlm.nih.gov/image> ?img")
		 .where("?pill dcterms:title ?title")
		 .where("?pill <http://www.accessdata.fda.gov/spl/data/NDC> ?ndc");
		
		for (var i = 0; i < r.length; i++)
		{
			var field  = r[i].title.value;
            extra = firstImage?"<span id='FirstImage'></span><br>":"";
            firstImage = false;
        
            var any_spls = med.Class.rdf.where("?spl rdf:type  <http://www.accessdata.fda.gov/spl/data> ")
            							.where("?spl <http://www.accessdata.fda.gov/spl/data/representedOrganization> ?org")
            							.where("?spl  <http://www.accessdata.fda.gov/spl/data/NDC> \"" + r[i].ndc.value+"\"");

            
			var value = extra+"<img src='"+r[i].img.value._string+"'/>";
			if (any_spls.length > 0) {
				field += "<br><i>"+any_spls[0].org.value+"</i>";
				field += "<br>(<b>RxNorm</b>--> NLM <b>Pillbox</b>--> FDA <b>SPL</b>)";
			}
			ret.push([field, value]);
		}
	
		r = med.Class.rdf
		 .where(s+ " <http://www.accessdata.fda.gov/spl/data> ?spl")
		 .where(" ?spl <http://www.accessdata.fda.gov/spl/data/image> ?o ");
		for (var i = 0; i < r.length; i++)
		{
			var field  = "http://www.accessdata.fda.gov/spl/data/image";
			extra = firstImage?"<span id='FirstImage'></span><br>":"";
            firstImage = false;
            
			var value = extra+"<img src='"+r[i].o.value._string+"'/>";
			
			ret.push([field, value]);
		}
		
    }
},
/* @Prototype */
{	


});
