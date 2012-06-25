jQuery.Controller.extend('ProblemList.Controllers.MainController',
/* @Static */
{
    onDocument: true
},
/* @Prototype */
{
    "{window} load": function() {
	SMART.ready(function() {
	    $("#UserDisplay").html("");
	    var pl = $("#ProblemList").problem_list_problem_list();
	    pl.controller().display_problems();

	});
    }
});