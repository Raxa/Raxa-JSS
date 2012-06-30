/**
 * @tag controllers, home
 */
jQuery.Controller.extend('ProblemList.Controllers.ProblemListController',
/* @Static */
{
},
/* @Prototype */
{
	init: function() {
		var v = this.view('init', {} );
		this.element.html(v);
		var _this = this;
		
	},
	display_problems: function() {
		Smart.Models.Problem.get(
			this.callback(
				function(problems) {
					this.problems = problems;
					var v = this.view('problems', {problems: problems});
					this.element.html(v);				
				}	
			)
		);
	}

		
});
