/**
 * @tag controllers, home
 */
jQuery.Controller.extend('Smart.Controllers.KeybindController',
/* @Static */
{
},
/* @Prototype */
{
	init: function() {
	
},
	bindKeys : function() {

	
	var i=0, boundfunc=null,key=null;
		for (i = 0; i < arguments.length; i++) {
			key = arguments[i];
			boundfunc = this.callback(this['key_'+key]);
			$(document).bind('keypress', key, boundfunc);
			this._bindings.push(function(boundfunc) {
				return function() {
				$(document).unbind('keypress', boundfunc);
				};
			}());		
		}
		return this;
	}	
});
